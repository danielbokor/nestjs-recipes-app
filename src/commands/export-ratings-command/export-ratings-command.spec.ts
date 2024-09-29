import { Test, TestingModule } from '@nestjs/testing';
import { ExportRatingsCommand } from './export-ratings-command';

describe('ExportRatingsCommand', () => {
  let provider: ExportRatingsCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportRatingsCommand],
    }).compile();

    provider = module.get<ExportRatingsCommand>(ExportRatingsCommand);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
