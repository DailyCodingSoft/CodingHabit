import { getDb } from "@/infrastructure/db/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Mongo falló", details: error }, { status: 500 });
  }
}