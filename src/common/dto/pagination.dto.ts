import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be a positive integer' })
  @Min(1, { message: 'Page number cannot be less than 1' })
  readonly page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be a positive integer' })
  @Min(1, { message: 'Limit cannot be less than 1' })
  readonly limit?: number;
}
