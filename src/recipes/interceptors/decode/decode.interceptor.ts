import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as he from 'he';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DecodeInterceptor implements NestInterceptor {
  private decodeData(data: any) {
    if (typeof data === 'string') {
      return he.decode(data);
    }

    if (Array.isArray(data)) {
      return data.map((subItem) => this.decodeData(subItem));
    }

    if (typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] === 'string') {
          data[key] = this.decodeData(data[key]);
        }
      }
    }

    return data;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return data;
        }

        return this.decodeData(data);
      }),
    );
  }
}
