import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // adds createdAt and updatedAt
export class HotelInfo extends Document {

 

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop()
  starRating: number;

  @Prop({ type: [String] }) // e.g., ["Free WiFi", "Pool", "Gym"]
  amenities: string[];

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  address: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ type: [String] }) // image URLs
  images: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const HotelInfoSchema = SchemaFactory.createForClass(HotelInfo);
