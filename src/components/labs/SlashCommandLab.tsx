import React, { useState } from 'react';
import { Terminal, CheckCircle2, FileText, Play, MessageSquarePlus, Sparkles } from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface SlashCommandLabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

interface CommandChallenge {
  id: string;
  situation: string;
  correctCommand: string;
  hint: string;
}

const SLASH_OPTIONS = [
  { cmd: '/plan', desc: 'Kod yazmadan önce adım adım Plan Artifact oluşturur' },
  { cmd: '/grill-me', desc: 'Tasarım kararlarını etkileşimli sorularla netleştirir' },
  { cmd: '/boost', desc: 'Derin düşünme ve çoklu bakış açısıyla titiz doğrulama' },
  { cmd: '/goal', desc: 'Uzun soluklu görevde hedefe ulaşana kadar durmaz' },
  { cmd: '/learn', desc: 'Çözümü/düzeltmeyi gelecek görevler için kalıcı hale getirir' },
];

const CHALLENGES: CommandChallenge[] = [
  {
    id: 'c1',
    situation: 'Aklında yeni bir abonelik sistemi var ama fiyatlandırma ve rol kuralları henüz net değil. Ajanın önce sana sorular sorup kararları netleştirmesini istiyorsun.',
    correctCommand: '/grill-me',
    hint: 'Etkileşimli mülakat başlatan komut hangisi?',
  },
  {
    id: 'c2',
    situation: 'Karmaşık bir veritabanı geçişini yapmadan önce ajanın adım adım teknik plan çıkarmasını ve senin onayını beklemesini istiyorsun.',
    correctCommand: '/plan',
    hint: 'Plan Artifact üreten temel komut.',
  },
  {
    id: 'c3',
    situation: 'Ajanın projedeki özel Docker test komutunu öğrenmesini ve bundan sonraki her sohbette otomatik uygulamasını istiyorsun.',
    correctCommand: '/learn',
    hint: 'Kalıcı öğrenme sağlayan komut.',
  },
];

export const SlashCommandLab: React.FC<SlashCommandLabProps> = ({ isCompleted, onComplete }) => {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [artifactFeedback, setArtifactFeedback] = useState('');
  const [artifactRevised, setArtifactRevised] = useState(false);
  const [artifactApproved, setArtifactApproved] = useState(false);

  const solvedChallenges = CHALLENGES.filter((c) => selected[c.id] === c.correctCommand).length;

  const checkDone = (solved: number, approved: boolean) => {
    if (solved === CHALLENGES.length && approved) {
      onComplete();
    }
  };

  const handlePick = (challengeId: string, cmd: string) => {
    const next = { ...selected, [challengeId]: cmd };
    setSelected(next);
    const count = CHALLENGES.filter((c) => next[c.id] === c.correctCommand).length;
    checkDone(count, artifactApproved);
  };

  const handleRevise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artifactFeedback.trim()) return;
    setArtifactRevised(true);
  };

  const handleApprove = () => {
    setArtifactApproved(true);
    checkDone(solvedChallenges, true);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-violet-100 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-violet-400 shrink-0" />
          <span>
            <strong>Görev:</strong> 3 senaryo için doğru Slash komutunu seç ve aşağıdaki <strong>Plan Artifact</strong>’ini inceleyip <strong>Proceed (Onayla)</strong> ile başlat.
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="text-xs font-mono text-violet-300">
            Komutlar: {solvedChallenges}/{CHALLENGES.length} · Artifact: {artifactApproved ? 'Onaylandı' : 'Bekliyor'}
          </span>
        )}
      </div>

      {/* Part 1: Slash Command Matcher */}
      <div className="grid gap-3">
        {CHALLENGES.map((ch, idx) => {
          const val = selected[ch.id];
          const ok = val === ch.correctCommand;
          return (
            <div
              key={ch.id}
              className={`rounded-xl border p-4 transition ${
                val
                  ? ok
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-rose-500/40 bg-rose-500/5'
                  : 'border-slate-800 bg-slate-900/70'
              }`}
            >
              <p className="text-sm text-slate-200 mb-3">
                <span className="font-mono text-violet-400 mr-2">Senaryo {idx + 1}:</span>
                <GlossaryText text={ch.situation} />
              </p>
              <div className="flex flex-wrap gap-2">
                {SLASH_OPTIONS.map((opt) => (
                  <button
                    key={opt.cmd}
                    type="button"
                    onClick={() => handlePick(ch.id, opt.cmd)}
                    title={opt.desc}
                    className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition cursor-pointer ${
                      val === opt.cmd
                        ? ok
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-semibold'
                          : 'border-rose-400 bg-rose-500/20 text-rose-200'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-violet-400/60 hover:text-violet-200'
                    }`}
                  >
                    {opt.cmd}
                  </button>
                ))}
              </div>
              {val && (
                <p className={`mt-2 text-xs ${ok ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {ok ? `✓ Kesinlikle! ${SLASH_OPTIONS.find((o) => o.cmd === ch.correctCommand)?.desc}.` : `İpucu: ${ch.hint}`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Part 2: Live Plan Artifact Review Simulation */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-violet-400" />
            <span className="font-mono text-xs font-semibold text-slate-200">
              implementation_plan.md
            </span>
            <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
              Artifact · Onay Bekliyor
            </span>
          </div>
          {artifactApproved ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Uygulama Başlatıldı
            </span>
          ) : (
            <button
              onClick={handleApprove}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" /> Proceed (Onayla)
            </button>
          )}
        </div>

        <div className="p-4 space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="font-semibold text-slate-100">
            # Uygulama Planı: Karanlık/Aydınlık Tema Desteği
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>
              <code className="text-cyan-300">src/hooks/useTheme.ts</code> — Kullanıcı tercihini <code className="text-amber-300">localStorage</code> içinde sakla.
            </li>
            <li>
              <code className="text-cyan-300">src/components/Navbar.tsx</code> — Sağ üst köşeye tema geçiş butonu ekle.
            </li>
            {artifactRevised && (
              <li className="text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/25">
                <strong>[Revizyon Eklendi]:</strong> {artifactFeedback}
              </li>
            )}
          </ul>

          {/* Optional Feedback Form */}
          {!artifactApproved && (
            <form onSubmit={handleRevise} className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={artifactFeedback}
                onChange={(e) => setArtifactFeedback(e.target.value)}
                placeholder="İsteğe bağlı revizyon yaz (örn: Sistem temasını varsayılan yap)"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-violet-500 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-violet-500/40 bg-violet-500/15 hover:bg-violet-500/25 px-3 py-2 text-xs font-medium text-violet-200 transition cursor-pointer"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" /> Plana Yorum Ekle
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
