import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Zap, CheckCircle2, XCircle, RotateCcw, Home, Award, BookOpen } from 'lucide-react';
import { SourceRef } from '@shared/types';

interface QuizResultSummaryProps {
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
  onRestartQuiz: () => void;
}

export const QuizResultSummary: React.FC<QuizResultSummaryProps> = ({
  score,
  xpAwarded,
  totalQuestions,
  correctCount,
  accuracy,
  newAchievements,
  attempts,
  onRestartQuiz,
}) => {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 max-w-3xl mx-auto shadow-2xl border border-amber-500/30">
      {/* Header Trophy Banner */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-saffron flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20">
          <Trophy className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-100">
          Quiz Completed!
        </h1>
        <p className="text-slate-400 text-sm">
          Great job exploring Indian history and literary traditions.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="block text-2xl font-bold font-mono text-amber-400">{accuracy}%</span>
          <span className="text-xs text-slate-400">Accuracy</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="block text-2xl font-bold font-mono text-amber-400">
            {correctCount}/{totalQuestions}
          </span>
          <span className="text-xs text-slate-400">Correct Answers</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="block text-2xl font-bold font-mono text-amber-400">{score}</span>
          <span className="text-xs text-slate-400">Total Score</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-center gap-1 text-2xl font-bold font-mono text-amber-300">
            <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>+{xpAwarded}</span>
          </div>
          <span className="text-xs text-slate-400">XP Awarded</span>
        </div>
      </div>

      {/* Unlocked Achievements Banner */}
      {newAchievements && newAchievements.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
            <Award className="w-5 h-5 text-amber-400" />
            <span>New Achievement(s) Unlocked!</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {newAchievements.map((slug) => (
              <span key={slug} className="px-3 py-1 bg-amber-500/20 text-amber-200 border border-amber-500/30 rounded-full text-xs font-mono">
                🏆 {slug}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Breakdown Accordion / List */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-semibold text-amber-200 border-b border-slate-800 pb-2">
          Detailed Question Breakdown
        </h3>

        <div className="space-y-3">
          {attempts.map((att, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  {att.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span className="font-medium text-slate-200 text-sm">
                    {idx + 1}. {att.prompt}
                  </span>
                </div>
              </div>

              <div className="pl-6 space-y-1 text-slate-400">
                <p>Your Answer: <span className={att.isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>{att.options[att.selectedIndex]}</span></p>
                {!att.isCorrect && (
                  <p>Correct Answer: <span className="text-emerald-400 font-semibold">{att.options[att.correctIndex]}</span></p>
                )}
                <p className="text-slate-300 pt-1 italic">{att.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          onClick={onRestartQuiz}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-200 font-serif font-semibold text-sm flex items-center gap-2 border border-slate-700 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Another Quiz</span>
        </button>

        <Link
          to="/progress"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-saffron text-slate-950 font-serif font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition"
        >
          <Home className="w-4 h-4" />
          <span>View Player Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
