import { Command, CommandRunner } from 'nest-commander';
import { RecipesDataExportService } from '../../data-export/recipes-data-export/recipes-data-export.service';

@Command({
  name: 'export-recipes',
  description: 'Export recipes data from database',
})
export class ExportRecipesCommand extends CommandRunner {
  constructor(private readonly dataExportService: RecipesDataExportService) {
    super();
  }

  async run(): Promise<void> {
    await this.dataExportService.export();
    console.log('Recipes data has been exported.');
  }
}
