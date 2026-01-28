import jwt from "jsonwebtoken";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET no está definido");
  }
  return secret;
}

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "30m" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as { userId: string };
}