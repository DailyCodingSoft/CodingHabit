import {signToken} from "@/infrastructure/auth/jwt";
import { comparePassword, hashPassword } from "@/infrastructure/auth/password";
import { userService } from "./userServices";
import crypto from "crypto";
import { sendEmail } from "@/infrastructure/mail/resend";

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

    async sendRecoveryEmail(email: string) {
        const service = new userService();
        const user:any = await service.login(email);
        if (!user) return ("Usuario no encontrado");
        const token = crypto.randomBytes(32).toString("hex");
        const tokenBash = await hashPassword(token);
        const createToken = await service.createRecoveryToken(user.user_id, tokenBash);
        if (!createToken) return ("Error al crear token de recuperación");
        const url = `${process.env.BASE_URL}/ResetPassword/${tokenBash}`;
        try {
            await sendEmail({
                to: email,
                subject: "Recuperación de contraseña",
                html: `
                    <p>Hola,</p>
                    <p>Has solicitado recuperar tu contraseña. Haz clic en el siguiente enlace:</p>
                    <a href="${url}">Recuperar contraseña</a>
                    <p>Este enlace expirará en 15 minutos.</p>
                `
            });
        } catch (error) {
            console.error("Error al enviar correo de recuperación:", error);
            return "Error al enviar correo de recuperación";
        }
        return "Correo de recuperación enviado";
    }

    async validateTokenRecovery(token: string) {
        const service = new userService();
        const result = await service.validateTokenRecovery(token);
        return result;
    }
}