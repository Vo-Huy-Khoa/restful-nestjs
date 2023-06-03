/* eslint-disable prettier/prettier */
// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(2, 100)
  fullname: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @Length(2, 100)
  fullname?: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  email?: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  password: string;
}
