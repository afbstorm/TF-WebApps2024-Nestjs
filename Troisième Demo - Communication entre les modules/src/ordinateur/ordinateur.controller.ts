import { Controller, Get } from '@nestjs/common';
import {CpuService} from "../cpu/cpu.service";
import {HddService} from "../hdd/hdd.service";

@Controller('ordinateur')
export class OrdinateurController {

    constructor(private _cpuService: CpuService, private _hddService: HddService) {}

    @Get()
    execute() {
        return [
            this._cpuService.calcule(21, 21),
            this._hddService.recuperationDonnees()
        ]
    }
}
