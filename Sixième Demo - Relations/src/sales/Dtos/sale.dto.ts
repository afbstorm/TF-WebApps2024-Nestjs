import { Expose, Transform } from 'class-transformer';

export class SaleDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  garage: string;

  @Expose()
  mileage: number;

  // obj :::: sale entity
  @Transform(({ obj }) => obj.user.id) // Va créer un nouvel objet a partir d'un objet existant
  @Expose()
  userId: number;
}
