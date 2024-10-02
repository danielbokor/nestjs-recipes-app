import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReturnCommentDto } from '../../dto/return-comment.dto';
import { Comment } from '../../entities/comment.entity';

@Injectable()
export class CommentTransformerService {
  toDto(comment: Comment): ReturnCommentDto {
    return plainToInstance(ReturnCommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }
}
