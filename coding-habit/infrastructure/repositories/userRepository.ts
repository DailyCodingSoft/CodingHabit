import 'server-only'
import { neonDB } from "../db/neondb";

export class userRepository {
    async login(email:string) {
        try {
            const user = await neonDB`select * from users u where u.user_email = ${email}`;
            return user[0] ?? null
        } catch (e) {
            console.log(e)
        }
    }
    async register(user_name: string, user_biography:string,github_link:string,user_email: string, user_password: string) {
        try {
            const user  = await neonDB`
            insert into users 
            (user_name, user_biography, github_link ,user_email, user_password, created_at) 
            values (${user_name}, ${user_biography}, ${github_link},${user_email}, ${user_password}, NOW()); `
            return user ?? null
        } catch(e) {
            console.log(e)
            return null
        }
    }
    async getUserById(id:string) {
        try {
            const user = await neonDB`select * from users where user_id = ${1}`;
            return user ?? null
        } catch (e) {
            console.log(e)
            return null
        }
    }
    async createRecoveryToken(user_id: string, token: string) {
        try {
            const dateExpires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos
        const result = await neonDB`INSERT INTO password_resets
            (user_id, token_hash, expires_at, used, created_at)
            VALUES (
                ${user_id},
                ${token},
                NOW() + INTERVAL '15 minutes',
                false,
                NOW()
            );`
        return result ?? null
        }catch(e) {
            console.log(e)
            return null
        }
    }
}