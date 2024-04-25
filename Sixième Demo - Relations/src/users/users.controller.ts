import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseInterceptors,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../Interceptors/serialize.interceptor';
import { UserDto } from './Dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('users')
@Serialize(UserDto) // TODO A FAIRE APRES LA CREATION INTERCEPTOR ET DECORATOR
//Permet d'utiliser l'interceptor sur TOUTES les routes de ce controller
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // TODO ADD THE SESSION AFTER THE HASHING OF THE PASSWORD
  // @Get('/whoami')
  // @UseGuards(AuthGuard)
  // whoAmI(@Session() session: any) {
  //   return this.userService.findOne(session.userId);
  // }
  // TODO A FAIRE APRES LA CREATION INTERCEPTOR ET DECORATOR
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  // TODO ADD THE SESSION AFTER THE HASHING OF THE PASSWORD
  // Particularité de sqlite si session.userId = null -> il renvoi le premier de la liste fetch
  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  // TODO ADD THE SESSION AFTER THE HASHING OF THE PASSWORD
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // TODO ADD THE SESSION AFTER THE HASHING OF THE PASSWORD
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
