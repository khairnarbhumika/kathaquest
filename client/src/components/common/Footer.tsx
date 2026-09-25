import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Heart, Scroll } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
                K
              </div>
              <span className="font-serif font-bold text-lg text-amber-100">KathaQuest</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An interactive learning platform and game covering Indian history, culture, and epic literature with full source citations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-amber-200 text-xs uppercase tracking-wider">Explore Modes</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/play/quiz" className="hover:text-amber-300 transition">Interactive Quiz Engine</Link></li>
              <li><Link to="/play/memory" className="hover:text-amber-300 transition">Memory Match Game</Link></li>
              <li><Link to="/stories" className="hover:text-amber-300 transition">Interactive Story Reader</Link></li>
              <li><Link to="/learn" className="hover:text-amber-300 transition">Educational Articles</Link></li>
            </ul>
          </div>

          {/* Editorial Rigor */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-amber-200 text-xs uppercase tracking-wider">Content Standards</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about-sources" className="hover:text-amber-300 transition">History vs. Epic Tradition</Link></li>
              <li><Link to="/about-sources" className="hover:text-amber-300 transition">Verified Source Bibliography</Link></li>
              <li><Link to="/about-sources" className="hover:text-amber-300 transition">Content Correction Reporting</Link></li>
              <li><Link to="/progress" className="hover:text-amber-300 transition">Session XP & Achievements</Link></li>
            </ul>
          </div>

          {/* Transparency note */}
          <div className="space-y-3 md:col-span-1 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-medium text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Editorial Methodology</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We respectfully distinguish between archaeological consensus history, classical culture, and literary epic traditions. All content includes peer-reviewed or primary references.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} KathaQuest. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
            <span>for Indian Heritage & Literature</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
