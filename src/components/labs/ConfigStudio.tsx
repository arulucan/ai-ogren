import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Download,
  Sparkles,
  Layers,
  Eye,
  FileCode2,
  Check,
} from 'lucide-react';

interface ConfigStudioProps {
  isCompleted?: boolean;
  onComplete?: () => void;
  standalone?: boolean;
}

type ConfigType = 'gemini' | 'skill' | 'hooks' | 'mcp';

interface ValidationResult {
  valid: boolean;
  checks: Array<{ ok: boolean; label: string }>;
}

const TEMPLATES: Record<ConfigType, { filename: string; pathHint: string; content: string }> = {
  gemini: {
    filename: 'GEMINI.md',
    pathHint: '<proje-kökü>/GEMINI.md (veya .agents/rules/genel.md)',
    content: `# Proje Kuralları (Antigravity Rules)

- Tüm yanıtlarını ve kod yorumlarını Türkçe yaz.
- TypeScript'te kesinlikle \`any\` tipi kullanma.
- UI bileşenlerinde Tailwind CSS tercih et ve erişilebilirlik (aria-label) ekle.
- Her önemli kod değişikliğinden sonra \`npm run build\` ile doğrula.
`,
  },
  skill: {
    filename: 'SKILL.md',
    pathHint: '.agents/skills/pr-hazirla/SKILL.md',
    content: `---
name: pr-hazirla
description: Git değişikliklerini inceleyip ekip standartlarına uygun Türkçe PR özeti hazırlar.
---

# PR Hazırlama Prosedürü

1. \`git status\` ve \`git diff --stat\` komutlarını çalıştır.
2. Değişiklikleri "Özellik", "Hata Düzeltme" ve "Test" başlıklarında özetle.
3. Hassas anahtar (.env, token) sızıntısı olmadığını doğrula.
4. Sonucu temiz bir Markdown checklist olarak sun.
`,
  },
  hooks: {
    filename: 'hooks.json',
    pathHint: '.agents/hooks.json',
    content: `{
  "hooks": [
    {
      "event": "pre_tool_execution",
      "matcher": "run_command",
      "command": "echo '[Hook] Komut güvenlik kontrolünden geçti'"
    }
  ]
}
`,
  },
  mcp: {
    filename: 'mcp_config.json',
    pathHint: '~/.gemini/config/mcp_config.json (veya .agents/mcp_config.json)',
    content: `{
  "mcpServers": {
    "github-docs": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./docs"],
      "env": {}
    }
  }
}
`,
  },
};

function validateConfig(type: ConfigType, text: string): ValidationResult {
  if (type === 'gemini') {
    const hasHeading = /^#\s+.+/m.test(text);
    const hasBullets = /^[-*]\s+.+/m.test(text);
    const notEmpty = text.trim().length >= 30;
    const checks = [
      { ok: hasHeading, label: 'Net bir Markdown başlığı (# ...) içeriyor' },
      { ok: hasBullets, label: 'Madde işaretli açık kurallar (- ...) içeriyor' },
      { ok: notEmpty, label: 'Yeterli bağlam talimatı içeriyor (30+ karakter)' },
    ];
    return { valid: checks.every((c) => c.ok), checks };
  }

  if (type === 'skill') {
    const hasFrontmatter = /^---\s*\n[\s\S]*?\n---/m.test(text);
    const hasName = /^name:\s*[a-z0-9-_]+/m.test(text);
    const hasDesc = /^description:\s*.{10,}/m.test(text);
    const hasBody = text.split('---').slice(2).join('---').trim().length >= 25;
    const checks = [
      { ok: hasFrontmatter, label: 'YAML frontmatter (--- ... ---) bloğu mevcut' },
      { ok: hasName, label: 'Geçerli `name:` alanı tanımlı (küçük harf/tire)' },
      { ok: hasDesc, label: 'Progressive Disclosure için açıklayıcı `description:` var' },
      { ok: hasBody, label: 'Gövde bölümünde adım adım talimatlar yer alıyor' },
    ];
    return { valid: checks.every((c) => c.ok), checks };
  }

  // JSON based: hooks & mcp
  try {
    const parsed = JSON.parse(text);
    if (type === 'hooks') {
      const hasHooksArr = Array.isArray(parsed.hooks) && parsed.hooks.length > 0;
      const hasEvent = hasHooksArr && Boolean(parsed.hooks[0].event);
      const checks = [
        { ok: true, label: 'Geçerli JSON sözdizimi' },
        { ok: hasHooksArr, label: 'En az 1 adet `hooks` girdisi içeriyor' },
        { ok: hasEvent, label: 'Yaşam döngüsü `event` alanı tanımlı' },
      ];
      return { valid: checks.every((c) => c.ok), checks };
    } else {
      const hasServers =
        parsed.mcpServers &&
        typeof parsed.mcpServers === 'object' &&
        Object.keys(parsed.mcpServers).length > 0;
      const checks = [
        { ok: true, label: 'Geçerli JSON sözdizimi' },
        { ok: Boolean(hasServers), label: '`mcpServers` altında en az 1 sunucu tanımlı' },
      ];
      return { valid: checks.every((c) => c.ok), checks };
    }
  } catch {
    return {
      valid: false,
      checks: [{ ok: false, label: 'JSON sözdizimi hatası — tırnak ve virgülleri kontrol et' }],
    };
  }
}

