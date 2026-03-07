import { Octokit } from "octokit";

const octokit = new Octokit();

/**
 * Fetches all contributors for a given repository.
 *
 * @param owner - The organization or repo owner (e.g. "facebook")
 * @param repo  - The repository name (e.g. "react")
 * @returns Array of contributor objects with login, contributions, avatar_url, etc.
 *
 * @see https://docs.github.com/en/rest/repos/repos#list-repository-contributors
 */
export async function getContributors(owner: string, repo: string) {
  try {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner,
        repo,
        per_page: 100, // increase default limit
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching contributors for ${owner}/${repo}`, error);
    throw error;
  }
}