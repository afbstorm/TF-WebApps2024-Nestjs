import { Test, TestingModule } from '@nestjs/testing';
import { HddService } from './hdd.service';

describe('HddService', () => {
  let service: HddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HddService],
    }).compile();

    service = module.get<HddService>(HddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
