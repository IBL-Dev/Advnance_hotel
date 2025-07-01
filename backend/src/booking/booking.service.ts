import { Injectable, Logger } from "@nestjs/common";
import { Booking } from "./booking.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { generateBookingId } from "../common/idgenarator/booingidgenarator";

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async create(bookingData: Partial<Booking>) {
    this.logger.log('Creating a new booking...');
    const bookingId = await generateBookingId(this.bookingModel);
    const booking = new this.bookingModel({ ...bookingData, bookingId });
    const result = await booking.save();
    this.logger.log(`Booking created with ID: ${bookingId}`);
    return result;
  }

  async findAll() {
    this.logger.log('Fetching all bookings...');
    const result = await this.bookingModel.find().exec();
    this.logger.log(`Found ${result.length} bookings`);
    return result;
  }

  async findOne(id: string) {
    this.logger.log(`Fetching booking with ID: ${id}`);
    const result = await this.bookingModel.findById(id).exec();
    if (!result) {
      this.logger.warn(`Booking with ID ${id} not found`);
    }
    return result;
  }

  async update(id: string, booking: Booking) {
    this.logger.log(`Updating booking with ID: ${id}`);
    const result = await this.bookingModel.findByIdAndUpdate(id, booking, { new: true }).exec();
    if (!result) {
      this.logger.warn(`Booking update failed: ID ${id} not found`);
    } else {
      this.logger.log(`Booking updated: ID ${id}`);
    }
    return result;
  }

  async delete(id: string) {
    this.logger.log(`Deleting booking with ID: ${id}`);
    const result = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!result) {
      this.logger.warn(`Booking deletion failed: ID ${id} not found`);
    } else {
      this.logger.log(`Booking deleted: ID ${id}`);
    }
    return result;
  }
}
