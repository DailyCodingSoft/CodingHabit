import { Habit } from "@/types";

export function mapFormDataToHabit(formData: FormData, username: string): Habit {
    const debtValue = formData.get('debtValue');
    const participantsJson = formData.get('participants');
    const repoOwner = formData.get('repoOwner');
    const repoName = formData.get('repoName');
    
    const cleanDebtValue = typeof debtValue === 'string' 
        ? debtValue.replaceAll('$', '').replaceAll('.', '')
        : '0';
    const parsedDebtValue = Number(cleanDebtValue) || 0;

    const additionalParticipants = participantsJson 
        ? JSON.parse(participantsJson as string) 
        : [];

    const allParticipants = [username, ...additionalParticipants];

    return {
        title: formData.get('title') as string,
        isCumulative: formData.get('isCumulative') as string === 'yes',
        debtValue: parsedDebtValue,
        initialDate: formData.get('initialDate') as string,
        endDate: formData.get('endDate') != null ? formData.get('endDate') as string : undefined,
        creator: username,
        participants: allParticipants.map((username: string) => ({ username })),
        repoName: repoOwner && repoName ? `${repoOwner}/${repoName}` : undefined,
    };
}