import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProduct(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProduct(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(projectDto: ProjectDto): Promise<Product> {
    return this.prisma.product.create({ data: projectDto });
  }

  async updateProduct(id: number, projectDto: ProjectDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data: projectDto });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
