// src/common/id-generator/base.ts
import { Model, Document } from 'mongoose';

export async function generateStructuredId<T extends Document>(
  prefix: string,
  model: Model<T>,
): Promise<string> {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const datePart = `${year}${month}${day}`;
  const datePrefix = `${prefix}${datePart}`;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const count = await model.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });

  const sequential = String(count + 1).padStart(4, '0');

  return `${datePrefix}${sequential}`;
}
