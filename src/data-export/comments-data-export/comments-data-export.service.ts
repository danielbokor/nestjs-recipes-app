import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Injectable()
export class CommentsDataExportService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async export(): Promise<void> {
    const comments = await this.commentRepository.find();

    const directoryPath = 'seed-data';
    const filePath = `${directoryPath}/comments.json`;

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath);
    }

    writeFileSync(filePath, JSON.stringify(comments, null, 2));
    console.log(`Data exported to ${filePath}`);
  }
}
