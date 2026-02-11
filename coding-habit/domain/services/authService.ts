import {signToken} from "@/infrastructure/auth/jwt";
import { comparePassword, hashPassword } from "@/infrastructure/auth/password";
import { userService } from "./userServices";

export class AuthService {
    async login(email: string, password: string) {
        const service = new userService();
        const user:any = await service.login(email);
         console.log(password,user.user_password)
        if (!user) throw new Error("Credenciales inválidas");
        const valid = await comparePassword(password, user.user_password);
        if (!valid) throw new Error("Credenciales inválidas");

        const token = signToken({ userId: user.id });
        return {
        token,
        user: {
            id: user.user_id,
            email: user.user_email,
            name: user.user_name
        }
        };
    }

    async register(email:string, password:string, username:string){
        const service = new userService();
        const  user:any = await service.login(email);
        //Se debe de retornar un codigo de estado para saber que retornar al otro lado :G
        if(user) return {
            message: "Usuario ya registrado" ,
            status: 401 
        };
        const newPassword = await hashPassword(password);
        const  result = await service.register(username,"","",email,newPassword);
        console.log(result)
        return result;
    }
}