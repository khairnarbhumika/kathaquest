import React, { useState } from 'react';
import { QuizSetupInput } from '@shared/schemas';
import { ContentCategory } from '@shared/types';
import { Play, Timer, Sparkles, Award } from 'lucide-react';

interface QuizSetupFormProps {
  categories: ContentCategory[];
  onStartQuiz: (config: QuizSetupInput) => void;
  isLoading: boolean;
}

export const QuizSetupForm: React.FC<QuizSetupFormProps> = ({ categories, onStartQuiz, isLoading }) => {
  const [categorySlug, setCategorySlug] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [enableTimer, setEnableTimer] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartQuiz({
      categorySlug: categorySlug as any,
      difficulty,
      questionCount,
      enableTimer,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 space-y-8 max-w-2xl mx-auto shadow-2xl">
      {/* Category Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-serif font-semibold text-amber-200">
          1. Select Category Domain
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setCategorySlug('all')}
            className={`p-3 rounded-2xl border text-left text-xs font-medium transition ${
              categorySlug === 'all'
                ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/10'
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="font-semibold block text-sm mb-0.5">All Topics</span>
            <span className="text-[10px] text-slate-400">Randomized across all 6 categories</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategorySlug(cat.slug)}
              className={`p-3 rounded-2xl border text-left text-xs font-medium transition ${
                categorySlug === cat.slug
                  ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <span className="font-semibold block text-sm mb-0.5 text-amber-100">{cat.name}</span>
              <span className="text-[10px] text-slate-400 capitalize">{cat.contentType.replace('_', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Level */}
      <div className="space-y-3">
        <label className="block text-sm font-serif font-semibold text-amber-200">
          2. Difficulty Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setDifficulty(diff)}
              className={`py-3 px-4 rounded-xl border text-center text-sm font-medium capitalize transition ${
                difficulty === diff
                  ? 'bg-saffron/20 border-saffron text-amber-200 font-semibold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Question Count & Timer Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-serif font-semibold text-amber-200">
            3. Number of Questions
          </label>
          <div className="flex items-center gap-3">
            {[5, 10, 15].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setQuestionCount(cnt)}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition ${
                  questionCount === cnt
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                {cnt} Questions
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-serif font-semibold text-amber-200">
            4. Challenge Mode
          </label>
          <button
            type="button"
            onClick={() => setEnableTimer(!enableTimer)}
            className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between text-sm font-medium transition ${
              enableTimer
                ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Timer className={`w-4 h-4 ${enableTimer ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>Speed Challenge (15s/Q)</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded font-mono ${enableTimer ? 'bg-amber-500/30 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
              {enableTimer ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Start Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-saffron text-slate-950 font-serif font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 cursor-pointer"
      >
        <Play className="w-5 h-5 fill-slate-950" />
        <span>{isLoading ? 'Preparing Quiz...' : 'Begin KathaQuest Quiz'}</span>
      </button>
    </form>
  );
};
