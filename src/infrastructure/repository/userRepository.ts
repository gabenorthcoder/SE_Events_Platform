import { AppDataSource } from "./dataSource";
import { User, UserRole } from "./entities/user";
import logger from "../../utils/logger";

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async findAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.find({
      order: {
        id: "ASC",
      },
    });
    return allUsers;
  }

  async findAllUsersByRole(role: UserRole): Promise<User[]> {
    if (!Object.values(UserRole).includes(role)) {
      logger.error(`Invalid role: ${role}`);
      throw new Error("Invalid role");
    }
    const allUsersByRole = await this.userRepository.find({ where: { role } });

    return allUsersByRole;
  }

  async findUsersByEmail(email: string): Promise<User[]> {
    const userByEmail = await this.userRepository.find({ where: { email } });
    return userByEmail;
  }

  async userExisit(email: string, role: UserRole): Promise<User | null> {
    const userExisit = await this.userRepository.findOne({
      where: { email, role },
    });
    return userExisit;
  }
  async findUserById(id: number): Promise<User> {
    const userById = await this.userRepository.findOne({ where: { id } });
    if (!userById) {
      logger.error(`User id:${id} not found`);
      throw new Error("User not found");
    }
    return userById;
  }
  async createUser(
    userRegistrationData: Partial<User>
  ): Promise<Partial<User>> {
    const user = this.userRepository.create(userRegistrationData);
    const savedUser = await this.userRepository.save(user);

    // Remove the password field from the saved user object
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
