import * as Joi from 'joi';

export const CreateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user').optional(),
});

export const UpdateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
});
