import { NextResponse } from "next/server";
import { userService } from "@/domain/services/userServices";

export async function POST(req: Request) {
    try {
        const service = new userService();
        const body = await req.json();
        console.log(body);
        switch (body.action){
            case 'Login': {
                const { email, password } = body;
                const user = await service.login(email,password);
                return NextResponse.json(user,{status: 200})
            }
            case 'Register': {
                const {user_name, user_biography, github_link, user_email, user_password} =body;
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