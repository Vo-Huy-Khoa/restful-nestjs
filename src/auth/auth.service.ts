import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcryptjs';
import { CreateAuthDto, UpdateAuthDto } from './auth.dto';

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
    const user = await this.prisma.user.findUnique({
      where: { email: CreateAuthDto.email },
    });

    if (!user) {
      return null;
    }

    const passwordMatch = await compare(CreateAuthDto.password, user.password);

    if (!passwordMatch) {
      return null;
    }
    const token = await this.generateToken({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    });
    return { token };
  }

  async register(updateAuthDto: UpdateAuthDto): Promise<any> {
    const { fullname, email, password } = updateAuthDto;
    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }
}
