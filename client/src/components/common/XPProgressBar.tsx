import React from 'react';
import { Award, Zap } from 'lucide-react';

interface XPProgressBarProps {
  totalXp: number;
  showLevel?: boolean;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({ totalXp, showLevel = true }) => {
  // Level formula: Level = Math.floor(totalXp / 100) + 1
  const level = Math.floor(totalXp / 100) + 1;
  const currentLevelXp = totalXp % 100;
  const progressPercent = Math.min(100, Math.max(0, currentLevelXp));

  return (
    <div className="flex items-center gap-3">
      {showLevel && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-medium text-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Lvl {level}</span>
        </div>
      )}

      <div className="flex-1 space-y-1">
        <div className="flex justify-between text-xs font-medium text-slate-300">
          <span>{totalXp} XP</span>
          <span>{100 - currentLevelXp} XP to Lvl {level + 1}</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-saffron h-full rounded-full transition-all duration-500 shadow-glow"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
