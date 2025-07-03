// room.validation.ts
import * as Joi from 'joi';

export const CreateRoomSchema = Joi.object({
  roomNo: Joi.string().required().messages({
    'string.base': 'Room number must be a string',
    'string.empty': 'Room number is required',
  }),
  images: Joi.array().items(Joi.string().uri()).default([]).messages({
    'string.uri': 'Each image must be a valid URI',
  }),
  noOfBed: Joi.number().integer().min(1).required().messages({
    'number.base': 'Number of beds must be a number',
    'number.min': 'At least one bed is required',
  }),
  noOfPerson: Joi.number().integer().min(1).required().messages({
    'number.base': 'Number of persons must be a number',
    'number.min': 'At least one person is required',
  }),
});

export const UpdateRoomSchema = Joi.object({
  roomNo: Joi.string().optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  noOfBed: Joi.number().integer().min(1).optional(),
  noOfPerson: Joi.number().integer().min(1).optional(),
});
