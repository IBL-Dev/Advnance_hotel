import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  create(createRoomDto: CreateRoomDto) {
    const room = new this.roomModel(createRoomDto);
    return room.save();
  }

  findAll() {
    return this.roomModel.find().exec();
  }

  findOne(id: string) {
    return this.roomModel.findById(id).exec();
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true }).exec();
  }

  delete(id: string) {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
