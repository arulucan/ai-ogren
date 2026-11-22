import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FlaskConical,
  HelpCircle,
  Rocket,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Sparkles,
  Info,
  Zap,
} from 'lucide-react';
import { CurriculumModule, LessonTab, MicroCheck, ModuleId, ProgressState } from '../types/learning';
import { CONCEPT_MICRO_CHECKS } from '../data/microChecks';
import { GlossaryText } from './GlossaryText';
import { EcosystemLab } from './labs/EcosystemLab';
import { ContextLab } from './labs/ContextLab';
import { SlashCommandLab } from './labs/SlashCommandLab';
import { SecuritySandboxLab } from './labs/SecuritySandboxLab';
import { ConfigStudio } from './labs/ConfigStudio';
import { MultiAgentLab } from './labs/MultiAgentLab';
import { PythonSdkLab } from './labs/PythonSdkLab';
import {
  AiStudioParamsLab,
  StructuredOutputLab,
  AiStudioToolsLab,
  AiStudioBuildLab,
  ApiKeySecurityLab,
} from './labs/AiStudioLabs';
import {
  GitFlowLab,
  GitHubPrLab,
  VercelPipelineLab,
  VercelEnvDebugLab,
} from './labs/GitHubVercelLabs';
import {
  ClaudeArtifactsLab,
  ClaudeVsAntigravityLab,
  ChatGptCanvasLab,
  AiToolMatrixLab,
} from './labs/ClaudeChatGptLabs';

interface InlineMicroCheckProps {
  checkKey: string;
  check: MicroCheck;
  isSolved: boolean;
  onSolve: (key: string) => void;
}

const InlineMicroCheck: React.FC<InlineMicroCheckProps> = ({
  checkKey,
  check,
  isSolved,
  onSolve,
}) => {
  const [picked, setPicked] = useState<number | null>(isSolved ? check.correctIndex : null);

  useEffect(() => {
    setPicked(isSolved ? check.correctIndex : null);
  }, [checkKey, isSolved, check.correctIndex]);

  const handleSelect = (idx: number) => {
    setPicked(idx);
    if (idx === check.correctIndex) {
      onSolve(checkKey);
    }
  };

  const isCorrect = picked === check.correctIndex;

  return (
    <div
      className={`mt-3 rounded-xl border p-3.5 space-y-2.5 transition ${
        isCorrect
          ? 'border-emerald-500/35 bg-emerald-500/5'
          : 'border-indigo-500/25 bg-slate-950/75'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          Hızlı Kontrol (Aktif Hatırlama)
        </span>
        {isCorrect ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> +15 XP
          </span>
        ) : (
          <span className="font-mono text-[10px] text-slate-500">1 Soru · +15 XP</span>
        )}
      </div>

      <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
        <GlossaryText text={check.question} />
      </p>

      <div className="grid gap-1.5">
        {check.options.map((opt, idx) => {
          const selected = picked === idx;
          let style =
            'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-indigo-500/50 hover:text-white';
          if (selected && isCorrect) {
            style = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-medium';
          } else if (selected && !isCorrect) {
            style = 'border-rose-500 bg-rose-500/15 text-rose-200';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`w-full text-left rounded-lg border px-3 py-2 text-xs transition cursor-pointer ${style}`}
            >
              <span className="font-mono text-[11px] opacity-65 mr-2">
                {String.fromCharCode(65 + idx)}.
              </span>
              <GlossaryText text={opt} />
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div
          className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${
            isCorrect
              ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/25'
              : 'bg-amber-500/10 text-amber-200 border border-amber-500/25'
          }`}
        >
          <strong>{isCorrect ? '✓ Harika! ' : '💡 Tekrar dene: '}</strong>
          {isCorrect ? (
            <GlossaryText text={check.explanation} />
          ) : (
            'Yukarıdaki kavrama kısaca göz atıp başka bir seçeneği dene!'
          )}
        </div>
      )}
    </div>
  );
};

