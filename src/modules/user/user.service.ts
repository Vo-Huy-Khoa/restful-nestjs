// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '.prisma/client';
import { UserDto } from './user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomException } from 'src/custom/exception';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    try {
      const listUser = this.prisma.user.findMany();
      if (!listUser) {
        throw new NotFoundException('User not found');
      }
      return listUser;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async createUser(createUserDto: UserDto): Promise<User> {
    try {
      const user = this.prisma.user.create({ data: createUserDto });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async updateUser(id: number, updateUserDto: UserDto): Promise<User> {
    try {
      const user = this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = this.prisma.user.delete({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }
}
