import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { HotelInfoService } from './hotelInfo.service';
import { CreateHotelInfoDto } from './dto/create-hotelInfo.dto';
import { UpdateHotelInfoDto } from './dto/update-hotelInfo.dto';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { JoiValidationPipe } from '../common/validation.pipe';
import {
  CreateHotelInfoSchema,
  UpdateHotelInfoSchema,
} from './hotelInfo.validation';

@Controller('hotel-info')
export class HotelInfoController {
  constructor(private readonly hotelInfoService: HotelInfoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('/create')
  @UsePipes(new JoiValidationPipe(CreateHotelInfoSchema))
  create(@Body() dto: CreateHotelInfoDto) {
    return this.hotelInfoService.create(dto);
  }

  @Get('/getall')
  findAll() {
    return this.hotelInfoService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/getinfo/:id')
  findOne(@Param('id') id: string) {
    return this.hotelInfoService.findOne(id);
  }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Put('/updateinfo/:id')
update(
  @Param('id') id: string,
  @Body(new JoiValidationPipe(UpdateHotelInfoSchema)) dto: UpdateHotelInfoDto,
) {
  return this.hotelInfoService.update(id, dto);
}



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('/removeinfo/:id')
  delete(@Param('id') id: string) {
    return this.hotelInfoService.delete(id);
  }
}
