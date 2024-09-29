import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Injectable()
export class RecipesDataExportService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async export(): Promise<void> {
    const recipes = await this.recipeRepository.find();

    const directoryPath = 'seed-data';
    const filePath = `${directoryPath}/recipes.json`;

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath);
    }

    writeFileSync(filePath, JSON.stringify(recipes, null, 2));
    console.log(`Data exported to ${filePath}`);
  }
}
