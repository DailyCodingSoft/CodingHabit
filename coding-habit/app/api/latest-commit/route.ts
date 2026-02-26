import { NextResponse } from "next/server";
import { GitHubCommitService } from "@/services/GitHub/commitService";
import type { Contributor } from "@/services/GitHub/commitService";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { owner, repo, contributors } = body as {
            owner: string;
            repo: string;
            contributors: Contributor[];
        };

        if (!owner || !repo || !Array.isArray(contributors)) {
            return NextResponse.json(
                { error: "owner, repo y contributors son requeridos." },
                { status: 400 }
            );
        }

        const service = new GitHubCommitService(process.env.GITHUB_TOKEN);
        const results = await service.getLatestCommit(owner, repo, contributors);

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        console.error("[latest-commit]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}