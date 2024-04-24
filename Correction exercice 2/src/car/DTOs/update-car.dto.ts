import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  weight: number;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  garage: string;
}
