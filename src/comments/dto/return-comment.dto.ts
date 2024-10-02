import { Exclude, Expose } from 'class-transformer';
import { Comment } from '../entities/comment.entity';

export class ReturnCommentDto extends Comment {
  @Exclude()
  recipe: any;

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  comment: string;

  @Expose()
  createdAt: Date;
}
