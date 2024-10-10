import { Test, TestingModule } from '@nestjs/testing';
import { CommentsDataExportService } from './comments-data-export.service';

describe('CommentsDataExportService', () => {
  let service: CommentsDataExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsDataExportService],
    }).compile();

    service = module.get<CommentsDataExportService>(CommentsDataExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
