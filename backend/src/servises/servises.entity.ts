import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Service extends Document {

   @Prop({ required: true, unique: true })
  name: string; // e.g., "Spa", "Airport Pickup", "Room Cleaning"
  
  @Prop({ required: true })
  description: string;
 
}           

export const ServiceSchema = SchemaFactory.createForClass(Service);