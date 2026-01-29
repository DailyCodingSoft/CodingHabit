import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "@/domain/services/authService";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const authService = new AuthService();
    const { token, user } = await authService.login(email, password);

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