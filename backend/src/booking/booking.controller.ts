import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() booking: Booking) {
    return this.bookingService.create(booking);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() booking: Booking) {
    return this.bookingService.update(id, booking);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}


//fdfsdfdsfsdfsdfsdf