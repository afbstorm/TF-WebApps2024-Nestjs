import { IsString, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  type: string;

  @IsNumber()
  weight: number;

  @IsString()
  color: string;

  @IsString()
  garage: string;
}
