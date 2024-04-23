import { Test, TestingModule } from '@nestjs/testing';
import { AlimentationService } from './alimentation.service';

describe('AlimentationService', () => {
  let service: AlimentationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlimentationService],
    }).compile();

    service = module.get<AlimentationService>(AlimentationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
