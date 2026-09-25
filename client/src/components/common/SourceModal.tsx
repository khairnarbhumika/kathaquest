import React from 'react';
import { SourceRef } from '@shared/types';
import { X, BookOpen, ExternalLink, Award } from 'lucide-react';

interface SourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sources: SourceRef[];
  title?: string;
}

export const SourceModal: React.FC<SourceModalProps> = ({ isOpen, onClose, sources, title = 'Content Bibliography & References' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-amber-500/30 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-amber-200">{title}</h3>
        </div>

        {sources.length === 0 ? (
          <p className="text-slate-400 text-sm italic py-4">No specific source citations recorded for this item.</p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {sources.map((src, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-amber-100">{src.title}</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    {src.type}
                  </span>
                </div>
                {src.author && <p className="text-xs text-slate-400">Author: {src.author}</p>}
                {src.publication && <p className="text-xs text-slate-400">Publication: {src.publication}</p>}
                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline pt-1"
                  >
                    <span>View Reference</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-sm font-medium border border-amber-500/30 transition"
          >
            Close Bibliography
          </button>
        </div>
      </div>
    </div>
  );
};
