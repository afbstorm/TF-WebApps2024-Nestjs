import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './car.entity';

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [TypeOrmModule.forFeature([CarEntity])],
})
export class CarModule {}
