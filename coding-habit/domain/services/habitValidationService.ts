import { getContributors } from "@/services/GitHub/contributorsService";

export type ValidationResult = {
    validatedUsers: string[];
    pendingUsers: string[];
    allValidated: boolean;
};

export async function validateHabitParticipants(
    owner: string,
    repo: string,
    participants: string[]
): Promise<ValidationResult> {
    const contributors = await getContributors(owner, repo);
    const contributorLogins = contributors.map((c: any) => c.login.toLowerCase());

    const validatedUsers: string[] = [];
    const pendingUsers: string[] = [];

    for (const participant of participants) {
        if (contributorLogins.includes(participant.toLowerCase())) {
            validatedUsers.push(participant);
        } else {
            pendingUsers.push(participant);
        }
    }

    return {
        validatedUsers,
        pendingUsers,
        allValidated: pendingUsers.length === 0,
    };
}
