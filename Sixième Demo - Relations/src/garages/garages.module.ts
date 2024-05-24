import { Module } from '@nestjs/common';
import { GaragesService } from './garages.service';
import { GaragesController } from './garages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garage } from './garage.entity';
import { Sale } from '../sales/sale.entity';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [TypeOrmModule.forFeature([Garage, Sale])],
  providers: [GaragesService],
  controllers: [GaragesController],
  exports: [GaragesService],
})
export class GaragesModule {}
