// src/common/id-generator/user-id.ts
import { generateStructuredId } from './base';
import { Model } from 'mongoose';
import { UserDocument } from '../../user/user.entity';

export async function generateUserId(userModel: Model<UserDocument>): Promise<string> {
  return generateStructuredId<UserDocument>('us', userModel);
}
