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
}