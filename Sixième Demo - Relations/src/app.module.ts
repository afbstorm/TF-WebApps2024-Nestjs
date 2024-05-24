import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { User } from './users/user.entity';
import { Sale } from './sales/sale.entity';
import { GaragesModule } from './garages/garages.module';
import { Garage } from './garages/garage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Sale, Garage],
      synchronize: true,
    }),
    UsersModule,
    SalesModule,
    GaragesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
