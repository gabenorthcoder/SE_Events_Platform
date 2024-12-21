import { UserLogin } from "../../domain/loginUser";
import { AuthService } from "../../infrastructure/authService";
import { UserLoginSuccess } from "../../infrastructure/authService";

export class LoginUser {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  async execute(userData: UserLogin): Promise<UserLoginSuccess> {
    const loginSuccess = await this.authService.login(
      userData.email,
      userData.password
    );
    return loginSuccess;
  }
}
