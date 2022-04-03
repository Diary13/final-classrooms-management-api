import { Test, TestingModule } from '@nestjs/testing';
import { SendMailController } from './send-mail.controller';

describe('SendMailController', () => {
  let controller: SendMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendMailController],
    }).compile();

    controller = module.get<SendMailController>(SendMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
