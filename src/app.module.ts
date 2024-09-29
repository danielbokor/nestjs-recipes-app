import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandRunnerModule } from 'nest-commander';
import { join } from 'path';
import { ExportRatingsCommand } from './commands/export-ratings-command/export-ratings-command';
import { ExportRecipesCommand } from './commands/export-recipes-command/export-recipes-command';
import { SeedDataCommand } from './commands/seed-data-command/seed-data-command';
import { CommonModule } from './common/common.module';
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
        entities: [Recipe, Rating],
        synchronize: true, // Ensure this is set to false for migrations
        // migrations: [__dirname + '/../migrations/*.{ts,js}'],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Rating, Recipe]),
    forwardRef(() => RecipesModule),
    forwardRef(() => CommonModule),
    forwardRef(() => RatingsModule),
  ],
  controllers: [],
  providers: [
    ExportRatingsCommand,
    ExportRecipesCommand,
    SeedDataCommand,
    RatingsDataImportService,
  ],
})
export class AppModule {}
