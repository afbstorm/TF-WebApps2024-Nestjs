import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './DTOs/create-car.dto';
import { UpdateCarDto } from './DTOs/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private _carService: CarService) {}

  @Post('/add')
  createCar(@Body() body: CreateCarDto) {
    this._carService.create(body);
  }

  // TODO Check pourquoi dans un projet identique la requête doit se trouver après le PARAM et dans un autre AVANT
  @Get('/search') // http://localhost:3000/car/search/?brand=WV
  searchCar(@Query('brand') brand: string) {
    return this._carService.findByBrand(brand);
  }

  @Get('/:id')
  async findCar(@Param('id') id: string) {
    const car = await this._carService.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  @Patch('/:id')
  updateCar(@Param('id') id: string, @Body() body: UpdateCarDto) {
    return this._carService.update(id, body);
  }

  @Delete('/:id')
  removeCar(@Param('id') id: string) {
    return this._carService.remove(id);
  }
}
