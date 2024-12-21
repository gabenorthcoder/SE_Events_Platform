import { UserRepository } from "../../infrastructure/repository/userRepository";
import { User } from "../../infrastructure/repository/entities/user";
import bcrypt from "bcryptjs";
import { UserRegistration } from "../../domain/registerUser";

export class RegisterUser {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(userData: UserRegistration): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(
      userData.email
    );
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User();
    newUser.email = userData.email;
    newUser.password = hashedPassword;
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.role = userData.role;

    // Create and save new user
    const createdUser = await this.userRepository.createUser(newUser);

    // Return the new user
    return createdUser;
  }
}
