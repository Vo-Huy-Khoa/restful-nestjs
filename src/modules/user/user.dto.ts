/* eslint-disable prettier/prettier */
// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  password: string;
}
