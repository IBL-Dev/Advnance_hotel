// hotelInfo.validation.ts
import * as Joi from 'joi';

export const CreateHotelInfoSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    website: Joi.string().uri().optional(),
    starRating: Joi.number().min(1).max(5).optional(),
    amenities: Joi.array().items(Joi.string()).optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    address: Joi.string().optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    isActive: Joi.boolean().optional(),
  })
  .required()
  .options({ stripUnknown: true }); // optional: strips extra fields

export const UpdateHotelInfoSchema = Joi.object()
  .keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    website: Joi.string().uri().optional(),
    starRating: Joi.number().min(1).max(5).optional(),
    amenities: Joi.array().items(Joi.string()).optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    address: Joi.string().optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    isActive: Joi.boolean().optional(),
  })
  .required()
  .options({ stripUnknown: true });
