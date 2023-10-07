import * as Joi from 'joi';

export const VALIDATION_SCHEMA = Joi.object({
  PORT: Joi.number().port().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_EXPIRE: Joi.string().required(),
  MONGO_URL: Joi.string().required(),
});
