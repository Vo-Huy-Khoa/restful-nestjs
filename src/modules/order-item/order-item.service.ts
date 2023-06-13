import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, OrderItem } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderItemDto } from './order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async getAllOrderItem(): Promise<OrderItem[]> {
    try {
      const listOrderItem = this.prisma.orderItem.findMany();
      if (!listOrderItem) {
        throw new NotFoundException('Order not found');
      }
      return listOrderItem;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async createOrderItem(
    CreateOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    return this.prisma.orderItem.create({ data: CreateOrderItemDto });
  }

  async getOrderItemById(id: number): Promise<OrderItem | null> {
    return this.prisma.orderItem.findUnique({ where: { id } });
  }

  async updateOrderItem(
    id: number,
    data: Prisma.OrderItemUpdateInput,
  ): Promise<OrderItem> {
    return this.prisma.orderItem.update({ where: { id }, data });
  }

  async deleteOrderItem(id: number): Promise<OrderItem> {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
