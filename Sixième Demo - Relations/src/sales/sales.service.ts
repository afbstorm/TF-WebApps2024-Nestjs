import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './Dtos/create-sale-dto';
import { User } from '../users/user.entity';

@Injectable()
export class SalesService {
  constructor(@InjectRepository(Sale) private _repo: Repository<Sale>) {}

  create(data: CreateSaleDto, user: User) {
    const sale = this._repo.create(data);
    sale.user = user;
    return this._repo.save(sale);
  }

  findByUser(id: number) {
    return this._repo
      .createQueryBuilder('sale')
      .where('sale.userId = :userId', { userId: id })
      .getMany();
  }
}
