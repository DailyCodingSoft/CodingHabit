
/**
 * Tipos globales del proyecto
 * Se irán agregando interfaces y types aquí.
 */

export type User = {
    username:string, 
    image?:string, 
    debtkey?:string, 
    streakkey?:string,
    debt?: number,
    streak?: number,
}

//props
export type StreakComponentProps = {
    user: User,
    streak?: number,
    debt?: number,
}

export type StreakGridComponentProps = {
    children: React.ReactNode;
}

export type DebtEntry = {
    debtKey: string;
    value: number;
}

export type StreakEntry = {
    streakKey: string;
    value: number;
}