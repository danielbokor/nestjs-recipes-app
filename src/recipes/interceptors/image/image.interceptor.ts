import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../../entities/recipe.entity';

@Injectable()
export class ImageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const hostname = `${req.protocol}://${req.get('Host')}`;

    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return data;
        }

        if (data instanceof Recipe && data.image) {
          data.image = `${hostname}/uploads/${data.image}`;
        }

        if (
          Array.isArray(data) &&
          data.every((item) => item instanceof Recipe)
        ) {
          return data.map((item) => {
            if (item.image) {
              item.image = `${hostname}/uploads/${item.image}`;
            }
            return item;
          });
        }

        if (
          data.hasOwnProperty('data') &&
          Array.isArray(data.data) &&
          data.data.every((item) => item instanceof Recipe)
        ) {
          return {
            ...data,
            data: data.data.map((item) => {
              if (item.image) {
                item.image = `${hostname}/uploads/${item.image}`;
              }
              return item;
            }),
          };
        }

        return data;
      }),
    );
  }
}
