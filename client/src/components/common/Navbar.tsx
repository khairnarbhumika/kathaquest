import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scroll, Play, BookOpen, Award, Info, Menu, X, Compass, Zap } from 'lucide-react';
import { api } from '../../services/api';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [totalXp, setTotalXp] = useState<number>(0);

  useEffect(() => {
    api.getPlayerProgress()
      .then((data) => {
        if (data?.stats?.totalXp !== undefined) {
          setTotalXp(data.stats.totalXp);
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  const navLinks = [
    { name: 'Play Hub', path: '/play', icon: Play },
    { name: 'Stories', path: '/stories', icon: Scroll },
    { name: 'Learn Articles', path: '/learn', icon: BookOpen },
    { name: 'My Progress', path: '/progress', icon: Award },
    { name: 'Sources & Methodology', path: '/about-sources', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-saffron flex items-center justify-center text-slate-950 font-serif font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              K
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-wider text-amber-100 group-hover:text-amber-300 transition">
                Katha<span className="text-saffron">Quest</span>
              </span>
              <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono">
                Indian History & Epics
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-slate-300 hover:text-amber-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* XP Badge & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/progress"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full hover:bg-amber-500/20 transition cursor-pointer"
              title="View Player Progress"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="font-semibold text-xs text-amber-200">{totalXp} XP</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                  active
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 text-amber-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
