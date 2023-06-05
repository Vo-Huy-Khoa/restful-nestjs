/* eslint-disable prettier/prettier */
// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UpdateAuthDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password: string;
}
