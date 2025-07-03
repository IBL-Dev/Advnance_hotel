import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelInfo } from './hotrlInfo.entity';
import { CreateHotelInfoDto } from './dto/create-hotelInfo.dto';
import { UpdateHotelInfoDto } from './dto/update-hotelInfo.dto';

@Injectable()
export class HotelInfoService {
  private readonly logger = new Logger(HotelInfoService.name);

  constructor(
    @InjectModel(HotelInfo.name) private hotelInfoModel: Model<HotelInfo>,
  ) {}

  async create(dto: CreateHotelInfoDto): Promise<HotelInfo> {
    this.logger.log('Creating new HotelInfo entry...');
    this.logger.debug('DTO to be saved: ' + JSON.stringify(dto));

    try {
      const created = await new this.hotelInfoModel(dto).save();
      this.logger.log(`HotelInfo created with Mongo ID: ${created._id}`);
      return created;
    } catch (error) {
      this.logger.error('Failed to create HotelInfo:', error);
      if (error.code === 11000) {
        throw new BadRequestException('Duplicate field value found (e.g., email or name).');
      }
      throw new InternalServerErrorException(error.message || 'Failed to create hotel.');
    }
  }

  async findAll(): Promise<HotelInfo[]> {
    this.logger.log('Fetching all HotelInfo records...');
    const hotels = await this.hotelInfoModel.find().exec();
    this.logger.log(`Found ${hotels.length} HotelInfo records`);
    return hotels;
  }

  async findOne(id: string): Promise<HotelInfo> {
    this.logger.log(`Fetching HotelInfo with ID: ${id}`);
    const hotel = await this.hotelInfoModel.findById(id).exec();
    if (!hotel) {
      this.logger.warn(`HotelInfo with ID ${id} not found`);
      throw new NotFoundException(`HotelInfo with ID ${id} not found`);
    }
    return hotel;
  }

  async update(id: string, dto: UpdateHotelInfoDto): Promise<HotelInfo> {
  this.logger.log(`Updating HotelInfo with ID: ${id}`);
  
  try {
    const updated = await this.hotelInfoModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updated) {
      this.logger.warn(`HotelInfo with ID ${id} not found`);
      throw new NotFoundException(`HotelInfo with ID ${id} not found`);
    }

    this.logger.log(`HotelInfo with ID ${id} successfully updated`);
    return updated;
  } catch (error) {
    this.logger.error('Error updating HotelInfo:', error);
    throw new InternalServerErrorException('Update failed: ' + error.message);
  }
}


  async delete(id: string): Promise<HotelInfo> {
    this.logger.log(`Deleting HotelInfo with ID: ${id}`);
    const deleted = await this.hotelInfoModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      this.logger.warn(`HotelInfo with ID ${id} not found`);
      throw new NotFoundException(`HotelInfo with ID ${id} not found`);
    }
    this.logger.log(`HotelInfo with ID ${id} successfully deleted`);
    return deleted;
  }
}
