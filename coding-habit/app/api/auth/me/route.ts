import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/infrastructure/auth/jwt";
import { getUserCache, setUserCache } from "@/infrastructure/cache/userCache";
import { userService } from "@/domain/services/userServices";

export async function GET() {
  try {
    const service = new userService();
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return NextResponse.json(null, { status: 401 });

    const { userId } = verifyToken(token);

    let user = getUserCache(userId);

    if (!user) {
      const dbUser:any = await service.getById(userId);
      if (!dbUser) return NextResponse.json(null, { status: 401 });

      user = {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        cachedAt: Date.now()
      };

      setUserCache(userId, user);
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(null, { status: 401 });
  }
}