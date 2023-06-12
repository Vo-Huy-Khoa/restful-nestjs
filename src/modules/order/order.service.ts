import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Order } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './order.dto';
import { CustomException } from 'src/custom/exception';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrder(): Promise<Order[]> {
    try {
      const listOrder = this.prisma.order.findMany();
      if (!listOrder) {
        throw new NotFoundException('Order not found');
      }
      return listOrder;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }
  async createOrder(CreateOrderDto: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({ data: CreateOrderDto });
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prisma.order.update({ where: { id }, data });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
