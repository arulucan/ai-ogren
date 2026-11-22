import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders } from 'lucide-react';
import { CURRICULUM, TRACKS } from './data/curriculum';
import { AppView, ModuleId, TrackId } from './types/learning';
import { useProgress } from './hooks/useProgress';
import { Navbar } from './components/Navbar';
import { ModuleSidebar } from './components/ModuleSidebar';
import { ModuleView } from './components/ModuleView';
import { AntigravityPlayground } from './components/AntigravityPlayground';
import { ConfigStudio } from './components/labs/ConfigStudio';
import { CheatSheetView } from './components/CheatSheetView';
import { CommandPalette } from './components/CommandPalette';

export function App() {
  const [activeView, setActiveView] = useState<AppView>('academy');
  const [activeTrack, setActiveTrack] = useState<TrackId>('antigravity');
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('ecosystem');
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    progress,
    rank,
    toast,
    markGuideRead,
    markLabCompleted,
    markMicroCheckSolved,
    saveQuizScore,
    toggleMissionStep,
    completePlaygroundMission,
    resetProgress,
    exportProgress,
    importProgress,
    isModuleCompleted,
  } = useProgress();

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const trackModules = CURRICULUM.filter((m) => m.track === activeTrack);
  const currentIdx = trackModules.findIndex((m) => m.id === activeModuleId);
  const currentModule = trackModules[currentIdx] ?? trackModules[0];

  const handleSelectTrack = (track: TrackId) => {
    setActiveTrack(track);
    const firstInTrack = CURRICULUM.find((m) => m.track === track);
    if (firstInTrack) {
      setActiveModuleId(firstInTrack.id);
    }
    setActiveView('academy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpModule = (id: ModuleId) => {
    const target = CURRICULUM.find((m) => m.id === id);
    if (target) {
      setActiveTrack(target.track);
    }
    setActiveModuleId(id);
    setActiveView('academy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        xp={progress.xp}
        rank={rank}
        onOpenSearch={() => setSearchOpen(true)}
        onExport={exportProgress}
        onImport={importProgress}
        onReset={resetProgress}
      />

      <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 sm:px-6 py-6 sm:py-8">
        {activeView === 'academy' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <ModuleSidebar
              tracks={TRACKS}
              activeTrack={activeTrack}
              onSelectTrack={handleSelectTrack}
              allModules={CURRICULUM}
              trackModules={trackModules}
              activeModuleId={currentModule.id}
              onSelectModule={handleJumpModule}
              progress={progress}
              isModuleCompleted={isModuleCompleted}
            />
            <ModuleView
              module={currentModule}
              progress={progress}
              hasPrev={currentIdx > 0}
              hasNext={currentIdx < trackModules.length - 1}
              onPrev={() => handleJumpModule(trackModules[currentIdx - 1].id)}
              onNext={() => handleJumpModule(trackModules[currentIdx + 1].id)}
              onMarkGuideRead={markGuideRead}
              onMarkLabCompleted={markLabCompleted}
              onMarkMicroCheckSolved={markMicroCheckSolved}
              onSaveQuizScore={saveQuizScore}
              onToggleMissionStep={toggleMissionStep}
            />
          </div>
        )}

        {activeView === 'playground' && (
          <AntigravityPlayground
            completedMissions={progress.completedPlaygroundMissions}
            onCompleteMission={completePlaygroundMission}
          />
        )}

        {activeView === 'studio' && (
          <div className="space-y-6 animate-fade-slide">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-amber-950/20 p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Sliders className="h-6 w-6 text-amber-400" />
                Antigravity Config Atölyesi (Studio)
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Gerçek projelerinde hemen kullanabileceğin <code className="font-mono text-amber-300">GEMINI.md</code>,{' '}
                <code className="font-mono text-amber-300">SKILL.md</code>,{' '}
                <code className="font-mono text-amber-300">hooks.json</code> ve{' '}
                <code className="font-mono text-amber-300">mcp_config.json</code> dosyalarını canlı doğrulama ile oluştur ve indir.
              </p>
            </div>
            <ConfigStudio standalone />
          </div>
        )}

        {activeView === 'cheatsheet' && <CheatSheetView />}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-5 px-4 text-center text-xs text-slate-500">
        Antigravity Akademi · İlerlemen tarayıcında otomatik kaydedilir · Vercel &amp; Cloudflare Pages ile ücretsiz yayına hazır
      </footer>

      {/* Command Palette */}
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onJumpModule={handleJumpModule}
        onSelectView={setActiveView}
      />

      {/* XP Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-indigo-500/50 bg-slate-900/95 px-4 py-3 text-xs sm:text-sm font-medium text-indigo-100 shadow-2xl shadow-indigo-950/60 backdrop-blur-md animate-fade-slide">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default App;
