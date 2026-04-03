import { Injectable } from '@nestjs/common';
import { Platform, PostStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getPostStatus(userId: string) {
    if (!userId)
      return {
        success: false,
        message: 'User ID is required',
      };

    const now = new Date();
    const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      publishedPosts,
      draftPosts,
      failedPosts,
      connectedAccount,
      scheduledNext7Days,
      publishedLast30Days,
      platformCounts,
    ] = await Promise.all([
      this.prisma.socialPost.count({
        where: { userId, status: PostStatus.PUBLISHED },
      }),

      this.prisma.socialPost.count({
        where: { userId, status: PostStatus.DRAFT },
      }),

      this.prisma.socialPost.count({
        where: { userId, status: PostStatus.FAILED },
      }),

      this.prisma.socialAccount.count({
        where: { userId },
      }),

      this.prisma.socialPost.count({
        where: {
          userId,
          status: PostStatus.DRAFT,
          publishedAt: { gte: now, lte: next7Days },
        },
      }),

      this.prisma.socialPost.count({
        where: {
          userId,
          status: PostStatus.PUBLISHED,
          publishedAt: { gte: last30Days },
        },
      }),

      this.prisma.socialPost.groupBy({
        by: ['platform'],
        where: { userId, status: PostStatus.PUBLISHED },
        _count: { platform: true },
        orderBy: { _count: { platform: 'desc' } },
        take: 1,
      }),
    ]);

    const bestPlatform: Platform | null = platformCounts[0]?.platform ?? null;
    const avgPostsPerDay = Math.round((publishedLast30Days / 30) * 10) / 10;

    return {
      publishedPosts,
      draftPosts,
      failedPosts,
      connectedAccount,
      scheduledNext7Days,
      avgPostsPerDay,
      bestPlatform,
    };
  }

  async getChartData(userId: string) {
    if (!userId) return { success: false, message: 'User ID is required' };

    const since = new Date();
    since.setMonth(since.getMonth() - 6);
    since.setDate(1);
    since.setHours(0, 0, 0, 0);

    const posts = await this.prisma.socialPost.findMany({
      where: {
        userId,
        status: PostStatus.PUBLISHED,
        publishedAt: { gte: since },
      },
      select: { platform: true, publishedAt: true },
    });

    // Month-wise group kro JS mein - "2026-03" formate
    const map = new Map<
      string,
      { linkedin: number; x: number; threads: number }
    >();

    for (const post of posts) {
      if (!post.publishedAt) continue;

      const key = post.publishedAt.toISOString().slice(0, 7);
      if (!map.has(key)) map.set(key, { linkedin: 0, x: 0, threads: 0 });

      const entry = map.get(key)!;
      if (post.platform === Platform.LINKEDIN) entry.linkedin++;
      else if (post.platform === Platform.TWITTER) entry.x++;
      else if (post.platform === Platform.THREADS) entry.threads++;
    }

    const dataPoints = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, counts]) => ({ date, ...counts }));

    return {
      dataPoints,
    };
  }

  async getActivity(userId: string) {
    if (!userId) return { success: false, message: 'User ID is required' };

    const post = await this.prisma.socialPost.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        platform: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return {
      posts: post.map((p) => ({
        id: p.id,
        title: p.title,
        platform: p.platform,
        status: p.status,
        publishedAt: p.publishedAt?.toISOString() ?? null,
        createdAt: p.createdAt.toISOString(),
      })),
    };
  }
}
