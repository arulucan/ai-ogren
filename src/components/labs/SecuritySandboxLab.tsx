import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, Lock, Unlock, Ban, Sparkles } from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface SecuritySandboxLabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

type Decision = 'sandbox' | 'bypass' | 'deny';

interface CommandCase {
  id: string;
  command: string;
  context: string;
  correct: Decision;
  reason: string;
}

const CASES: CommandCase[] = [
  {
    id: 'sec1',
    command: 'npm test',
    context: 'Proje içindeki birim testlerini çalıştırmak için istendi. İnternet erişimine gerek yok.',
    correct: 'sandbox',
    reason: 'Çalışma alanı içindeki yerel testler Standard Sandbox modunda sıfır riskle ve onay beklemeden güvenle çalışır.',
  },
  {
    id: 'sec2',
    command: 'npm install lucide-react',
    context: 'Harici npm kayıt sunucusundan yeni paket indirilecek (sandbox içinde ağ kapalıdır).',
    correct: 'bypass',
    reason: 'Paket indirme işlemi ağ (internet) erişimi gerektirdiği için yalnızca bu tek komut için BypassSandbox onayı verilmelidir.',
  },
  {
    id: 'sec3',
    command: 'cat ~/.ssh/id_rsa',
    context: 'Ajan çalışma alanı dışındaki kişisel SSH özel anahtarını okumaya çalışıyor.',
    correct: 'deny',
    reason: 'Kişisel kimlik bilgileri ve SSH anahtarları asla paylaşılmamalıdır; çalışma alanı dışı hassas okuma kesinlikle reddedilmelidir.',
  },
  {
    id: 'sec4',
    command: 'npx tsc --noEmit',
    context: 'TypeScript tip kontrolü yapmak istiyor; yalnızca yerel proje dosyalarını okur.',
    correct: 'sandbox',
    reason: 'Tip kontrolü ve derleme işlemleri tamamen yereldir, Sandbox içinde güvenle çalıştırılır.',
  },
  {
    id: 'sec5',
    command: 'DROP TABLE users; -- (prod veritabanı)',
    context: 'Üretim (production) veritabanında geri dönüşsüz tablo silme komutu önerildi.',
    correct: 'deny',
    reason: 'Geri dönüşsüz veri kaybı riski taşıyan üretim komutları açık doğrulama/yedek olmadan kesinlikle engellenmelidir.',
  },
];

export const SecuritySandboxLab: React.FC<SecuritySandboxLabProps> = ({ isCompleted, onComplete }) => {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const correctCount = CASES.filter((c) => decisions[c.id] === c.correct).length;

  const handleDecide = (id: string, decision: Decision) => {
    const next = { ...decisions, [id]: decision };
    setDecisions(next);
    const ok = CASES.filter((c) => next[c.id] === c.correct).length;
    if (ok === CASES.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-100">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Güvenlik Simülasyonu:</strong> Ajanın çalıştırmak istediği 5 komut için en doğru izin kararını ver.
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="font-mono text-xs text-emerald-300">
            Doğru Karar: {correctCount}/{CASES.length}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {CASES.map((item) => {
          const picked = decisions[item.id];
          const isCorrect = picked === item.correct;

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 transition ${
                picked
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-rose-500/40 bg-rose-500/5'
                  : 'border-slate-800 bg-slate-900/75'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <code className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 font-mono text-xs sm:text-sm text-amber-300">
                  $ {item.command}
                </code>
                {picked && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Doğru Karar
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-4 w-4" /> Riskli / Hatalı
                      </>
                    )}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mb-3">
                <GlossaryText text={item.context} />
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleDecide(item.id, 'sandbox')}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    picked === 'sandbox'
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                        : 'border-rose-400 bg-rose-500/20 text-rose-200'
                      : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-emerald-500/50'
                  }`}
                >
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  Sandbox İçinde Çalıştır
                </button>

                <button
                  type="button"
                  onClick={() => handleDecide(item.id, 'bypass')}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    picked === 'bypass'
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                        : 'border-rose-400 bg-rose-500/20 text-rose-200'
                      : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <Unlock className="h-3.5 w-3.5 text-amber-400" />
                  BypassSandbox Onayla
                </button>

                <button
                  type="button"
                  onClick={() => handleDecide(item.id, 'deny')}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    picked === 'deny'
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                        : 'border-rose-400 bg-rose-500/20 text-rose-200'
                      : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-rose-500/50'
                  }`}
                >
                  <Ban className="h-3.5 w-3.5 text-rose-400" />
                  Reddet / Engelle
                </button>
              </div>

              {picked && (
                <p className={`mt-2.5 text-xs leading-relaxed ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                  <GlossaryText text={item.reason} />
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
