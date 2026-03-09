import { NextResponse } from "next/server";
import { AuthService } from "@/domain/services/authService";
import { isValidEmail, isValidPassword } from "@/utils/validation";

export async function POST(req: Request){
    try{
        const {email, password, username} = await req.json();
        
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { message: "Email inválido" },
                { status: 400 }
            );
        }

        if (!isValidPassword(password)) {
            return NextResponse.json(
                { message: "Contraseña inválida" },
                { status: 400 }
            );
        }

        if (!username || typeof username !== 'string' || username.trim().length === 0) {
            return NextResponse.json(
                { message: "Nombre de usuario inválido" },
                { status: 400 }
            );
        }

        console.log(email, password, username)
        const authService = new AuthService();
        const result = await authService.register(email, password, username);
        if (result == null)  return NextResponse.json(
            { message: "Eror en el sistema cominicarse con el Administradr" },
            { status: 401 }
        );
        return NextResponse.json(result)
    }catch (e) {
        return NextResponse.json(
      { message: "Datos inválidas" },
      { status: 401 }
    );
    }
}