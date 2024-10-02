import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  description: string;

  @Column()
  ingredients: string;

  @Column()
  directions: string;

  @Column({
    nullable: true,
  })
  image: string;

  @ApiProperty({ type: 'string', format: 'float' })
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  rating: number;

  @ApiHideProperty()
  @OneToMany(() => Rating, (rating) => rating.recipe)
  ratings: Rating[];

  @ApiHideProperty()
  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments: Comment[];
}
