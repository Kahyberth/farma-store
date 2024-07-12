import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsIn(['analgésicos', 'gel', 'cremas'])
  type: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
