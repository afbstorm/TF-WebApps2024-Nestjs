import { Test, TestingModule } from '@nestjs/testing';
import { OrdinateurController } from './ordinateur.controller';

describe('OrdinateurController', () => {
  let controller: OrdinateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdinateurController],
    }).compile();

    controller = module.get<OrdinateurController>(OrdinateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
