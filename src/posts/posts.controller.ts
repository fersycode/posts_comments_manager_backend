import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse } from '../common/utils/api-response.util';
import { Public } from '../auth/decorators/public.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);
    return ApiResponse.created(post, 'Post created successfully');
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  async createBulk(@Body() createPostDtos: CreatePostDto[]) {
    const posts = await this.postsService.createBulk(createPostDtos);
    return ApiResponse.created(
      posts,
      `${posts.length} posts created successfully`,
    );
  }

  @Public()
  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return ApiResponse.success(posts, 'Posts retrieved successfully');
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return ApiResponse.success(post, 'Post retrieved successfully');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.update(id, updatePostDto);
    return ApiResponse.success(post, 'Post updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return ApiResponse.deleted('Post deleted successfully');
  }
}