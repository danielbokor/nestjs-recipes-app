import { Test, TestingModule } from '@nestjs/testing';
import { ExportRecipesCommand } from './export-recipes-command';

describe('ExportRecipesCommand', () => {
  let provider: ExportRecipesCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportRecipesCommand],
    }).compile();

    provider = module.get<ExportRecipesCommand>(ExportRecipesCommand);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
