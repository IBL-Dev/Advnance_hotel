// auth.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  UnauthorizedException,
  Logger 
} from '@nestjs/common';
import { AuthService } from './auth.service';

export class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Validate user credentials
    const user = await this.authService.validateUser(
      loginDto.email, 
      loginDto.password
    );

    // If user is null, credentials are invalid
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // If validation successful, generate and return token
    return this.authService.login(user);
  }
}