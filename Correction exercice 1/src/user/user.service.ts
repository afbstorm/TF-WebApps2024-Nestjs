import { Injectable } from '@nestjs/common';
import {RegisterUserDto} from "./DTOs/register-user.dto";
import {UserRepository} from "./repositories/user-repository";

@Injectable()
export class UserService {

    constructor(private _userRepo: UserRepository) {
    }

    create(user: RegisterUserDto) {
        return this._userRepo.create(user)
    }

    findAll() {
        return this._userRepo.findAll();
    }

    update(id: string, content: any) {
        return this._userRepo.update(id, content)
    }

    updatePartial(id: string, content: any) {
        return this._userRepo.updatePartial(id, content)
    }

    delete(id: string) {
        return this._userRepo.delete(id)
    }
}
