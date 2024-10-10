import { Command, CommandRunner } from 'nest-commander';
import { CommentsDataImportService } from '../../data-import/comments-data-import/comments-data-import.service';

@Command({
  name: 'seed-comments',
  description: 'Seed comments data into the database',
})
export class SeedCommentsCommand extends CommandRunner {
  constructor(
    private readonly commentsDataImportService: CommentsDataImportService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.commentsDataImportService.import();
    console.log('Comments data has been seeded.');
  }
}
