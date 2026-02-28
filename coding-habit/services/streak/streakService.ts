import { ObjectId } from "mongodb";

export interface DebtConfig {
    baseAmount: number;
    type: "cumulative" | "fixed";
}

export interface Participant {
    userId: string;
    githubUsername: string;
    joinedAt: Date;
    verifiedAt: Date;
    currentStreak: number;
    longestStreak: number;
    totalDebt: number;
    consecutiveFailures: number;
    lastCommitAt: string | null;
    lastCommitSha: string | null;
    lastCommitMessage: string | null;
}

export interface Challenge {
    _id: ObjectId;
    name: string;
    repoOwner: string;
    repoName: string;
    startDate: Date;
    endDate: Date;
    debtConfig: DebtConfig;
    participants: Participant[];
    status: "active" | "finished" | "paused";
    createdAt: Date;
    updatedAt: Date;
}

export interface StreakCheckResult {
    username: string;
    didCommit: boolean;
}

export class StreakService {

    /**
     * Calcula la deuda generada por no commitear.
     * - fixed: siempre cobra el baseAmount
     * - cumulative: cobra baseAmount * consecutiveFailures (se acumula por días seguidos sin commit)
     */
    calculateDebt(debtConfig: DebtConfig, consecutiveFailures: number): number {
        if (debtConfig.type === "fixed") {
            return debtConfig.baseAmount;
        }

        // cumulative: el primer fallo cobra baseAmount, el segundo 2x, etc.
        return debtConfig.baseAmount * (consecutiveFailures + 1);
    }

    /**
     * Aplica los resultados del streak check a los participantes de un challenge.
     * Devuelve el challenge con los participantes actualizados.
     */
    applyStreakResults(
        challenge: Challenge,
        results: StreakCheckResult[],
        commitDetails: Map<string, { lastCommitAt: string; lastCommitSha: string; lastCommitMessage: string }>
    ): Challenge {
        const resultMap = new Map(results.map((r) => [r.username.toLowerCase(), r.didCommit]));

        const updatedParticipants = challenge.participants.map((participant) => {
            const didCommit = resultMap.get(participant.githubUsername.toLowerCase()) ?? false;

            if (didCommit) {
                const detail = commitDetails.get(participant.githubUsername.toLowerCase());
                const newStreak = participant.currentStreak + 1;

                return {
                    ...participant,
                    currentStreak: newStreak,
                    longestStreak: Math.max(participant.longestStreak, newStreak),
                    consecutiveFailures: 0,
                    lastCommitAt: detail?.lastCommitAt ?? participant.lastCommitAt,
                    lastCommitSha: detail?.lastCommitSha ?? participant.lastCommitSha,
                    lastCommitMessage: detail?.lastCommitMessage ?? participant.lastCommitMessage,
                };
            } else {
                const newConsecutiveFailures = participant.consecutiveFailures + 1;
                const debt = this.calculateDebt(challenge.debtConfig, participant.consecutiveFailures);

                return {
                    ...participant,
                    currentStreak: 0,
                    consecutiveFailures: newConsecutiveFailures,
                    totalDebt: participant.totalDebt + debt,
                };
            }
        });

        return {
            ...challenge,
            participants: updatedParticipants,
            updatedAt: new Date() as any,
        };
    }
}