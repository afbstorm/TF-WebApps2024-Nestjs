import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private _repo: Repository<User>) {}
  create(email: string, password: string): Promise<User> {
    const user = this._repo.create({ email, password });

    return this._repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this._repo.findOneBy({ id });
  }

  find(email: string) {
    return this._repo.find({ where: { email } });
  }
}
