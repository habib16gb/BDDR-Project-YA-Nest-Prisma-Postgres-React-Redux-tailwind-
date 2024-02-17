import { PartialType } from '@nestjs/swagger';
import { CreateStoreProductDto } from './create-store_product.dto';

export class UpdateStoreProductDto extends PartialType(CreateStoreProductDto) {}
