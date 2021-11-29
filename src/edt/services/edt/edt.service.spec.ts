import { Test, TestingModule } from '@nestjs/testing';
import { EdtService } from './edt.service';

describe('EdtService', () => {
  let service: EdtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdtService],
    }).compile();

    service = module.get<EdtService>(EdtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
