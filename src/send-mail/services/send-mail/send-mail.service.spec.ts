import { Test, TestingModule } from '@nestjs/testing';
import { SendMailService } from './send-mail.service';

describe('SendMailService', () => {
  let service: SendMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMailService],
    }).compile();

    service = module.get<SendMailService>(SendMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
