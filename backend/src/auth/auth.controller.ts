import { Body, Controller, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    this.logger.log(`Login request received for: ${req.user.email}`);
    return this.authService.login(req.user);
  }
}
