import { NextResponse } from "next/server";
import { checkContributorsCommitsFromYesterday } from "@/services/GitHub/commitService";

export async function POST(request: Request) {
    try {
        const { owner, repo, contributors } = await request.json();

        if (!owner || !repo || !contributors || !Array.isArray(contributors)) {
            return NextResponse.json(
                { error: "Invalid request body. 'owner', 'repo', and 'contributors' array are required." },
                { status: 400 }
            );
        }

        await checkContributorsCommitsFromYesterday(owner, repo, contributors);

        return NextResponse.json({ message: "Check process initiated successfully" });
    } catch (error) {
        console.error("Error in check-commits endpoint:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
