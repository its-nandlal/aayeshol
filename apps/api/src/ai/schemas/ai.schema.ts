import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum LanguageEnum {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  HINGLISH = 'Hinglish',
  JAPANESE = 'Japanese',
  RUSSIAN = 'Russian',
}

export enum ToneEnum {
  PROFESSIONAL = 'Professional',
  NORMAL = 'Normal',
  HAPPY = 'Happy',
  EXCITED = 'Excited',
  SAD = 'Sad',
  ANGRY = 'Angry',
  HUMOROUS = 'Humorous/Funny',
  MOTIVATIONAL = 'Motivational',
  CASUAL = 'Casual',
  FRIENDLY = 'Friendly',
}

export enum LengthEnum {
  SHORT = 'Short',
  MEDIUM = 'Medium',
  LONG = 'Long',
}

export enum AudienceEnum {
  GENERAL = 'General',
  EXPERT = 'Expert',
  BEGINNER = 'Beginner',
  CHILD = 'Child',
  BUSINESS = 'Business',
  TECHNICAL = 'Technical',
}

export enum EmotionEnum {
  NEUTRAL = 'Neutral',
  HAPPY = 'Happy',
  EXCITED = 'Excited',
  SAD = 'Sad',
  ANGRY = 'Angry',
  FUNNY = 'Funny',
  SARCASTIC = 'Sarcastic',
  EMPATHETIC = 'Empathetic',
  MOTIVATIONAL = 'Motivational',
}

export class GenerateContentDto {
  @IsEnum(LanguageEnum)
  languages: LanguageEnum = LanguageEnum.ENGLISH;

  @IsEnum(ToneEnum)
  tone: ToneEnum = ToneEnum.NORMAL;

  @IsEnum(LengthEnum)
  length: LengthEnum = LengthEnum.MEDIUM;

  @IsEnum(AudienceEnum)
  audience: AudienceEnum = AudienceEnum.GENERAL;

  @IsEnum(EmotionEnum)
  emotion: EmotionEnum = EmotionEnum.NEUTRAL;

  @IsString()
  @IsNotEmpty({ message: 'Instructions are required' })
  @MinLength(1)
  @MaxLength(500, { message: 'Instructions must be less than 200 characters' })
  instructions: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  notFollowInstruction?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  previousResponse?: string;
}
