// users.service.ts
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { UserDto } from './user.dto';
import { PrismaService } from '../prisma/prisma.service';

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
      throw new InternalServerErrorException('Server is error!');
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
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async createUser(createUserDto: UserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({ data: createUserDto });
      return newUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server error!');
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
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = this.prisma.user.delete({ where: { id: Number(id) } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }
}
