import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './project.dto';
import { CustomException } from 'src/custom/exception';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProduct(): Promise<Product[]> {
    try {
      const listProduct = this.prisma.product.findMany();
      if (!listProduct) {
        throw new NotFoundException('User not found!');
      }
      return listProduct;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async getProduct(id: number): Promise<Product | null> {
    try {
      const project = this.prisma.product.findUnique({ where: { id } });
      if (!project) {
        throw new NotFoundException('User not found!');
      }
      return project;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async createProduct(projectDto: ProjectDto): Promise<Product> {
    try {
      const project = this.prisma.product.create({ data: projectDto });
      if (!project) {
        throw new NotFoundException('User not found!');
      }
      return project;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async updateProduct(id: number, projectDto: ProjectDto): Promise<Product> {
    try {
      const project = this.prisma.product.update({
        where: { id },
        data: projectDto,
      });
      if (!project) {
        throw new NotFoundException('User not found!');
      }
      return project;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
      const project = this.prisma.product.delete({ where: { id } });
      if (!project) {
        throw new NotFoundException('User not found!');
      }
      return project;
    } catch (error) {
      throw new CustomException(error, 500);
    }
  }
}
