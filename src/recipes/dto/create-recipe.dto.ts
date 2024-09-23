import { IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  ingredients: string;

  @IsString()
  directions: string;
}
