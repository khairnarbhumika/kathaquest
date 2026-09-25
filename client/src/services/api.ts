import {
  ContentCategory,
  QuizQuestionSanitized,
  MemoryDeck,
  MemoryCard,
  Story,
  StoryChapter,
  Lesson,
  PlayerProgressSummary,
  SourceRef,
} from '@shared/types';
import { QuizSetupInput, AnswerSubmitInput, MemoryCompleteInput, StoryProgressInput, FeedbackSubmitInput } from '@shared/schemas';

const API_BASE = '/api/v1';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Ensure session cookies are sent
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred while fetching data');
  }

  return data as T;
}

export const api = {
  // Categories
  getCategories: async () => {
    return fetchJson<{ categories: (ContentCategory & { questionCount: number })[] }>('/categories');
  },

  // Quiz Engine
  startQuizSession: async (input: QuizSetupInput) => {
    return fetchJson<{
      gameSessionId: string;
      questions: QuizQuestionSanitized[];
      enableTimer: boolean;
      startedAt: string;
    }>('/quiz/session', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  submitAnswer: async (input: AnswerSubmitInput) => {
    return fetchJson<{
      isCorrect: boolean;
      correctIndex: number;
      explanation: string;
      sourceRefs: SourceRef[];
      pointsEarned: number;
    }>('/quiz/submit-answer', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  getQuizResults: async (sessionId: string) => {
    return fetchJson<{
      gameSessionId: string;
      categorySlug: string | null;
      status: string;
      score: number;
      xpAwarded: number;
      totalQuestions: number;
      correctCount: number;
      accuracy: number;
      newAchievements: string[];
      attempts: {
        questionId: string;
        prompt: string;
        options: string[];
        selectedIndex: number;
        correctIndex: number;
        isCorrect: boolean;
        explanation: string;
        sourceRefs: SourceRef[];
      }[];
    }>(`/quiz/results/${sessionId}`);
  },

  getQuizHint: async (questionId: string) => {
    return fetchJson<{ hint: string; historicalContext: string }>('/quiz/hint', {
      method: 'POST',
      body: JSON.stringify({ questionId }),
    });
  },

  // Memory Engine
  getMemoryDecks: async () => {
    return fetchJson<{ decks: (MemoryDeck & { pairCount: number })[] }>('/memory/decks');
  },

  getMemoryDeck: async (slug: string) => {
    return fetchJson<{
      gameSessionId: string;
      deck: MemoryDeck;
      cards: MemoryCard[];
    }>(`/memory/decks/${slug}`);
  },

  completeMemoryDeck: async (input: MemoryCompleteInput) => {
    return fetchJson<{
      gameSessionId: string;
      status: string;
      moves: number;
      elapsedMs: number;
      xpAwarded: number;
      totalXp: number;
      newAchievements: string[];
    }>('/memory/complete', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  // Story Reader Engine
  getStories: async () => {
    return fetchJson<{ stories: (Story & { chapterCount: number })[] }>('/stories');
  },

  getStoryDetail: async (slug: string) => {
    return fetchJson<{
      story: Story;
      chapters: StoryChapter[];
      progress: { currentChapterId: string | null; completedAt: string | null } | null;
    }>(`/stories/${slug}`);
  },

  updateStoryProgress: async (slug: string, input: StoryProgressInput) => {
    return fetchJson<{
      success: boolean;
      storyId: string;
      chapterId?: string;
      completed: boolean;
      xpAwarded: number;
      newAchievements: string[];
    }>(`/stories/${slug}/progress`, {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  // Educational Lessons
  getLessons: async (filters?: { category?: string; difficulty?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.search) params.append('search', filters.search);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return fetchJson<{ lessons: Lesson[] }>(`/learn${queryStr}`);
  },

  getLessonDetail: async (slug: string) => {
    return fetchJson<{
      lesson: Lesson;
      relatedQuestions: { id: string; slug: string; prompt: string; difficulty: string }[];
    }>(`/learn/${slug}`);
  },

  // Player Dashboard Progress
  getPlayerProgress: async () => {
    return fetchJson<PlayerProgressSummary>('/player/progress');
  },

  // Feedback Submission
  submitFeedback: async (input: FeedbackSubmitInput) => {
    return fetchJson<{ success: boolean; feedbackId: string; createdAt: string }>('/feedback', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
};
