import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepository } from "./repository/userRepository";
import logger from "../utils/logger";
import dotenv from "dotenv";
import { User, UserRole } from "./repository/entities/user";
import { randomHash } from "../utils/randomHash";

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

  async login(
    loginEmail: string,
    loginPassword: string,
    loginRole: UserRole
  ): Promise<Partial<UserLoginSuccess>> {
    // Find the user by email
    const user = await this.userRepository.userExisit(loginEmail, loginRole);

    if (!user) {
      logger.error(`User email:${loginEmail} not found`);
      throw new Error("Invalid email or password.");
    }
    // Compare the provided password with the stored hashed password

    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

    if (!isPasswordValid) {
      logger.error(`Invalid password for user ${loginEmail}`);
      throw new Error("Invalid email or password.");
    }

    // Generate JWT token
    const payload = this.buildPayload(user);

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }

  async generateTokenForUser(user: User): Promise<Partial<UserLoginSuccess>> {
    const payload = this.buildPayload(user);

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const { password, ...userWithoutPassword } = user;
    const userWithToken = {
      ...userWithoutPassword,
      token,
    };
    return userWithToken;
  }

  async generateAdminTokenForUser(
    user: User
  ): Promise<Partial<UserLoginSuccess>> {
    if (user.role !== UserRole.ADMIN) {
      throw new Error("User is not an admin.");
    }

    return this.generateTokenForUser(user);
  }

  private buildPayload(user: User): Payload {
    return {
      id: user.id,
      uuid: user.uuid,
      role: user.role,
      hash: randomHash,
    };
  }
}
