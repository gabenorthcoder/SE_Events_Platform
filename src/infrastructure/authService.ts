import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepository } from "./repository/userRepository";
import logger from "../utils/logger";
import dotenv from "dotenv";
import crypto from "crypto";
import { User } from "./repository/entities/user";

export class UserLoginSuccess extends User {
  token: string;
}

dotenv.config();

export interface Payload {
  id: number;
  uuid: string;
  role: number;
  hash: string;
}

const JWT_SECRET = String(process.env.JWT_SECRET);

export class AuthService {
  private userRepository = new UserRepository();

  async login(email: string, password: string): Promise<UserLoginSuccess> {
    // Find the user by email
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      logger.error(`User email:${email} not found`);
      throw new Error("Invalid email or password.");
    }
    // Compare the provided password with the stored hashed password

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.error(`Invalid password for user ${email}`);
      throw new Error("Invalid email or password.");
    }
    const randomHash = crypto.randomBytes(512).toString("hex");
    // Generate JWT token
    const payload = {
      id: user.id,
      uuid: user.uuid,
      role: user.role,
      hash: randomHash,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return {
      ...user,
      token,
    };
  }

  async generateTokenForUser(user: User): Promise<UserLoginSuccess> {
    const randomHash = crypto.randomBytes(512).toString("hex");
    const payload: Payload = {
      id: user.id,
      uuid: user.uuid,
      role: user.role,
      hash: randomHash,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return {
      ...user,
      token,
    };
  }
}
