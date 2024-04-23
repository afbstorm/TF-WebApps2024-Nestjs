import { Module } from '@nestjs/common';
import { AlimentationService } from './alimentation.service';

@Module({
  providers: [AlimentationService], // Fourni le service a l'intérieur du module
  exports: [AlimentationService] // Fourni le service a l'extérieur du module
})
export class AlimentationModule {}
