import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import {AlimentationModule} from "../alimentation/alimentation.module";

@Module({
  providers: [CpuService],
  exports: [CpuService],
  imports: [AlimentationModule]
})
export class CpuModule {}
