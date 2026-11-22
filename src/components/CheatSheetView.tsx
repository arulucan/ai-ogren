import React, { useState } from 'react';
import { Search, Copy, Check, BookMarked, Languages } from 'lucide-react';
import { CHEAT_SHEET_CATEGORIES, CHEAT_SHEET_ITEMS } from '../data/cheatsheet';
import { GLOSSARY_ENTRIES } from '../data/glossary';
import { GlossaryText } from './GlossaryText';

export const CheatSheetView: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const filtered = CHEAT_SHEET_ITEMS.filter((item) => {
    const matchCat = category === 'all' || item.category === category;
    const matchQuery =
      !q ||
      item.command.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const filteredGlossary = GLOSSARY_ENTRIES.filter(
    (g) =>
      !q ||
      g.term.toLowerCase().includes(q) ||
      g.turkish.toLowerCase().includes(q) ||
      g.explanation.toLowerCase().includes(q)
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-indigo-950/30 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <BookMarked className="h-6 w-6 text-indigo-400" />
            Antigravity Hızlı Başvuru &amp; Terimler Sözlüğü
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Tüm slash komutları, IDE kısayolları, özelleştirme yolları ve teknik terimlerin Türkçe açıklamaları tek ekranda.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Komut, kısayol veya terim ara..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {CHEAT_SHEET_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`rounded-xl border px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              category === cat.id
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}

        <button
          onClick={() => setCategory('glossary')}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
            category === 'glossary'
              ? 'border-cyan-500 bg-cyan-600 text-white'
              : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:border-cyan-400'
          }`}
        >
          <Languages className="h-3.5 w-3.5" />
          Terimler Sözlüğü ({GLOSSARY_ENTRIES.length})
        </button>
      </div>

      {/* Glossary View OR Cheat Sheet Cards */}
      {category === 'glossary' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredGlossary.map((entry) => (
            <div
              key={entry.term}
              className="rounded-2xl border border-slate-800 bg-slate-900/75 hover:border-cyan-500/40 p-4 space-y-2 transition"
            >
              <div className="flex items-center justify-between gap-2">
                <code className="rounded-lg bg-slate-950 border border-cyan-500/30 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300">
                  {entry.term}
                </code>
                <span className="rounded-md bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-200">
                  Türkçe Karşılık
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{entry.turkish}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{entry.explanation}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 p-4 flex flex-col justify-between gap-3 transition"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <code className="rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300">
                    {item.command}
                  </code>
                  <button
                    onClick={() => handleCopy(item.id, item.example ?? item.command)}
                    title="Kopyala"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                <h3 className="text-sm font-semibold text-white">
                  <GlossaryText text={item.title} />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <GlossaryText text={item.description} />
                </p>
              </div>

              {item.example && (
                <div className="rounded-lg bg-slate-950/90 border border-slate-800/80 px-3 py-2 font-mono text-[11px] text-indigo-300 truncate">
                  {item.example}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
