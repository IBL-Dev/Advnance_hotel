import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Service extends Document {

  @Prop({ required: true })
  serviceId: string;

  @Prop({ required: true })
  description: string;
 
}           

export const ServiceSchema = SchemaFactory.createForClass(Service);