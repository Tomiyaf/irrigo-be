import Joi from 'joi';

export const waterCapacityConfigSchema = Joi.object({
  min_water_capacity_percent: Joi.number().min(0).max(100).required(),
});
