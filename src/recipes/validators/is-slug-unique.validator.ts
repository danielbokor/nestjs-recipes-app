import { RequestContext } from '@medibloc/nestjs-request-context';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MyRequestContext } from '../../common/models/my-request-context/my-request-context.model';
import { RecipesService } from '../recipes.service';

@ValidatorConstraint()
@Injectable()
export class IsSlugUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly recipesService: RecipesService) {}

  async validate(slug: string) {
    const ctx: MyRequestContext = RequestContext.get();

    const recipe = await this.recipesService.findBySlug(slug);

    if (ctx.params.id === recipe?.id) {
      return true;
    }

    return !recipe;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be unique`;
  }
}

export function IsSlugUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSlugUniqueConstraint,
    });
  };
}
