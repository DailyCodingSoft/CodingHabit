import 'server-only'
import { userRepository } from '@/infrastructure/repositories/userRepository'
export class userService {
    private  repo = new  userRepository()

    async login(email:string, password:string){
        const user = await this.repo.login(email,password)
        return user
    }
}