import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategory(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async createCategory(createCategoryDto: CategoryDto): Promise<Category> {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async updateCategory(
    id: number,
    updateCategory: CategoryDto,
  ): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: updateCategory });
  }
  async deleteCategory(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
