import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create({
    designation,
    price,
    etat,
    id_category,
    createdAt,
    updatedAt,
  }: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: { designation, price, etat, id_category, createdAt, updatedAt },
      });
      return product;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product with designation: ${designation} already Exist, try again`,
          );
        }

        // if (error.code === 'P2003') {
        //   throw new NotFoundException(
        //     `Category with id: ${id_category} dont Exist`,
        //   );
        // }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    try {
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product With id: ${id} not found`);
    }

    try {
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async activeAllWhere(price: number) {
    const products = await this.prisma.$executeRaw`UPDATE public."Product"
SET etat = 'ACTIVE'
WHERE public."Product".price > ${price}`;
    try {
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async desactiveAllWhere(price: number) {
    const products = await this.prisma.$executeRaw`UPDATE public."Product"
SET etat = 'DESACTIVE'
WHERE public."Product".price > ${price}`;
    try {
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    { designation, price, etat, id_category }: UpdateProductDto,
  ) {
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: { designation, price, etat, id_category },
      });
      return product;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product with designation: ${designation} already Exist, try again`,
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
      await this.prisma.product.delete({ where: { id } });
      return `Product with id: ${id} deleted success`;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`product with id: ${id} not found`);
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }
}
