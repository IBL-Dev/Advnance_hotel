import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity'; // Correct import from schema, not entity
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateUserId } from '../common/idgenarator/useridgenarator';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async get() {
    this.logger.log('Fetching all users...');
    const users = await this.userModel.find().exec();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`Creating new user with email: ${createUserDto.email}`);
    const userId = await generateUserId(this.userModel);
    const user = new this.userModel({ ...createUserDto, userId });
    const savedUser = await user.save();
    this.logger.log(`User created: userId=${userId}, email=${savedUser.email}`);
    return savedUser;
  }

  async update(updateUserDto: UpdateUserDto, userId: string) {
    this.logger.log(`Updating user with ID: ${userId}`);
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
    if (updatedUser) {
      this.logger.log(`User updated: ${userId}`);
    } else {
      this.logger.warn(`User not found for update: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return updatedUser;
  }

  async show(id: string) {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      this.logger.warn(`User not found: ${id}`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    this.logger.log(`Searching for user by email: ${email}`);
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      this.logger.warn(`User not found with email: ${email}`);
    }
    return user;
  }

  async delete(userId: string) {
    this.logger.log(`Deleting user with ID: ${userId}`);
    const result = await this.userModel.findByIdAndDelete(userId).exec();
    if (result) {
      this.logger.log(`User deleted: ${userId}`);
    } else {
      this.logger.warn(`User not found for deletion: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return result;
  }
}
