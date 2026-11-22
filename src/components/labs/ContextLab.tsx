import React, { useState } from 'react';
import { AtSign, CheckCircle2, FileCode, Terminal, BookOpen, MessageSquare, Send, Minimize2, Sparkles, X } from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface ContextLabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

interface MentionItem {
  id: string;
  label: string;
  category: 'Dosya' | 'Terminal' | 'Kural' | 'Sohbet';
  tokens: number;
  icon: 'file' | 'terminal' | 'rule' | 'chat';
}

const MENTION_ITEMS: MentionItem[] = [
  { id: 'login', label: 'src/pages/Login.tsx', category: 'Dosya', tokens: 1200, icon: 'file' },
  { id: 'auth', label: 'src/api/auth.ts', category: 'Dosya', tokens: 950, icon: 'file' },
  { id: 'term', label: 'terminal:dev-server (500 Error)', category: 'Terminal', tokens: 800, icon: 'terminal' },
  { id: 'rule', label: 'GEMINI.md (Proje Kuralları)', category: 'Kural', tokens: 450, icon: 'rule' },
  { id: 'prev', label: 'sohbet:Auth-Mimari-Kararı', category: 'Sohbet', tokens: 1800, icon: 'chat' },
];

export const ContextLab: React.FC<ContextLabProps> = ({ isCompleted, onComplete }) => {
  const [input, setInput] = useState('');
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [attached, setAttached] = useState<MentionItem[]>([]);
  const [contextUsage, setContextUsage] = useState(74); // starts high so user can also test /compact!
  const [compacted, setCompacted] = useState(false);
  const [sentGoodPrompt, setSentGoodPrompt] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent'; text: string; chips?: string[] }>>([
    {
      role: 'agent',
      text: 'Merhaba! Bağlam Laboratuvarına hoş geldin. Aşağıdaki kutuya "@" yazarak bir dosya ve terminal çıktısı bağla, ardından yüksek doluluk (%74+) için "/compact" komutunu dene!',
    },
  ]);

  const checkCompletion = (didPrompt: boolean, didCompact: boolean) => {
    if (didPrompt && didCompact) {
      onComplete();
    }
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    if (val.endsWith('@')) {
      setShowMentionMenu(true);
    } else if (!val.includes('@')) {
      setShowMentionMenu(false);
    }
  };

  const handlePickMention = (item: MentionItem) => {
    if (!attached.find((a) => a.id === item.id)) {
      setAttached((prev) => [...prev, item]);
      setContextUsage((prev) => Math.min(96, prev + Math.round(item.tokens / 250)));
    }
    setInput((prev) => (prev.endsWith('@') ? prev.slice(0, -1) : prev));
    setShowMentionMenu(false);
  };

  const removeMention = (id: string) => {
    const target = attached.find((a) => a.id === id);
    setAttached((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      setContextUsage((prev) => Math.max(20, prev - Math.round(target.tokens / 250)));
    }
  };

  const handleRunCompact = () => {
    setContextUsage(22);
    setCompacted(true);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: '/compact' },
      {
        role: 'agent',
        text: '✨ Bağlam sıkıştırıldı! Önceki kararlar özetlendi ve bağlam penceresi %22 seviyesine düşürüldü. Artık yanıtlar daha hızlı ve odaklı olacak.',
      },
    ]);
    checkCompletion(sentGoodPrompt, true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed && attached.length === 0) return;

    if (trimmed === '/compact') {
      setInput('');
      handleRunCompact();
      return;
    }

    const hasFile = attached.some((a) => a.category === 'Dosya');
    const hasTerminal = attached.some((a) => a.category === 'Terminal');

    const chips = attached.map((a) => `@${a.label}`);
    let reply = '';
    let good = sentGoodPrompt;

    if (hasFile && hasTerminal) {
      reply =
        '🎯 Harika bağlam! Hem ilgili kaynak dosyayı hem de terminaldeki 500 hata çıktısını doğrudan okudum. Kopyala-yapıştır hatası olmadan kök nedeni 1 saniyede buldum!';
      good = true;
      setSentGoodPrompt(true);
    } else if (attached.length > 0) {
      reply =
        '👍 Bağlam eklemen çok iyi! Görevi tam tamamlamak için hem bir **Dosya** (ör. Login.tsx) hem de **Terminal** çıktısını (`@` ile) aynı mesajda ekleyip tekrar gönder.';
    } else {
      reply =
        '⚠️ Hiç `@` bağlamı eklemedin! Ajan şu an hangi dosyada ve hangi hatada çalışacağını tahmin etmek zorunda kalıyor. Kutuya `@` yazıp dosya + terminal ekle.';
    }

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed || 'Bağlamdaki hatayı analiz et', chips },
      { role: 'agent', text: reply },
    ]);
    setInput('');
    setAttached([]);
    checkCompletion(good, compacted);
  };

  const renderIcon = (type: MentionItem['icon']) => {
    switch (type) {
      case 'file':
        return <FileCode className="h-3.5 w-3.5 text-cyan-400" />;
      case 'terminal':
        return <Terminal className="h-3.5 w-3.5 text-amber-400" />;
      case 'rule':
        return <BookOpen className="h-3.5 w-3.5 text-emerald-400" />;
      case 'chat':
        return <MessageSquare className="h-3.5 w-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Mission checklist bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-cyan-100">
          <span className={`inline-flex items-center gap-1.5 ${sentGoodPrompt ? 'text-emerald-300 line-through opacity-80' : ''}`}>
            <CheckCircle2 className={`h-4 w-4 ${sentGoodPrompt ? 'text-emerald-400' : 'text-slate-500'}`} />
            1. `@` ile Dosya + Terminal ekleyip gönder
          </span>
          <span className={`inline-flex items-center gap-1.5 ${compacted ? 'text-emerald-300 line-through opacity-80' : ''}`}>
            <CheckCircle2 className={`h-4 w-4 ${compacted ? 'text-emerald-400' : 'text-slate-500'}`} />
            2. `/compact` ile bağlamı ferahlat
          </span>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      {/* Context Meter */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span>Bağlam Penceresi Doluluğu (Context Window)</span>
            <span
              className={`font-mono font-bold ${
                contextUsage >= 70 ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              %{contextUsage}
            </span>
          </div>
          <button
            onClick={handleRunCompact}
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/15 hover:bg-indigo-500/25 px-2.5 py-1 text-xs font-mono text-indigo-200 transition cursor-pointer"
          >
            <Minimize2 className="h-3.5 w-3.5" /> /compact Çalıştır
          </button>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              contextUsage >= 70
                ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
            }`}
            style={{ width: `${contextUsage}%` }}
          />
        </div>
      </div>

      {/* Simulated Chat Canvas */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 overflow-hidden flex flex-col">
        <div className="border-b border-slate-800 bg-slate-900/70 px-4 py-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <AtSign className="h-4 w-4 text-cyan-400" /> Antigravity Chat Canvas Simülatörü
          </span>
          <button
            onClick={() => setShowMentionMenu((s) => !s)}
            className="rounded-md border border-slate-700 bg-slate-800 hover:border-cyan-500/50 px-2.5 py-1 text-xs text-cyan-300 font-mono transition cursor-pointer"
          >
            + @ Mention Ekle
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[210px] max-h-[300px] overflow-y-auto">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {m.chips && m.chips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {m.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 font-mono text-[11px] text-cyan-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-200'
                }`}
              >
                {m.role === 'agent' ? <GlossaryText text={m.text} /> : m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input & Mention Popover */}
        <div className="relative border-t border-slate-800 bg-slate-900/60 p-3">
          {showMentionMenu && (
            <div className="absolute bottom-full left-3 right-3 sm:right-auto sm:w-96 mb-2 rounded-xl border border-cyan-500/40 bg-slate-900 shadow-2xl p-1.5 z-20 animate-fade-slide">
              <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>@ Bağlam Seç</span>
                <button
                  onClick={() => setShowMentionMenu(false)}
                  className="text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              {MENTION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePickMention(item)}
                  className="w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs hover:bg-slate-800 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-slate-200 font-mono">
                    {renderIcon(item.icon)}
                    {item.label}
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Attached chips */}
          {attached.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {attached.map((a) => (
                <span
                  key={a.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/15 px-2.5 py-1 text-xs font-mono text-cyan-200"
                >
                  {renderIcon(a.icon)}
                  @{a.label}
                  <button
                    type="button"
                    onClick={() => removeMention(a.id)}
                    className="text-cyan-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder='Menüyü açmak için "@" yaz veya "/compact" dene...'
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition cursor-pointer"
            >
              <Send className="h-4 w-4" /> Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
