import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Terminal, BookOpen, Languages } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import { CHEAT_SHEET_ITEMS } from '../data/cheatsheet';
import { GLOSSARY_ENTRIES } from '../data/glossary';
import { AppView, ModuleId } from '../types/learning';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onJumpModule: (id: ModuleId) => void;
  onSelectView: (view: AppView) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  onJumpModule,
  onSelectView,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  if (!open) return null;

  const q = query.trim().toLowerCase();

  const matchingModules = CURRICULUM.filter(
    (m) =>
      !q ||
      m.title.toLowerCase().includes(q) ||
      m.subtitle.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q)
  );

  const matchingCheats = CHEAT_SHEET_ITEMS.filter(
    (item) =>
      !q ||
      item.command.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  ).slice(0, 6);

  const matchingGlossary = q
    ? GLOSSARY_ENTRIES.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.turkish.toLowerCase().includes(q) ||
          g.explanation.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden animate-fade-slide">
        {/* Search Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5">
          <Search className="h-4 w-4 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Modül, slash komutu (/plan, /compact), GEMINI.md veya kısayol ara..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
          {matchingModules.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Akademi Modülleri
              </div>
              <div className="space-y-1">
                {matchingModules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onJumpModule(m.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-indigo-500/15 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen className="h-4 w-4 text-indigo-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-100 truncate">
                          0{m.number}. {m.title}
                        </div>
                        <div className="text-xs text-slate-400 truncate">{m.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingCheats.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Komutlar & Hızlı Başvuru
              </div>
              <div className="space-y-1">
                {matchingCheats.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectView('cheatsheet');
                      onClose();
                    }}
                    className="w-full flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-slate-800 transition cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Terminal className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-xs font-semibold text-cyan-300">
                            {item.command}
                          </code>
                          <span className="text-xs text-slate-300 font-medium">{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingGlossary.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Terimler Sözlüğü (Türkçe Karşılıklar)
              </div>
              <div className="space-y-1">
                {matchingGlossary.map((g) => (
                  <button
                    key={g.term}
                    onClick={() => {
                      onSelectView('cheatsheet');
                      onClose();
                    }}
                    className="w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-slate-800 transition cursor-pointer"
                  >
                    <Languages className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs font-semibold text-cyan-300">
                          {g.term}
                        </code>
                        <span className="text-xs font-semibold text-white">→ {g.turkish}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{g.explanation}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingModules.length === 0 &&
            matchingCheats.length === 0 &&
            matchingGlossary.length === 0 && (
              <div className="py-10 text-center text-sm text-slate-500">
                &quot;{query}&quot; için sonuç bulunamadı.
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
