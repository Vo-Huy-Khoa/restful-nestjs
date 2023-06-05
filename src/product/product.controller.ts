import {
  Body,
  Controller,
  Param,
  Put,
  Post,
  Get,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './project.dto';

@ApiTags('Project') // add tag in swagger ui
@ApiBearerAuth() // provider token
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createProduct(@Body() projectDto: ProjectDto): Promise<Product> {
    return this.productService.createProduct(projectDto);
  }

  @Get(':id')
  getProduct(@Param('id') id: number): Promise<Product | null> {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateProduct(
    @Param('id') id: number,
    @Body() projectDto: ProjectDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, projectDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
