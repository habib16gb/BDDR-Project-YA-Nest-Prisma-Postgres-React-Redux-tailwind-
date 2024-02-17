import { Module } from '@nestjs/common';
import { StoreProductsService } from './store_products.service';
import { StoreProductsController } from './store_products.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StoreProductsController],
  providers: [StoreProductsService, PrismaService],
})
export class StoreProductsModule {}
