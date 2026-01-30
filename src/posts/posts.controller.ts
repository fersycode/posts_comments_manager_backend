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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse } from '../common/utils/api-response.util';
import { Public } from '../auth/decorators/public.decorator';
import { multerConfig } from '../common/config/multer.config';

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

  @Post('upload-image')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    // Return the file information
    const imageData = {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: `/uploads/posts/${file.filename}`,
      url: `http://localhost:3000/uploads/posts/${file.filename}`,
    };

    return ApiResponse.success(
      imageData,
      'Image uploaded successfully',
    );
  }

  @Post('with-image')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createWithImage(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imagePath: string | null = null;
    
    if (file) {
      imagePath = `/uploads/posts/${file.filename}`;
    }

    const post = await this.postsService.createWithImage(createPostDto, imagePath);
    return ApiResponse.created(post, 'Post created successfully with image');
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
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imagePath: string | null = updatePostDto['image'] || null; // Keep existing image if no new one
    
    if (file) {
      imagePath = `/uploads/posts/${file.filename}`;
    }

    const post = await this.postsService.updateWithImage(id, updatePostDto, imagePath);
    return ApiResponse.success(post, 'Post updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return ApiResponse.deleted('Post deleted successfully');
  }
}