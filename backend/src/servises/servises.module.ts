import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './servises.entity';
import { ServiceController } from './servises.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
