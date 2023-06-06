import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from '@prisma/client';
import { CreateOrderItemDto } from './order-item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('order item') // add tag in swagger ui
@ApiBearerAuth() // provider token
@Controller('order-items')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get()
  async getAllOrderItem(): Promise<OrderItem[]> {
    return this.orderItemService.getAllOrderItem();
  }

  @Post()
  create(@Body() data: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(data);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<OrderItem | null> {
    return this.orderItemService.getOrderItemById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: OrderItem): Promise<OrderItem> {
    return this.orderItemService.updateOrderItem(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<OrderItem> {
    return this.orderItemService.deleteOrderItem(id);
  }
}
