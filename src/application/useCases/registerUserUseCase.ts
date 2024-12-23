import { UserRepository } from "../../infrastructure/repository/userRepository";
import { User } from "../../infrastructure/repository/entities/user";
import bcrypt from "bcryptjs";
import { UserRegistrationInput } from "../../domain/registerUser";

export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(userData: UserRegistrationInput): Promise<Partial<User>> {
    const existingUser = await this.userRepository.userExisit(
      userData.email,
      userData.role
    );
    if (existingUser) {
      throw new Error("User already exists");
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
