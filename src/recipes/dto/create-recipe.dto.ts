import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import * as he from 'he';
import { IsSlugUnique } from '../validators/is-slug-unique.validator';

export class CreateRecipeDto {
  @IsString()
  @Transform(({ value }) => he.encode(value.trim()))
  readonly name: string;

  @IsString()
  @IsSlugUnique()
  @Transform(({ value }) => he.encode(value.trim()))
  readonly slug: string;

  @IsString()
  @Transform(({ value }) => he.encode(value.trim()))
  readonly description: string;

  @IsString()
  @Transform(({ value }) => he.encode(value.trim()))
  readonly ingredients: string;

  @IsString()
  @Transform(({ value }) => he.encode(value.trim()))
  readonly directions: string;
}
