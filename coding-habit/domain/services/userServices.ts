import 'server-only'
import { userRepository } from '@/infrastructure/repositories/userRepository'
export class userService {
    private  repo = new  userRepository()

    //agregue la contraseña para que no muera el deploy
    //pero queda pendiente revisar la logica.
    async login(email:string, password?:string){
        const user = await this.repo.login(email)
        return user
    }
    async register(user_name: string, user_biography:string,github_link:string,user_email: string, user_password: string){
        return await this.repo.register(user_name,user_biography,github_link,user_email,user_password)
    }
    async getById(id:string) {
        const user = await this.repo.getUserById(id);
        return user;
    }
    async createRecoveryToken(user_id: string, token: string) {
        const result = await this.repo.createRecoveryToken(user_id, token);
        return result;
    }

    async validateTokenRecovery(token: string) {
        const result = await this.repo.validateTokenRecovery(token);
        return result;
    }
}