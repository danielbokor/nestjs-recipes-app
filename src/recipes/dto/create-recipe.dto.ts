import { IsString } from 'class-validator';
import { IsSlugUnique } from '../validators/is-slug-unique.validator';

export class CreateRecipeDto {
  @IsString()
  name: string;

  @IsString()
  @IsSlugUnique()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  ingredients: string;

  @IsString()
  directions: string;
}
