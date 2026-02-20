import { NextResponse } from "next/server";
import { sendEmail } from "@/infrastructure/mail/resend";
import { AuthService } from "@/domain/services/authService";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const service = new AuthService();
    const result = await service.sendRecoveryEmail(email);
    return NextResponse.json({ error: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al recuperar la contraseña" }, { status: 500 });
  }
}
