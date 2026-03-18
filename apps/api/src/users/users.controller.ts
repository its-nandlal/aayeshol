import { Controller, Get } from '@nestjs/common';
import { OptionalAuth, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @OptionalAuth()
  @Get('me')
  async getProfile(@Session() session: UserSession) {
    const user = await this.prisma.user.findMany({
      where: {
        role: 'USER',
      },
    });
    return { user, session };
  }
}
