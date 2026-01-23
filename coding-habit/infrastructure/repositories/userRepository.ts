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
}