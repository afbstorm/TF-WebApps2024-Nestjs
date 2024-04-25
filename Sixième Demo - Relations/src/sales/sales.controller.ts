import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSaleDto } from './Dtos/create-sale-dto';
import { SalesService } from './sales.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../Interceptors/serialize.interceptor';
import { SaleDto } from './Dtos/sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private _salesService: SalesService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(SaleDto)
  createSale(@Body() body: CreateSaleDto, @CurrentUser() user: User) {
    return this._salesService.create(body, user);
  }

  @Get('/:id')
  findByUser(@Param('id') id: string) {
    return this._salesService.findByUser(parseInt(id));
  }
}
