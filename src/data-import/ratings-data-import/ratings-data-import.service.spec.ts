import { Test, TestingModule } from '@nestjs/testing';
import { RatingsDataImportService } from './ratings-data-import.service';

describe('RatingsDataImportService', () => {
  let service: RatingsDataImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingsDataImportService],
    }).compile();

    service = module.get<RatingsDataImportService>(RatingsDataImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
