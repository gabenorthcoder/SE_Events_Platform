import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Payload } from "../authService";
import { User } from "../repository/entities/user";
import { UserRepository } from "../repository/userRepository";

dotenv.config();

const JWT_SECRET = String(process.env.JWT_SECRET);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export class AuthMiddlewareService {
  async verifyToken(token: string): Promise<{ valid: boolean; user?: User }> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Payload;
      if (!decoded) {
        return { valid: false };
      }
      const userRepository = new UserRepository();

      const user = await userRepository.findUserById(decoded.id);
      return { valid: true, user };
    } catch (err) {
      return { valid: false };
    }
  }
}
