import { Test, TestingModule } from '@nestjs/testing';
import { BranchsController } from './branchs.controller';

describe('BranchsController', () => {
  let controller: BranchsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchsController],
    }).compile();

    controller = module.get<BranchsController>(BranchsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
