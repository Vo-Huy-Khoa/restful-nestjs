import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto, UpdateAuthDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('register')
  async register(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.register(updateAuthDto);
  }

  @Post('login')
  async login(@Body() CreateAuthDto: CreateAuthDto) {
    return this.authService.login(CreateAuthDto);
  }

  @Post('protected')
  @ApiBearerAuth() // provider token
  @UseGuards(JwtAuthGuard)
  protectedRoute(@Request() req) {
    return req.user;
  }
}
