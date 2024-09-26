import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  rating: number;

  @OneToMany(() => Rating, (rating) => rating.recipe)
  ratings: Rating[];
}
