import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class CreateGarageDto {

  @IsString()
  name: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
