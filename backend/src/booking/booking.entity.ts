import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Booking extends Document {
  
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  roomNo: string;

  @Prop({required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkOutDate: Date;

  @Prop({ required: true })
  noOfPerson: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  status: string; // e.g., 'confirmed', 'cancelled', 'completed'

  @Prop({type : [String], required: true })
  roomImg : string; // URL or path to the room imag
}

export const BookingSchema = SchemaFactory.createForClass(Booking);