import { Octokit } from "octokit";

export interface Contributor {
  username: string;
}

export interface StreakResult {
  username: string;
  didCommitYesterday: boolean;
  commitCount: number;
  lastCommitMessage: string | null;
  lastCommitDate: string | null;
}

export interface LatestCommitResult {
  username: string;
  found: boolean;
  message: string | null;
  date: string | null;
  sha: string | null;
}

export class GitHubCommitService {
  private octokit: Octokit;

  constructor(token?: string) {
    this.octokit = new Octokit(token ? { auth: token } : undefined);
  }

  // ── Public ───────────────────────────────────────────────────────────────────

  async checkStreak(
    owner: string,
    repo: string,
    contributors: Contributor[]
  ): Promise<StreakResult[]> {
    const [since, until] = this.getYesterdayRangeColombia();
    const branches = await this.fetchAllBranches(owner, repo);

    // Trae todos los commits del repo (todas las ramas, rango de ayer)
    const commitsByBranch = await Promise.all(
      branches.map((branch) =>
        this.fetchAllCommitsFromBranch(owner, repo, branch, since, until)
      )
    );

    // Deduplicar por sha
    const seen = new Set<string>();
    const allCommits = commitsByBranch.flat().filter((c) => {
      if (seen.has(c.sha)) return false;
      seen.add(c.sha);
      return true;
    });

    // Agrupar por autor
    const commitsByAuthor = new Map<string, typeof allCommits>();
    for (const commit of allCommits) {
      const key = commit.author.toLowerCase();
      if (!commitsByAuthor.has(key)) commitsByAuthor.set(key, []);
      commitsByAuthor.get(key)!.push(commit);
    }

    // Mapear resultados por contributor
    return contributors.map(({ username }) => {
      const commits = commitsByAuthor.get(username.toLowerCase()) ?? [];

      if (commits.length === 0) return this.fallbackStreak(username);

      const sorted = commits.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      return {
        username,
        didCommitYesterday: true,
        commitCount: commits.length,
        lastCommitMessage: sorted[0].message,
        lastCommitDate: sorted[0].date,
      };
    });
  }

  async getLatestCommit(
    owner: string,
    repo: string,
    contributors: Contributor[]
  ): Promise<LatestCommitResult[]> {
    const branches = await this.fetchAllBranches(owner, repo);

    // Trae todos los commits del repo sin filtro de fecha
    const commitsByBranch = await Promise.all(
      branches.map((branch) =>
        this.fetchAllCommitsFromBranch(owner, repo, branch)
      )
    );

    // Deduplicar por sha
    const seen = new Set<string>();
    const allCommits = commitsByBranch.flat().filter((c) => {
      if (seen.has(c.sha)) return false;
      seen.add(c.sha);
      return true;
    });

    // Agrupar por autor
    const commitsByAuthor = new Map<string, typeof allCommits>();
    for (const commit of allCommits) {
      const key = commit.author.toLowerCase();
      if (!commitsByAuthor.has(key)) commitsByAuthor.set(key, []);
      commitsByAuthor.get(key)!.push(commit);
    }

    // Mapear resultados por contributor
    return contributors.map(({ username }) => {
      const commits = (commitsByAuthor.get(username.toLowerCase()) ?? []).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      if (commits.length === 0) return this.fallbackLatestCommit(username);

      return {
        username,
        found: true,
        message: commits[0].message,
        date: commits[0].date,
        sha: commits[0].sha,
      };
    });
  }


  // ── Private: resolvers ───────────────────────────────────────────────────────

