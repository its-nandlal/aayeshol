// src/prisma/prisma.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private config: ConfigService) {
    const dbUrl = config.getOrThrow<string>('DATABASE_URL');

    const pool = new Pool({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false, // 🔥 Neon fix
      },
    });

    const adapter = new PrismaPg(pool);

    // ✅ SUPER IMPORTANT (यही main fix है)
    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Prisma disconnected');
  }
}
