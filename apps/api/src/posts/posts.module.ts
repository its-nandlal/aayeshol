import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { HttpModule } from '@nestjs/axios';
import { AiModule } from 'src/ai/ai.module';
import { AiService } from 'src/ai/ai.service';

@Module({
  imports: [HttpModule, PrismaModule, UsersModule, AiModule],
  controllers: [PostsController],
  providers: [PostsService, UsersService, AiService],
})
export class PostsModule {}
