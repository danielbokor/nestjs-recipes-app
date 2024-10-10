import { Command, CommandRunner } from 'nest-commander';
import { CommentsDataImportService } from '../../data-import/comments-data-import/comments-data-import.service';
import { RatingsDataImportService } from '../../data-import/ratings-data-import/ratings-data-import.service';
import { RecipesDataImportService } from '../../data-import/recipes-data-import/recipes-data-import.service';

@Command({
  name: 'seed',
  description: 'Import (seed) data into the database',
})
export class SeedDataCommand extends CommandRunner {
  constructor(
    private readonly recipesDataImportService: RecipesDataImportService,
    private readonly ratingsDataImportService: RatingsDataImportService,
    private readonly commentsDataImportService: CommentsDataImportService,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('Starting seed command...');
    await this.recipesDataImportService.import();
    await this.ratingsDataImportService.import();
    await this.commentsDataImportService.import();
    console.log('Data has been seeded.');
  }
}
