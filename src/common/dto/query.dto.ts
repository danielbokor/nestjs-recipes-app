import { IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsString({ message: 'Query must be a string' })
  readonly query?: string;
}
