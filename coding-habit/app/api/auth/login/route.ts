import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "@/domain/services/authService";
import { isValidEmail, isValidPassword } from "@/utils/validation";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
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
    
    const authService = new AuthService();
    const { token, user } = await authService.login(email, password);
    console.log(user);
    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30
    });

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  }
}