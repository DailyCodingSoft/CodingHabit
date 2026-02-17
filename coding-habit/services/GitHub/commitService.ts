import { log } from "console";
import { Octokit } from "octokit";

const octokit = new Octokit();

/**
 * Returns the commits made by a specific user on a given repo from yesterday.
 * Useful to check if the user broke their coding streak.
 *
 * @param owner - The organization or repo owner (e.g. "facebook")
 * @param repo  - The repository name (e.g. "react")
 * @param contributors - The GitHub usernames whose commits to fetch
 */
export async function checkContributorsCommitsFromYesterday(
  owner: string,
  repo: string,
  contributors: { username: string }[]
): Promise<void> {
  const OFFSET = 5; // Colombia UTC-5
  const now = new Date();

  // Yesterday 00:00:00 UTC
  const sinceDate = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    0, 0, 0, 0
  ));

  // Today 00:00:00 UTC
  const untilDate = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  ));
  for (const contributor of contributors) {
    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner,
          repo,
          author: contributor.username,
          since: sinceDate.toISOString(),
          until: untilDate.toISOString(),
          per_page: 100,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      const commits = response.data;

      // 1️⃣ Filtrar merge commits
      const realCommits = commits.filter(
        (commit) => !commit.commit.message.startsWith("Merge")
      );

      const commitCount = realCommits.length;

      const lastRealCommit = realCommits[0] ?? null;

      const lastCommitMessage = lastRealCommit?.commit.message ?? null;

      // To do ...
      // Actualización de base de datos
      // await updateContributorStreak(contributor.id, didCommitYesterday);

      console.log(
        `${contributor.username}: ${commitCount > 0
          ? `🔥 ${commitCount} commit(s) - último commit: "${lastCommitMessage}"`
          : "❌ no commit"
        }`
      );
    } catch (error) {
      console.error(
        `Error checking commits for ${contributor.username}`,
        error
      );
    }
  }
}