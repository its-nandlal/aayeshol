import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async userExistingVerify(userId: string) {
    if (!userId)
      return {
        success: false,
        message: 'User ID is required',
      };
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user)
      return {
        success: false,
        message: 'User not found',
      };
    return {
      success: true,
      user,
    };
  }
}
