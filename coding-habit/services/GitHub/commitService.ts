import { Octokit } from "octokit";

const octokit = new Octokit();

// ── Types ────────────────────────────────────────────────────────────────────

export interface Contributor {
  username: string;
}

export interface ContributorResult {
  username: string;
  commitCount: number;
  lastCommitMessage: string | null;
  didCommitYesterday: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns [since, until] covering "yesterday" in UTC. */
function getYesterdayRangeUTC(): [Date, Date] {
  const now = new Date();
  const since = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    0, 0, 0, 0
  ));
  const until = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  ));
  return [since, until];
}

/** Fetches all non-merge commits for a contributor, handling pagination. */
async function fetchRealCommits(
  owner: string,
  repo: string,
  username: string,
  since: Date,
  until: Date
): Promise<{ message: string }[]> {
  const commits: { message: string }[] = [];
  let page = 1;

  while (true) {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner,
      repo,
      author: username,
      since: since.toISOString(),
      until: until.toISOString(),
      per_page: 100,
      page,
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    });

    const real = data.filter(
      (c) => !c.commit.message.startsWith("Merge")
    );
    commits.push(...real.map((c) => ({ message: c.commit.message })));

    // Stop if this is the last page
    if (data.length < 100) break;
    page++;
  }

  return commits;
}

// ── Core function ────────────────────────────────────────────────────────────

/**
 * Returns the commits made by specific contributors on a given repo from yesterday (UTC).
 * Useful to check if users broke their coding streak.
 *
 * @param owner        - The organization or repo owner (e.g. "facebook")
 * @param repo         - The repository name (e.g. "react")
 * @param contributors - The GitHub usernames to check
 */
export async function checkContributorsCommitsFromYesterday(
  owner: string,
  repo: string,
  contributors: Contributor[]
): Promise<ContributorResult[]> {
  const [since, until] = getYesterdayRangeUTC();

  const results = await Promise.allSettled(
    contributors.map(async ({ username }): Promise<ContributorResult> => {
      const commits = await fetchRealCommits(owner, repo, username, since, until);
      return {
        username,
        commitCount: commits.length,
        lastCommitMessage: commits[0]?.message ?? null,
        didCommitYesterday: commits.length > 0,
      };
    })
  );

  return results.map((result, i) => {
    const username = contributors[i].username;

    if (result.status === "fulfilled") {
      const { commitCount, lastCommitMessage, didCommitYesterday } = result.value;
      console.log(
        `${username}: ${
          didCommitYesterday
            ? `🔥 ${commitCount} commit(s) — last commit: "${lastCommitMessage}"`
            : "❌ no commits yesterday"
        }`
      );
      return result.value;
    } else {
      console.error(`Error checking commits for ${username}:`, result.reason);
      return {
        username,
        commitCount: 0,
        lastCommitMessage: null,
        didCommitYesterday: false,
      };
    }
  });
}
