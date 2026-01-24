import 'server-only'
import { neonDB } from "../db/neondb";

export class userRepository {
    async login(email:string, password:string) {
        try {
            const user = await neonDB`select * from users u where u.user_email = ${email} and u.user_password = ${password}`;
            return user ?? null
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
        } catch(e) {
            console.log(e)
        }
    }
}