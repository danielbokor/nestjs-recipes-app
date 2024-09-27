import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { RecipesService } from '../recipes.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRecipeIdExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly recipesService: RecipesService) {}

  async validate(id: string) {
    try {
      const recipe = await this.recipesService.findOne(id);

      if (!recipe) {
        throw new NotFoundException();
      }

      return true;
    } catch (e) {
      throw new NotFoundException('Recipe not found');
    }
  }
}

export function IsRecipeIdExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRecipeIdExistsConstraint,
    });
  };
}
