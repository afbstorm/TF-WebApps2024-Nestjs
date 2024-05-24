import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { GaragesModule } from '../garages/garages.module';
import { Garage } from '../garages/garage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Garage]), GaragesModule],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
