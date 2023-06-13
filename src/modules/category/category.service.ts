import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategory(): Promise<Category[]> {
    try {
      const listCategory = this.prisma.category.findMany();
      if (!listCategory) {
        throw new NotFoundException('Category not found!');
      }
      return listCategory;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      const listCategory = this.prisma.category.findUnique({
        where: { id },
      });
      if (!listCategory) {
        throw new NotFoundException('Category not found!');
      }
      return listCategory;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async createCategory(createCategoryDto: CategoryDto): Promise<Category> {
    try {
      const category = this.prisma.category.create({
        data: createCategoryDto,
      });
      if (!category) {
        throw new NotFoundException('Category not found!');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async updateCategory(
    id: number,
    updateCategory: CategoryDto,
  ): Promise<Category> {
    try {
      const category = this.prisma.category.update({
        where: { id },
        data: updateCategory,
      });
      if (!category) {
        throw new NotFoundException('Category not found!');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }
  async deleteCategory(id: number): Promise<Category> {
    try {
      const category = this.prisma.category.delete({ where: { id } });
      if (!category) {
        throw new NotFoundException('Category not found!');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }
}
