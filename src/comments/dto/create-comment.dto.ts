import { IsEmail, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly comment: string;
}
