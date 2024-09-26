import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), CommonModule],
  providers: [RatingsService],
  exports: [RatingsService],
})
export class RatingsModule {}
