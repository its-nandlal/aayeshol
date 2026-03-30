import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './schemas/social.schema';
import { Platform, PostStatus } from '@prisma/client';
import { htmlToLinkedInText } from './utils/html-to-text';
import { AiService } from 'src/ai/ai.service';

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
  constructor(
    private prisma: PrismaService,
    private aiTool: AiService,
  ) {}

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
      provider: Platform.LINKEDIN,
      accessToken,
      providerAccountId: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      userId,
    };

    const existing = await this.prisma.socialAccount.findFirst({
      where: { userId, provider: Platform.LINKEDIN },
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
      linkedin: findAccount('LINKEDIN'),
      instagram: findAccount('INSTAGRAM'),
      facebook: findAccount('FACEBOOK'),
      twitter: findAccount('TWITTER'),
    };
  }

  // Publish a post to the specified social platform

  async publishPost(userId: string, dto: CreatePostDto) {
    const { content, platform } = dto;
    const plainContent = htmlToLinkedInText(content);

    const socialAccount = await this.prisma.socialAccount.findUnique({
      where: { userId_provider: { userId, provider: platform } },
    });

    if (!socialAccount) {
      throw new NotFoundException(
        `No connected ${platform} account found for this user`,
      );
    }

    const title = 'New Post';
    let platformPostId: string | null = null;
    let status: PostStatus = PostStatus.PUBLISHED; // ✅ explicit type
    let failureReason: string | null = null;

    try {
      if (platform === Platform.LINKEDIN) {
        platformPostId = await this.publishToLinkedIn(
          socialAccount.accessToken,
          socialAccount.providerAccountId,
          plainContent,
        );
      } else {
        throw new BadRequestException(`${platform} not supported yet`);
      }
    } catch (error: unknown) {
      if (error instanceof BadRequestException) throw error;

      status = PostStatus.FAILED;
      failureReason = error instanceof Error ? error.message : 'Unknown error';
    }

    const post = await this.prisma.socialPost.create({
      data: {
        title,
        content,
        platform,
        platformPostId,
        publishedAt: status === PostStatus.PUBLISHED ? new Date() : null,
        status,
        userId,
        socialAccountId: socialAccount.id,
      },
    });

    if (status === PostStatus.FAILED) {
      throw new BadRequestException(
        `Post saved with FAILED status: ${failureReason}`,
      );
    }

    return post;
  }
  // --- LinkedIn API ------------------------
  private async publishToLinkedIn(
    accessToken: string,
    linkedinUserId: string,
    content: string,
  ): Promise<string> {
    const body = {
      author: `urn:li:person:${linkedinUserId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    try {
      const response = await axios.post(
        'https://api.linkedin.com/v2/ugcPosts',
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0',
          },
        },
      );

      const postId: string = response.headers['x-restli-id'];
      return postId ?? '';
    } catch (error) {
      const message = error?.response?.data?.message ?? error.message;
      throw new BadRequestException(`LinkedIn API error: ${message}`);
    }
  }

  // Draft post create karne ka method (optional, future use ke liye)
  async saveDraftPost(userId: string, dto: CreatePostDto) {
    const { content, platform } = dto;
    const plainContent = htmlToLinkedInText(content);

    const socialAccount = await this.prisma.socialAccount.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: platform,
        },
      },
    });

    if (!socialAccount) {
      throw new NotFoundException(
        `No connected ${platform} account found for this user`,
      );
    }

    let title = 'New Draft Post';
    try {
      title = await this.aiTool.generateTitle(plainContent);
    } catch (aierror) {
      console.error('AI title generation error:', aierror);
    }

    const post = await this.prisma.socialPost.create({
      data: {
        title,
        content,
        platform,
        status: PostStatus.DRAFT,
        userId,
        socialAccountId: socialAccount.id,
      },
    });

    return {
      message: `${post.title?.slice(0, 20)}... saved as draft successfully`,
      post,
    };
  }

  // Get connected social accounts for the user
  async getUserPosts(userId: string, pageNumber: number, perPage: number) {
    const [posts, total] = await Promise.all([
      this.prisma.socialPost.findMany({
        where: { userId },
        skip: (pageNumber - 1) * perPage,
        take: perPage,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          content: true,
          platform: true,
          publishedAt: true,
          status: true,
        },
      }),

      this.prisma.socialPost.count({ where: { userId } }),
    ]);

    return {
      posts,
      perPage,
      pageNumber,
      totalPosts: total,
    };
  }

  // Delete a post by ID
  async deletePost(userId: string, postId: string) {
    const post = await this.prisma.socialPost.findUnique({
      where: { id: postId },
    });

    if (!post || post.userId !== userId) {
      throw new NotFoundException('Post not found or access denied');
    }

    await this.prisma.socialPost.delete({ where: { id: post.id } });
    return {
      message: `${post.title?.slice(0, 20)}... deleted successfully`,
    };
  }
}
