import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto) {
    this.logger.log('Creating a new room...');
    const room = new this.roomModel(createRoomDto);
    const savedRoom = await room.save();
    this.logger.log(`Room created with ID: ${savedRoom._id}`);
    return savedRoom;
  }

  async findAll() {
    this.logger.log('Fetching all rooms...');
    const rooms = await this.roomModel.find().exec();
    this.logger.log(`Found ${rooms.length} rooms`);
    return rooms;
  }

  async findOne(id: string) {
    this.logger.log(`Fetching room with ID: ${id}`);
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      this.logger.warn(`Room with ID ${id} not found`);
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    this.logger.log(`Updating room with ID: ${id}`);
    const updatedRoom = await this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true }).exec();
    if (!updatedRoom) {
      this.logger.warn(`Room with ID ${id} not found`);
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    this.logger.log(`Room with ID ${id} updated successfully`);
    return updatedRoom;
  }

  async delete(id: string) {
    this.logger.log(`Deleting room with ID: ${id}`);
    const deletedRoom = await this.roomModel.findByIdAndDelete(id).exec();
    if (!deletedRoom) {
      this.logger.warn(`Room with ID ${id} not found`);
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    this.logger.log(`Room with ID ${id} deleted successfully`);
    return deletedRoom;
  }
}
