import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from './car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from './DTOs/create-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity) private _repo: Repository<CarEntity>,
  ) {}

  create(data: CreateCarDto) {
    const car = this._repo.create(data);

    return this._repo.save(car);
  }

  findOne(id: string) {
    return this._repo.findOneBy({ id });
  }

  findByBrand(brand: string) {
    return this._repo.find({ where: { brand } }); // find({ where: { brand: brand } })
  }

  async update(id: string, data: Partial<CarEntity>) {
    const car = await this.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    Object.assign(car, data);
    return this._repo.save(car);
  }

  async remove(id: string) {
    const car = await this.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return this._repo.remove(car);
  }
}
