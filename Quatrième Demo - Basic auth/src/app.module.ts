import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {User} from "./users/user.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: 'db.sqlite',
    entities: [User],
    synchronize: true // Ca va spécifier a l'ORM de créer automatiquement la DB a chaque démarrage de l'application
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
