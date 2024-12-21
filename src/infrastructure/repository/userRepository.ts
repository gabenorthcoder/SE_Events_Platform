import { AppDataSource } from "./dataSource";
import { User } from "./entities/user";

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async findUserByEmail(email: string): Promise<User | null> {
    const userByEmail = await this.userRepository.findOne({ where: { email } });
    return userByEmail;
  }
  async findUserById(id: number): Promise<User> {
    const userById = await this.userRepository.findOne({ where: { id } });
    if (!userById) {
      throw new Error("User not found");
    }
    return userById;
  }
  async createUser(userRegistrationData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userRegistrationData);
    return await this.userRepository.save(user);
  }
}
