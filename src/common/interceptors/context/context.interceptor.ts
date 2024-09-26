import { RequestContext } from '@medibloc/nestjs-request-context';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyRequestContext } from '../../models/my-request-context/my-request-context.model';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const myCtx: MyRequestContext = RequestContext.get();

    myCtx.params = request.params;
    myCtx.query = request.query;
    myCtx.headers = request.headers;
    myCtx.body = request.body;

    return next.handle();
  }
}
