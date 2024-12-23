import { UserRepository } from "../../infrastructure/repository/userRepository";
import logger from "../../utils/logger";

export class SuperAdminDeleteUsersUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async execute(userId: number): Promise<void> {
    // Validate the user exists
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      logger.warn(`User Deletion: User with id ${userId} not found`);
      throw new Error("User not found");
    }

    // Soft delete the user
    await this.userRepository.deleteUser(userId);
  }
}
