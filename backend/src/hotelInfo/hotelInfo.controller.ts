import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HotelInfoService } from './hotelInfo.service';
import { CreateHotelInfoDto } from './dto/create-hotelInfo.dto';
import { UpdateHotelInfoDto } from './dto/update-hotelInfo.dto'

@Controller('hotel-info')
export class HotelInfoController {
  constructor(private readonly hotelInfoService: HotelInfoService) {}

  @Post()
  create(@Body() dto: CreateHotelInfoDto) {
    return this.hotelInfoService.create(dto);
  }

  @Get()
  findAll() {
    return this.hotelInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelInfoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHotelInfoDto) {
    return this.hotelInfoService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.hotelInfoService.delete(id);
  }
}
