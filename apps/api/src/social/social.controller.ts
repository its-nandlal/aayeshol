import { Controller, Get, Query, Req, Res, Session } from '@nestjs/common';
import type { Response, Request } from 'express';
import { SocialService } from './social.service';
import type { UserSession } from '@thallesp/nestjs-better-auth';

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

  @Get('accounts')
  async getAccounrs(@Session() session: UserSession) {
    const userId = session.user.id;
    return this.socialService.getUserAccounts(userId);
  }
}
