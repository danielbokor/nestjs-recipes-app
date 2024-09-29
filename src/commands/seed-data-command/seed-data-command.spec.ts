import { Test, TestingModule } from '@nestjs/testing';
import { SeedDataCommand } from './seed-data-command';

describe('SeedDataCommand', () => {
  let provider: SeedDataCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedDataCommand],
    }).compile();

    provider = module.get<SeedDataCommand>(SeedDataCommand);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
