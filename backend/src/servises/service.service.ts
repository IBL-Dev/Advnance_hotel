import { Injectable, NotFoundException, Logger ,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './servises.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger(ServiceService.name);

  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) {}

 async create(createServiceDto: CreateServiceDto): Promise<Service> {
  this.logger.log('Creating a new service...');

  // 🔍 Check for existing service (case-insensitive match is optional)
  const existingService = await this.serviceModel
    .findOne({ name: createServiceDto.name.trim() })
    .exec();

  if (existingService) {
    this.logger.warn(`Service with name "${createServiceDto.name}" already exists`);
    throw new BadRequestException(`Service with name "${createServiceDto.name}" already exists`);
  }

  const newService = new this.serviceModel(createServiceDto);
  const savedService = await newService.save();

  this.logger.log(`Service created with ID: ${savedService._id}`);
  return savedService;
}


  async findAll(): Promise<Service[]> {
    this.logger.log('Fetching all services...');
    const services = await this.serviceModel.find().exec();
    this.logger.log(`Found ${services.length} services`);
    return services;
  }

  async findOne(id: string): Promise<Service> {
    this.logger.log(`Fetching service with ID: ${id}`);
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      this.logger.warn(`Service with ID ${id} not found`);
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    this.logger.log(`Updating service with ID: ${id}`);
    const updated = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
    if (!updated) {
      this.logger.warn(`Service with ID ${id} not found`);
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    this.logger.log(`Service with ID ${id} successfully updated`);
    return updated;
  }

  async delete(id: string): Promise<Service> {
    this.logger.log(`Deleting service with ID: ${id}`);
    const deleted = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      this.logger.warn(`Service with ID ${id} not found`);
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    this.logger.log(`Service with ID ${id} successfully deleted`);
    return deleted;
  }
}
