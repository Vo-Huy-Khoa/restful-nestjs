import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcryptjs';
import { CreateAuthDto, UpdateAuthDto } from './auth.dto';
import { CustomException } from 'src/custom/exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async login(CreateAuthDto: CreateAuthDto): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: CreateAuthDto.email },
      });

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      const passwordMatch = await compare(
        CreateAuthDto.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new CustomException('Invalid password! ', 402);
      }
      const token = await this.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });
      return { token };
    } catch (error) {
      throw new CustomException('Server is error! ', 500);
    }
  }

  async register(updateAuthDto: UpdateAuthDto): Promise<any> {
    const { name, email, password } = updateAuthDto;
    const hashedPassword = await hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      throw new CustomException('Server is error!', 500);
    }
  }
}
