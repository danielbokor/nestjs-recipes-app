import { Test, TestingModule } from '@nestjs/testing';
import { RatingsDataExportService } from './ratings-data-export.service';

describe('RatingsDataExportService', () => {
  let service: RatingsDataExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingsDataExportService],
    }).compile();

    service = module.get<RatingsDataExportService>(RatingsDataExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
