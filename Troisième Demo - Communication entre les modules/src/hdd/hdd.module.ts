import { Module } from '@nestjs/common';
import { HddService } from './hdd.service';
import {AlimentationModule} from "../alimentation/alimentation.module";

@Module({
  providers: [HddService],
  exports: [HddService],
  imports: [AlimentationModule]
})
export class HddModule {}
