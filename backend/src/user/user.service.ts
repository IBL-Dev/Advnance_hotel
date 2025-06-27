import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {generateUserId } from '../common/idgenarator/useridgenarator';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  get() {
    return this.userModel.find().exec();
  }

 async create(createUserDto: CreateUserDto) {
  const userId = await generateUserId(this.userModel);
  const user = new this.userModel({ ...createUserDto, userId });
  const savedUser = await user.save();
  this.logger.log(`Created user with email: ${savedUser.email} and userId: ${userId}`);
  return savedUser;
}

  async update(updateUserDto: UpdateUserDto, userId: string) {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (updatedUser) {
      this.logger.log(`Updated user: ${userId}`);
    } else {
      this.logger.warn(`User not found for update: ${userId}`);
    }
    return updatedUser;
  }

  show(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async delete(userId: string) {
    const result = await this.userModel.findByIdAndDelete(userId).exec();
    if (result) {
      this.logger.log(`Deleted user: ${userId}`);
    } else {
      this.logger.warn(`User not found for deletion: ${userId}`);
    }
    return result;
  }
}
