import React from 'react';
import { Timer } from 'lucide-react';

interface TimerDisplayProps {
  elapsedSeconds: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ elapsedSeconds }) => {
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const formatted = `${mins}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-amber-300 font-mono text-xs font-semibold">
      <Timer className="w-4 h-4 text-amber-400" />
      <span>{formatted}</span>
    </div>
  );
};
