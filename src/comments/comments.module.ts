import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CommentTransformerService } from './transformers/comment-transformer/comment-transformer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [],
  providers: [CommentsService, CommentTransformerService],
  exports: [CommentsService, CommentTransformerService],
})
export class CommentsModule {}
