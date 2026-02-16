import { NextResponse } from "next/server";
import { sendEmail } from "@/infrastructure/mail/resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    await sendEmail({
      to: email,
      subject: "Bienvenido 🚀",
      html: "<h1>Tu cuenta fue creada correctamente</h1>",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error enviando correo" }, { status: 500 });
  }
}
