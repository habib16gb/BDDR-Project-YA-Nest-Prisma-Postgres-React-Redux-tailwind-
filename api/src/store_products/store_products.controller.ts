import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreProductsService } from './store_products.service';
import { CreateStoreProductDto } from './dto/create-store_product.dto';
import { UpdateStoreProductDto } from './dto/update-store_product.dto';

@Controller('api/store_products')
export class StoreProductsController {
  constructor(private readonly storeProductsService: StoreProductsService) {}

  @Post()
  create(@Body() createStoreProductDto: CreateStoreProductDto) {
    return this.storeProductsService.create(createStoreProductDto);
  }

  @Get()
  findAll() {
    return this.storeProductsService.findAll();
  }

  @Get('/allProd/:id_store')
  findAllProductInStore(@Param('id_store') id_store: number) {
    return this.storeProductsService.findAllProductInStore(+id_store);
  }

  @Get('/allProds/:id_product')
  findProductInAllStores(@Param('id_product') id_product: number) {
    return this.storeProductsService.findProductInAllStores(+id_product);
  }

  @Get(':id_store:id_product')
  findOne(
    @Param('id_store') id_store: number,
    @Param('id_product') id_product: number,
  ) {
    return this.storeProductsService.findOne(id_store, id_product);
  }

  @Get('/totalProducts/:id_product')
  findTotalOfOneProduct(@Param('id_product') id_product: number) {
    return this.storeProductsService.findTotalOfOneProduct(+id_product);
  }

  @Patch(':id_store:id_product')
  update(
    @Param('id_store') id_store: number,
    @Param('id_product') id_product: number,
    @Body() updateStoreProductDto: UpdateStoreProductDto,
  ) {
    return this.storeProductsService.update(updateStoreProductDto);
  }

  @Delete(':id_store:id_product')
  remove(
    @Param('id_store') id_store: number,
    @Param('id_product') id_product: number,
  ) {
    return this.storeProductsService.remove(+id_store, +id_product);
  }
}