interface ModuleViewProps {
  module: CurriculumModule;
  progress: ProgressState;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onMarkGuideRead: (id: ModuleId) => void;
  onMarkLabCompleted: (id: ModuleId) => void;
  onMarkMicroCheckSolved: (key: string) => void;
  onSaveQuizScore: (id: ModuleId, score: number) => void;
  onToggleMissionStep: (id: ModuleId, idx: number) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({
  module,
  progress,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onMarkGuideRead,
  onMarkLabCompleted,
  onMarkMicroCheckSolved,
  onSaveQuizScore,
  onToggleMissionStep,
}) => {
  const [activeTab, setActiveTab] = useState<LessonTab>('guide');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Reset local tab/quiz state when switching modules
  useEffect(() => {
    setActiveTab('guide');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setCopiedPrompt(false);
  }, [module.id]);

  const guideRead = progress.readGuides.includes(module.id);
  const labCompleted = progress.completedLabs.includes(module.id);
  const savedQuizScore = progress.completedQuizzes[module.id] ?? 0;
  const checkedSteps = progress.completedMissionSteps[module.id] ?? [];

  const handleSubmitQuiz = () => {
    const score = module.quiz.filter((q) => quizAnswers[q.id] === q.correctIndex).length;
    setQuizSubmitted(true);
    onSaveQuizScore(module.id, score);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(module.realMission.copyablePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  const renderLab = () => {
    const commonProps = {
      isCompleted: labCompleted,
      onComplete: () => onMarkLabCompleted(module.id),
    };
    switch (module.id) {
      case 'ecosystem':
        return <EcosystemLab {...commonProps} />;
      case 'context':
        return <ContextLab {...commonProps} />;
      case 'commands':
        return <SlashCommandLab {...commonProps} />;
      case 'security':
        return <SecuritySandboxLab {...commonProps} />;
      case 'customizations':
        return <ConfigStudio {...commonProps} />;
      case 'multiagent':
        return <MultiAgentLab {...commonProps} />;
      case 'sdk':
        return <PythonSdkLab {...commonProps} />;
      case 'aistudio-basics':
        return <AiStudioParamsLab {...commonProps} />;
      case 'aistudio-prompting':
        return <StructuredOutputLab {...commonProps} />;
      case 'aistudio-tools':
        return <AiStudioToolsLab {...commonProps} />;
      case 'aistudio-build':
        return <AiStudioBuildLab {...commonProps} />;
      case 'aistudio-api':
        return <ApiKeySecurityLab {...commonProps} />;
      case 'gv-git-basics':
        return <GitFlowLab {...commonProps} />;
      case 'gv-github':
        return <GitHubPrLab {...commonProps} />;
      case 'gv-vercel-deploy':
        return <VercelPipelineLab {...commonProps} />;
      case 'gv-env-domains':
        return <VercelEnvDebugLab {...commonProps} />;
      case 'cc-claude-basics':
        return <ClaudeArtifactsLab {...commonProps} />;
      case 'cc-claude-code':
        return <ClaudeVsAntigravityLab {...commonProps} />;
      case 'cc-chatgpt-basics':
        return <ChatGptCanvasLab {...commonProps} />;
      case 'cc-ai-matrix':
        return <AiToolMatrixLab {...commonProps} />;
    }
  };

  const tabs: Array<{
    id: LessonTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    done: boolean;
  }> = [
    { id: 'guide', label: '1. Konu Anlatımı', icon: BookOpen, done: guideRead },
    { id: 'lab', label: '2. İnteraktif Uygulama', icon: FlaskConical, done: labCompleted },
    { id: 'quiz', label: '3. Mini Quiz', icon: HelpCircle, done: savedQuizScore >= 2 },
    {
      id: 'mission',
      label: '4. Gerçek Görev',
      icon: Rocket,
      done: checkedSteps.length === module.realMission.steps.length,
    },
  ];

  return (
    <div className="flex-1 min-w-0 space-y-6 animate-fade-slide">
      {/* Module Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className={`rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold ${
              module.track === 'aistudio'
                ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
                : module.track === 'github-vercel'
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                : module.track === 'claude-chatgpt'
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                : 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300'
            }`}
          >
            {module.track === 'aistudio'
              ? 'AI STUDIO'
              : module.track === 'github-vercel'
              ? 'GITHUB & VERCEL'
              : module.track === 'claude-chatgpt'
              ? 'CLAUDE & CHATGPT'
              : 'ANTIGRAVITY'}{' '}
            · MODÜL 0{module.number}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" /> ~{module.durationMinutes} dk
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-mono">
            <Sparkles className="h-3.5 w-3.5" /> +{module.xpReward} XP’ye kadar
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          <GlossaryText text={module.title} />
        </h1>
        <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
          <GlossaryText text={module.subtitle} />
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-200">
          <Info className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span>
            İpucu: <span className="border-b border-dotted border-cyan-400">Altı noktalı</span> teknik terimlerin üzerine gelerek Türkçe karşılığını ve açıklamasını görebilirsin.
          </span>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-medium transition cursor-pointer ${
                active
                  ? 'border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                  : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.done && (
                <CheckCircle2
                  className={`h-3.5 w-3.5 ${active ? 'text-emerald-200' : 'text-emerald-400'}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'guide' && (
        <div className="space-y-5">
          <div className="rounded-xl border border-indigo-500/25 bg-indigo-500/5 p-4 text-sm text-slate-200 leading-relaxed">
            <GlossaryText text={module.summary} />
          </div>

          <div className="grid gap-4">
            {module.concepts.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white">
                    <GlossaryText text={c.title} />
                  </h3>
                  {c.badge && (
                    <span className="rounded-full border border-indigo-500/30 bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300">
                      <GlossaryText text={c.badge} />
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <GlossaryText text={c.description} />
                </p>

                {c.bullets && (
                  <ul className="space-y-2 pt-1">
                    {c.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span className="leading-relaxed">
                          <GlossaryText text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {c.codeSnippet && (
                  <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden mt-2">
                    <div className="border-b border-slate-800 bg-slate-900/80 px-3.5 py-1.5 font-mono text-[11px] text-slate-400">
                      {c.codeSnippet.label}
                    </div>
                    <pre className="p-3.5 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
                      {c.codeSnippet.code}
                    </pre>
                  </div>
                )}

                {c.tip && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs sm:text-sm text-amber-100">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <GlossaryText text={c.tip} />
                    </span>
                  </div>
                )}

                {(() => {
                  const key = `${module.id}:${idx}`;
                  const check = c.microCheck ?? CONCEPT_MICRO_CHECKS[key];
                  if (!check) return null;
                  return (
                    <InlineMicroCheck
                      checkKey={key}
                      check={check}
                      isSolved={progress.completedMicroChecks.includes(key)}
                      onSolve={onMarkMicroCheckSolved}
                    />
                  );
                })()}
              </div>
            ))}
          </div>

          {/* Optional Comparison Table */}
          {module.comparison && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
              <div className="border-b border-slate-800 px-5 py-3 text-sm font-bold text-white">
                {module.comparison.title}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/70 text-slate-400">
                    <tr>
                      {module.comparison.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {module.comparison.rows.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        <td className="px-4 py-3 font-medium text-slate-200">
                          <GlossaryText text={r.feature} />
                        </td>
                        <td className="px-4 py-3">
                          <GlossaryText text={r.col1} />
                        </td>
                        <td className="px-4 py-3">
                          <GlossaryText text={r.col2} />
                        </td>
                        {r.col3 && (
                          <td className="px-4 py-3">
                            <GlossaryText text={r.col3} />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CTA to Interactive Lab */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="text-sm text-emerald-100">
              Kavramları anladın mı? Şimdi tarayıcı içinde <strong>deneyerek</strong> pekiştirme zamanı!
            </div>
            <button
              onClick={() => {
                onMarkGuideRead(module.id);
                setActiveTab('lab');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition cursor-pointer"
            >
              {guideRead ? 'Uygulamaya Geç' : 'Okudum (+40 XP) & Uygulamaya Geç'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'lab' && (
        <div className="space-y-5">
          {renderLab()}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('quiz')}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/50 bg-indigo-500/15 hover:bg-indigo-500/25 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-200 transition cursor-pointer"
            >
              Mini Quiz’e Geç <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3">
            <span className="text-sm text-slate-300">
              Her doğru cevap <strong>+35 XP</strong> kazandırır. Modülü tamamlamak için en az 2 doğru yap.
            </span>
            <span className="font-mono text-xs text-indigo-300">
              En İyi Skor: {savedQuizScore}/{module.quiz.length}
            </span>
          </div>

          {module.quiz.map((q, qIdx) => {
            const picked = quizAnswers[q.id];
            const isCorrect = picked === q.correctIndex;
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 space-y-3"
              >
                <div className="text-sm sm:text-base font-semibold text-white">
                  <span className="font-mono text-indigo-400 mr-2">S{qIdx + 1}.</span>
                  <GlossaryText text={q.question} />
                </div>

                <div className="grid gap-2">
                  {q.options.map((opt, oIdx) => {
                    const selected = picked === oIdx;
                    let style =
                      'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-indigo-500/50 hover:text-white';
                    if (quizSubmitted) {
                      if (oIdx === q.correctIndex) {
                        style = 'border-emerald-500 bg-emerald-500/15 text-emerald-200 font-medium';
                      } else if (selected && oIdx !== q.correctIndex) {
                        style = 'border-rose-500 bg-rose-500/15 text-rose-200';
                      }
                    } else if (selected) {
                      style = 'border-indigo-500 bg-indigo-500/20 text-white font-medium';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={quizSubmitted}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`w-full text-left rounded-xl border px-4 py-3 text-xs sm:text-sm transition cursor-pointer disabled:cursor-default ${style}`}
                      >
                        <span className="font-mono text-xs mr-2.5 opacity-70">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <GlossaryText text={opt} />
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div
                    className={`rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                        : 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                    }`}
                  >
                    <strong>{isCorrect ? '✓ Doğru! ' : '💡 Açıklama: '}</strong>
                    <GlossaryText text={q.explanation} />
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < module.quiz.length}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 px-5 py-2.5 text-sm font-semibold text-white transition cursor-pointer"
              >
                Cevapları Kontrol Et
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs sm:text-sm text-slate-200 transition cursor-pointer"
                >
                  Tekrar Çöz
                </button>
                <button
                  onClick={() => setActiveTab('mission')}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition cursor-pointer"
                >
                  Gerçek Göreve Geç <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'mission' && (
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-6 space-y-5">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30 mb-2">
              <Rocket className="h-3.5 w-3.5" /> Kendi Antigravity Uygulamanda Dene
            </span>
            <h3 className="text-lg font-bold text-white">
              <GlossaryText text={module.realMission.title} />
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              <GlossaryText text={module.realMission.goal} />
            </p>
          </div>

          {/* Copyable Prompt */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
              <span className="font-mono text-xs text-slate-400">Hazır Deneme Promptu</span>
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 text-xs font-semibold text-white transition cursor-pointer"
              >
                {copiedPrompt ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedPrompt ? 'Kopyalandı!' : 'Promptu Kopyala'}
              </button>
            </div>
            <p className="p-4 font-mono text-xs sm:text-sm text-cyan-200 leading-relaxed">
              {module.realMission.copyablePrompt}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Uygulama Kontrol Listesi (Her adım +25 XP)
            </h4>
            {module.realMission.steps.map((step, idx) => {
              const checked = checkedSteps.includes(idx);
              return (
                <label
                  key={idx}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition cursor-pointer ${
                    checked
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleMissionStep(module.id, idx)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className={`text-sm leading-relaxed ${checked ? 'line-through opacity-80' : ''}`}>
                    <GlossaryText text={step} />
                  </span>
                </label>
              );
            })}
          </div>

          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3.5 text-xs sm:text-sm text-emerald-200">
            <strong>Beklenen Sonuç:</strong> <GlossaryText text={module.realMission.expectedOutcome} />
          </div>
        </div>
      )}

      {/* Bottom Prev / Next Module Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 px-4 py-2 text-xs sm:text-sm text-slate-200 transition cursor-pointer disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4" /> Önceki Modül
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition cursor-pointer disabled:cursor-not-allowed"
        >
          Sonraki Modül <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
