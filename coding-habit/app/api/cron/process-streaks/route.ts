import { NextResponse } from "next/server";
import { GitHubCommitService } from "@/services/GitHub/commitService";
import { StreakService } from "@/services/streak/streakService";
import type { Challenge } from "@/services/streak/streakService";
import clientPromise from "@/lib/mongodb"; // tu cliente de MongoDB

export const maxDuration = 60; // segundos máximos en Vercel

export async function GET(request: Request) {
    // Vercel envía este header para autenticar el cron — protege el endpoint
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db();
        const challengesCollection = db.collection<Challenge>("challenges");
        const githubService = new GitHubCommitService(process.env.GITHUB_TOKEN);
        const streakService = new StreakService();

        // 1. Traer todos los challenges activos
        const activeChallenges = await challengesCollection
            .find({ status: "active" })
            .toArray();

        console.log(`[cron] Procesando ${activeChallenges.length} challenges activos`);

        const summary: { challengeId: string; processed: number; errors: number }[] = [];

        for (const challenge of activeChallenges) {
            try {
                const contributors = challenge.participants.map((p) => ({
                    username: p.githubUsername,
                }));

                // 2. Verificar commits de cada participante
                const [streakResults, detailResults] = await Promise.all([
                    githubService.checkStreak(challenge.repoOwner, challenge.repoName, contributors),
                    githubService.getStreakDetails(challenge.repoOwner, challenge.repoName, contributors),
                ]);

                // 3. Construir mapa de detalles del último commit
                const commitDetails = new Map(
                    detailResults
                        .filter((r) => r.didCommitYesterday)
                        .map((r) => [
                            r.username.toLowerCase(),
                            {
                                lastCommitAt: r.lastCommitDate ?? "",
                                lastCommitSha: r.lastCommitMessage ?? "", // ajusta si tienes sha en StreakResult
                                lastCommitMessage: r.lastCommitMessage ?? "",
                            },
                        ])
                );

                // 4. Aplicar resultados al challenge
                const updatedChallenge = streakService.applyStreakResults(
                    challenge,
                    streakResults,
                    commitDetails
                );

                // 5. Guardar en MongoDB
                await challengesCollection.updateOne(
                    { _id: challenge._id },
                    {
                        $set: {
                            participants: updatedChallenge.participants,
                            updatedAt: new Date(),
                        },
                    }
                );

                summary.push({
                    challengeId: challenge._id.toString(),
                    processed: contributors.length,
                    errors: 0,
                });

                console.log(`[cron] ✅ Challenge ${challenge._id} procesado`);
            } catch (err) {
                console.error(`[cron] ❌ Error en challenge ${challenge._id}:`, err);
                summary.push({
                    challengeId: challenge._id.toString(),
                    processed: 0,
                    errors: 1,
                });
            }
        }

        return NextResponse.json({ success: true, summary });
    } catch (error) {
        console.error("[cron] Error general:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}