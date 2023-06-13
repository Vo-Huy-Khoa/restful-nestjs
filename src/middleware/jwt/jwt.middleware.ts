/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtAuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : undefined;

    if (token) {
      try {
        const decoded = this.jwtService.verifyToken(token);
        req.user = decoded;
        next();
      } catch (error) {
        throw new Error('TInvalid token');
      }
    } else {
      throw new ForbiddenException('Token not provided');
    }
  }
}
