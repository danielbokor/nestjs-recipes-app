import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { RatingsDataExportService } from '../data-export/ratings-data-export/ratings-data-export.service';
import { RecipesModule } from '../recipes/recipes.module';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating]),
    forwardRef(() => CommonModule),
    forwardRef(() => RecipesModule),
  ],
  providers: [
    RatingsService,
    RatingsDataExportService,
    // RatingsDataImportService,
  ],
  exports: [RatingsService, RatingsDataExportService],
})
export class RatingsModule {}
