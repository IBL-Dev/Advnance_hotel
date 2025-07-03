// services/service.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { JoiValidationPipe } from '../common/validation.pipe';
import {
  CreateServiceSchema,
  UpdateServiceSchema,
} from './service.validation';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(
    @Body(new JoiValidationPipe(CreateServiceSchema)) createServiceDto: CreateServiceDto,
  ) {
    return this.serviceService.create(createServiceDto);
  }

  @Get('/getall')
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('/getbyid/:id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateServiceSchema)) updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete('/remove/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
