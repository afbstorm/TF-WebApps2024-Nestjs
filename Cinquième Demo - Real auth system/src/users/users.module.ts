import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core'; // Permet de définir un interceptor de manière GLOBALE
import { CurrentUserInterceptor } from '../Interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR, // Permet de définir un interceptor de manière GLOBALE
      useClass: CurrentUserInterceptor, // On définit quel interceptor on utilise
    },
  ],
})
export class UsersModule {}
