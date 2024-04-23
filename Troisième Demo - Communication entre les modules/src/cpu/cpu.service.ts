import { Injectable } from '@nestjs/common';
import {AlimentationService} from "../alimentation/alimentation.service";

@Injectable()
export class CpuService {

    constructor(private _alimService: AlimentationService) {}

    calcule(a: number, b: number) {
        console.log(`Demande 70 watts`);
        this._alimService.fournirDeLenergie(70);
        return a + b;
    }

}
