import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}
  async create({ name, id_manager }: CreateStoreDto) {
    try {
      const store = await this.prisma.store.create({
        data: { name, id_manager },
      });
      return store;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Store with name: ${name} already Exist, try again`,
          );
        }
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `manager with id: ${id_manager} not found, choose another one`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async findAll() {
    const stores = await this.prisma.store.findMany();
    try {
      return stores;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllDetails() {
    const stores = await this.prisma.$queryRaw`SELECT 
  "Store".id,
  "Store".name,
  "Store".id_manager,
  "Employee".name as name_manager,
  (SELECT COUNT(*) as total_emp
   	FROM public."Employee"
	WHERE id_manager = "Store".id_manager)
FROM 
  "Store" 
  	INNER JOIN "Employee" ON
  	"Store".id_manager = "Employee".id`;
    try {
      return JSON.stringify(
        stores,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      );
    } catch (error) {
      console.error(error.code);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundException(`Store With id: ${id} not found`);
    }

    try {
      return store;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, { name, id_manager }: UpdateStoreDto) {
    try {
      const store = await this.prisma.store.update({
        where: { id },
        data: { name, id_manager },
      });
      return store;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `manager with id: ${id} not found, choose another one`,
          );
        }
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Store with name: ${name} already Exist, try again`,
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
      await this.prisma.store.delete({ where: { id } });
      return `Store with id: ${id} deleted success`;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`manager with id: ${id} not found`);
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }
}
