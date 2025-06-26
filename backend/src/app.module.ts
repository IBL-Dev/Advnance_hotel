import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './rooms/room.module';
import { BookingModule } from './booking/booking.module';
import { ServiceModule } from './servises/servises.module';
import { HotelInfoModule } from './hotelInfo/hotelInfo.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://anjana2:anjana@cluster0.rg6ebmf.mongodb.net/Hotel_management_system'
    ),
    UserModule,
    AuthModule,
    RoomModule,
    BookingModule,
    ServiceModule,
    HotelInfoModule
  ],
  controllers: [AppController],
})
export class AppModule {}
