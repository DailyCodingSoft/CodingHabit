
/**
 * Tipos globales del proyecto
 * Se irán agregando interfaces y types aquí.
 */
export type RedisKeyDict = {santi:string, lpz:string, cris:string}
export type User = {username:string, image:string}

//props
export type StreakComponentProps = {
    user: User,
    streak: number,
    debt: number,
}

export type StreakGridComponentProps = {
    children: React.ReactNode;
}
