/* eslint-disable prettier/prettier */
import { JwtModuleOptions } from '@nestjs/jwt';
import { serverConfig } from 'src/config/server.config';

export const jwtConfig: JwtModuleOptions = {
  secret: serverConfig.database.secret_key,
  signOptions: { expiresIn: '1h' },
};
