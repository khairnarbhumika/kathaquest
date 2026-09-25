import React from 'react';
import { MousePointerClick } from 'lucide-react';

interface MoveCounterProps {
  moves: number;
}

export const MoveCounter: React.FC<MoveCounterProps> = ({ moves }) => {
  return (
    <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-amber-300 font-mono text-xs font-semibold">
      <MousePointerClick className="w-4 h-4 text-amber-400" />
      <span>{moves} Moves</span>
    </div>
  );
};
