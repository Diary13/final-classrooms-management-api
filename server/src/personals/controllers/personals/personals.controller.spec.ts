import { Test, TestingModule } from '@nestjs/testing';
import { PersonalsController } from './personals.controller';

describe('PersonalsController', () => {
  let controller: PersonalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalsController],
    }).compile();

    controller = module.get<PersonalsController>(PersonalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
