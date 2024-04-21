import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {RegisterUserDto} from "./DTOs/register-user.dto";
import {UpdateUserDto} from "./DTOs/update-user.dto";

@Controller('user')
export class UserController {

    constructor(private _userService: UserService) {}

    @Post()
    create(@Body() body: RegisterUserDto) {
        return this._userService.create(body)
    }

    @Get()
    findAll() {
        return this._userService.findAll()
    }

    @Put('/:id')
    update(@Body() body: UpdateUserDto, @Param('id') id: string) {
        return this._userService.update(id, body)
    }

    @Patch('/:id')
    updatePartial(@Body() body: UpdateUserDto, @Param('id') id: string) {
        return this._userService.updatePartial(id, body)
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this._userService.delete(id)
    }

}
