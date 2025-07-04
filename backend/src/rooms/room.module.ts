import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.entity';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
