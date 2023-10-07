import { JwtModuleOptions } from '@nestjs/jwt';

export const JWT_CONFIG: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  global: true,
  signOptions: {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  },
};
