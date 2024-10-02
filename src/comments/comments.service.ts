import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../recipes/entities/recipe.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOneBy({ id });
  }

  async create(
    recipe: Recipe,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      recipe,
    });

    return this.commentRepository.save(comment);
  }

  async findByRecipe(recipe: Recipe): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        recipe: {
          id: recipe.id,
        },
      },
    });
  }
}
