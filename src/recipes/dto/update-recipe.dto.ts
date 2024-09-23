import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  name: string;
  description: string;
  ingredients: string;
  directions: string;
  imageUrl: string;
}
