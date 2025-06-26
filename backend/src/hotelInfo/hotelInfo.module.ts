import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelInfo, HotelInfoSchema } from './hotrlInfo.entity';
import { HotelInfoController } from './hotelInfo.controller';
import { HotelInfoService } from './hotelInfo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: HotelInfo.name, schema: HotelInfoSchema }])],
  controllers: [HotelInfoController],
  providers: [HotelInfoService],
})
export class HotelInfoModule {}
