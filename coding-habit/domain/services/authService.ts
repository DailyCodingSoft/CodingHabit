import {signToken} from "@/infrastructure/auth/jwt";
import { comparePassword } from "@/infrastructure/auth/password";
import { userService } from "./userServices";

export class AuthService {
    async login(email: string, password: string) {
        const service = new userService();
        const user:any = await service.login(email, password);
        if (!user) throw new Error("Credenciales inválidas");

        const valid = await comparePassword(password, user.password);
        if (!valid) throw new Error("Credenciales inválidas");

        const token = signToken({ userId: user.id });
            console.log(user)
        return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        }
        };
    }
}