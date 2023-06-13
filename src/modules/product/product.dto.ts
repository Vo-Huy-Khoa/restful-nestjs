/* eslint-disable prettier/prettier */
// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class ProjectDto {
  @ApiProperty()
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  @Length(2, 10)
  color: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  size: string;

  @ApiProperty()
  @IsBoolean()
  availability: boolean;

  @ApiProperty()
  @IsNumber()
  categoryId: number;
}
