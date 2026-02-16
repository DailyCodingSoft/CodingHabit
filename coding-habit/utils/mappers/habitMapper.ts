import { Habit } from "@/types";

export function mapFormDataToHabit(formData: FormData, username: string): Habit {
    const debtValue = formData.get('debtValue');
    const participantsJson = formData.get('participants');
    
    const cleanDebtValue = typeof debtValue === 'string' 
        ? debtValue.replaceAll('$', '').replaceAll('.', '')
        : '0';
    const parsedDebtValue = Number(cleanDebtValue) || 0;

    const participants = participantsJson 
        ? JSON.parse(participantsJson as string) 
        : [];

    return {
        title: formData.get('title') as string,
        isCumulative: formData.get('isCumulative') as string === 'yes',
        debtValue: parsedDebtValue,
        initialDate: formData.get('initialDate') as string,
        endDate: formData.get('endDate') != null ? formData.get('endDate') as string : undefined,
        creator: username,
        participants: participants.map((username: string) => ({ username })),
    };
}