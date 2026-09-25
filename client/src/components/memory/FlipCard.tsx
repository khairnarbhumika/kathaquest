import React from 'react';
import { MemoryCard } from '@shared/types';
import { Sparkles, Check } from 'lucide-react';

interface FlipCardProps {
  card: MemoryCard;
  index: number;
  isFlipped: boolean;
  isMatched: boolean;
  onCardClick: (index: number) => void;
  reducedMotion?: boolean;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  card,
  index,
  isFlipped,
  isMatched,
  onCardClick,
  reducedMotion = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCardClick(index);
    }
  };

  return (
    <button
      type="button"
      onClick={() => onCardClick(index)}
      onKeyDown={handleKeyDown}
      disabled={isFlipped || isMatched}
      aria-label={`Card ${index + 1}: ${isFlipped || isMatched ? card.faceText : 'Face down'}. ${card.accessibleDescription}`}
      aria-expanded={isFlipped || isMatched}
      className={`relative w-full h-32 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all cursor-pointer ${
        reducedMotion ? '' : 'perspective-1000'
      }`}
    >
      <div
        className={`w-full h-full duration-500 rounded-2xl ${
          reducedMotion ? 'transition-none' : 'transform-style-3d transition-transform'
        } ${isFlipped || isMatched ? 'rotate-y-180' : ''}`}
      >
        {/* Card Back (Face down) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden bg-slate-900 border-2 border-amber-500/30 flex flex-col items-center justify-center space-y-1 p-2 shadow-xl hover:border-amber-400 transition ${
            isMatched ? 'opacity-0' : ''
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-serif tracking-widest text-amber-300/80">KathaQuest</span>
        </div>

        {/* Card Front (Face up) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-center p-3 text-center shadow-xl border-2 ${
            isMatched
              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-emerald-500/20'
              : 'bg-slate-900 border-amber-400 text-amber-100 shadow-amber-500/20'
          }`}
        >
          {isMatched && (
            <div className="absolute top-2 right-2 text-emerald-400">
              <Check className="w-4 h-4" />
            </div>
          )}
          <span className="font-serif font-bold text-sm sm:text-base leading-snug">{card.faceText}</span>
          <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">{card.accessibleDescription}</span>
        </div>
      </div>
    </button>
  );
};
