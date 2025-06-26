import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ required: true })
  roomNo: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  noOfBed: number;

  @Prop({ required: true })
  noOfPerson: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
