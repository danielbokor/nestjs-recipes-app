import { Test, TestingModule } from '@nestjs/testing';
import { CommentsDataImportService } from './comments-data-import.service';

describe('CommentsDataImportService', () => {
  let service: CommentsDataImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsDataImportService],
    }).compile();

    service = module.get<CommentsDataImportService>(CommentsDataImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
