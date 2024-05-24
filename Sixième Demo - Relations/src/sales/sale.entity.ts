import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Garage } from '../garages/garage.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  price: number;


  @ManyToOne(() => User, (user) => user.sales)
  user: User;

  @ManyToOne(() => Garage, (garage) => garage.sales)
  garage: Garage;
}
