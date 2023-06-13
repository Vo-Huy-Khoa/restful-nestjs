/* eslint-disable prettier/prettier */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { emailRegex } from 'src/shared/regex';

@Injectable()
export class UserPipe implements PipeTransform {
  async transform(value: UserDto) {
    const { name, email } = value;
    if (!name || !email) {
      throw new BadRequestException('Name and email are required');
    }
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email!');
    }
    return value;
  }
}
