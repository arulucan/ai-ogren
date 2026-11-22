import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Terminal, Laptop, Monitor, ArrowRight, RotateCcw } from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface EcosystemLabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

interface Scenario {
  id: string;
  task: string;
  bestSurface: 'app' | 'ide' | 'cli';
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    task: 'TypeScript dosyasında tek bir fonksiyonu seçip hızla temizlemek (refactor) ve otomatik import eklemek istiyorsun.',
    bestSurface: 'ide',
    explanation: 'Antigravity IDE, Inline Command (Ctrl+I) ve Tab-to-Import ile kod içi hedefli düzenlemelerde en hızlı yüzeydir.',
  },
  {
    id: 's2',
    task: 'Aynı anda 2 farklı projede paralel ajan çalıştırıp Artifact belgelerini ve zamanlanmış görevleri (Cron) tek yerden izlemek istiyorsun.',
    bestSurface: 'app',
    explanation: 'Antigravity 2.0 Masaüstü Uygulaması paralel proje yönetimi, Auxiliary Pane ve Scheduled Tasks için tasarlanmıştır.',
  },
  {
    id: 's3',
    task: 'SSH ile bağlı olduğun grafik arayüzsüz Linux sunucusunda logları analiz ettirip hızlı bir düzeltme yapmak istiyorsun.',
    bestSurface: 'cli',
    explanation: 'Antigravity CLI (agy) yalnızca terminalin bulunduğu ortamlarda hafif ve hızlı etkileşim sağlar.',
  },
  {
    id: 's4',
    task: 'Birden fazla satırı silip yerine yeni bir diff öneren Supercomplete önerisini Tab ile anında kabul etmek istiyorsun.',
    bestSurface: 'ide',
    explanation: 'Supercomplete ve Tab-to-Jump, Antigravity IDE’nin pasif kod tamamlama (Antigravity Tab) yetenekleridir.',
  },
];

