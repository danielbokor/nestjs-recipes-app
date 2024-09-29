import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return data;
        }

        if (data.hasOwnProperty('image')) {
          data.image = `http://localhost:3000/uploads/${data.image}`;
        }

        if (Array.isArray(data)) {
          return data.map((item) => {
            if (item.hasOwnProperty('image')) {
              item.image = `http://localhost:3000/uploads/${item.image}`;
            }
            return item;
          });
        }

        if (data.hasOwnProperty('data') && Array.isArray(data.data)) {
          return {
            ...data,
            data: data.data.map((item) => {
              if (item.hasOwnProperty('image')) {
                item.image = `http://localhost:3000/uploads/${item.image}`;
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
