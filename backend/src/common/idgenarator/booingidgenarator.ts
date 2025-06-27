// src/common/id-generator/booking-id.ts
import { generateStructuredId } from './base';
import { Model } from 'mongoose';
import { Booking } from '../../booking/booking.entity';

export async function generateBookingId(bookingModel: Model<Booking>): Promise<string> {
  return generateStructuredId('bk', bookingModel);
}
