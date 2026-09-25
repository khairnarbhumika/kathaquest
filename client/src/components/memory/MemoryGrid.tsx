import React from 'react';
import { MemoryCard } from '@shared/types';
import { FlipCard } from './FlipCard';

interface MemoryGridProps {
  cards: MemoryCard[];
  flippedIndices: number[];
  matchedKeys: string[];
  onCardClick: (index: number) => void;
  reducedMotion?: boolean;
}

export const MemoryGrid: React.FC<MemoryGridProps> = ({
  cards,
  flippedIndices,
  matchedKeys,
  onCardClick,
  reducedMotion = false,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto py-4">
      {cards.map((card, index) => {
        const isFlipped = flippedIndices.includes(index);
        const isMatched = matchedKeys.includes(card.pairKey);

        return (
          <FlipCard
            key={card.id || index}
            card={card}
            index={index}
            isFlipped={isFlipped}
            isMatched={isMatched}
            onCardClick={onCardClick}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </div>
  );
};
