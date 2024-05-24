import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './Dtos/create-sale-dto';
import { User } from '../users/user.entity';
import { Garage } from '../garages/garage.entity';
import { GaragesService } from '../garages/garages.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private _repo: Repository<Sale>,
    @InjectRepository(Garage) private _garageRepo: Repository<Garage>,
    private _garageService: GaragesService,
  ) {}

  async create(data: CreateSaleDto, user: User) {
    const garage = await this._garageRepo
      .createQueryBuilder('garage')
      .where('garage.name = :name', { name: data.garage })
      .getOne();

    const sale = this._repo.create({
      brand: data.brand,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      price: data.price,
    });

    sale.user = user;
    sale.garage = garage;

    return this._repo.save(sale);
  }

  findByUser(id: number) {
    return this._repo
      .createQueryBuilder('sale')
      .where('sale.userId = :userId', { userId: id })
      .getMany();
  }

  findByGarage(id: number) {
    return this._repo
      .createQueryBuilder('sale')
      .where('sale.garageId = :garageId', { garageId: id })
      .getMany();
  }
}
