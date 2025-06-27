// src/common/id-generator/user-id.ts
import { generateStructuredId } from './base';
import { Model } from 'mongoose';
import { User } from '../../user/user.entity';

export async function generateUserId(userModel: Model<User>): Promise<string> {
  return generateStructuredId('us', userModel);
}
