import Joi from 'joi';

export const wateringConfigSchema = Joi.object({
  min_soil_moisture_percent: Joi.number().min(0).max(100),
  duration_ms: Joi.number().integer().min(1000),
  automated: Joi.boolean(),
}).min(1);
