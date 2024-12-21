import { AppDataSource } from "./dataSource";
import { User } from "./entities/user";
import { UserRegistration } from "../../domain/registerUser";

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
  async createUser(userRegistrationData: UserRegistration): Promise<User> {
    const user = this.userRepository.create(userRegistrationData);
    return await this.userRepository.save(user);
  }
}
