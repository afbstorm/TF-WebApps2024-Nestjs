import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garage } from './garage.entity';
import { Repository } from 'typeorm';
import { CreateGarageDto } from './Dtos/create-garage.dto';
import { Sale } from '../sales/sale.entity';

@Injectable()
export class GaragesService {
  constructor(@InjectRepository(Garage) private _repo: Repository<Garage>) {}

  create(data: CreateGarageDto) {
    const garage = this._repo.create(data);
    return this._repo.save(garage);
  }

  async findGarageByName(name: string) {
    const garage = await this._repo.findOneBy({ name });
    return garage;
  }

  async findGarageById(id: number) {
    const garage = await this._repo.findOneBy({ id });
    return garage;
  }

  fetchGarageSales(id: number) {
    return this._repo
      .createQueryBuilder('sale')
      .where('sale.garageId = :garageId', { garageId: id })
      .getMany();
  }
}
