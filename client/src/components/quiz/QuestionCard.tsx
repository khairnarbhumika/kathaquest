import React, { useState } from 'react';
import { QuizQuestionSanitized } from '@shared/types';
import { CategoryBadge } from '../common/CategoryBadge';
import { TimerWidget } from './TimerWidget';
import { Sparkles, HelpCircle, Lightbulb, BookOpen } from 'lucide-react';
import { api } from '../../services/api';

interface QuestionCardProps {
  question: QuizQuestionSanitized;
  onSelectOption: (index: number) => void;
  selectedIndex: number | null;
  enableTimer?: boolean;
  onTimeUp?: () => void;
  onOpenSources?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSelectOption,
  selectedIndex,
  enableTimer,
  onTimeUp,
  onOpenSources,
}) => {
  const [hint, setHint] = useState<{ hint: string; historicalContext: string } | null>(null);
  const [isFetchingHint, setIsFetchingHint] = useState(false);

  const fetchHint = async () => {
    if (hint || isFetchingHint) return;
    setIsFetchingHint(true);
    try {
      const res = await api.getQuizHint(question.id);
      setHint(res);
    } catch (err) {
      console.warn('Hint request failed:', err);
    } finally {
      setIsFetchingHint(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative border border-amber-500/20">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <CategoryBadge contentType="epic_tradition" categoryName={question.categorySlug.replace('-', ' ')} />

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">
            {question.difficulty}
          </span>
          {enableTimer && (
            <TimerWidget isActive={selectedIndex === null} questionKey={question.id} onTimeUp={onTimeUp} />
          )}
        </div>
      </div>

      {/* Prompt */}
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 leading-snug">
        {question.prompt}
      </h2>

      {/* Options List */}
      <div className="grid grid-cols-1 gap-3 pt-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          const letter = String.fromCharCode(65 + idx);

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              disabled={selectedIndex !== null}
              className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-200 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {letter}
              </span>
              <span className="text-sm font-medium pt-0.5 leading-relaxed">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* AI Hint & Source Bar */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 text-xs">
        <button
          type="button"
          onClick={fetchHint}
          disabled={isFetchingHint || selectedIndex !== null}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium transition cursor-pointer disabled:opacity-50"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>{isFetchingHint ? 'Consulting Gemini AI...' : hint ? 'AI Hint Active' : 'Request AI Hint'}</span>
        </button>

        {question.sourceRefs && question.sourceRefs.length > 0 && (
          <button
            type="button"
            onClick={onOpenSources}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-300 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sources ({question.sourceRefs.length})</span>
          </button>
        )}
      </div>

      {/* AI Hint Card Display */}
      {hint && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-xs space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Educational AI Hint & Context</span>
          </div>
          <p className="text-amber-100 font-medium">{hint.hint}</p>
          <p className="text-slate-400 italic">{hint.historicalContext}</p>
        </div>
      )}
    </div>
  );
};
