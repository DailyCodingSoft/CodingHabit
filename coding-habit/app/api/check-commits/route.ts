import { NextResponse } from "next/server";
import { GitHubCommitService } from "@/services/GitHub/GitHubCommitService";
import type { Contributor } from "@/services/GitHub/GitHubCommitService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { owner, repo, contributors } = body as {
      owner: string;
      repo: string;
      contributors: Contributor[];
    };

    // Validación básica
    if (
      !owner ||
      !repo ||
      !contributors ||
      !Array.isArray(contributors)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request body. 'owner', 'repo', and 'contributors' array are required.",
        },
        { status: 400 }
      );
    }

    const gitHubService = new GitHubCommitService(
      process.env.GITHUB_TOKEN
    );

    const results = await gitHubService.checkContributorsCommits(
      owner,
      repo,
      contributors,
      "yesterday"
    );

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error in check-commits endpoint:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
