import React, { useState } from 'react';
import { Network, Clock, CheckCircle2, Sparkles, CalendarClock } from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface MultiAgentLabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

interface RoutingCase {
  id: string;
  task: string;
  correct: 'research' | 'browser' | 'swarm' | 'workflow';
  explanation: string;
}

const ROUTING_CASES: RoutingCase[] = [
  {
    id: 'r1',
    task: 'Canlı geliştirme sunucusundaki kayıt formunu tarayıcıda açıp doldurmak ve buton rengini görsel olarak doğrulamak.',
    correct: 'browser',
    explanation: 'Tarayıcı etkileşimi ve canlı görsel UI doğrulaması için `browser` subagent kullanılır.',
  },
  {
    id: 'r2',
    task: '35 farklı TypeScript modülünün her birinde güvenlik taraması yapıp sonuçları tek raporda birleştirmek.',
    correct: 'workflow',
    explanation: 'Çok sayıda bağımsız parça üzerinde paralel dağıtım (fan-out) ve toplama için `run_workflow` idealdir.',
  },
  {
    id: 'r3',
    task: 'Bir geliştirici ajan frontend yazarken eş zamanlı başka bir ajanın backend yazması ve ortak panoda koordine olması.',
    correct: 'swarm',
    explanation: 'Paralel çalışan ve ortak mesaj panosu üzerinden işbirliği yapan roller için Swarm (`/teamwork`) kullanılır.',
  },
  {
    id: 'r4',
    task: 'Ana sohbet bağlamını kirletmeden büyük bir kod tabanında salt-okunur (read-only) mimari araştırma yapmak.',
    correct: 'research',
    explanation: 'Salt-okunur derin araştırma ve dosya taramaları için `research` subagent en temiz seçenektir.',
  },
];

const CRON_PRESETS = [
  { label: 'Hafta içi her sabah 09:00', expr: '0 9 * * 1-5' },
  { label: 'Her Pazartesi 10:30', expr: '30 10 * * 1' },
  { label: 'Her 15 dakikada bir', expr: '*/15 * * * *' },
  { label: 'Her gece 02:00', expr: '0 2 * * *' },
];

function decodeCronTurkish(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return 'Geçerli 5 alanlı Cron formatı girin (örn: 0 9 * * 1-5)';
  const [min, hour, dom, mon, dow] = parts;

  if (min.startsWith('*/') && hour === '*' && dom === '*' && mon === '*' && dow === '*') {
    return `Her ${min.slice(2)} dakikada bir otomatik çalışır.`;
  }
  const dayMap: Record<string, string> = {
    '*': 'Her gün',
    '1-5': 'Hafta içi her gün (Pzt-Cum)',
    '1': 'Her Pazartesi',
    '5': 'Her Cuma',
    '0': 'Her Pazar',
    '6': 'Her Cumartesi',
  };
  const dayText = dayMap[dow] ?? `Haftanın ${dow}. günleri`;
  const h = hour === '*' ? 'her saat' : `${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
  return `${dayText} saat ${h} olduğunda ajanı tetikler.`;
}

export const MultiAgentLab: React.FC<MultiAgentLabProps> = ({ isCompleted, onComplete }) => {
  const [picks, setPicks] = useState<Record<string, RoutingCase['correct']>>({});
  const [cronExpr, setCronExpr] = useState('0 9 * * 1-5');
  const [cronPrompt, setCronPrompt] = useState('Açık PR ve test durumlarını özetle');
  const [scheduled, setScheduled] = useState(false);

  const solvedCount = ROUTING_CASES.filter((c) => picks[c.id] === c.correct).length;

  const checkDone = (solved: number, isSched: boolean) => {
    if (solved === ROUTING_CASES.length && isSched) {
      onComplete();
    }
  };

  const handlePick = (id: string, val: RoutingCase['correct']) => {
    const next = { ...picks, [id]: val };
    setPicks(next);
    const count = ROUTING_CASES.filter((c) => next[c.id] === c.correct).length;
    checkDone(count, scheduled);
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    checkDone(solvedCount, true);
  };

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-pink-100">
          <Network className="h-4 w-4 text-pink-400 shrink-0" />
          <span>
            <strong>Orkestrasyon Görevi:</strong> 4 görevi doğru çoklu-ajan aracına yönlendir ve bir <strong>/schedule (Cron)</strong> otomasyonu oluştur.
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="font-mono text-xs text-pink-300">
            Yönlendirme: {solvedCount}/{ROUTING_CASES.length} · Cron: {scheduled ? 'Kuruldu' : 'Bekliyor'}
          </span>
        )}
      </div>

      {/* Part 1: Routing Challenge */}
      <div className="grid gap-3">
        {ROUTING_CASES.map((rc) => {
          const picked = picks[rc.id];
          const ok = picked === rc.correct;
          return (
            <div
              key={rc.id}
              className={`rounded-xl border p-4 transition ${
                picked
                  ? ok
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-rose-500/40 bg-rose-500/5'
                  : 'border-slate-800 bg-slate-900/75'
              }`}
            >
              <p className="text-sm text-slate-200 mb-3">
                <GlossaryText text={rc.task} />
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'research', label: 'research Subagent' },
                    { id: 'browser', label: 'browser Subagent' },
                    { id: 'swarm', label: 'Swarm (/teamwork)' },
                    { id: 'workflow', label: 'run_workflow (Fan-out)' },
                  ] as const
                ).map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => handlePick(rc.id, btn.id)}
                    className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition cursor-pointer ${
                      picked === btn.id
                        ? ok
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-semibold'
                          : 'border-rose-400 bg-rose-500/20 text-rose-200'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-pink-400/50'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              {picked && (
                <p className={`mt-2 text-xs ${ok ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {ok ? (
                    <>
                      ✓ <GlossaryText text={rc.explanation} />
                    </>
                  ) : (
                    '✕ Bu iş yükü için başka bir çoklu-ajan mekanizması çok daha verimli.'
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Part 2: Interactive /schedule Cron Builder */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-pink-400" /> İnteraktif /schedule (Cron) Oluşturucu
          </h4>
          {scheduled && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Otomasyon Aktif
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {CRON_PRESETS.map((p) => (
            <button
              key={p.expr}
              type="button"
              onClick={() => setCronExpr(p.expr)}
              className={`rounded-lg border px-2.5 py-1 text-xs transition cursor-pointer ${
                cronExpr === p.expr
                  ? 'border-pink-400/60 bg-pink-500/20 text-pink-200'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSaveSchedule} className="grid sm:grid-cols-12 gap-3">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Cron İfadesi</label>
            <input
              type="text"
              value={cronExpr}
              onChange={(e) => setCronExpr(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm text-pink-300 focus:border-pink-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-6">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Ajan Görevi (Prompt)</label>
            <input
              type="text"
              value={cronPrompt}
              onChange={(e) => setCronPrompt(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 px-3 py-2 text-xs font-semibold text-white transition cursor-pointer h-[38px]"
            >
              <Clock className="h-3.5 w-3.5" /> Zamanla
            </button>
          </div>
        </form>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            <strong className="text-pink-300">Türkçe Karşılığı:</strong> {decodeCronTurkish(cronExpr)}
          </span>
          <code className="font-mono text-[11px] text-slate-400">
            schedule(CronExpression=&quot;{cronExpr}&quot;)
          </code>
        </div>
      </div>
    </div>
  );
};
