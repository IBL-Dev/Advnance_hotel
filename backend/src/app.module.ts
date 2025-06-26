import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './rooms/room.module';
import { BookingModule } from './booking/booking.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://anjana2:anjana@cluster0.rg6ebmf.mongodb.net/Hotel_management_system'
    ),
    UserModule,
    AuthModule,
    RoomModule,
    BookingModule
  ],
  controllers: [AppController],
})
export class AppModule {}
