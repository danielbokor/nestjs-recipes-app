// src/data-import/recipes-data-import/recipes-data-import.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Rating } from '../../ratings/entities/rating.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Injectable()
export class RatingsDataImportService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,

    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async import(): Promise<void> {
    const filePath = 'seed-data/ratings.json';
    const fileContent = readFileSync(filePath, 'utf-8');
    const ratings = JSON.parse(fileContent);

    for (const ratingData of ratings) {
      const recipe = await this.recipeRepository.findOneBy({
        id: ratingData.recipe_id,
      });

      if (recipe) {
        const rating = this.ratingRepository.create({
          ...ratingData,
          recipe,
        });
        await this.ratingRepository.save(rating);
      } else {
        console.error(`Recipe with ID ${ratingData.recipe_id} not found`);
      }
    }
    console.log(`Data imported from ${filePath}`);
  }
}
