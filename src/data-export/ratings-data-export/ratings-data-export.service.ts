import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Rating } from '../../ratings/entities/rating.entity';

@Injectable()
export class RatingsDataExportService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async export(): Promise<void> {
    const ratings = await this.ratingRepository.find();

    const directoryPath = 'seed-data';
    const filePath = `${directoryPath}/ratings.json`;

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath);
    }

    writeFileSync(filePath, JSON.stringify(ratings, null, 2));
    console.log(`Data exported to ${filePath}`);
  }
}
