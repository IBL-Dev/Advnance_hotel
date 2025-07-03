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
import { JoiValidationPipe } from '../common/validation.pipe';
import { CreateRoomSchema, UpdateRoomSchema } from './room.validation';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/create')
  @Roles('admin')
  create(
    @Body(new JoiValidationPipe(CreateRoomSchema)) createRoomDto: CreateRoomDto,
  ) {
    return this.roomService.create(createRoomDto);
  }

  @Patch('/update/:id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateRoomSchema)) updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete('/remove/:id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }

  @Get('/getall')
  findAll() {
    return this.roomService.findAll();
  }

  @Get('/getroom/:id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }
}
