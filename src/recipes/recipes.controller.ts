import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import { RatingsService } from '../ratings/ratings.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FindOneParamsDto } from './dto/find-one-params.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { DecodeInterceptor } from './interceptors/decode-interceptor/decode-interceptor.interceptor';
import { RecipesService } from './recipes.service';

@Controller('recipes')
@ApiTags('recipes')
@UseInterceptors(DecodeInterceptor)
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly ratingsService: RatingsService,
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
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Recipe> {
    const imageFilename = image.filename;
    const recipe = await this.recipesService.create(
      createRecipeDto,
      imageFilename,
    );

    const imageUrl = `http://localhost:3000/uploads/${recipe.image}`;
    return { ...recipe, image: imageUrl };
  }

  @Post(':id/ratings')
  async rateRecipe(
    @Param() { id }: FindOneParamsDto,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.findOne(id);

    await this.ratingsService.create(recipe, createRatingDto);
    const ratings = await this.ratingsService.findByRecipe(recipe);

    const updatedRecipe = await this.recipesService.calculateRatings(
      id,
      ratings,
    );

    const imageUrl = `http://localhost:3000/uploads/${recipe.image}`;
    return { ...updatedRecipe, image: imageUrl };
  }

  @Get()
  async findAll(): Promise<Recipe[]> {
    const recipes = await this.recipesService.findAll();

    return recipes.map((recipe) => {
      const imageUrl = `http://localhost:3000/uploads/${recipe.image}`;
      return { ...recipe, image: imageUrl };
    });
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParamsDto): Promise<Recipe> {
    const recipe = await this.recipesService.findOne(id);

    const imageUrl = `http://localhost:3000/uploads/${recipe.image}`;
    return { ...recipe, image: imageUrl };
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

      const oldImagePath = join(__dirname, '..', '..', 'uploads', recipe.image);
      try {
        unlinkSync(oldImagePath);
      } catch (error) {
        console.warn('Error deleting old image:', error.message);
      }
    }

    const updatedRecipe = await this.recipesService.update(
      id,
      updateRecipeDto,
      imageFilename,
    );

    const imageUrl = `http://localhost:3000/uploads/${updatedRecipe.image}`;
    return { ...updatedRecipe, image: imageUrl };
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParamsDto): Promise<void> {
    const recipe = await this.recipesService.findOne(id);

    const imagePath = join(__dirname, '..', '..', 'uploads', recipe.image);
    try {
      unlinkSync(imagePath);
    } catch (error) {
      console.warn('Error deleting image:', error.message);
    }

    this.recipesService.remove(id);
  }
}
