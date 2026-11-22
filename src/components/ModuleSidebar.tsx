import React from 'react';
import {
  Layers,
  AtSign,
  Terminal,
  ShieldCheck,
  Sliders,
  Network,
  Code2,
  Sparkles,
  FileJson,
  Wrench,
  Wand2,
  KeyRound,
  GitBranch,
  Github,
  CloudUpload,
  Globe,
  MessageSquareCode,
  Bot,
  Compass,
  CheckCircle2,
  Circle,
  Trophy,
  Rocket,
} from 'lucide-react';
import { CurriculumModule, ModuleId, ProgressState, TrackId, TrackInfo } from '../types/learning';

interface ModuleSidebarProps {
  tracks: TrackInfo[];
  activeTrack: TrackId;
  onSelectTrack: (track: TrackId) => void;
  allModules: CurriculumModule[];
  trackModules: CurriculumModule[];
  activeModuleId: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  progress: ProgressState;
  isModuleCompleted: (id: ModuleId) => boolean;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  AtSign,
  Terminal,
  ShieldCheck,
  Sliders,
  Network,
  Code2,
  Sparkles,
  FileJson,
  Wrench,
  Wand2,
  KeyRound,
  GitBranch,
  Github,
  CloudUpload,
  Globe,
  MessageSquareCode,
  Bot,
  Compass,
};

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  tracks,
  activeTrack,
  onSelectTrack,
  allModules,
  trackModules,
  activeModuleId,
  onSelectModule,
  progress,
  isModuleCompleted,
}) => {
  const totalCompleted = allModules.filter((m) => isModuleCompleted(m.id)).length;
  const totalPct = Math.round((totalCompleted / allModules.length) * 100);

  const trackIcon = (id: TrackId) => {
    if (id === 'antigravity') return <Rocket className="h-3.5 w-3.5" />;
    if (id === 'aistudio') return <Sparkles className="h-3.5 w-3.5" />;
    if (id === 'claude-chatgpt') return <Bot className="h-3.5 w-3.5" />;
    return <CloudUpload className="h-3.5 w-3.5" />;
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      {/* 3-Track Parallel Switcher */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-3 space-y-2">
        <div className="px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Eğitim Parkurları (Paralel İlerle)
        </div>
        <div className="grid gap-1.5">
          {tracks.map((t) => {
            const mods = allModules.filter((m) => m.track === t.id);
            const done = mods.filter((m) => isModuleCompleted(m.id)).length;
            const active = activeTrack === t.id;

            const activeStyle =
              t.id === 'antigravity'
                ? 'border-indigo-500/70 bg-indigo-500/20 text-white'
                : t.id === 'aistudio'
                ? 'border-cyan-500/70 bg-cyan-500/20 text-white'
                : t.id === 'claude-chatgpt'
                ? 'border-amber-500/70 bg-amber-500/20 text-white'
                : 'border-emerald-500/70 bg-emerald-500/20 text-white';

            return (
              <button
                key={t.id}
                onClick={() => onSelectTrack(t.id)}
                className={`w-full rounded-xl border px-3 py-2.5 text-left transition cursor-pointer ${
                  active
                    ? activeStyle
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold">
                    {trackIcon(t.id)}
                    {t.title}
                  </span>
                  <span className="rounded-md bg-slate-950/70 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                    {done}/{mods.length}
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-slate-400 truncate">{t.tagline}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overall Progress Card */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5 text-amber-400" /> Genel İlerleme
          </span>
          <span className="font-mono text-xs font-bold text-indigo-300">
            {totalCompleted}/{allModules.length} (%{totalPct})
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${totalPct}%` }}
          />
        </div>
      </div>

      {/* Active Track Module List */}
      <div className="space-y-1.5">
        {trackModules.map((mod) => {
          const Icon = ICON_MAP[mod.iconName] ?? Layers;
          const active = mod.id === activeModuleId;
          const done = isModuleCompleted(mod.id);
          const labDone = progress.completedLabs.includes(mod.id);
          const quizScore = progress.completedQuizzes[mod.id] ?? 0;

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`w-full text-left rounded-xl border p-3 transition flex items-start gap-3 cursor-pointer ${
                active
                  ? 'border-indigo-500/60 bg-indigo-500/15 shadow-lg shadow-indigo-950/30'
                  : 'border-slate-800/70 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                  done
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                    : active
                    ? 'border-indigo-400/50 bg-indigo-500/20 text-indigo-200'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase text-slate-500">
                    Modül 0{mod.number}
                  </span>
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-slate-700 shrink-0" />
                  )}
                </div>
                <div
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    active ? 'text-white' : 'text-slate-200'
                  }`}
                >
                  {mod.shortTitle}
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                  <span className={labDone ? 'text-emerald-400' : ''}>
                    {labDone ? '✓ Lab' : '○ Lab'}
                  </span>
                  <span>·</span>
                  <span className={quizScore >= 2 ? 'text-emerald-400' : ''}>
                    Quiz {quizScore}/{mod.quiz.length}
                  </span>
                  <span>·</span>
                  <span>{mod.durationMinutes} dk</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
