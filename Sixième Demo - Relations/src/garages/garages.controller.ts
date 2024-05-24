import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GaragesService } from './garages.service';
import { Garage } from './garage.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { CreateGarageDto } from './Dtos/create-garage.dto';
import { Serialize } from '../Interceptors/serialize.interceptor';
import { SalesService } from '../sales/sales.service';

@Controller('garages')
@UseGuards(AuthGuard)
export class GaragesController {
  constructor(
    private _garageService: GaragesService,
    private _salesService: SalesService,
  ) {}

  @Post()
  create(@Body() body: CreateGarageDto) {
    return this._garageService.create(body);
  }

  @Get('/:name')
  async fetchSalesByGarageName(@Param('name') name: string) {
    const garage = await this._garageService.findGarageByName(name);

    const sales = await this._salesService.findByGarage(garage.id);

    return this._garageService.fetchGarageSales(garage.id);
  }
}
