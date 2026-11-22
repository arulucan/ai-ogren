import React, { useState } from 'react';
import {
  GitBranch,
  GitCommit,
  GitMerge,
  CloudUpload,
  CheckCircle2,
  Sparkles,
  FileEdit,
  Globe,
  AlertTriangle,
  Rocket,
  Lock,
  Unlock,
} from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface LabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

/* ============================================================================
 * 1. Interactive Git Lifecycle Lab
 * ========================================================================== */
export const GitFlowLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [stage, setStage] = useState<'clean' | 'modified' | 'staged' | 'committed' | 'pushed'>('clean');
  const [commitMsg, setCommitMsg] = useState('feat: ilk öğrenme modülü eklendi');
  const [history, setHistory] = useState<string[]>(['[init] Boş proje klasörü hazır']);

  const advance = (nextStage: typeof stage, cmd: string) => {
    setStage(nextStage);
    setHistory((prev) => [...prev, cmd]);
    if (nextStage === 'pushed') {
      onComplete();
    }
  };

  const steps = [
    { id: 'modified', label: '1. Dosya Düzenle', active: stage !== 'clean' },
    { id: 'staged', label: '2. Staging (git add)', active: ['staged', 'committed', 'pushed'].includes(stage) },
    { id: 'committed', label: '3. Local Commit', active: ['committed', 'pushed'].includes(stage) },
    { id: 'pushed', label: '4. GitHub Push', active: stage === 'pushed' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-orange-100 flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-orange-400 shrink-0" />
          <span>
            <strong>Git Yaşam Döngüsü:</strong> Aşağıdaki 4 adımı sırayla uygulayarak bir kod değişikliğinin bilgisayarından GitHub’a yolculuğunu canlı izle.
          </span>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      {/* 4 Stage Visual Pipeline */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`rounded-xl border p-3.5 transition ${
              s.active
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                : 'border-slate-800 bg-slate-900/60 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>{s.label}</span>
              {s.active && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
            </div>
            <div className="mt-1.5 font-mono text-[11px] opacity-80">
              {s.id === 'modified' && (stage === 'modified' ? '● App.tsx (Değişti)' : stage === 'clean' ? 'Bekliyor' : '✓ İşlendi')}
              {s.id === 'staged' && (stage === 'staged' ? '● App.tsx (Sahnelendi)' : s.active ? '✓ İşlendi' : 'Boş')}
              {s.id === 'committed' && (stage === 'committed' ? '● Commit: #a1b2c3' : s.active ? '✓ Mühürlendi' : 'Bekliyor')}
              {s.id === 'pushed' && (stage === 'pushed' ? '🚀 github.com/sen/proje' : 'Henüz gönderilmedi')}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Action Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => advance('modified', '# App.tsx dosyasında başlık güncellendi')}
            disabled={stage !== 'clean'}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-35 px-3.5 py-2 text-xs font-semibold text-white transition cursor-pointer disabled:cursor-not-allowed"
          >
            <FileEdit className="h-3.5 w-3.5" /> 1. App.tsx’i Düzenle
          </button>

          <button
            onClick={() => advance('staged', '$ git add src/App.tsx')}
            disabled={stage !== 'modified'}
            className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-35 px-3.5 py-2 text-xs font-semibold text-white transition cursor-pointer disabled:cursor-not-allowed"
          >
            2. git add (Staging)
          </button>

          <button
            onClick={() => advance('committed', `$ git commit -m "${commitMsg}"`)}
            disabled={stage !== 'staged'}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-35 px-3.5 py-2 text-xs font-semibold text-white transition cursor-pointer disabled:cursor-not-allowed"
          >
            <GitCommit className="h-3.5 w-3.5" /> 3. git commit
          </button>

          <button
            onClick={() => advance('pushed', '$ git push origin main → GitHub güncellendi!')}
            disabled={stage !== 'committed'}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-35 px-3.5 py-2 text-xs font-semibold text-white transition cursor-pointer disabled:cursor-not-allowed"
          >
            <CloudUpload className="h-3.5 w-3.5" /> 4. git push
          </button>

          {stage === 'pushed' && (
            <button
              onClick={() => {
                setStage('clean');
                setHistory(['[reset] Yeni döngü için hazır']);
              }}
              className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              Tekrar Dene
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400 shrink-0">Commit Mesajı:</span>
          <input
            type="text"
            value={commitMsg}
            onChange={(e) => setCommitMsg(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs space-y-1 text-slate-300">
          {history.map((h, i) => (
            <div key={i} className={h.startsWith('$') ? 'text-emerald-300' : 'text-slate-400'}>
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. GitHub Repo & Pull Request Lab
 * ========================================================================== */
export const GitHubPrLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [repoName, setRepoName] = useState('antigravity-akademi');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [prMerged, setPrMerged] = useState(false);

  const ghCommand = `gh repo create ${repoName || 'projem'} --${visibility} --source=. --push`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-indigo-100">
          <strong>GitHub &amp; PR Simülatörü:</strong> Depo ayarını seçip <code className="font-mono">gh</code> komutunu oluştur, ardından örnek Pull Request’i inceleyip <strong>Merge</strong> et.
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      {/* Repo Configurator */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">GitHub Depo Adı</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value.replace(/\s+/g, '-').toLowerCase())}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Görünürlük</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setVisibility('public')}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-semibold cursor-pointer ${
                  visibility === 'public'
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-400'
                }`}
              >
                <Unlock className="h-3.5 w-3.5" /> Public
              </button>
              <button
                onClick={() => setVisibility('private')}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-semibold cursor-pointer ${
                  visibility === 'private'
                    ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200'
                    : 'border-slate-700 bg-slate-950 text-slate-400'
                }`}
              >
                <Lock className="h-3.5 w-3.5" /> Private
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 font-mono text-xs text-emerald-300">
          $ {ghCommand}
        </div>
      </div>

      {/* Simulated Pull Request Review */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`rounded-full px-2.5 py-0.5 font-semibold ${
                prMerged ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              {prMerged ? 'Merged ✓' : 'Open PR #1'}
            </span>
            <span className="font-semibold text-white">feat: Yeni AI Studio eğitim parkuru</span>
          </div>
          <button
            disabled={prMerged}
            onClick={() => {
              setPrMerged(true);
              onComplete();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold text-white transition cursor-pointer"
          >
            <GitMerge className="h-3.5 w-3.5" />
            {prMerged ? 'main Dalına Birleştirildi' : 'Merge Pull Request'}
          </button>
        </div>

        <div className="p-4 space-y-3 font-mono text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 space-y-1">
            <div className="text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded">
              - title: &quot;Sadece Antigravity&quot;
            </div>
            <div className="text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
              + title: &quot;Antigravity + AI Studio + GitHub &amp; Vercel Akademi&quot;
            </div>
          </div>

          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-200 font-sans text-xs">
            <strong>🤖 Vercel Bot:</strong> Preview Deployment hazır! →{' '}
            <code className="font-mono text-cyan-300">
              https://{repoName || 'projem'}-git-aistudio.vercel.app
            </code>
            {prMerged && (
              <div className="mt-1.5 text-emerald-300 font-semibold">
                🚀 PR birleştirildi! Production sürümü otomatik güncelleniyor...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. Vercel CI/CD Preview vs Production Pipeline Lab
 * ========================================================================== */
export const VercelPipelineLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [branch, setBranch] = useState<'feature/yeni-tasarim' | 'main'>('feature/yeni-tasarim');
  const [logs, setLogs] = useState<string[]>([]);
  const [deploying, setDeploying] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleTriggerDeploy = () => {
    if (deploying) return;
    setDeploying(true);
    setLogs([]);
    setResultUrl(null);

    const isProd = branch === 'main';
    const steps = [
      `[GitHub Webhook] "${branch}" dalına yeni push algılandı.`,
      `[Vercel Build] Kaynak kod indiriliyor (Cloning repo)...`,
      `[Vercel Build] npm install → 84 paket kuruldu (3.1s)`,
      `[Vercel Build] npm run build → tsc -b && vite build ✓ (0 hata)`,
      `[Vercel Edge CDN] Dosyalar küresel sunuculara dağıtılıyor...`,
      isProd
        ? `✅ PRODUCTION CANLI! https://antigravity-akademi.vercel.app`
        : `✅ PREVIEW HAZIR! https://antigravity-akademi-git-yeni-tasarim.vercel.app (Ana site etkilenmedi!)`,
    ];

    steps.forEach((line, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (idx === steps.length - 1) {
          setDeploying(false);
          setResultUrl(
            isProd
              ? 'https://antigravity-akademi.vercel.app (Production)'
              : 'https://antigravity-akademi-git-yeni-tasarim.vercel.app (Preview)'
          );
          onComplete();
        }
      }, (idx + 1) * 400);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-emerald-100">
          <strong>Vercel CI/CD Simülatörü:</strong> Bir dal seçip <code className="font-mono">git push</code> tetikle ve Vercel’in otomatik derleme + dağıtım hattını canlı izle.
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setBranch('feature/yeni-tasarim')}
            className={`rounded-xl border px-3.5 py-2 font-mono text-xs transition cursor-pointer ${
              branch === 'feature/yeni-tasarim'
                ? 'border-amber-400 bg-amber-500/20 text-amber-200 font-semibold'
                : 'border-slate-700 bg-slate-950 text-slate-400'
            }`}
          >
            Dal: feature/yeni-tasarim (Preview)
          </button>
          <button
            onClick={() => setBranch('main')}
            className={`rounded-xl border px-3.5 py-2 font-mono text-xs transition cursor-pointer ${
              branch === 'main'
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-semibold'
                : 'border-slate-700 bg-slate-950 text-slate-400'
            }`}
          >
            Dal: main (Production)
          </button>
        </div>

        <button
          onClick={handleTriggerDeploy}
          disabled={deploying}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-4 py-2 text-xs font-semibold text-white transition cursor-pointer"
        >
          <Rocket className="h-3.5 w-3.5" />
          {deploying ? 'Yayınlanıyor...' : `git push origin ${branch}`}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-2 min-h-[190px]">
        {logs.length === 0 ? (
          <div className="text-slate-500">
            Vercel Build Logları burada canlı akacak. Başlatmak için &quot;git push&quot; butonuna bas...
          </div>
        ) : (
          logs.map((line, i) => (
            <div
              key={i}
              className={`animate-fade-slide ${
                line.startsWith('✅')
                  ? 'text-emerald-300 font-semibold'
                  : line.includes('✓')
                  ? 'text-cyan-300'
                  : 'text-slate-300'
              }`}
            >
              {line}
            </div>
          ))
        )}
        {resultUrl && (
          <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 flex items-center gap-2 text-emerald-200 font-sans">
            <Globe className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Yayındaki Adres:</strong> <code className="font-mono">{resultUrl}</code>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. Vercel Env Vars & Troubleshooting Debugger Lab
 * ========================================================================== */
export const VercelEnvDebugLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const BUGS = [
    {
      id: 'b1',
      error: '404: NOT_FOUND — Kullanıcı /dersler/3 adresinde F5 (Yenile) yapınca sayfa bulunamıyor.',
      options: [
        'vercel.json içine SPA rewrites (/(.*) → /index.html) kuralını eklemek',
        'Tailwind CSS’i silmek',
        'Projeyi Private yapmak',
      ],
      correct: 0,
      explanation: 'React/Vite tek sayfalık uygulamalarda (SPA) tüm yolların `index.html`’e yönlendirilmesi gerekir.',
    },
    {
      id: 'b2',
      error: 'Build Failed: Cannot find module "./components/navbar" (Windows’ta çalışıyordu!)',
      options: [
        'Dosya adı "Navbar.tsx" olduğu için import yolundaki büyük/küçük harfi birebir düzeltmek',
        'Bilgisayarı yeniden başlatmak',
        'README.md eklemek',
      ],
      correct: 0,
      explanation: 'Vercel Linux tabanlıdır ve dosya adlarında büyük/küçük harfe duyarlıdır (`Navbar.tsx` ≠ `navbar.tsx`).',
    },
    {
      id: 'b3',
      error: 'Vercel paneline GEMINI_API_KEY eklendi ama canlı sitede hâlâ undefined dönüyor.',
      options: [
        'Yeni ortam değişkeninin derlemeye yansıması için son yayını Redeploy etmek',
        'API anahtarını HTML içine yazmak',
        'GitHub hesabını kapatmak',
      ],
      correct: 0,
      explanation: 'Vercel’de eklenen yeni Environment Variables bir sonraki Redeploy veya Push ile devreye girer.',
    },
  ];

  const [picks, setPicks] = useState<Record<string, number>>({});
  const solved = BUGS.filter((b) => picks[b.id] === b.correct).length;

  const handlePick = (id: string, idx: number) => {
    const next = { ...picks, [id]: idx };
    setPicks(next);
    if (BUGS.filter((b) => next[b.id] === b.correct).length === BUGS.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-sky-100 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-sky-400 shrink-0" />
          <span>
            <strong>Hata Ayıklama Laboratuvarı:</strong> Canlıya alırken en sık karşılaşılan 3 Vercel hatasına doğru çözümü uygula.
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="font-mono text-xs text-sky-300">Çözülen: {solved}/{BUGS.length}</span>
        )}
      </div>

      <div className="space-y-3">
        {BUGS.map((bug) => {
          const picked = picks[bug.id];
          const answered = picked !== undefined;
          const ok = picked === bug.correct;
          return (
            <div
              key={bug.id}
              className={`rounded-xl border p-4 space-y-3 transition ${
                answered
                  ? ok
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-rose-500/40 bg-rose-500/5'
                  : 'border-slate-800 bg-slate-900/75'
              }`}
            >
              <div className="rounded-lg bg-slate-950 border border-rose-500/30 px-3 py-2 font-mono text-xs text-rose-300">
                ✕ {bug.error}
              </div>
              <div className="grid gap-2">
                {bug.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePick(bug.id, idx)}
                    className={`text-left rounded-lg border px-3 py-2 text-xs transition cursor-pointer ${
                      picked === idx
                        ? ok
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-medium'
                          : 'border-rose-400 bg-rose-500/20 text-rose-200'
                        : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-sky-500/50'
                    }`}
                  >
                    <GlossaryText text={opt} />
                  </button>
                ))}
              </div>
              {answered && (
                <p className={`text-xs ${ok ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {ok ? '✓ Doğru Teşhis! ' : '💡 İpucu: '}
                  <GlossaryText text={bug.explanation} />
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
