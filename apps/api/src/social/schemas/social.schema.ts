import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Platform } from '@prisma/client';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsEnum(Platform)
  @IsOptional()
  platform: Platform = Platform.LINKEDIN;
}
