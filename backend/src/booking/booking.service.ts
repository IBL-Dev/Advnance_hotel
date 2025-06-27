import { Injectable } from "@nestjs/common";
import { Booking } from "./booking.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {generateBookingId} from "../common/idgenarator/booingidgenarator";

@Injectable()
export class BookingService {

constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

async create(bookingData: Partial<Booking>) {
  const bookingId = await generateBookingId(this.bookingModel);
  const booking = new this.bookingModel({ ...bookingData, bookingId });
  return booking.save();
}

    
    findAll() {
        return this.bookingModel.find().exec();
    }
    
    findOne(id: string) {
        return this.bookingModel.findById(id).exec();
    }
    
    update(id: string, booking: Booking) {
        return this.bookingModel.findByIdAndUpdate(id, booking, { new: true }).exec();
    }
    
    delete(id: string) {
        return this.bookingModel.findByIdAndDelete(id).exec();
    }

}