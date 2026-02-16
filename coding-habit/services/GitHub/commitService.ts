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
  const now = new Date();

  // Yesterday 00:00:00 UTC
  const sinceDate = new Date(now);
  sinceDate.setUTCDate(sinceDate.getUTCDate() - 1);
  sinceDate.setUTCHours(0, 0, 0, 0);

  // Today 00:00:00 UTC
  const untilDate = new Date(now);
  untilDate.setUTCHours(0, 0, 0, 0);
  console.log("sinceDate", sinceDate);
  console.log("untilDate", untilDate);
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
          per_page: 1,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const didCommitYesterday = response.data.length > 0;

      // To do ...
      // Actualización de base de datos
      // await updateContributorStreak(contributor.id, didCommitYesterday);

      console.log(
        `${contributor.username}: ${didCommitYesterday ? "🔥 commit" : "❌ no commit"
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