import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse } from '../common/utils/api-response.util';
import { Public } from '../auth/decorators/public.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentsService.create(createCommentDto);
    return ApiResponse.created(comment, 'Comment created successfully');
  }

  @Public()
  @Get()
  async findByPostId(@Query('postId') postId: string) {
    const comments = await this.commentsService.findByPostId(postId);
    return ApiResponse.success(comments, 'Comments retrieved successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.commentsService.remove(id);
    return ApiResponse.deleted('Comment deleted successfully');
  }
}