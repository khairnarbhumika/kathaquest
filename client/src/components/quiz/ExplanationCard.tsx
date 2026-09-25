import React from 'react';
import { SourceRef } from '@shared/types';
import { CheckCircle2, XCircle, BookOpen, ArrowRight } from 'lucide-react';

interface ExplanationCardProps {
  isCorrect: boolean;
  explanation: string;
  sourceRefs: SourceRef[];
  pointsEarned: number;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  onOpenSources?: () => void;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  isCorrect,
  explanation,
  sourceRefs,
  pointsEarned,
  onNextQuestion,
  isLastQuestion,
  onOpenSources,
}) => {
  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 border shadow-2xl animate-fadeIn ${
        isCorrect
          ? 'bg-emerald-950/40 border-emerald-500/40'
          : 'bg-rose-950/40 border-rose-500/40'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-2xl flex items-center justify-center ${
            isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}
        >
          {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`font-serif text-xl font-bold ${isCorrect ? 'text-emerald-200' : 'text-rose-200'}`}>
              {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
            </h3>

            {isCorrect && (
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold rounded-full">
                +{pointsEarned} Pts
              </span>
            )}
          </div>

          <p className="text-slate-200 text-sm leading-relaxed pt-1">{explanation}</p>

          {sourceRefs && sourceRefs.length > 0 && (
            <div className="pt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenSources}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-medium underline underline-offset-4 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View {sourceRefs.length} Verified Source Citation(s)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
        <button
          onClick={onNextQuestion}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-saffron text-slate-950 font-serif font-bold text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
        >
          <span>{isLastQuestion ? 'View Results Summary' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
