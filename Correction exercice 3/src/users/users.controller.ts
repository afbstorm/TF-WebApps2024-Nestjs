import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import {
  Serialize,
} from '../Interceptors/serialize.interceptor';
import { UserDto } from './DTOs/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private _userService: UsersService
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this._userService.create(body.email, body.password)

    return user;
  }
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this._userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable ou inexistant');
    }

    return user;
  }
}
