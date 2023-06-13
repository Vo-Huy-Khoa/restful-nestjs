import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '.prisma/client';
import { UserDto } from './user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserPipe } from './user.pipe';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  @UsePipes(new UserPipe())
  async createUser(@Body() createUserDto: UserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(new UserPipe())
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
