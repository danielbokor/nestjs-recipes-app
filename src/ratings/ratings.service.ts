import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../recipes/entities/recipe.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async create(
    recipe: Recipe,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    return this.ratingRepository.save({
      ...createRatingDto,
      recipe,
    });
  }

  async findByRecipe(recipe: Recipe): Promise<Rating[]> {
    return this.ratingRepository.find({
      where: {
        recipe: {
          id: recipe.id,
        },
      },
    });
  }
}
