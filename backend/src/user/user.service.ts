import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateUserId } from '../common/idgenarator/useridgenarator';
import { CreateUserSchema, UpdateUserSchema } from './user.validation';


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
    this.logger.log(`Validating createUserDto for email: ${createUserDto.email}`);

    const { error } = CreateUserSchema.validate(createUserDto);
    if (error) {
      this.logger.warn(`Validation failed: ${error.message}`);
      throw new BadRequestException(`Validation error: ${error.message}`);
    }

    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      this.logger.warn(`User with email ${createUserDto.email} already exists`);
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    const userId = await generateUserId(this.userModel);
    const user = new this.userModel({ ...createUserDto, userId });
    const savedUser = await user.save();

    this.logger.log(`User created: userId=${userId}, email=${savedUser.email}`);
    return savedUser;
  }

  async update(updateUserDto: UpdateUserDto, userId: string) {
    this.logger.log(`Validating updateUserDto for ID: ${userId}`);

    const { error } = UpdateUserSchema.validate(updateUserDto);
    if (error) {
      this.logger.warn(`Validation failed: ${error.message}`);
      throw new BadRequestException(`Validation error: ${error.message}`);
    }

    if (!isValidObjectId(userId)) {
      this.logger.warn(`Invalid user ID format: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      this.logger.warn(`User not found for update: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    this.logger.log(`User updated: ${userId}`);
    return updatedUser;
  }

  async show(id: string) {
    this.logger.log(`Fetching user with ID: ${id}`);

    if (!isValidObjectId(id)) {
      this.logger.warn(`Invalid user ID format: ${id}`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

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

    if (!isValidObjectId(userId)) {
      this.logger.warn(`Invalid user ID format: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const result = await this.userModel.findByIdAndDelete(userId).exec();
    if (!result) {
      this.logger.warn(`User not found for deletion: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    this.logger.log(`User deleted: ${userId}`);
    return result;
  }
}
