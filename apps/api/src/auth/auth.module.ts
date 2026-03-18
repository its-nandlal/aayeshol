import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { createAuth } from '../lib/auth';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 RELATIVE PATH
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    PrismaModule, // 🔥 THIS IS MUST
    BetterAuthModule.forRootAsync({
      imports: [PrismaModule], // 🔥 ADD THIS ALSO (MOST PEOPLE MISS THIS)
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => ({
        auth: createAuth(prisma),
      }),
    }),
  ],
})
export class AuthModule {}
