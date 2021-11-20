import { Test, TestingModule } from '@nestjs/testing';
import { PersonalsService } from './personals.service';

describe('PersonalsService', () => {
  let service: PersonalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalsService],
    }).compile();

    service = module.get<PersonalsService>(PersonalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
