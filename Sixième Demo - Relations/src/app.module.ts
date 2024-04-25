import { Module } from '@nestjs/common';
import { TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { User } from "./users/user.entity";
import { Sale } from "./sales/sale.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Sale],
    synchronize: true
    }),
    UsersModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
