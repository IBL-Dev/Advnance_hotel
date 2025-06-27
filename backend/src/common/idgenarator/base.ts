// src/common/idgenerator.ts
import { Model } from 'mongoose';
import { User } from '../../user/user.entity';

export async function generateUserId(userModel: Model<User>): Promise<string> {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const datePrefix = `us${year}${month}${day}`;

  // Count how many users were created today to increment the ID
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(now.setHours(23, 59, 59, 999));

  const count = await userModel.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });

  const sequentialNumber = String(count + 1).padStart(4, '0');

  return `${datePrefix}${sequentialNumber}`;
}
