import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is not defined in environment variables");
  return secret;
}
export function generateToken(userId: number): string {
  return jwt.sign({ id: userId }, getSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): JwtPayload | string {
  return jwt.verify(token, getSecret());
}
