import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Injectable()
export class RecipesDataImportService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async import(): Promise<void> {
    const filePath = 'seed-data/recipes.json';
    const fileContent = readFileSync(filePath, 'utf-8');
    const recipes = JSON.parse(fileContent);

    for (const recipeData of recipes) {
      const recipe = this.recipeRepository.create(recipeData);
      await this.recipeRepository.save(recipe);
    }
    console.log(`Data imported from ${filePath}`);
  }
}
