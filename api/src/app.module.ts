import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { CategoriesModule } from './categories/categories.module';
import { StoreProductsModule } from './store_products/store_products.module';

@Module({
  imports: [PrismaModule, EmployeesModule, ProductsModule, StoresModule, CategoriesModule, StoreProductsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
