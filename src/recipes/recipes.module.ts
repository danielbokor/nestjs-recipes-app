import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from '../comments/comments.module';
import { CommonModule } from '../common/common.module';
import { RecipesDataExportService } from '../data-export/recipes-data-export/recipes-data-export.service';
import { RecipesDataImportService } from '../data-import/recipes-data-import/recipes-data-import.service';
import { Rating } from '../ratings/entities/rating.entity';
import { RatingsModule } from '../ratings/ratings.module';
import { Recipe } from './entities/recipe.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { IsRecipeIdExistsConstraint } from './validators/is-recipe-id-exists.validator';
import { IsSlugUniqueConstraint } from './validators/is-slug-unique.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Rating]),
    forwardRef(() => CommonModule),
    forwardRef(() => RatingsModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [RecipesController],
  providers: [
    RecipesService,
    IsSlugUniqueConstraint,
    IsRecipeIdExistsConstraint,
    RecipesDataExportService,
    RecipesDataImportService,
  ],
  exports: [RecipesService, RecipesDataExportService, RecipesDataImportService],
})
export class RecipesModule {}
