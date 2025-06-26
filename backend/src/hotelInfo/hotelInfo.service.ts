import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelInfo } from './hotrlInfo.entity';
import { CreateHotelInfoDto } from './dto/create-hotelInfo.dto';
import { UpdateHotelInfoDto } from './dto/update-hotelInfo.dto';

@Injectable()
export class HotelInfoService {
  constructor(@InjectModel(HotelInfo.name) private hotelInfoModel: Model<HotelInfo>) {}

  async create(dto: CreateHotelInfoDto): Promise<HotelInfo> {
    return new this.hotelInfoModel(dto).save();
  }

  async findAll(): Promise<HotelInfo[]> {
    return this.hotelInfoModel.find().exec();
  }

  async findOne(id: string): Promise<HotelInfo> {
    const hotel = await this.hotelInfoModel.findById(id).exec();
    if (!hotel) throw new NotFoundException(`HotelInfo with ID ${id} not found`);
    return hotel;
  }

  async update(id: string, dto: UpdateHotelInfoDto): Promise<HotelInfo> {
    const updated = await this.hotelInfoModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`HotelInfo with ID ${id} not found`);
    return updated;
  }

  async delete(id: string): Promise<HotelInfo> {
    const deleted = await this.hotelInfoModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`HotelInfo with ID ${id} not found`);
    return deleted;
  }
}
