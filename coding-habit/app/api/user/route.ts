import { NextResponse } from "next/server";
import { userService } from "@/domain/services/userServices";
import { isValidEmail, isValidPassword } from "@/utils/validation";

export async function POST(req: Request) {
    try {
        const service = new userService();
        const body = await req.json();
        console.log(body);
        switch (body.action){
            case 'Login': {
                const { email, password } = body;
                
                if (!isValidEmail(email)) {
                    return NextResponse.json({ message: "Email inválido" }, { status: 400 });
                }
                
                if (!isValidPassword(password)) {
                    return NextResponse.json({ message: "Contraseña inválida" }, { status: 400 });
                }
                
                const user = await service.login(email,password);
                return NextResponse.json(user,{status: 200})
            }
            case 'Register': {
                const {user_name, user_biography, github_link, user_email, user_password} =body;
                
                if (!isValidEmail(user_email)) {
                    return NextResponse.json({ message: "Email inválido" }, { status: 400 });
                }
                
                if (!isValidPassword(user_password)) {
                    return NextResponse.json({ message: "Contraseña inválida" }, { status: 400 });
                }
                
                const service = new userService();
                const login = await service.register(user_name,user_biography, github_link, user_email, user_password);
                return NextResponse.json(login,{status: 200})
            }
        }
    } catch (e) {
        return NextResponse.json(
            { message: (e as Error).message },
            { status: 400 }
        )
    }
}