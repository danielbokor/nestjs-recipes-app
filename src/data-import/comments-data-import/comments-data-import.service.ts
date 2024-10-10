import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Injectable()
export class CommentsDataImportService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async import(): Promise<void> {
    const filePath = 'seed-data/comments.json';
    const fileContent = readFileSync(filePath, 'utf-8');
    const comments = JSON.parse(fileContent);

    for (const commentData of comments) {
      const recipe = await this.recipeRepository.findOneBy({
        id: commentData.recipe_id,
      });

      if (recipe) {
        const comment = this.commentRepository.create({
          ...commentData,
          recipe,
        });
        await this.commentRepository.save(comment);
      } else {
        console.error(`Recipe with ID ${commentData.recipe_id} not found`);
      }
    }
    console.log(`Data imported from ${filePath}`);
  }
}
