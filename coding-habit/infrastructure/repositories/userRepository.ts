import 'server-only'
import { neonDB } from "../db/neondb";

export class userRepository {
    async login(email:string, password:string) {
        const user = await neonDB`SELECT version()`;
        return user ?? null
    }
}