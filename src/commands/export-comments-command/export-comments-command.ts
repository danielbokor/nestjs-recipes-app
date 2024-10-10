import { Command, CommandRunner } from 'nest-commander';
import { CommentsDataExportService } from '../../data-export/comments-data-export/comments-data-export.service';

@Command({
  name: 'export-comments',
  description: 'Export comments data from database',
})
export class ExportCommentsCommand extends CommandRunner {
  constructor(private readonly dataExportService: CommentsDataExportService) {
    super();
  }

  async run(): Promise<void> {
    await this.dataExportService.export();
    console.log('Comments data has been exported.');
  }
}
