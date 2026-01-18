import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

export async function POST(req: Request) {
    const {key, value} = await req.json();
    if (typeof key !== "string" || typeof value !== "string") {
        return NextResponse.json(
        { error: "key and value must be strings" },
        { status: 400 }
        );
    }
    await redis.set(key, value);
    return NextResponse.json({ok: true});
}

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const key = searchParams.get("key");

    if(!key) {
        return NextResponse.json(
            { error: "key is required"},
            {status: 400}
        );
    }

    const value = await redis.get(key)
    return NextResponse.json({key, value});
}