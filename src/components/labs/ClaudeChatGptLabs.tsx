import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowLeftRight,
  FileText,
  Wand2,
  Compass,
  Layers,
} from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface LabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

/* ============================================================================
 * 1. Claude Projects & Artifacts Simulator
 * ========================================================================== */
export const ClaudeArtifactsLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [model, setModel] = useState<'haiku' | 'sonnet' | 'opus'>('sonnet');
  const [knowledge, setKnowledge] = useState<string[]>(['marka-rehberi.pdf']);
  const [artifactMode, setArtifactMode] = useState<'diagram' | 'card'>('diagram');
  const [generated, setGenerated] = useState(false);

  const toggleDoc = (doc: string) => {
    setKnowledge((prev) => (prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]));
  };

  const handleGenerate = () => {
    setGenerated(true);
    onComplete();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-amber-100">
          <strong>Claude Projects &amp; Artifacts Simülatörü:</strong> Proje bilgi dosyalarını ekle, model seç ve yan pencerede canlı <strong>Artifact</strong> üret.
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2">1. Claude Model Katmanı</div>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'haiku', label: 'Haiku', sub: 'Hızlı' },
                  { id: 'sonnet', label: 'Sonnet', sub: 'Dengeli' },
                  { id: 'opus', label: 'Opus', sub: 'Derin' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`rounded-xl border p-2 text-center transition cursor-pointer ${
                    model === m.id
                      ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold">{m.label}</div>
                  <div className="text-[10px] opacity-75">{m.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2">
              2. Project Knowledge (Kalıcı Bilgi Tabanı)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['marka-rehberi.pdf', 'api-tasarimi.md', 'ornek-promptlar.txt'].map((doc) => {
                const active = knowledge.includes(doc);
                return (
                  <button
                    key={doc}
                    onClick={() => toggleDoc(doc)}
                    className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] transition cursor-pointer ${
                      active
                        ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-500'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}
                    {doc}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2">3. Artifact Türü</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setArtifactMode('diagram')}
                className={`rounded-lg border py-1.5 text-xs font-medium cursor-pointer ${
                  artifactMode === 'diagram'
                    ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                Mermaid Diyagram
              </button>
              <button
                onClick={() => setArtifactMode('card')}
                className={`rounded-lg border py-1.5 text-xs font-medium cursor-pointer ${
                  artifactMode === 'card'
                    ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                React Önizleme
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full rounded-xl bg-amber-600 hover:bg-amber-500 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
          >
            Claude Artifact Üret
          </button>
        </div>

        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col">
          <div className="border-b border-slate-800 bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs">
            <span className="font-mono text-amber-300 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Claude Artifact Canlı Önizleme
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              Model: {model.toUpperCase()} · {knowledge.length} belge bağlı
            </span>
          </div>

          <div className="p-5 flex-1 flex items-center justify-center">
            {!generated ? (
              <p className="text-xs text-slate-500 text-center">
                Soldan ayarlarını yapıp &quot;Claude Artifact Üret&quot; butonuna bas.
              </p>
            ) : artifactMode === 'diagram' ? (
              <div className="w-full space-y-3 animate-fade-slide">
                <div className="text-xs font-mono text-emerald-300 text-center">
                  [Mermaid Akış Diyagramı — {knowledge.join(', ') || 'Genel Bağlam'} temel alındı]
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-3 py-2 text-cyan-200 font-semibold">
                    1. Fikir (AI Studio)
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-3 py-2 text-indigo-200 font-semibold">
                    2. Kodla (Antigravity)
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-emerald-200 font-semibold">
                    3. Yayınla (Vercel)
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-sm rounded-xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-4 space-y-2 animate-fade-slide">
                <div className="text-xs font-mono text-amber-300">Canlı React Bileşeni</div>
                <div className="text-sm font-bold text-white">Proje İlerleme Kartı</div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-amber-400 to-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Bağlı bilgi: {knowledge.length} proje dokümanı aktif.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. CLAUDE.md <-> GEMINI.md & Shared MCP Lab
 * ========================================================================== */
export const ClaudeVsAntigravityLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [target, setTarget] = useState<'antigravity' | 'claude' | 'mcp'>('antigravity');
  const [visited, setVisited] = useState<string[]>(['antigravity']);

  const handleSwitch = (tab: 'antigravity' | 'claude' | 'mcp') => {
    setTarget(tab);
    const next = visited.includes(tab) ? visited : [...visited, tab];
    setVisited(next);
    if (next.length === 3) {
      onComplete();
    }
  };

  const CODE: Record<typeof target, { path: string; note: string; content: string }> = {
    antigravity: {
      path: '<proje>/GEMINI.md (veya .agents/rules/genel.md)',
      note: 'Google Antigravity her sohbette bu dosyayı hiyerarşik olarak otomatik keşfeder.',
      content: `# Proje Standartları (Antigravity)
- Tüm açıklamalar Türkçe olsun.
- TypeScript strict kurallarına uy, \`any\` kullanma.
- Değişiklikten sonra \`npm run build\` ile doğrula.`,
    },
    claude: {
      path: '<proje>/CLAUDE.md',
      note: 'Claude Code birebir aynı kuralları CLAUDE.md dosyasından okur!',
      content: `# Proje Standartları (Claude Code)
- Tüm açıklamalar Türkçe olsun.
- TypeScript strict kurallarına uy, \`any\` kullanma.
- Değişiklikten sonra \`npm run build\` ile doğrula.`,
    },
    mcp: {
      path: 'mcp_config.json (Evrensel MCP Standardı)',
      note: 'Aynı MCP sunucusu hem Antigravity hem Claude Code tarafından ortak standartla kullanılır!',
      content: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`,
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-orange-100 flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-orange-400 shrink-0" />
          <span>
            <strong>Karşılaştırma Görevi:</strong> Aşağıdaki 3 sekmeyi inceleyerek Antigravity ve Claude Code’un ortak mimarisini gör.
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="font-mono text-xs text-orange-300">İncelenen: {visited.length}/3</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'antigravity', label: 'Antigravity (GEMINI.md)' },
            { id: 'claude', label: 'Claude Code (CLAUDE.md)' },
            { id: 'mcp', label: 'Ortak MCP Sunucusu' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => handleSwitch(t.id)}
            className={`rounded-xl border px-3.5 py-2 font-mono text-xs transition cursor-pointer ${
              target === t.id
                ? 'border-orange-400 bg-orange-500/20 text-orange-200 font-semibold'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {visited.includes(t.id) ? '✓ ' : ''}
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
        <div className="border-b border-slate-800 bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs">
          <span className="font-mono text-cyan-300">{CODE[target].path}</span>
          <span className="text-slate-400 hidden sm:inline">
            <Layers className="h-3.5 w-3.5 inline mr-1" /> Taşınabilir Standart
          </span>
        </div>
        <pre className="p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
          {CODE[target].content}
        </pre>
        <div className="border-t border-slate-800 bg-slate-900/50 px-4 py-2.5 text-xs text-amber-200">
          💡 <GlossaryText text={CODE[target].note} />
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. ChatGPT Canvas Interactive Editor Lab
 * ========================================================================== */
export const ChatGptCanvasLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [mode, setMode] = useState<'original' | 'short' | 'professional' | 'code'>('original');
  const [triedCount, setTriedCount] = useState(0);

  const TEXTS: Record<typeof mode, string> = {
    original: `Merhaba, yeni bir online eğitim uygulaması yaptık. İçinde Antigravity, AI Studio, Claude, ChatGPT ve Vercel var. İnsanlar deneyerek öğrenebiliyor ve ücretsiz yayınlayabiliyor.`,
    short: `⚡ Antigravity, AI Studio, Claude, ChatGPT ve Vercel’i deneyerek öğreten %100 ücretsiz interaktif akademi!`,
    professional: `Kurumsal ve bireysel geliştiriciler için tasarlanan bu interaktif öğrenme platformu; modern yapay zekâ kodlama ajanlarını ve bulut dağıtım süreçlerini uygulamalı laboratuvarlarla uçtan uca öğretir.`,
    code: `// [Canvas Kod Modu — JSDoc & Tip Koruması Eklendi]
export function calculateProgress(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}`,
  };

  const applyAction = (next: typeof mode) => {
    setMode(next);
    const nextCount = triedCount + 1;
    setTriedCount(nextCount);
    if (nextCount >= 2) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-emerald-100 flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            <strong>ChatGPT Canvas Simülatörü:</strong> Sağdaki hızlı düzenleme aksiyonlarından en az 2 tanesini deneyerek hedefli revizyon akışını gör.
          </span>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
          <span className="text-xs font-semibold text-slate-200">Canvas Çalışma Alanı</span>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'original', label: 'Orijinal' },
                { id: 'short', label: '✂️ Kısalt' },
                { id: 'professional', label: '💼 Profesyonelleştir' },
                { id: 'code', label: '💻 Kod + JSDoc' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                onClick={() => applyAction(btn.id)}
                className={`rounded-lg border px-2.5 py-1 text-xs transition cursor-pointer ${
                  mode === btn.id
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-semibold'
                    : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-emerald-500/40'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        <pre
          className={`p-5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
            mode === 'code' ? 'font-mono text-cyan-200' : 'font-sans text-slate-200'
          }`}
        >
          {TEXTS[mode]}
        </pre>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. 4-Way AI Tool Selection Matrix Challenge
 * ========================================================================== */
export const AiToolMatrixLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const SCENARIOS = [
    {
      id: 'm1',
      task: 'Bilgisayarındaki 20 dosyalık React projesinde yeni özellik geliştirip `npm run build` ile doğrulamak istiyorsun.',
      best: 'antigravity',
      why: 'Çok dosyalı yerel Workspace düzenleme ve Sandbox terminal testleri Antigravity’nin ana süper gücüdür.',
    },
    {
      id: 'm2',
      task: '1 saatlik bir ders videosunu yükleyip özet çıkarmak ve uygulaman için ücretsiz Gemini API anahtarı almak istiyorsun.',
      best: 'aistudio',
      why: 'Google AI Studio dev multimodal bağlamı ve ücretsiz API Key üretimi için en ideal duraktır.',
    },
    {
      id: 'm3',
      task: '30 farklı web kaynağını tarayıp kaynakçalı, kapsamlı bir rakip ve pazar analizi raporu hazırlatmak istiyorsun.',
      best: 'chatgpt',
      why: 'ChatGPT Deep Research onlarca web kaynağını arka planda sentezleyip kaynakçalı rapor üretir.',
    },
    {
      id: 'm4',
      task: 'Ekip dokümanlarını tek bir Project altında toplayıp anında canlı Mermaid mimari diyagramı (Artifact) çizdirmek istiyorsun.',
      best: 'claude',
      why: 'Claude Projects + Artifacts ikilisi kalıcı belge bağlamı ve canlı diyagram/önizleme için mükemmeldir.',
    },
  ] as const;

  const [picks, setPicks] = useState<Record<string, string>>({});
  const score = SCENARIOS.filter((s) => picks[s.id] === s.best).length;

  const handlePick = (id: string, val: string) => {
    const next = { ...picks, [id]: val };
    setPicks(next);
    if (SCENARIOS.filter((s) => next[s.id] === s.best).length === SCENARIOS.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-violet-100 flex items-center gap-2">
          <Compass className="h-4 w-4 text-violet-400 shrink-0" />
          <span>
            <strong>4’lü AI Seçim Meydan Okuması:</strong> Her gerçek hayat senaryosu için en güçlü 1. aracı seç!
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="font-mono text-xs text-violet-300">Doğru: {score}/{SCENARIOS.length}</span>
        )}
      </div>

      <div className="grid gap-3">
        {SCENARIOS.map((sc, idx) => {
          const picked = picks[sc.id];
          const ok = picked === sc.best;
          return (
            <div
              key={sc.id}
              className={`rounded-xl border p-4 transition ${
                picked
                  ? ok
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-rose-500/40 bg-rose-500/5'
                  : 'border-slate-800 bg-slate-900/75'
              }`}
            >
              <p className="text-sm text-slate-200 mb-3">
                <span className="font-mono text-violet-400 mr-2">0{idx + 1}.</span>
                <GlossaryText text={sc.task} />
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'antigravity', label: '🚀 Antigravity' },
                  { id: 'aistudio', label: '✨ AI Studio' },
                  { id: 'claude', label: '🟠 Claude' },
                  { id: 'chatgpt', label: '🟢 ChatGPT' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handlePick(sc.id, opt.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      picked === opt.id
                        ? ok
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                          : 'border-rose-400 bg-rose-500/20 text-rose-200'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-violet-400/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {picked && (
                <p className={`mt-2 text-xs ${ok ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {ok ? '✓ Harika seçim! ' : '💡 İpucu: '}
                  <GlossaryText text={sc.why} />
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
