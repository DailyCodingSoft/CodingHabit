import { Habit } from "@/types";

export function mapFormDataToHabit(formData: FormData, username: string): Habit {
    const debtValue = formData.get('debtValue');

    return {
        title: formData.get('title') as string,
        isCumulative:  formData.get('isCumulative') as string == 'yes'? true : false,
        debtValue: typeof(debtValue) == 'string'? Number(debtValue) : 0,
        initialDate: formData.get('initialDate') as string,
        endDate: formData.get('endDate') != null? formData.get('endDate') as string : undefined,
        creator: username,
    };
}