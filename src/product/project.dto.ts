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
  @Length(2, 10)
  price: number;

  @ApiProperty()
  @IsString()
  @Length(2, 20)
  color: string;

  @ApiProperty()
  @IsString()
  @Length(2, 20)
  size: string;

  @ApiProperty()
  @IsBoolean()
  availability: boolean;

  @ApiProperty()
  @IsNumber()
  categoryId: number;
}
