import React, { useState } from 'react';
import { Play, Code2, Sparkles, CheckCircle2, Shield, Zap } from 'lucide-react';

interface PythonSdkLabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export const PythonSdkLab: React.FC<PythonSdkLabProps> = ({ isCompleted, onComplete }) => {
  const [enableWrite, setEnableWrite] = useState(false);
  const [streamThoughts, setStreamThoughts] = useState(true);
  const [streamTools, setStreamTools] = useState(true);
  const [logs, setLogs] = useState<Array<{ type: 'thought' | 'tool' | 'token' | 'warn'; text: string }>>([]);
  const [running, setRunning] = useState(false);

  const generatedCode = `import asyncio, sys
from google.antigravity import Agent, LocalAgentConfig${enableWrite ? ', CapabilitiesConfig' : ''}

async def main():
    config = LocalAgentConfig(
        system_instructions="Kod tabanındaki TODO yorumlarını tara ve özetle.",${
          enableWrite ? '\n        capabilities=CapabilitiesConfig(),  # Yazma & terminal aktif' : '\n        # capabilities verilmedi -> Varsayılan: Read-Only (Salt-Okunur)'
        }
    )

    async with Agent(config) as agent:
        response = await agent.chat("Projedeki TODO maddelerini analiz et ve TODO.md oluştur.")
${
  streamThoughts
    ? `        async for thought in response.thoughts:
            print(f"[Thinking] {thought}")\n`
    : ''
}${
  streamTools
    ? `        async for call in response.tool_calls:
            print(f"[Executing Tool] {call.name} -> {call.args}")\n`
    : ''
}        async for token in response:
            sys.stdout.write(token)

asyncio.run(main())`;

  const handleRunSim = () => {
    if (running) return;
    setRunning(true);
    setLogs([]);

    const steps: Array<{ type: 'thought' | 'tool' | 'token' | 'warn'; text: string }> = [];

    if (streamThoughts) {
      steps.push({
        type: 'thought',
        text: '[Thinking] Çalışma alanındaki kaynak dosyalarda "TODO" desenini aramalıyım.',
      });
    }
    if (streamTools) {
      steps.push({
        type: 'tool',
        text: '[Executing Tool] search_files -> {"pattern": "TODO", "path": "./src"}',
      });
    }

    if (enableWrite) {
      if (streamThoughts) {
        steps.push({
          type: 'thought',
          text: '[Thinking] 3 adet TODO bulundu. CapabilitiesConfig() aktif olduğu için TODO.md dosyasını oluşturabilirim.',
        });
      }
      if (streamTools) {
        steps.push({
          type: 'tool',
          text: '[Executing Tool] write_file -> {"path": "./TODO.md", "lines": 12}',
        });
      }
      steps.push({
        type: 'token',
        text: '✅ 3 adet TODO bulundu ve TODO.md dosyasına başarıyla yazıldı!',
      });
    } else {
      steps.push({
        type: 'warn',
        text: '🛡️ [Read-Only Modu] CapabilitiesConfig() etkin değil — dosya yazma engellendi; yalnızca okuma özeti döndürülüyor.',
      });
      steps.push({
        type: 'token',
        text: '📋 Özet (Salt-Okunur): src/App.tsx:42, src/api.ts:18, src/auth.ts:91 konumlarında 3 TODO tespit edildi.',
      });
    }

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setRunning(false);
          onComplete();
        }
      }, (idx + 1) * 450);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-100">
          <Code2 className="h-4 w-4 text-sky-400 shrink-0" />
          <span>
            <strong>SDK Laboratuvarı:</strong> Aşağıdaki yapılandırma anahtarlarını değiştirip <strong>Çalıştır (Simüle Et)</strong> ile streaming çıktısını izle.
          </span>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex flex-wrap gap-3">
          <label className="inline-flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={enableWrite}
              onChange={(e) => setEnableWrite(e.target.checked)}
              className="rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500"
            />
            <span className="inline-flex items-center gap-1">
              {enableWrite ? (
                <Zap className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
              )}
              CapabilitiesConfig() (Yazma İzni)
            </span>
          </label>

          <label className="inline-flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={streamThoughts}
              onChange={(e) => setStreamThoughts(e.target.checked)}
              className="rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500"
            />
            response.thoughts
          </label>

          <label className="inline-flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={streamTools}
              onChange={(e) => setStreamTools(e.target.checked)}
              className="rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500"
            />
            response.tool_calls
          </label>
        </div>

        <button
          onClick={handleRunSim}
          disabled={running}
          className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 px-4 py-2 text-xs font-semibold text-white transition cursor-pointer"
        >
          <Play className="h-3.5 w-3.5" />
          {running ? 'Akış Çalışıyor...' : 'Çalıştır (Simüle Et)'}
        </button>
      </div>

      {/* Code + Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-slate-400">
            agent_runner.py
          </div>
          <pre className="p-4 font-mono text-xs text-sky-100/90 overflow-x-auto leading-relaxed">
            {generatedCode}
          </pre>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col">
          <div className="border-b border-slate-800 bg-slate-900 px-4 py-2 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">Canlı Streaming Konsolu</span>
            {logs.length > 0 && !running && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Tamamlandı
              </span>
            )}
          </div>
          <div className="p-4 font-mono text-xs space-y-2.5 flex-1 min-h-[220px]">
            {logs.length === 0 ? (
              <span className="text-slate-500">
                $ python agent_runner.py
                <br />
                Çıktıyı görmek için &quot;Çalıştır (Simüle Et)&quot; butonuna bas...
              </span>
            ) : (
              logs.map((entry, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg px-3 py-2 animate-fade-slide ${
                    entry.type === 'thought'
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                      : entry.type === 'tool'
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                      : entry.type === 'warn'
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/25'
                      : 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/25'
                  }`}
                >
                  {entry.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
