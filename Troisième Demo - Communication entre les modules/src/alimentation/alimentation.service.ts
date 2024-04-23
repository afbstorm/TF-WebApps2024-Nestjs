import { Injectable } from '@nestjs/common';

@Injectable()
export class AlimentationService {

    fournirDeLenergie(watts: number) {
        console.log(`Fourni ${watts} watts`);
    }
}