export const EcosystemLab: React.FC<EcosystemLabProps> = ({ isCompleted, onComplete }) => {
  // Part 1: Interactive IDE Modalities Playground
  const [tabAccepted, setTabAccepted] = useState(false);
  const [inlinePrompt, setInlinePrompt] = useState('');
  const [inlineApplied, setInlineApplied] = useState(false);

  // Part 2: Surface Matcher
  const [answers, setAnswers] = useState<Record<string, 'app' | 'ide' | 'cli'>>({});

  const correctCount = SCENARIOS.filter((s) => answers[s.id] === s.bestSurface).length;
  const allMatched = correctCount === SCENARIOS.length;

  const handleSelectSurface = (scenarioId: string, surface: 'app' | 'ide' | 'cli') => {
    const next = { ...answers, [scenarioId]: surface };
    setAnswers(next);
    const nextCorrect = SCENARIOS.filter((s) => next[s.id] === s.bestSurface).length;
    if (nextCorrect === SCENARIOS.length && (tabAccepted || inlineApplied)) {
      onComplete();
    }
  };

  const handleAcceptTab = () => {
    setTabAccepted(true);
    if (allMatched) onComplete();
  };

  const handleApplyInline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlinePrompt.trim()) return;
    setInlineApplied(true);
    if (allMatched) onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
        <div className="flex items-center gap-2.5 text-sm text-indigo-200">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Görev:</strong> Aşağıdaki IDE simülatöründe <strong>Tab</strong> veya <strong>Ctrl+I</strong> deneyip 4 senaryonun tamamını doğru yüzeyle eşleştir.
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="text-xs font-mono text-indigo-300">
            Eşleşme: {correctCount}/{SCENARIOS.length}
          </span>
        )}
      </div>

      {/* Interactive Part 1: Antigravity IDE Live Preview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-slate-400">
              Antigravity IDE — src/utils/discount.ts
            </span>
          </div>
          <button
            onClick={() => {
              setTabAccepted(false);
              setInlineApplied(false);
              setInlinePrompt('');
            }}
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition"
          >
            <RotateCcw className="h-3 w-3" /> Sıfırla
          </button>
        </div>

        <div className="p-4 font-mono text-xs sm:text-sm space-y-2 bg-grid-pattern">
          <div className="flex gap-4">
            <span className="text-slate-600 select-none w-5 text-right">1</span>
            <span className="text-slate-300">
              {tabAccepted ? (
                <span className="text-emerald-300 bg-emerald-500/15 px-1 rounded">
                  import &#123; roundCurrency &#125; from &apos;./currency&apos;; // Tab-to-Import eklendi!
                </span>
              ) : (
                <span className="text-slate-500 italic">
                  // (Tab-to-Import hazır: roundCurrency otomatik içe aktarılacak)
                </span>
              )}
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-600 select-none w-5 text-right">2</span>
            <span className="text-indigo-300">
              export function <span className="text-amber-300">calculateDiscount</span>(price: number, rate: number) &#123;
            </span>
          </div>

          {!tabAccepted ? (
            <div className="ml-9 rounded-lg border border-indigo-500/40 bg-indigo-950/50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-indigo-300">
                  Antigravity Supercomplete Önerisi
                </span>
                <button
                  onClick={handleAcceptTab}
                  className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500 hover:bg-indigo-400 px-2.5 py-1 font-sans text-xs font-semibold text-white transition cursor-pointer"
                >
                  <kbd className="rounded bg-indigo-700/80 px-1.5 py-0.5 font-mono text-[10px]">Tab</kbd>
                  Kabul Et
                </button>
              </div>
              <pre className="text-slate-400 leading-relaxed overflow-x-auto">
{`  if (price < 0 || rate < 0 || rate > 100) throw new Error('Geçersiz değer');
  return roundCurrency(price * (1 - rate / 100));`}
              </pre>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex gap-4">
                <span className="text-slate-600 select-none w-5 text-right">3</span>
                <span className="text-emerald-300 bg-emerald-500/10 px-1 rounded">
                  &nbsp;&nbsp;if (price &lt; 0 || rate &lt; 0 || rate &gt; 100) throw new Error(&apos;Geçersiz değer&apos;);
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600 select-none w-5 text-right">4</span>
                <span className="text-emerald-300 bg-emerald-500/10 px-1 rounded">
                  &nbsp;&nbsp;return roundCurrency(price * (1 - rate / 100));
                </span>
              </div>
            </div>
          )}

          {inlineApplied && (
            <div className="flex gap-4">
              <span className="text-slate-600 select-none w-5 text-right">5</span>
              <span className="text-cyan-300 bg-cyan-500/10 px-1 rounded">
                &nbsp;&nbsp;// [Ctrl+I Uygulandı]: &quot;{inlinePrompt}&quot; — JSDoc &amp; tip koruması eklendi
              </span>
            </div>
          )}

          <div className="flex gap-4">
            <span className="text-slate-600 select-none w-5 text-right">6</span>
            <span className="text-indigo-300">&#125;</span>
          </div>

          {/* Inline Command Box */}
          <form
            onSubmit={handleApplyInline}
            className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-950/90 p-2.5 font-sans"
          >
            <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/15 px-2 py-1 font-mono text-xs text-cyan-300 shrink-0">
              Ctrl + I
            </span>
            <input
              type="text"
              value={inlinePrompt}
              onChange={(e) => setInlinePrompt(e.target.value)}
              placeholder="Satır içi komut dene (örn: Türkçe JSDoc yorumu ekle)"
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none px-1"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              Uygula <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Interactive Part 2: Surface Selection Challenge */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>Yüzey Seçim Meydan Okuması</span>
          <span className="text-xs font-normal text-slate-400">(Her görev için en ideal Antigravity yüzeyini seç)</span>
        </h3>

        <div className="grid gap-3">
          {SCENARIOS.map((sc, idx) => {
            const picked = answers[sc.id];
            const isRight = picked === sc.bestSurface;
            return (
              <div
                key={sc.id}
                className={`rounded-xl border p-4 transition ${
                  picked
                    ? isRight
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : 'border-rose-500/40 bg-rose-500/5'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <p className="text-sm text-slate-200 mb-3">
                  <span className="font-mono text-indigo-400 mr-2">0{idx + 1}.</span>
                  <GlossaryText text={sc.task} />
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'app' as const, label: 'Antigravity 2.0 App', icon: Monitor },
                    { id: 'ide' as const, label: 'Antigravity IDE', icon: Laptop },
                    { id: 'cli' as const, label: 'agy CLI', icon: Terminal },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const active = picked === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectSurface(sc.id, opt.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                          active
                            ? isRight
                              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                              : 'border-rose-400 bg-rose-500/20 text-rose-200'
                            : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-indigo-400/60 hover:text-white'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                {picked && (
                  <p className={`mt-2.5 text-xs ${isRight ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {isRight ? '✓ Doğru! ' : '✕ Tekrar dene: '}
                    {isRight ? (
                      <GlossaryText text={sc.explanation} />
                    ) : (
                      'Bu görev için başka bir yüzey daha güçlü özellikler sunuyor.'
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
