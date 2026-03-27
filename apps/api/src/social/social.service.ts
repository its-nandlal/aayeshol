import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

// Response types define karo
interface LinkedInTokenResponse {
  access_token: string;
}

export interface LinkedInProfileResponse {
  sub: string;
  name: string;
  email: string;
  picture: string; // ✅ LinkedIn image field
}

@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService) {}

  getLinkedInAuthUrl(): string {
    const clientId = process.env.LINKEDIN_CLIENT_ID ?? '';
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI ?? '';
    const scope = 'openid profile email w_member_social';

    return (
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`
    );
  }

  async getAccessToken(code: string): Promise<string> {
    const response = await axios.post<LinkedInTokenResponse>(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI ?? '',
        client_id: process.env.LINKEDIN_CLIENT_ID ?? '',
        client_secret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    return response.data.access_token;
  }

  async getLinkedInProfile(
    accessToken: string,
  ): Promise<LinkedInProfileResponse> {
    const response = await axios.get<LinkedInProfileResponse>(
      'https://api.linkedin.com/v2/userinfo',
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return response.data;
  }

  async saveLinkedInAccount(
    userId: string,
    accessToken: string,
    profile: LinkedInProfileResponse,
  ) {
    const data = {
      provider: 'linkedin',
      accessToken,
      providerAccountId: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      userId,
    };

    const existing = await this.prisma.socialAccount.findFirst({
      where: { userId, provider: 'linkedin' },
    });

    if (existing) {
      return this.prisma.socialAccount.update({
        where: { id: existing.id },
        data: data,
      });
    }

    return this.prisma.socialAccount.create({
      data: data,
    });
  }

  async getUserAccounts(userId: string) {
    const accounts = await this.prisma.socialAccount.findMany({
      where: { userId },
      select: {
        provider: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    const findAccount = (provider: string) => {
      const account = accounts.find((a) => a.provider === provider);
      if (!account) return { connected: false };

      return {
        connected: true,
        name: account.name,
        email: account.email,
        image: account.image,
        connectedAt: account.createdAt,
      };
    };

    return {
      linkedin: findAccount('linkedin'),
      instagram: findAccount('instagram'),
      facebook: findAccount('facebook'),
      twitter: findAccount('twitter'),
    };
  }
}
