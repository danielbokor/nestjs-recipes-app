import { Test, TestingModule } from '@nestjs/testing';
import { RecipesDataImportService } from './recipes-data-import.service';

describe('RecipesDataImportService', () => {
  let service: RecipesDataImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesDataImportService],
    }).compile();

    service = module.get<RecipesDataImportService>(RecipesDataImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
