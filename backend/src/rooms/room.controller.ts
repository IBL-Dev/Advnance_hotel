import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @Roles('admin')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }
}
