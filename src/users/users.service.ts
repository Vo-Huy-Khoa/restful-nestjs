// users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '.prisma/client';
import { UserDto } from './users.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(createUserDto: UserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async updateUser(id: number, updateUserDto: UserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
