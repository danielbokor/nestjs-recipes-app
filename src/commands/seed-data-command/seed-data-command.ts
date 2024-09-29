import { Command, CommandRunner } from 'nest-commander';
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
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('Starting seed command...');
    await this.recipesDataImportService.import();
    await this.ratingsDataImportService.import();
    console.log('Data has been seeded.');
  }
}
