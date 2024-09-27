import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import * as he from 'he';
import { IsRecipeIdExists } from '../validators/is-recipe-id-exists.validator';

export class FindOneParamsDto {
  @IsString()
  @Transform(({ value }) => he.decode(value.trim()))
  @IsRecipeIdExists()
  id: string;
}
