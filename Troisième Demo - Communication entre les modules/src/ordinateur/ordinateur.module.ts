import { Module } from '@nestjs/common';
import { OrdinateurController } from './ordinateur.controller';
import {CpuModule} from "../cpu/cpu.module";
import {HddModule} from "../hdd/hdd.module";

@Module({
  controllers: [OrdinateurController],
  imports: [CpuModule, HddModule]
})
export class OrdinateurModule {}
