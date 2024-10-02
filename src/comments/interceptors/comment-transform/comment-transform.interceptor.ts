import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../../entities/comment.entity';
import { CommentTransformerService } from '../../transformers/comment-transformer/comment-transformer.service';

@Injectable()
export class CommentTransformInterceptor implements NestInterceptor {
  constructor(
    private readonly commentTransformerService: CommentTransformerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Comment) {
          return this.commentTransformerService.toDto(data);
        }

        return data;
      }),
    );
  }
}
