import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStoreProductDto {
  @IsNotEmpty()
  @IsNumber()
  id_store: number;

  @IsNotEmpty()
  @IsNumber()
  id_product: number;

  qte: number;
}
