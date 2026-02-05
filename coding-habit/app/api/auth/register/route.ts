import { NextResponse } from "next/server";
import { AuthService } from "@/domain/services/authService";

export async function POST(req: Request){
    try{
        const {email, password, username} = await req.json();
        console.log(email, password, username)
        const authService = new AuthService();
        const result = await authService.register(email, password, username);
        return NextResponse.json(result)
    }catch (e) {
        return NextResponse.json(
      { message: "Datos inválidas" },
      { status: 401 }
    );
    }
}