import { Octokit } from "octokit";

/**
 * Servicio para consultar commits de contribuyentes en un repositorio.
 * Compatible con GitHub REST API v3.
 */
export class GitHubCommitService {
  private octokit: Octokit;

  constructor(token?: string) {
    this.octokit = new Octokit(
      token
        ? { auth: token }
        : undefined
    );
  }

  // ────────────────────────────────────────────────────────────────
  // Types
  // ────────────────────────────────────────────────────────────────

  public static DateRanges = {
    TODAY: "today",
    YESTERDAY: "yesterday",
  } as const;

  public typeDateRange = typeof GitHubCommitService.DateRanges[keyof typeof GitHubCommitService.DateRanges];

  public interfaceContributor = {} as unknown as Contributor;
  public interfaceResult = {} as unknown as ContributorResult;

  // ────────────────────────────────────────────────────────────────
  // Public API
  // ────────────────────────────────────────────────────────────────

  /**
   * Verifica commits de múltiples contribuyentes en un rango UTC.
   */
  async checkContributorsCommits(
    owner: string,
    repo: string,
    contributors: Contributor[],
    range: "today" | "yesterday"
  ): Promise<ContributorResult[]> {

    const [since, until] = this.getUTCDateRange(range);

    const results = await Promise.allSettled(
      contributors.map(({ username }) =>
        this.checkSingleContributor(owner, repo, username, since, until)
      )
    );

    return results.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        username: contributors[index].username,
        commitCount: 0,
        lastCommitMessage: null,
        lastCommitDate: null,
        didCommit: false,
      };
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Core logic
  // ────────────────────────────────────────────────────────────────

  private async checkSingleContributor(
    owner: string,
    repo: string,
    username: string,
    since: Date,
    until: Date
  ): Promise<ContributorResult> {

    const commits = await this.fetchUserCommitsInRange(
      owner,
      repo,
      username,
      since,
      until
    );

    if (commits.length === 0) {
      return {
        username,
        commitCount: 0,
        lastCommitMessage: null,
        lastCommitDate: null,
        didCommit: false,
      };
    }

    const latest = commits[0]; // GitHub devuelve orden descendente

    return {
      username,
      commitCount: commits.length,
      lastCommitMessage: latest.commit.message,
      lastCommitDate: latest.commit.author?.date ?? null,
      didCommit: true,
    };
  }

  /**
   * Obtiene commits de un usuario dentro de un rango UTC.
   * Excluye merges correctamente (más de 1 parent).
   */
  private async fetchUserCommitsInRange(
    owner: string,
    repo: string,
    username: string,
    since: Date,
    until: Date
  ) {
    const { data } = await this.octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner,
        repo,
        author: username,
        since: since.toISOString(),
        until: until.toISOString(),
        per_page: 100,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    // Excluir merges correctamente
    return data.filter(commit => commit.parents.length === 1);
  }

  /**
   * Devuelve el rango UTC para "today" o "yesterday".
   */
  private getUTCDateRange(type: "today" | "yesterday"): [Date, Date] {
    const now = new Date();

    const dayOffset = type === "yesterday" ? -1 : 0;

    const start = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + dayOffset,
      0, 0, 0, 0
    ));

    const end = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + dayOffset,
      23, 59, 59, 999
    ));

    return [start, end];
  }
}

// ────────────────────────────────────────────────────────────────
// Types externos
// ────────────────────────────────────────────────────────────────

export interface Contributor {
  username: string;
}

export interface ContributorResult {
  username: string;
  commitCount: number;
  lastCommitMessage: string | null;
  lastCommitDate: string | null;
  didCommit: boolean;
}
