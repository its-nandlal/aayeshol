import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AiService } from 'src/ai/ai.service';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [HttpModule, PrismaModule, AiModule],
  controllers: [SocialController],
  providers: [SocialService, AiService],
})
export class SocialModule {}
