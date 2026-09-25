import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Zap, RotateCcw, Home, Award } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  moves: number;
  elapsedSeconds: number;
  xpAwarded: number;
  newAchievements: string[];
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  moves,
  elapsedSeconds,
  xpAwarded,
  newAchievements,
  onPlayAgain,
}) => {
  if (!isOpen) return null;

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl border border-amber-500/40 relative">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-saffron flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
            Memory Deck Matched!
          </h2>
          <p className="text-slate-400 text-xs">
            Excellent recall and focus! All pairs matched successfully.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 py-2 text-center">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="block text-xl font-bold font-mono text-amber-400">{moves}</span>
            <span className="text-[10px] text-slate-400">Total Moves</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="block text-xl font-bold font-mono text-amber-400">{timeStr}</span>
            <span className="text-[10px] text-slate-400">Elapsed Time</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-center gap-1 text-xl font-bold font-mono text-amber-300">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>+{xpAwarded}</span>
            </div>
            <span className="text-[10px] text-slate-400">XP Earned</span>
          </div>
        </div>

        {newAchievements && newAchievements.length > 0 && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-left space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Achievement Unlocked!</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {newAchievements.map((slug) => (
                <span key={slug} className="px-2.5 py-0.5 bg-amber-500/20 text-amber-200 rounded-full font-mono text-[11px]">
                  🏆 {slug}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-200 font-serif font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <Link
            to="/play/memory"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-saffron text-slate-950 font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 transition"
          >
            <Home className="w-4 h-4" />
            <span>Select Deck</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
