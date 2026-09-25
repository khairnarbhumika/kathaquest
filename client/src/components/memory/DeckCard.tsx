import React from 'react';
import { MemoryDeck } from '@shared/types';
import { CategoryBadge } from '../common/CategoryBadge';
import { Layers, Play } from 'lucide-react';

interface DeckCardProps {
  deck: MemoryDeck & { pairCount?: number };
  onSelectDeck: (slug: string) => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({ deck, onSelectDeck }) => {
  return (
    <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-4 border border-amber-500/20 shadow-xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge contentType="epic_tradition" categoryName={deck.categorySlug.replace('-', ' ')} size="sm" />
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
            {deck.difficulty}
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-amber-100">{deck.title}</h3>
        <p className="text-slate-300 text-xs leading-relaxed">{deck.description}</p>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>{deck.pairCount || 6} Pairs (12 Cards)</span>
        </div>

        <button
          onClick={() => onSelectDeck(deck.slug)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-saffron text-slate-950 font-serif font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 transition cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>Play Deck</span>
        </button>
      </div>
    </div>
  );
};
