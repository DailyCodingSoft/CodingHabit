import { NextResponse } from "next/server";
import { AuthService } from "@/domain/services/authService";
import { isValidEmail } from "@/utils/validation";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    
    const service = new AuthService();
    const result = await service.sendRecoveryEmail(email);
    return NextResponse.json({ error: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al recuperar la contraseña" }, { status: 500 });
  }
}
