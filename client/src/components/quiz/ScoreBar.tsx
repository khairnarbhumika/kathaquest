import React from 'react';
import { Flame, Award, CheckCircle2 } from 'lucide-react';

interface ScoreBarProps {
  currentIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({ currentIndex, totalQuestions, score, streak }) => {
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span className="font-serif text-amber-200">
          Question {currentIndex + 1} of {totalQuestions}
        </span>

        <div className="flex items-center gap-4">
          {streak > 1 && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-bounce">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{streak}x Streak!</span>
            </span>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-amber-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-mono">{score} Pts</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-amber-500 to-saffron h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
