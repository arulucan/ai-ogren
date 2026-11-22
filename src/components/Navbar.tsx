import React, { useState, useRef } from 'react';
import {
  Rocket,
  GraduationCap,
  TerminalSquare,
  Sliders,
  BookMarked,
  Search,
  Download,
  Upload,
  RotateCcw,
  MoreVertical,
} from 'lucide-react';
import { AppView, RankInfo } from '../types/learning';

interface NavbarProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  xp: number;
  rank: RankInfo;
  onOpenSearch: () => void;
  onExport: () => void;
  onImport: (jsonText: string) => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  xp,
  rank,
  onOpenSearch,
  onExport,
  onImport,
  onReset,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navItems: Array<{ id: AppView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'academy', label: 'Akademi', icon: GraduationCap },
    { id: 'playground', label: 'Simülatör', icon: TerminalSquare },
    { id: 'studio', label: 'Config Atölyesi', icon: Sliders },
    { id: 'cheatsheet', label: 'Hızlı Başvuru', icon: BookMarked },
  ];

  const progressInRank = rank.nextXp
    ? Math.min(100, Math.round(((xp - rank.minXp) / (rank.nextXp - rank.minXp)) * 100))
    : 100;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImport(reader.result);
      }
    };
    reader.readAsText(file);
    setMenuOpen(false);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          onClick={() => onSelectView('academy')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold tracking-tight text-white leading-tight">
              Antigravity Akademi
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Antigravity · AI Studio · Claude/GPT · Vercel
            </div>
          </div>
        </button>

        {/* Main Navigation */}
        <nav className="flex items-center gap-1 rounded-xl border border-slate-800/80 bg-slate-900/70 p-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search + Rank/XP + Menu */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSearch}
            className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-indigo-500/50 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Ara...</span>
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
              Ctrl+K
            </kbd>
          </button>

          {/* Rank & XP Pill */}
          <div className="hidden lg:flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5">
            <span className="text-base leading-none">{rank.badge}</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold ${rank.color}`}>{rank.title}</span>
                <span className="font-mono text-[11px] font-bold text-slate-200">{xp} XP</span>
              </div>
              <div className="h-1 w-24 rounded-full bg-slate-800 overflow-hidden mt-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${progressInRank}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile XP pill */}
          <div className="flex lg:hidden items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 font-mono text-xs text-indigo-300">
            <span>{rank.badge}</span>
            <span>{xp}</span>
          </div>

          {/* Settings / Backup Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="İlerleme seçenekleri"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl p-1.5 z-50 animate-fade-slide">
                  <button
                    onClick={() => {
                      onOpenSearch();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer md:hidden"
                  >
                    <Search className="h-3.5 w-3.5" /> Hızlı Arama (Ctrl+K)
                  </button>
                  <button
                    onClick={() => {
                      onExport();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-cyan-400" /> İlerlemeyi Yedekle (JSON)
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5 text-indigo-400" /> Yedekten Yükle (JSON)
                  </button>
                  <div className="my-1 border-t border-slate-800" />
                  <button
                    onClick={() => {
                      if (window.confirm('Tüm öğrenme ilerlemen sıfırlansın mı?')) {
                        onReset();
                      }
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> İlerlemeyi Sıfırla
                  </button>
                </div>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
