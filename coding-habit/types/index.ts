
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
    onUpdateClick?: () => void,
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

//El habito es el contexto de todo
//de aqui sale la info para cuanto aumenta la deuda
//si la deuda es acumulable o no
//cuando inicio el reto y cuanto termina
//tambien tiene la lista de usuarios pero puede ser opcional.
export type Habit = {
    debtValue: number;
    isCumulative: boolean;
    creator: User;
    initialDate: string;
    title: string;
    endDate?: string;
}