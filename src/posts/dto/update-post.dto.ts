import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: 'Body must be at least 10 characters long' })
  body?: string;

  @IsString()
  @IsOptional()
  author?: string;
}
