import React from 'react';
import { ContentType } from '@shared/types';
import { BookOpen, Compass, Sparkles } from 'lucide-react';

interface CategoryBadgeProps {
  contentType: ContentType | string;
  categoryName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ contentType, categoryName, size = 'md' }) => {
  let bgClass = '';
  let borderClass = '';
  let textClass = '';
  let label = '';
  let Icon = BookOpen;

  switch (contentType) {
    case 'history':
      bgClass = 'bg-emerald-950/70';
      borderClass = 'border-emerald-500/30';
      textClass = 'text-emerald-400';
      label = 'History (Consensus)';
      Icon = Compass;
      break;
    case 'epic_tradition':
      bgClass = 'bg-amber-950/70';
      borderClass = 'border-amber-500/30';
      textClass = 'text-amber-400';
      label = 'Epic Tradition';
      Icon = Sparkles;
      break;
    case 'culture':
    default:
      bgClass = 'bg-sky-950/70';
      borderClass = 'border-sky-500/30';
      textClass = 'text-sky-400';
      label = 'Culture & Arts';
      Icon = BookOpen;
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${bgClass} ${borderClass} ${textClass} ${sizeClasses[size]}`}
      title={`Domain Label: ${label}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span>{categoryName ? `${categoryName} • ${label}` : label}</span>
    </span>
  );
};
