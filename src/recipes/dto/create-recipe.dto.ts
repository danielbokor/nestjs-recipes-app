import { IsString } from 'class-validator';
import { IsSlugUnique } from '../validators/is-slug-unique.validator';

export class CreateRecipeDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsSlugUnique()
  readonly slug: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly ingredients: string;

  @IsString()
  readonly directions: string;
}
