import { IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1985)
  @Max(2024)
  year: number;

  @IsString()
  garage: string;

  @IsNumber()
  @Min(0)
  @Max(200000)
  mileage: number;

  @IsNumber()
  @Min(0)
  @Max(500000)
  price: number;
}
