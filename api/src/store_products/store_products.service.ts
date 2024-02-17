import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreProductDto } from './dto/create-store_product.dto';
import { UpdateStoreProductDto } from './dto/update-store_product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoreProductsService {
  constructor(private prisma: PrismaService) {}
  async create({ id_product, id_store, qte }: CreateStoreProductDto) {
    try {
      await this.prisma.store_Product.create({
        data: {
          id_product,
          id_store,
          qte,
        },
      });
      const storeProduct = this.findOne(id_store, id_product);
      return storeProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        if (error.code === 'P2002') {
          throw new ConflictException(
            `id_store and id_product with already exist`,
          );
        }
        if (error.code === 'P2003') {
          throw new NotFoundException(`id_store or id_product dont exist`);
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async findAll() {
    const storeProducts = await this.prisma
      .$queryRawUnsafe(`select id_store || '' || id_product as id,
* from public."Store_Product"`);
    try {
      return storeProducts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllProductInStore(id_store: number) {
    const products = await this.prisma.$queryRaw`select 	id_store,
		id_product,
		qte,
		designation,
		price,
		etat,
		"Category".name as category
from public."Store_Product" 
inner join public."Product"
on public."Store_Product".id_product 
		= public."Product".id
inner join public."Category"
on public."Product".id_category
	= public."Category".id
  where id_store = ${id_store}`;
    try {
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findProductInAllStores(id_product: number) {
    const products = await this.prisma.$queryRaw`select 	id_store,
		qte,
		designation,
		price,
		etat,
		"Category".name as category
from public."Store_Product" 
inner join public."Product"
on public."Store_Product".id_product 
		= public."Product".id
inner join public."Category"
on public."Product".id_category
	= public."Category".id
	where id_product = ${id_product}`;
    try {
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findTotalOfOneProduct(id_product: number) {
    const total = await this.prisma.$queryRaw`select 	sum(qte)
from public."Store_Product" 
inner join public."Product"
on public."Store_Product".id_product 
		= public."Product".id
inner join public."Category"
on public."Product".id_category
	= public."Category".id
	where id_product = ${id_product}`;
    try {
      return JSON.parse(
        JSON.stringify(
          total,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id_store: number, id_product: number) {
    const storeProduct = await this.prisma
      .$queryRaw`select id_store || '' || id_product as id,
	* from public."Store_Product" where 
	id_store = ${id_store} and id_product = ${id_product}`;

    if (!storeProduct) {
      throw new NotFoundException(
        `Product With id: ${id_product} in store with id: ${id_store} not found`,
      );
    }

    try {
      return storeProduct;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update({ id_product, id_store, qte }: UpdateStoreProductDto) {
    try {
      const storeProduct = await this.prisma.store_Product.update({
        where: {
          product_storeId: {
            id_store,
            id_product,
          },
        },
        data: {
          id_product,
          id_store,
          qte,
        },
      });
      return storeProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product_Store with id: ${id_product} + ${id_store} already Exist, try again`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async remove(id_store: number, id_product: number) {
    try {
      const res = await this.prisma
        .$executeRaw`delete from public."Store_Product"
	where id_store = ${id_store} and id_product = ${id_product}`;
      return res;
    } catch (error) {
      console.log(id_product);
      console.log(id_store);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `product with id: ${id_product} in store: ${id_store} not found`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }
}
