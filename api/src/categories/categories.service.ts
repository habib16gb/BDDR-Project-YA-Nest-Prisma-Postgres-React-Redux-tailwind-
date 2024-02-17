import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create({ name }: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: { name },
      });
      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Category with name: ${name} already Exist, try again`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    try {
      return categories;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category With id: ${id} not found`);
    }

    try {
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, { name }: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: { name },
      });
      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `manager with id: ${id} not found, choose another one`,
          );
        }
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Category with name: ${name} already Exist, try again`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.category.delete({ where: { id } });
      return `Category with id: ${id} deleted success`;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`manager with id: ${id} not found`);
        }
        if (error.code === 'P2003') {
          throw new MethodNotAllowedException(
            `manager with id: ${id} is a manager of store update store manager please before delete this admin`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }
}
