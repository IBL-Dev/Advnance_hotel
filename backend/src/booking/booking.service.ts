import { Injectable } from "@nestjs/common";
import { Booking } from "./booking.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BookingService {

constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

   create(bookingData: Partial<Booking>) {
  const newBooking = new this.bookingModel(bookingData);
  return newBooking.save();
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