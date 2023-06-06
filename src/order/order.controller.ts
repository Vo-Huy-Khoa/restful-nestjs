import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders') // add tag in swagger ui
@ApiBearerAuth() // provider token
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getAllOrder(): Promise<Order[]> {
    return this.orderService.getAllOrder();
  }

  @Post()
  create(@Body() CreateOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(CreateOrderDto);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Order | null> {
    return this.orderService.getOrderById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Order): Promise<Order> {
    return this.orderService.updateOrder(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }
}
