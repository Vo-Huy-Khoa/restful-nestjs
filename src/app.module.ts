import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthService } from './jwt/jwt.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { UsersService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { PrismaService } from './prisma/prisma.service';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';

@Module({
  //  để sắp xếp thứ tự các Controller API trong Swagger
  // // Sắp xếp thứ tự theo mong muốn
  imports: [
    AuthModule,
    UsersModule,
    CategoryModule,
    PrismaModule,
    JwtModule,
    ProductModule,
    OrderItemModule,
    OrderModule,
  ],
  providers: [AuthService, JwtAuthService, UsersService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
