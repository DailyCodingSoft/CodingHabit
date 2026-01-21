import { NextResponse } from "next/server";
import { userService } from "@/domain/services/userServices";
import next from "next";

export async function login(email:string, password:string) {
    try {
        const service = new userService()
        const user = await service.login(email,password)
        return NextResponse.json(user)
    } catch (e) {
        return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    )
    }
}