import { z } from 'zod';

export const CategorySlugEnum = z.enum([
  'ramayana',
  'mahabharata',
  'ancient-india',
  'medieval-india',
  'modern-india',
  'culture',
]);

export const DifficultyEnum = z.enum(['easy', 'medium', 'hard']);

export const QuizSetupSchema = z.object({
  categorySlug: z.union([CategorySlugEnum, z.literal('all')]),
  difficulty: DifficultyEnum,
  questionCount: z.number().int().refine((val) => [5, 10, 15].includes(val), {
    message: 'Question count must be 5, 10, or 15',
  }),
  enableTimer: z.boolean().default(false),
});

export const AnswerSubmitSchema = z.object({
  gameSessionId: z.string().uuid(),
  questionId: z.string().uuid(),
  selectedIndex: z.number().int().min(0).max(3),
  elapsedMs: z.number().int().nonnegative().optional(),
});

export const MemoryCompleteSchema = z.object({
  gameSessionId: z.string().uuid(),
  deckId: z.string().uuid(),
  pairCount: z.number().int().min(1).max(30),
  moves: z.number().int().min(1),
  elapsedMs: z.number().int().nonnegative(),
});

export const StoryProgressSchema = z.object({
  chapterId: z.string().uuid().optional(),
  completed: z.boolean().optional(),
});

export const FeedbackSubmitSchema = z.object({
  contentKind: z.enum(['lesson', 'question', 'story', 'chapter']),
  contentSlug: z.string().min(1).max(100),
  message: z.string().min(10, 'Feedback must be at least 10 characters long').max(1000, 'Feedback cannot exceed 1000 characters'),
});

export const HintRequestSchema = z.object({
  questionId: z.string().uuid(),
});

export type QuizSetupInput = z.infer<typeof QuizSetupSchema>;
export type AnswerSubmitInput = z.infer<typeof AnswerSubmitSchema>;
export type MemoryCompleteInput = z.infer<typeof MemoryCompleteSchema>;
export type StoryProgressInput = z.infer<typeof StoryProgressSchema>;
export type FeedbackSubmitInput = z.infer<typeof FeedbackSubmitSchema>;
export type HintRequestInput = z.infer<typeof HintRequestSchema>;
