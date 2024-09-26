import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { RatingsModule } from '../ratings/ratings.module';
import { Recipe } from './entities/recipe.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { IsSlugUniqueConstraint } from './validators/is-slug-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), CommonModule, RatingsModule],
  controllers: [RecipesController],
  providers: [RecipesService, IsSlugUniqueConstraint],
  exports: [RecipesService],
})
export class RecipesModule {}
