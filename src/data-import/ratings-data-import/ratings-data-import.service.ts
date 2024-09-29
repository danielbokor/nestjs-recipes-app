// src/data-import/recipes-data-import/recipes-data-import.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Rating } from '../../ratings/entities/rating.entity';

@Injectable()
export class RatingsDataImportService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async import(): Promise<void> {
    const filePath = 'seed-data/ratings.json';
    const fileContent = readFileSync(filePath, 'utf-8');
    const ratings = JSON.parse(fileContent);

    for (const ratingData of ratings) {
      const recipe = this.ratingRepository.create(ratingData);
      await this.ratingRepository.save(recipe);
    }
    console.log(`Data imported from ${filePath}`);
  }
}
