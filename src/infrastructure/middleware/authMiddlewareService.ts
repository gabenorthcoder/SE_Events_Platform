import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Payload } from "../authService";

dotenv.config();

const JWT_SECRET = String(process.env.JWT_SECRET);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export class AuthMiddlewareService {
  static verifyToken(token: string): { valid: boolean; decoded?: Payload } {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Payload;
      return { valid: true, decoded };
    } catch (err) {
      return { valid: false };
    }
  }
}
