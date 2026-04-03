import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CreatePostDto } from 'src/social/schemas/social.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // Route 1: User ke posts fetch karo
  @Get('/')
  async getPosts(
    @Session() session: UserSession,
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    const userId = session.user.id;
    const pageNumber = parseInt(page) || 1;
    const perPageNumber = parseInt(perPage) || 10;
    return await this.postService.getUserPosts(
      userId,
      pageNumber,
      perPageNumber,
    );
  }

  // Route 2: Post create karo
  @Post('publish')
  async publishPost(
    @Session() session: UserSession,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = session.user.id;
    return await this.postService.publishPost(userId, createPostDto);
  }

  // Route 3: Post draft save karo
  @Post('savedraft')
  async saveDraft(
    @Session() session: UserSession,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = session.user.id;
    return await this.postService.saveDraftPost(userId, createPostDto);
  }

  // Route 4: Post delete karo
  @Post('delete')
  async deletePost(
    @Session() session: UserSession,
    @Body('postId') postId: string,
  ) {
    const userId = session.user.id;
    if (!postId) {
      throw new BadRequestException('postId is required');
    }
    return await this.postService.deletePost(userId, postId);
  }
}
