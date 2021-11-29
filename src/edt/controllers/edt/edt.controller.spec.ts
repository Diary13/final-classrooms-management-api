import { Test, TestingModule } from '@nestjs/testing';
import { EdtController } from './edt.controller';

describe('EdtController', () => {
  let controller: EdtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdtController],
    }).compile();

    controller = module.get<EdtController>(EdtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
