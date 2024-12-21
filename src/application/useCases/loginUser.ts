import { UserLogin } from "../../domain/loginUser";
import { AuthService } from "../../infrastructure/authService";

export class LoginUser {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  async execute(userData: UserLogin): Promise<string> {
    const token = await this.authService.login(
      userData.email,
      userData.password
    );
    return token;
  }
}
