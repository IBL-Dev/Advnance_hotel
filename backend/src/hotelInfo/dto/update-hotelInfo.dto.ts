import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelInfoDto } from './create-hotelInfo.dto';

export class UpdateHotelInfoDto extends PartialType(CreateHotelInfoDto) {}
