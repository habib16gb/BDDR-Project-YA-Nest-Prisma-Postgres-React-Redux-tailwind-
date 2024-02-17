import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum ProductEnum {
  ACTIVE = 'ACTIVE',
  DESACTIVE = 'DESACTIVE',
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  designation: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(ProductEnum)
  etat: ProductEnum;

  @IsNotEmpty()
  @IsNumber()
  id_category: number;

  @IsDate()
  @IsOptional()
  createdAt: string;

  @IsDate()
  @IsOptional()
  updatedAt: string;
}
