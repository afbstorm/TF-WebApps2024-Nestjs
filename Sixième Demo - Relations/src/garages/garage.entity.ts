import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sale } from '../sales/sale.entity';

@Entity()
export class Garage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;


  @OneToMany(() => Sale, (sale) => sale.garage)
  sales: Sale[]

}

