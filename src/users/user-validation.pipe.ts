/* eslint-disable prettier/prettier */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserDto } from './users.dto';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(value: UserDto) {
    // Kiểm tra tính hợp lệ của value và xử lý lỗi nếu cần
    if (!value.name || !value.email) {
      throw new BadRequestException('Name and email are required');
    }

    return value;
  }
}
