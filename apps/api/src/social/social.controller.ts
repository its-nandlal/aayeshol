import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { SocialService } from './social.service';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CreatePostDto } from './schemas/social.schema';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  // Route 1: LinkedIn Auth URL pe redirect karo
  @Get('linkedin')
  connectLinkedIn(@Res() res: Response): void {
    const url = this.socialService.getLinkedInAuthUrl();
    res.redirect(url);
  }

  // Route 2: LinkedIn callback — code aayega yahan
  @Get('linkedin/callback')
  async linkedInCallback(
    @Query('code') code: string,
    @Query('error') error: string,
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: UserSession,
  ): Promise<void> {
    const frontendUrl = process.env.FRONTEND_URL;

    if (error) {
      res.redirect(`${frontendUrl}/dashboard/accounts?error=cancelled`);
      return;
    }

    try {
      const userId: string = session.user.id;
      const accessToken = await this.socialService.getAccessToken(code);
      const profile = await this.socialService.getLinkedInProfile(accessToken);
      await this.socialService.saveLinkedInAccount(
        userId,
        accessToken,
        profile,
      );

      res.redirect(`${frontendUrl}/dashboard/accounts?linkedin=connected`);
    } catch (err) {
      console.error('LinkedIn callback error:', err);
      res.redirect(`${frontendUrl}/dashboard/accounts?error=failed`);
    }
  }

  // Route 3: User ke connected accounts fetch karo
  @Get('accounts')
  async getAccounrs(@Session() session: UserSession) {
    const userId = session.user.id;
    return this.socialService.getUserAccounts(userId);
  }

  // Route 4: Post create karo
  @Post('post/publish')
  async publishPost(
    @Session() session: UserSession,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = session.user.id;
    return await this.socialService.publishPost(userId, createPostDto);
  }

  // Route 5: Post draft save karo
  @Post('post/savedraft')
  async saveDraft(
    @Session() session: UserSession,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = session.user.id;
    return await this.socialService.saveDraftPost(userId, createPostDto);
  }

  // Route 6: User ke posts fetch karo
  @Get('posts')
  async getPosts(
    @Session() session: UserSession,
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    const userId = session.user.id;
    const pageNumber = parseInt(page) || 1;
    const perPageNumber = parseInt(perPage) || 10;
    return await this.socialService.getUserPosts(
      userId,
      pageNumber,
      perPageNumber,
    );
  }

  // Route 7: Post delete karo
  @Post('post/delete')
  async deletePost(
    @Session() session: UserSession,
    @Body('postId') postId: string,
  ) {
    const userId = session.user.id;
    if (!postId) {
      throw new BadRequestException('postId is required');
    }
    return await this.socialService.deletePost(userId, postId);
  }
}
