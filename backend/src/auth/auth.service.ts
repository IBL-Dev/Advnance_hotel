import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      this.logger.log(`Validated user: ${email}`);
      return user;
    }  
    this.logger.warn(`Invalid login attempt for email: ${email}`);
    // need to pass validation mg 
    return null;
  }
async login(user: any) {
  const payload = { email: user.email, sub: user.id, role: user.role };
  const token = this.jwtService.sign(payload);

  this.logger.log(`User logged in: ${user.email}`);

  return {
    access_token: token,
  };
}

}
