import { Test, TestingModule } from '@nestjs/testing';
import { RecipesDataExportService } from './recipes-data-export.service';

describe('RecipesDataExportService', () => {
  let service: RecipesDataExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesDataExportService],
    }).compile();

    service = module.get<RecipesDataExportService>(RecipesDataExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
