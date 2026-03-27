import { z } from "zod";


export enum LanguageEnum {
  ENGLISH = "English",
  HINDI = "Hindi",
  HINGLISH = "Hinglish",
  JAPANESE = "Japanese",
  RUSSIAN = "Russian",
}

export enum ToneEnum {
  PROFESSIONAL = "Professional",
  NORMAL = "Normal",
  HAPPY = "Happy",
  EXCITED = "Excited",
  SAD = "Sad",
  ANGRY = "Angry",
  HUMOROUS = "Humorous/Funny",
  MOTIVATIONAL = "Motivational",
  CASUAL = "Casual",
  FRIENDLY = "Friendly",
}

export enum LengthEnum {
  SHORT = "Short",
  MEDIUM = "Medium",
  LONG = "Long",
}

export enum AudienceEnum {
  GENERAL = "General",
  EXPERT = "Expert",
  BEGINNER = "Beginner",
  CHILD = "Child",
  BUSINESS = "Business",
  TECHNICAL = "Technical",
}

export enum EmotionEnum {
  NEUTRAL = "Neutral",
  HAPPY = "Happy",
  EXCITED = "Excited",
  SAD = "Sad",
  ANGRY = "Angry",
  FUNNY = "Funny",
  SARCASTIC = "Sarcastic",
  EMPATHETIC = "Empathetic",
  MOTIVATIONAL = "Motivational",
}



// Zod Schema with enums
export const aiRequest = z.object({
  languages: z.nativeEnum(LanguageEnum),
  tone: z.nativeEnum(ToneEnum),
  length: z.nativeEnum(LengthEnum),
  audience: z.nativeEnum(AudienceEnum),
  emotion: z.nativeEnum(EmotionEnum),
  instructions: z
    .string()
    .trim()
    .min(1, "Instructions are required")
    .max(500, "Instructions must be less than 200 characters"),
  notFollowInstruction: z.string().max(200).optional(),
});

export type AIRequest = z.infer<typeof aiRequest>;
