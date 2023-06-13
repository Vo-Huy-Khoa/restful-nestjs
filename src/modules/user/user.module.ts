import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserPipe } from './user.pipe';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserPipe],
})
export class UsersModule {}
