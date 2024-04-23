import { Injectable } from '@nestjs/common';
import {AlimentationService} from "../alimentation/alimentation.service";

@Injectable()
export class HddService {

    constructor(private _alimService: AlimentationService) {}

    recuperationDonnees() {
        console.log('Demande 20 watts pour fonctionner')
        this._alimService.fournirDeLenergie(20);
        return 'Hello WebApps'
    }
}
