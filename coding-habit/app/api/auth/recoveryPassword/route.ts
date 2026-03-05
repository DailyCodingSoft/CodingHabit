import { NextResponse } from "next/server";
import { AuthService } from "@/domain/services/authService";

export async function POST(req: Request) {
  try {
    const { password, token, id } = await req.json();
    const service = new AuthService();

    if (!token || !id) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Validar token
    const isValidToken = await service.validateTokenRecovery(token, id);
    if (!isValidToken) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
    }

    // Si no hay password, solo estamos validando el token
    if (!password) {
      return NextResponse.json({ message: "Token válido" }, { status: 200 });
    }

    // Validar requisitos de contraseña
    if (password.length < 8) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
    }

    // Actualizar la contraseña
    const result = await service.resetPassword(id, password);
    
    if (!result) {
      return NextResponse.json({ error: "Error al actualizar la contraseña" }, { status: 500 });
    }

    // Invalidar el token después de usarlo
    await service.invalidateRecoveryToken(token, id);

    return NextResponse.json({ message: "Contraseña actualizada exitosamente" }, { status: 200 });

  } catch (error) {
    console.error("Error en recovery password:", error);
    return NextResponse.json({ error: "Error al recuperar la contraseña" }, { status: 500 });
  }
}