  private async resolveStreak(
    owner: string,
    repo: string,
    username: string,
    since: Date,
    until: Date
  ): Promise<StreakResult> {
    const branches = await this.fetchAllBranches(owner, repo);

    const commitsByBranch = await Promise.all(
      branches.map((branch) =>
        this.fetchCommitsFromBranch(owner, repo, username, since, until, branch)
      )
    );

    // Deduplicar por sha (un commit puede estar en varias ramas)
    const seen = new Set<string>();
    const commits = commitsByBranch.flat().filter((c) => {
      if (seen.has(c.sha)) return false;
      seen.add(c.sha);
      return true;
    });

    if (commits.length === 0) return this.fallbackStreak(username);

    const sorted = commits.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      username,
      didCommitYesterday: true,
      commitCount: commits.length,
      lastCommitMessage: sorted[0].message,
      lastCommitDate: sorted[0].date,
    };
  }

  private async fetchCommitsFromBranch(
    owner: string,
    repo: string,
    username: string,
    since: Date,
    until: Date,
    branch: string
  ): Promise<{ sha: string; message: string; date: string }[]> {
    try {
      const allItems: { sha: string; message: string; date: string }[] = [];
      let page = 1;

      while (true) {
        const { data } = await this.octokit.request("GET /repos/{owner}/{repo}/commits", {
          owner,
          repo,
          author: username,
          sha: branch,
          since: since.toISOString(),
          until: until.toISOString(),
          per_page: 100,
          page,
        });

        const real = data
          .filter((c) => c.parents.length === 1)
          .map((c) => ({
            sha: c.sha,
            message: c.commit.message,
            date: c.commit.author?.date ?? "",
          }));

        allItems.push(...real);
        if (data.length < 100) break;
        page++;
      }

      return allItems;
    } catch {
      return [];
    }
  }

  private async fetchAllCommitsFromBranch(
    owner: string,
    repo: string,
    branch: string,
    since?: Date,
    until?: Date
  ): Promise<{ sha: string; message: string; date: string; author: string }[]> {
    try {
      const allItems: { sha: string; message: string; date: string; author: string }[] = [];
      let page = 1;

      while (true) {
        const { data } = await this.octokit.request("GET /repos/{owner}/{repo}/commits", {
          owner,
          repo,
          sha: branch,
          ...(since && { since: since.toISOString() }),
          ...(until && { until: until.toISOString() }),
          per_page: 100,
          page,
        });

        const real = data
          .filter((c) => c.parents.length === 1)
          .map((c) => ({
            sha: c.sha,
            message: c.commit.message,
            date: c.commit.author?.date ?? "",
            author: c.author?.login ?? c.commit.author?.name ?? "",
          }));

        allItems.push(...real);
        if (data.length < 100) break;
        page++;
      }

      return allItems;
    } catch {
      return [];
    }
  }

  private async resolveLatestCommit(
    owner: string,
    repo: string,
    username: string
  ): Promise<LatestCommitResult> {
    const branches = await this.fetchAllBranches(owner, repo);

    // Busca el commit más reciente del usuario en cada rama en paralelo
    const commitsByBranch = await Promise.all(
      branches.map((branch) => this.fetchLatestCommitFromBranch(owner, repo, username, branch))
    );

    // Filtra ramas sin commits y queda con el más reciente global
    const latest = commitsByBranch
      .filter((c): c is NonNullable<typeof c> => c !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!latest) return this.fallbackLatestCommit(username);

    return {
      username,
      found: true,
      message: latest.message,
      date: latest.date,
      sha: latest.sha,
    };
  }

  private async fetchAllBranches(owner: string, repo: string): Promise<string[]> {
    const branches: string[] = [];
    let page = 1;

    while (true) {
      const { data } = await this.octokit.request("GET /repos/{owner}/{repo}/branches", {
        owner,
        repo,
        per_page: 100,
        page,
      });

      branches.push(...data.map((b) => b.name));
      if (data.length < 100) break;
      page++;
    }

    return branches;
  }

  private async fetchLatestCommitFromBranch(
    owner: string,
    repo: string,
    username: string,
    branch: string
  ): Promise<{ sha: string; message: string; date: string } | null> {
    try {
      const { data } = await this.octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner,
        repo,
        author: username,
        sha: branch,
        per_page: 1,
      });

      const real = data.filter((c) => c.parents.length === 1);
      if (real.length === 0) return null;

      return {
        sha: real[0].sha,
        message: real[0].commit.message,
        date: real[0].commit.author?.date ?? "",
      };
    } catch {
      return null; // si la rama falla, la ignoramos y seguimos
    }
  }

  private async searchCommitsByQuery(q: string) {
    const allItems: any[] = [];
    let page = 1;

    while (true) {
      const { data } = await this.octokit.request("GET /search/commits", {
        q,
        sort: "author-date",
        order: "desc",
        per_page: 100,
        page,
        headers: {
          Accept: "application/vnd.github.cloak-preview+json",
        },
      });

      allItems.push(...data.items);

      if (data.items.length < 100) break;
      page++;
    }

    return allItems;
  }

  // ── Private: search ──────────────────────────────────────────────────────────

  private async searchCommits(
    owner: string,
    repo: string,
    username: string,
    since: Date,
    until: Date
  ) {
    const sinceStr = since.toISOString().split("T")[0]; // "2025-02-24"
    const untilStr = until.toISOString().split("T")[0]; // "2025-02-24"

    const allItems: any[] = [];
    let page = 1;

    while (true) {
      const { data } = await this.octokit.request("GET /search/commits", {
        q: `author:${username} repo:${owner}/${repo} author-date:${sinceStr}..${untilStr}`,
        sort: "author-date",
        order: "desc",
        per_page: 100,
        page,
        headers: {
          Accept: "application/vnd.github.cloak-preview+json",
        },
      });

      // Excluir merge commits
      const real = data.items.filter((c) => c.parents.length === 1);
      allItems.push(...real);

      if (data.items.length < 100) break;
      page++;
    }

    return allItems;
  }

  // ── Private: date helpers ────────────────────────────────────────────────────

  private getYesterdayRangeColombia(): [Date, Date] {
    const COLOMBIA_OFFSET_MS = 5 * 60 * 60 * 1000; // UTC-5

    const nowUTC = new Date();
    const nowColombia = new Date(nowUTC.getTime() - COLOMBIA_OFFSET_MS);

    // Construimos "ayer 00:00" y "ayer 23:59:59" en hora Colombia, expresados en UTC
    const since = new Date(Date.UTC(
      nowColombia.getUTCFullYear(),
      nowColombia.getUTCMonth(),
      nowColombia.getUTCDate() - 1,
      5, 0, 0, 0       // 00:00 Colombia = 05:00 UTC
    ));

    const until = new Date(Date.UTC(
      nowColombia.getUTCFullYear(),
      nowColombia.getUTCMonth(),
      nowColombia.getUTCDate(),
      4, 59, 59, 999   // 23:59:59 Colombia = 04:59:59 UTC del día siguiente
    ));

    console.log("[range] since:", since.toISOString());
    console.log("[range] until:", until.toISOString());

    return [since, until];
  }

  // ── Private: fallbacks ───────────────────────────────────────────────────────

  private fallbackStreak(username: string): StreakResult {
    return {
      username,
      didCommitYesterday: false,
      commitCount: 0,
      lastCommitMessage: null,
      lastCommitDate: null,
    };
  }

  private fallbackLatestCommit(username: string): LatestCommitResult {
    return {
      username,
      found: false,
      message: null,
      date: null,
      sha: null,
    };
  }
}