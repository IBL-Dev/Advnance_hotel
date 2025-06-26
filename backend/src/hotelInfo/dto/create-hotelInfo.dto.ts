export class CreateHotelInfoDto {
  hotelId: string;
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  starRating?: number;
  amenities?: string[];
  city?: string;
  country?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  isActive?: boolean;
}
