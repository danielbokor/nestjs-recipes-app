import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../ratings/entities/rating.entity';
import { RatingsService } from '../ratings/ratings.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,

    @Inject(forwardRef(() => RatingsService))
    private readonly ratingsService: RatingsService,
  ) {}

  async create(
    createRecipeDto: CreateRecipeDto,
    imageFilename: string,
  ): Promise<Recipe> {
    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      image: imageFilename,
    });

    return this.recipeRepository.save(recipe);
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async findOne(id: string): Promise<Recipe> {
    return this.recipeRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
    imageFilename: string,
  ): Promise<Recipe> {
    await this.recipeRepository.save({
      id,
      ...updateRecipeDto,
      image: imageFilename,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    this.recipeRepository.delete(id);
  }

  async findBySlug(slug: string): Promise<Recipe> {
    return this.recipeRepository.findOne({ where: { slug } });
  }

  async calculateRatings(id: string, ratings: Rating[]): Promise<Recipe> {
    const recipe = await this.findOne(id);

    const sumRating = ratings.reduce((acc, entry) => {
      return acc + entry.rating;
    }, 0);
    const avgRating = sumRating / ratings.length;

    await this.recipeRepository.save({
      ...recipe,
      rating: avgRating,
    });

    return this.findOne(id);
  }
}
