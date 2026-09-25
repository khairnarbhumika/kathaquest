export type ContentType = 'history' | 'epic_tradition' | 'culture';
export type CategorySlug = 'ramayana' | 'mahabharata' | 'ancient-india' | 'medieval-india' | 'modern-india' | 'culture';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameType = 'quiz' | 'memory';

export interface SourceRef {
  title: string;
  author?: string;
  publication?: string;
  url?: string;
  type: 'academic' | 'primary' | 'literary' | 'encyclopedia';
}

export interface ContentCategory {
  slug: CategorySlug;
  name: string;
  contentType: ContentType;
  description: string;
  displayOrder: number;
  iconName?: string;
}

export interface QuizQuestionSanitized {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  sourceRefs: SourceRef[];
}

export interface QuizQuestionFull extends QuizQuestionSanitized {
  correctIndex: number;
  explanation: string;
}

export interface MemoryCard {
  id: string;
  deckId: string;
  pairKey: string;
  faceText: string;
  accessibleDescription: string;
  displayOrder: number;
}

export interface MemoryDeck {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  title: string;
  description: string;
  difficulty: Difficulty;
  cards?: MemoryCard[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  nextChapterNumber: number;
  consequenceText?: string;
}

export interface StoryChapter {
  id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  bodyMarkdown: string;
  choices: ChoiceOption[];
  reflectionPrompt?: string;
}

export interface Story {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  title: string;
  description: string;
  traditionNote: string;
  readingMinutes: number;
  sourceRefs: SourceRef[];
  chapters?: StoryChapter[];
}

export interface Lesson {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  title: string;
  summary: string;
  bodyMarkdown: string;
  readingMinutes: number;
  difficulty: Difficulty;
  sourceRefs: SourceRef[];
  createdAt: string;
}

export interface PlayerStats {
  playerSessionId: string;
  totalXp: number;
  quizzesCompleted: number;
  memoryGamesCompleted: number;
  storiesCompleted: number;
  updatedAt: string;
}

export interface Achievement {
  slug: string;
  title: string;
  description: string;
  iconKey: string;
  ruleKey: string;
  earnedAt?: string;
}

export interface ActivityHistoryItem {
  id: string;
  gameType: string;
  categorySlug?: string;
  score: number;
  xpAwarded: number;
  completedAt: string;
}

export interface CategoryMastery {
  categorySlug: CategorySlug;
  categoryName: string;
  contentType: ContentType;
  quizzesTaken: number;
  correctAnswers: number;
  totalQuestions: number;
  masteryPercentage: number;
}

export interface PlayerProgressSummary {
  stats: PlayerStats;
  achievements: Achievement[];
  recentActivities: ActivityHistoryItem[];
  categoryMastery: CategoryMastery[];
}
