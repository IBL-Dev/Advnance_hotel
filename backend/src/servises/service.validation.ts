// services/service.validation.ts
import * as Joi from 'joi';

export const CreateServiceSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).max(1000).required(),
}).options({ stripUnknown: true }); // ✅ Don't chain .required() on the schema

export const UpdateServiceSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().trim().min(5).max(1000).optional(),
}).options({ stripUnknown: true });
