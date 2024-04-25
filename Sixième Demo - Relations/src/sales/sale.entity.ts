import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

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
  garage: string;

  @Column()
  mileage: number;

  @Column()
  price: number;


  @ManyToOne(() => User, (user) => user.sales)
  user: User;
}
