import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Body,
  UsePipes,
  Logger,
} from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../common/validation.pipe';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    this.logger.log('Fetching all users');
    return this.userService.get();
  }

  @Post()
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('user').optional(),
      }),
    ),
  )
  async store(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    return this.userService.create(createUserDto);
  }

  @Patch('/:userId')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
      }),
    ),
  )
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.logger.log(`Updating user: ${userId}`);
    return this.userService.update(updateUserDto, userId);
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    this.logger.debug(`Fetching user by ID: ${userId}`);
    return this.userService.show(userId);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    this.logger.warn(`Deleting user: ${userId}`);
    return this.userService.delete(userId);
  }
}
