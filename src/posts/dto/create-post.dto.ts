import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Body must be at least 10 characters long' })
  body: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}
