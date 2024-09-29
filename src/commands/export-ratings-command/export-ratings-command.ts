import { Command, CommandRunner } from 'nest-commander';
import { RatingsDataExportService } from '../../data-export/ratings-data-export/ratings-data-export.service';

@Command({
  name: 'export-ratings',
  description: 'Export ratings data from database',
})
export class ExportRatingsCommand extends CommandRunner {
  constructor(private readonly dataExportService: RatingsDataExportService) {
    super();
  }

  async run(): Promise<void> {
    await this.dataExportService.export();
    console.log('Ratings data has been exported.');
  }
}
