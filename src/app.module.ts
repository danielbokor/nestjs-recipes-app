import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandRunnerModule } from 'nest-commander';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExportCommentsCommand } from './commands/export-comments-command/export-comments-command';
import { ExportRatingsCommand } from './commands/export-ratings-command/export-ratings-command';
import { ExportRecipesCommand } from './commands/export-recipes-command/export-recipes-command';
import { SeedCommentsCommand } from './commands/seed-comments-command/seed-comments-command';
import { SeedDataCommand } from './commands/seed-data-command/seed-data-command';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { CommonModule } from './common/common.module';
import { CommentsDataExportService } from './data-export/comments-data-export/comments-data-export.service';
import { CommentsDataImportService } from './data-import/comments-data-import/comments-data-import.service';
import { RatingsDataImportService } from './data-import/ratings-data-import/ratings-data-import.service';
import { Rating } from './ratings/entities/rating.entity';
import { RatingsModule } from './ratings/ratings.module';
import { Recipe } from './recipes/entities/recipe.entity';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    CommandRunnerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.production.local',
        '.env.development.local',
        '.env.test.local',
        '.env.local',
        '.env.production',
        '.env.development',
        '.env.test',
        '.env',
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Recipe, Rating, Comment],
        synchronize: true, // Ensure this is set to false for migrations
        ssl: configService.get<string>('DATABASE_SSL')
          ? { rejectUnauthorized: false }
          : false,
        // migrations: [__dirname + '/../migrations/*.{ts,js}'],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Rating, Recipe, Comment]),
    forwardRef(() => RecipesModule),
    forwardRef(() => CommonModule),
    forwardRef(() => RatingsModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [AppController],
  providers: [
    ExportRatingsCommand,
    ExportRecipesCommand,
    ExportCommentsCommand,
    SeedDataCommand,
    SeedCommentsCommand,
    RatingsDataImportService,
    CommentsDataExportService,
    CommentsDataImportService,
    AppService,
  ],
})
export class AppModule {}
