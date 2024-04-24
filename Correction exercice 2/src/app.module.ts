import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './car/car.entity';

@Module({
  imports: [
    CarModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.car.sqlite',
      entities: [CarEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
