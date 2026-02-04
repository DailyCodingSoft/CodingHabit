import { NextResponse } from "next/server";
import { AuthService } from "@/domain/services/authService";

export async function POST(req: Request){
    try{
        const {email, password, username} = await req.json();
        const authService = new AuthService();
        return await authService.register(email, password, username);
    }catch (e) {
        return NextResponse.json(
      { message: "Datos inválidas" },
      { status: 401 }
    );
    }
}