import {Controller, Post, Body, Get, Param, Query, NotFoundException, Patch, Delete, UseInterceptors} from '@nestjs/common';
import { UsersService } from "./users.service";
import {CreateUserDto} from "./DTOs/create-user.dto";
import {UpdateUserDto} from "./DTOs/update-user.dto";
import {Serialize, SerializeInterceptor} from "../Interceptors/serialize.interceptor";
import {UserDto} from "./DTOs/user.dto";

@Controller('users')
export class UsersController {

    constructor(private _userService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this._userService.create(body.email, body.password)
    };

    // Décorateur custom incoming. Il servira a modifier l'objet reçu
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id') // http://localhost:3000/users/0eaeb8ef-f522-4d5c-8957-a951998a88c6 OU http://localhost:3000/users/42
    async findUser(@Param('id') id: string) {
        const user = await this._userService.findOne(parseInt(id))
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable ou inexistant');
        }

        return user;
    }

    // http://localhost:3000/users/?email=blablabla
    @Get()
    findAllUsers(@Query('email') email: string) {
        return this._userService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this._userService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this._userService.remove(parseInt(id));
    }
}
