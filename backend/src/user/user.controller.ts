import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Body,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('/getall')
  getUsers() {
    this.logger.log('Fetching all users');
    return this.userService.get();
  }

  @Post('/register')
  async store(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    return this.userService.create(createUserDto);
  }

  @Patch('update/:userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.logger.log(`Updating user: ${userId}`);
    return this.userService.update(updateUserDto, userId);
  }

  @Get('/getuser/:userId')
  async getUser(@Param('userId') userId: string) {
    this.logger.debug(`Fetching user by ID: ${userId}`);
    return this.userService.show(userId);
  }

  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string) {
    this.logger.warn(`Deleting user: ${userId}`);
    return this.userService.delete(userId);
  }
}
