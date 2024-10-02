import { Test, TestingModule } from '@nestjs/testing';
import { CommentTransformerService } from './comment-transformer.service';

describe('CommentTransformerService', () => {
  let service: CommentTransformerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentTransformerService],
    }).compile();

    service = module.get<CommentTransformerService>(CommentTransformerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
