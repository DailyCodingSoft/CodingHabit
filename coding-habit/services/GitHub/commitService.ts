import { Octokit } from "octokit";

const octokit = new Octokit();

/**
 * Returns the commits made by a specific user on a given repo from yesterday.
 * Useful to check if the user broke their coding streak.
 *
 * @param owner - The organization or repo owner (e.g. "facebook")
 * @param repo  - The repository name (e.g. "react")
 * @param username - The GitHub username whose commits to fetch
 */
export async function getCommitsFromYesterday(
  owner: string,
  repo: string,
  username: string
) {
  const now = new Date();

  // Yesterday at 00:00:00 UTC
  const sinceDate = new Date(now);
  sinceDate.setUTCDate(sinceDate.getUTCDate() - 1);
  sinceDate.setUTCHours(0, 0, 0, 0);

  // Today at 00:00:00 UTC (exclusive upper bound)
  const untilDate = new Date(now);
  untilDate.setUTCHours(0, 0, 0, 0);

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/commits",
    {
      owner,
      repo,
      author: username,
      since: sinceDate.toISOString(),
      until: untilDate.toISOString(),
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return response.data;
}