import React, { useState } from 'react';
import {
  FolderTree,
  FileCode,
  Send,
  FileText,
  Bot,
  Terminal,
  CheckCircle2,
  Sparkles,
  AtSign,
  Slash,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { GlossaryText } from './GlossaryText';

interface AntigravityPlaygroundProps {
  completedMissions: string[];
  onCompleteMission: (missionId: string) => void;
}

interface ChatMsg {
  role: 'user' | 'agent';
  text: string;
  tag?: string;
}

const VIRTUAL_FILES = [
  { name: 'GEMINI.md', desc: 'Proje kuralları (Rules)' },
  { name: '.agents/skills/deploy/SKILL.md', desc: 'Yayınlama becerisi' },
  { name: 'src/App.tsx', desc: 'Ana React uygulaması' },
  { name: 'src/api/auth.ts', desc: 'Kimlik doğrulama servisi' },
  { name: 'package.json', desc: 'Bağımlılıklar & scriptler' },
];

const SLASH_HINTS = [
  { cmd: '/plan', desc: 'Plan Artifact üret' },
  { cmd: '/grill-me', desc: 'Tasarım soruları sor' },
  { cmd: '/browser', desc: 'Browser subagent başlat' },
  { cmd: '/schedule', desc: 'Cron görevi zamanla' },
  { cmd: '/compact', desc: 'Bağlamı özetle' },
  { cmd: '/teamwork', desc: 'Swarm ekibi kur' },
];

const MISSIONS = [
  { id: 'm-plan', label: '/plan ile Artifact üret' },
  { id: 'm-mention', label: '@ dosya bağlayıp sor' },
  { id: 'm-sandbox', label: 'Sandbox testi çalıştır' },
  { id: 'm-browser', label: '/browser subagent başlat' },
  { id: 'm-schedule', label: '/schedule ile cron kur' },
];

export const AntigravityPlayground: React.FC<AntigravityPlaygroundProps> = ({
  completedMissions,
  onCompleteMission,
}) => {
  const [input, setInput] = useState('');
  const [auxTab, setAuxTab] = useState<'artifacts' | 'subagents' | 'terminal'>('artifacts');
  const [showSlash, setShowSlash] = useState(false);
  const [showAt, setShowAt] = useState(false);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'agent',
      text: 'Antigravity 2.0 Simülatörüne hoş geldin! Sol panelden dosya seçebilir, kutuya "/" yazarak slash komutlarını veya "@" yazarak bağlam menüsünü açabilirsin. Üstteki 5 görevi tamamlayarak +300 XP kazan!',
      tag: 'Sistem Hazır',
    },
  ]);

  const [artifacts, setArtifacts] = useState<Array<{ title: string; body: string }>>([
    {
      title: 'workspace_overview.md',
      body: 'Aktif çalışma alanı: demo-saas-app\nYüklü Kural: GEMINI.md\nYüklü Skill: deploy (Progressive Disclosure hazır)',
    },
  ]);

  const [subagents, setSubagents] = useState<Array<{ name: string; role: string; status: string }>>([
    { name: 'research-1', role: 'Codebase Researcher', status: 'Hazır (Boşta)' },
  ]);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[Sandbox Mode: ON] Çalışma alanı okuma/yazma aktif, harici ağ kapalı.',
  ]);

  const handleInput = (val: string) => {
    setInput(val);
    setShowSlash(val.startsWith('/') && !val.includes(' '));
    setShowAt(val.endsWith('@'));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const lower = text.toLowerCase();
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setShowSlash(false);
    setShowAt(false);

    let reply = '';
    let tag = 'Agent Mode';

    if (lower.startsWith('/plan')) {
      tag = 'Plan Mode';
      reply =
        '📋 Uygulama planı oluşturuldu ve sağdaki **Artifacts** paneline eklendi! İnceleyip onayladığında adımları sırayla uygulayabilirim.';
      setArtifacts((prev) => [
        {
          title: 'implementation_plan.md',
          body: `Hedef: ${text.replace(/^\/plan\s*/i, '') || 'Yeni Özellik'}\n\n1. Bileşen ve tip tanımlarını oluştur\n2. Sandbox içinde birim testleri çalıştır\n3. Tarayıcı doğrulaması yap`,
        },
        ...prev,
      ]);
      setAuxTab('artifacts');
      onCompleteMission('m-plan');
    } else if (lower.startsWith('/browser') || lower.includes('tarayıcı')) {
      tag = 'Browser Subagent';
      reply =
        '🌐 `browser` alt ajanı arka planda başlatıldı! Sağdaki **Subagents** sekmesinden canlı durumunu görebilirsin. Tamamlandığında ekran görüntüsüyle dönecek.';
      setSubagents((prev) => [
        { name: 'browser-qa-1', role: 'Live UI Verifier', status: 'Tamamlandı ✓ (localhost:5173)' },
        ...prev,
      ]);
      setAuxTab('subagents');
      onCompleteMission('m-browser');
    } else if (lower.startsWith('/schedule') || lower.includes('cron')) {
      tag = 'Automation';
      reply =
        '⏰ Zamanlanmış görev kaydedildi (`0 9 * * 1-5`). Antigravity 2.0 sol menüsündeki Scheduled Tasks alanından yönetilebilir.';
      setTerminalLogs((prev) => [...prev, `[Schedule] Aktif edildi: "${text}"`]);
      onCompleteMission('m-schedule');
    } else if (lower.startsWith('/compact')) {
      tag = 'Context Compacted';
      reply = '✨ Sohbet geçmişi akıllıca özetlendi. Bağlam penceresi %18 seviyesine indirildi!';
    } else if (lower.startsWith('/grill-me')) {
      tag = 'Interactive Interview';
      reply =
        '🎯 Başlamadan önce 2 kritik soru:\n1) Veriler tarayıcıda mı yoksa sunucuda mı tutulacak?\n2) Kullanıcı girişi gerekli mi?';
    } else if (lower.startsWith('/teamwork')) {
      tag = 'Swarm Orchestrator';
      reply =
        '🐝 Swarm başlatıldı! `frontend-1` (workspace: share) ve `reviewer-1` (workspace: inherit) ortak mesaj panosunda göreve alındı.';
      setSubagents((prev) => [
        { name: 'frontend-1', role: 'Swarm Worker (share)', status: 'Çalışıyor ⚡' },
        { name: 'reviewer-1', role: 'Swarm Verifier (inherit)', status: 'Beklemede' },
        ...prev,
      ]);
      setAuxTab('subagents');
    } else if (text.includes('@')) {
      tag = 'Context Grounded';
      reply =
        '🎯 `@` ile etiketlediğin dosya doğrudan bağlama eklendi! Proje kurallarına (`GEMINI.md`) uygun olarak analiz tamamlandı.';
      onCompleteMission('m-mention');
    } else if (lower.includes('test') || lower.includes('npm') || lower.includes('build')) {
      tag = 'Terminal Sandbox';
      reply =
        '🛡️ Komut güvenli **Standard Sandbox** içinde otomatik çalıştırıldı (ağ gerekmediği için onay istemeden bitti). Sonuç sağdaki Terminal sekmesinde!';
      setTerminalLogs((prev) => [
        ...prev,
        `$ npm test`,
        `✓ 14/14 birim testi geçti (0.82s) [Sandbox Mode: Standard]`,
      ]);
      setAuxTab('terminal');
      onCompleteMission('m-sandbox');
    } else {
      reply =
        'Mesajını aldım! Daha gelişmiş yetenekleri test etmek için `/plan`, `/browser`, `/schedule`, `@src/App.tsx` veya `testleri çalıştır` gibi komutlar dene.';
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'agent', text: reply, tag }]);
    }, 220);
  };

  return (
    <div className="space-y-4 animate-fade-slide">
      {/* Mission Tracker Bar */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white">
              Antigravity 2.0 Serbest Simülatör Görevleri
            </h2>
            <span className="text-xs text-slate-400">(Her görev +60 XP)</span>
          </div>
          <span className="font-mono text-xs text-indigo-300">
            {completedMissions.length}/{MISSIONS.length} Tamamlandı
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {MISSIONS.map((m) => {
            const done = completedMissions.includes(m.id);
            return (
              <span
                key={m.id}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${
                  done
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <CheckCircle2 className={`h-3.5 w-3.5 ${done ? 'text-emerald-400' : 'text-slate-600'}`} />
                {m.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Simulated Antigravity 2.0 Desktop Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl min-h-[560px]">
        {/* Left Sidebar: Workspace Files */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/60 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              <FolderTree className="h-3.5 w-3.5 text-indigo-400" /> Workspace: demo-saas-app
            </div>
            <div className="space-y-1">
              {VIRTUAL_FILES.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setInput((prev) => `${prev}${prev ? ' ' : ''}@${f.name} `)}
                  className="w-full text-left rounded-lg px-2.5 py-2 hover:bg-slate-800 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-200 group-hover:text-cyan-300 truncate">
                    <FileCode className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                    <span className="truncate">{f.name}</span>
                  </div>
                  <div className="pl-5 text-[10px] text-slate-500">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-2.5 text-[11px] text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Policy: proceed-in-sandbox</span>
          </div>
        </div>

        {/* Center: Chat Canvas */}
        <div className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950">
          <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Chat Canvas</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setInput('/');
                  setShowSlash(true);
                  setShowAt(false);
                }}
                className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-[11px] text-violet-300 hover:border-violet-500 cursor-pointer"
              >
                <Slash className="h-3 w-3" /> Komut
              </button>
              <button
                type="button"
                onClick={() => {
                  setInput((p) => `${p}@`);
                  setShowAt(true);
                  setShowSlash(false);
                }}
                className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-[11px] text-cyan-300 hover:border-cyan-500 cursor-pointer"
              >
                <AtSign className="h-3 w-3" /> Bağlam
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[420px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {m.tag && (
                  <span className="mb-1 text-[10px] font-mono uppercase tracking-wider text-indigo-400">
                    {m.tag}
                  </span>
                )}
                <div
                  className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm whitespace-pre-line leading-relaxed ${
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

          {/* Quick prompts & Input */}
          <div className="relative border-t border-slate-800 bg-slate-900/50 p-3 space-y-2">
            {showSlash && (
              <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-violet-500/40 bg-slate-900 shadow-2xl p-1.5 z-20">
                {SLASH_HINTS.map((s) => (
                  <button
                    key={s.cmd}
                    type="button"
                    onClick={() => {
                      setInput(`${s.cmd} `);
                      setShowSlash(false);
                    }}
                    className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs hover:bg-slate-800 cursor-pointer"
                  >
                    <code className="font-mono text-violet-300 font-semibold">{s.cmd}</code>
                    <span className="text-slate-400">{s.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {showAt && (
              <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-cyan-500/40 bg-slate-900 shadow-2xl p-1.5 z-20">
                {VIRTUAL_FILES.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => {
                      setInput((prev) => `${prev}${f.name} `);
                      setShowAt(false);
                    }}
                    className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs hover:bg-slate-800 cursor-pointer"
                  >
                    <code className="font-mono text-cyan-300">@{f.name}</code>
                    <span className="text-slate-500">{f.desc}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {[
                '/plan Yeni giriş formu',
                '@src/App.tsx bunu incele',
                'npm test çalıştır',
                '/browser UI testi yap',
                '/schedule Her sabah 09:00 özet çıkar',
              ].map((quick) => (
                <button
                  key={quick}
                  type="button"
                  onClick={() => setInput(quick)}
                  className="rounded-md border border-slate-800 bg-slate-950 hover:border-indigo-500/50 px-2 py-1 font-mono text-[10px] text-slate-400 hover:text-indigo-200 transition cursor-pointer"
                >
                  {quick}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                placeholder='Komut yaz ("/plan ...", "@src/App.tsx ...")'
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 p-2.5 text-white transition cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Auxiliary Pane (Artifacts, Subagents, Terminal) */}
        <div className="lg:col-span-4 bg-slate-900/40 flex flex-col">
          <div className="border-b border-slate-800 bg-slate-900/70 px-3 py-2 flex items-center gap-1">
            {(
              [
                { id: 'artifacts', label: 'Artifacts', icon: FileText },
                { id: 'subagents', label: 'Subagents', icon: Bot },
                { id: 'terminal', label: 'Terminal', icon: Terminal },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAuxTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                    auxTab === tab.id
                      ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-3.5 space-y-3 flex-1 overflow-y-auto max-h-[480px]">
            {auxTab === 'artifacts' &&
              artifacts.map((art, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2 animate-fade-slide"
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-violet-300">
                    <FileText className="h-3.5 w-3.5" /> {art.title}
                  </div>
                  <pre className="font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {art.body}
                  </pre>
                </div>
              ))}

            {auxTab === 'subagents' &&
              subagents.map((sa, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex items-center justify-between animate-fade-slide"
                >
                  <div>
                    <div className="font-mono text-xs font-semibold text-cyan-300">{sa.name}</div>
                    <div className="text-[11px] text-slate-400">{sa.role}</div>
                  </div>
                  <span className="rounded-full bg-slate-900 border border-slate-700 px-2.5 py-0.5 text-[10px] text-emerald-300">
                    {sa.status}
                  </span>
                </div>
              ))}

            {auxTab === 'terminal' && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-[11px] space-y-2">
                {terminalLogs.map((log, i) => (
                  <div
                    key={i}
                    className={
                      log.startsWith('✓')
                        ? 'text-emerald-300'
                        : log.startsWith('$')
                        ? 'text-amber-300'
                        : 'text-slate-400'
                    }
                  >
                    {log}
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Clock className="h-3 w-3" /> Sandbox izleme aktif
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
