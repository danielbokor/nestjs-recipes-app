import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CommentTransformInterceptor } from '../comments/interceptors/comment-transform/comment-transform.interceptor';
import { PaginationDto } from '../common/dto/pagination.dto';
import { QueryDto } from '../common/dto/query.dto';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import { Rating } from '../ratings/entities/rating.entity';
import { RatingsService } from '../ratings/ratings.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FindOneParamsDto } from './dto/find-one-params.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { DecodeInterceptor } from './interceptors/decode/decode.interceptor';
import { ImageInterceptor } from './interceptors/image/image.interceptor';
import { RecipesService } from './recipes.service';

@Controller('recipes')
@ApiTags('recipes')
@UseInterceptors(DecodeInterceptor)
@UseInterceptors(ImageInterceptor)
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly ratingsService: RatingsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        ingredients: { type: 'string' },
        directions: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(2)
            .fill(null)
            .map(() => (Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Recipe> {
    const imageFilename = image && image.filename;
    return this.recipesService.create(createRecipeDto, imageFilename);
  }

  @Get()
  async findAll(@Query() { limit, page, query }: PaginationDto & QueryDto) {
    return this.recipesService.findAll({ page, limit, query });
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'Recipe not found.',
  })
  async findOne(@Param() { id }: FindOneParamsDto): Promise<Recipe> {
    return this.recipesService.findOne(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        ingredients: { type: 'string' },
        directions: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Recipe not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(2)
            .fill(null)
            .map(() => (Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.findOne(id);

    let imageFilename = recipe.image;

    if (image) {
      imageFilename = image.filename;

      if (recipe.image) {
        const oldImagePath = join(
          __dirname,
          '..',
          '..',
          'uploads',
          recipe.image,
        );
        try {
          unlinkSync(oldImagePath);
        } catch (error) {
          console.warn('Error deleting old image:', error.message);
        }
      }
    }

    return this.recipesService.update(id, updateRecipeDto, imageFilename);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Recipe deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Recipe not found.',
  })
  async remove(@Param() { id }: FindOneParamsDto): Promise<void> {
    const recipe = await this.recipesService.findOne(id);

    if (recipe.image) {
      const imagePath = join(__dirname, '..', '..', 'uploads', recipe.image);
      try {
        unlinkSync(imagePath);
      } catch (error) {
        console.warn('Error deleting image:', error.message);
      }
    }

    this.recipesService.remove(id);
  }

  @Post(':id/ratings')
  @ApiNotFoundResponse({
    description: 'Recipe not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  async createRating(
    @Param() { id }: FindOneParamsDto,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.findOne(id);

    await this.ratingsService.create(recipe, createRatingDto);
    const ratings = await this.ratingsService.findByRecipe(recipe);

    return this.recipesService.calculateRatings(id, ratings);
  }

  @Get(':id/ratings')
  @ApiNotFoundResponse({
    description: 'Recipe not found.',
  })
  async getRecipeRatings(@Param() { id }: FindOneParamsDto): Promise<Rating[]> {
    const recipe = await this.recipesService.findOne(id);

    return this.ratingsService.findByRecipe(recipe);
  }

  @Get(':id/rating')
  async getRating(@Param() { id }: FindOneParamsDto) {
    return this.recipesService.getRating(id);
  }

  @Post(':id/comments')
  @UseInterceptors(CommentTransformInterceptor)
  async createComment(
    @Param() { id }: FindOneParamsDto,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const recipe = await this.recipesService.findOne(id);

    return this.commentsService.create(recipe, createCommentDto);
  }

  @Get(':id/comments')
  async getRecipeComments(@Param() { id }: FindOneParamsDto) {
    const recipe = await this.recipesService.findOne(id);
    return this.commentsService.findByRecipe(recipe);
  }
}
