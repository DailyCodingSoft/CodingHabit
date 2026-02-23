import { NextResponse } from "next/server";
import { AuthService } from "@/domain/services/authService";

export async function POST(req: Request) {
  try {
    const { password, token } = await req.json();
    const service = new AuthService();
    console.log(token)
    if (!password && !token) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 200 });
    }
    if (!password){
        const result = await service.validateTokenRecovery(token);
        if (!result) {
            return NextResponse.json({ error: "Token inválido o expirado" }, { status: 200 });
        } 
        return NextResponse.json({ message: "Token válido" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error al recuperar la contraseña" }, { status: 500 });
  }
}