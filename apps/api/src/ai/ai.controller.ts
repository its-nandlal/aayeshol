import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateContentDto } from './schemas/ai.schema';
import { OptionalAuth } from '@thallesp/nestjs-better-auth';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('content/generate')
  @OptionalAuth()
  async contentGenerate(@Body() generateContentDto: GenerateContentDto) {
    const data = await this.aiService.contentGenerate(generateContentDto);
    return data;
  }
}
