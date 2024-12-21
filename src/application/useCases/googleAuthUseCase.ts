import { AuthService } from "../../infrastructure/authService";
import { UserRepository } from "../../infrastructure/repository/userRepository";
import { UserLoginSuccess } from "../../infrastructure/authService";

interface GoogleProfile {
  email: string;
  firstName: string;
  lastName: string;
}

export class GoogleAuthUseCase {
  private userRepository: UserRepository;
  private authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async authenticateUser(profile: GoogleProfile): Promise<UserLoginSuccess> {
    const { email, firstName, lastName } = profile;

    // Check if the user already exists
    let user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      // Create a new user if not found
      user = await this.userRepository.createUser({
        email,
        firstName,
        lastName,
        password: "", // No password for OAuth users
        role: 1, // Default role
      });
    }

    // Generate a JWT token for the user
    return await this.authService.generateTokenForUser(user);
  }
}
