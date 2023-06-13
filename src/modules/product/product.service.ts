import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProjectDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProduct(): Promise<Product[]> {
    try {
      const listProduct = this.prisma.product.findMany();
      if (!listProduct) {
        throw new NotFoundException('Product not found!');
      }
      return listProduct;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async getProduct(id: number): Promise<Product | null> {
    try {
      const project = this.prisma.product.findUnique({ where: { id } });
      if (!project) {
        throw new NotFoundException('Product not found!');
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async createProduct(projectDto: ProjectDto): Promise<Product> {
    try {
      const project = this.prisma.product.create({ data: projectDto });
      if (!project) {
        throw new NotFoundException('Product not found!');
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async updateProduct(id: number, projectDto: ProjectDto): Promise<Product> {
    try {
      const project = this.prisma.product.update({
        where: { id },
        data: projectDto,
      });
      if (!project) {
        throw new NotFoundException('Product not found!');
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
      const project = this.prisma.product.delete({ where: { id } });
      if (!project) {
        throw new NotFoundException('Product not found!');
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException('Server is error!');
    }
  }
}
