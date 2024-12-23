import { UserRepository } from "../../infrastructure/repository/userRepository";
import { User, UserRole } from "../../infrastructure/repository/entities/user";
import _ from "lodash";
import logger from "../../utils/logger";
import bcrypt from "bcryptjs";

export class AdminUpdateUserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async execute(
    userId: number,
    userData: Partial<User>,
    updateUser: User
  ): Promise<User> {
    // Validate the user exists
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      logger.warn(`User Update: User with id ${userId} not found`);
      throw new Error("User not found");
    }

    if (updateUser.role === UserRole.STAFF && user.role !== UserRole.USER) {
      throw new Error(
        "Staff role is not allowed to update Admin or Staff members"
      );
    }
    if (updateUser.role === UserRole.ADMIN && user.role === UserRole.ADMIN) {
      throw new Error("Admin role is not allowed to update another admin");
    }

    if (userData.role) {
      const usersByEmail = await this.userRepository.findUsersByEmail(
        user.email
      );
      if (usersByEmail.length > 1) {
        if (usersByEmail.some((user) => user.role === userData.role)) {
          throw new Error(`User already exists as ${UserRole[userData.role]}`);
        }
      }
    }

    // const existingUser = await this.userRepository.userExisit(
    //   user.email,
    //   user.role
    // );
    // if (existingUser) {
    //   throw new Error(`User already exists as ${UserRole[existingUser.role]}`);
    // }
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }
    userData.updatedBy = updateUser;
    // Update only the fields provided in the input
    _.merge(user, userData);
    // Save the changes
    return await this.userRepository.updateUser(user);
  }
}
