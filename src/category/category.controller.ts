import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';

@ApiTags('category') // add tag in swagger ui
@ApiBearerAuth() // provider token
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