export const ConfigStudio: React.FC<ConfigStudioProps> = ({
  isCompleted,
  onComplete,
  standalone = false,
}) => {
  const [activeType, setActiveType] = useState<ConfigType>('skill');
  const [files, setFiles] = useState<Record<ConfigType, string>>({
    gemini: TEMPLATES.gemini.content,
    skill: TEMPLATES.skill.content,
    hooks: TEMPLATES.hooks.content,
    mcp: TEMPLATES.mcp.content,
  });
  const [copied, setCopied] = useState(false);
  const [testedDisclosure, setTestedDisclosure] = useState<'idle' | 'metadata' | 'activated'>('metadata');
  const [validatedTypes, setValidatedTypes] = useState<ConfigType[]>([]);

  const currentCode = files[activeType];
  const validation = validateConfig(activeType, currentCode);

  const handleCodeChange = (val: string) => {
    setFiles((prev) => ({ ...prev, [activeType]: val }));
  };

  const handleVerifyAndSave = () => {
    if (!validation.valid) return;
    const nextTypes = validatedTypes.includes(activeType)
      ? validatedTypes
      : [...validatedTypes, activeType];
    setValidatedTypes(nextTypes);
    if (onComplete && (nextTypes.length >= 2 || testedDisclosure === 'activated')) {
      onComplete();
    }
  };

  const handleActivateSkillSim = () => {
    setTestedDisclosure('activated');
    if (onComplete && validation.valid) {
      onComplete();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = TEMPLATES[activeType].filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {!standalone && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-100">
            <FileCode2 className="h-4 w-4 text-amber-400 shrink-0" />
            <span>
              <strong>Atölye Görevi:</strong> Bir <code className="font-mono">SKILL.md</code> veya <code className="font-mono">GEMINI.md</code> düzenle, doğrula ve aşağıdaki <strong>Progressive Disclosure</strong> simülasyonunu tetikle.
            </span>
          </div>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
            </span>
          )}
        </div>
      )}

      {/* Config Type Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'skill', label: 'SKILL.md (Skill)' },
              { id: 'gemini', label: 'GEMINI.md (Rule)' },
              { id: 'hooks', label: 'hooks.json (Hook)' },
              { id: 'mcp', label: 'mcp_config.json (MCP)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={`rounded-xl border px-3.5 py-2 font-mono text-xs font-medium transition cursor-pointer ${
                activeType === tab.id
                  ? 'border-amber-400/70 bg-amber-500/20 text-amber-200 shadow-sm'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> İndir
          </button>
        </div>
      </div>

      {/* Main Editor + Live Validator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Code Editor */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
            <span className="font-mono text-xs text-slate-300">{TEMPLATES[activeType].pathHint}</span>
            <button
              onClick={() => handleCodeChange(TEMPLATES[activeType].content)}
              className="text-[11px] text-slate-400 hover:text-amber-300 transition cursor-pointer"
            >
              Şablonu Sıfırla
            </button>
          </div>
          <textarea
            value={currentCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            spellCheck={false}
            rows={13}
            className="w-full flex-1 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-100 focus:outline-none leading-relaxed resize-y"
          />
        </div>

        {/* Validator & Progressive Disclosure Visualizer */}
        <div className="lg:col-span-5 space-y-4">
          {/* Validation Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Canlı Yapı Doğrulayıcı
              </h4>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  validation.valid
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {validation.valid ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" /> Geçerli
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3 w-3" /> Eksik Var
                  </>
                )}
              </span>
            </div>

            <ul className="space-y-2">
              {validation.checks.map((chk, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <span className={chk.ok ? 'text-emerald-400' : 'text-rose-400'}>
                    {chk.ok ? '✓' : '✕'}
                  </span>
                  <span className={chk.ok ? 'text-slate-300' : 'text-rose-200'}>{chk.label}</span>
                </li>
              ))}
            </ul>

            {!standalone && (
              <button
                onClick={handleVerifyAndSave}
                disabled={!validation.valid}
                className="w-full rounded-xl bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-40 border border-amber-500/40 px-3 py-2 text-xs font-semibold text-amber-200 transition cursor-pointer"
              >
                Yapılandırmayı Test Et ({validatedTypes.length} doğrulandı)
              </button>
            )}
          </div>

          {/* Progressive Disclosure Interactive Visualizer */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/25 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-indigo-200 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-indigo-400" /> Progressive Disclosure Simülasyonu
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="rounded-lg border border-slate-700/80 bg-slate-900/90 p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-cyan-300">1. Başlangıçta Yüklenen</span>
                  <span className="text-[10px] rounded bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5">
                    ~25 token
                  </span>
                </div>
                <p className="text-slate-400">
                  Sadece <code className="text-slate-200">name</code> + <code className="text-slate-200">description</code> bağlama girer. Bağlam şişmez!
                </p>
              </div>

              <div
                className={`rounded-lg border p-2.5 transition ${
                  testedDisclosure === 'activated'
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-dashed border-slate-700 bg-slate-900/40 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-amber-300">2. Görev Eşleşince Yüklenen</span>
                  <span className="text-[10px] rounded bg-slate-800 text-slate-300 px-1.5 py-0.5">
                    {testedDisclosure === 'activated' ? 'AKTİF · Tam Gövde' : 'Beklemede'}
                  </span>
                </div>
                <p className="text-slate-300">
                  {testedDisclosure === 'activated'
                    ? 'Kullanıcı "PR hazırla" dediğinde Antigravity `SKILL.md` gövdesini anlık okudu ve prosedürü uyguladı!'
                    : 'Aşağıdaki butona basarak kullanıcının bu beceriyi tetiklemesini simüle et.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleActivateSkillSim}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" />
              &quot;PR hazırla&quot; Tetiklemesini Simüle Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
