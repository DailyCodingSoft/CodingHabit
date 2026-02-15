import { Habit } from "@/types";

export function mapFormDataToHabit(formData: FormData, username: string): Habit {
    const debtValue = formData.get('debtValue');
    
    // Clean currency formatting ($5.000 → 5000) before parsing
    const cleanDebtValue = typeof debtValue === 'string' 
        ? debtValue.replaceAll('$', '').replaceAll('.', '')
        : '0';
    const parsedDebtValue = Number(cleanDebtValue) || 0;

    return {
        title: formData.get('title') as string,
        isCumulative: formData.get('isCumulative') as string === 'yes',
        debtValue: parsedDebtValue,
        initialDate: formData.get('initialDate') as string,
        endDate: formData.get('endDate') != null ? formData.get('endDate') as string : undefined,
        creator: username,
    };
}