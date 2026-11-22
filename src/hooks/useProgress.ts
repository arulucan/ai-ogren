import { useState, useEffect, useCallback } from 'react';
import { ModuleId, ProgressState, RankInfo } from '../types/learning';

const STORAGE_KEY = 'antigravity_akademi_progress_v1';

const DEFAULT_PROGRESS: ProgressState = {
  completedLabs: [],
  completedQuizzes: {},
  completedMissionSteps: {},
  completedPlaygroundMissions: [],
  completedMicroChecks: [],
  readGuides: [],
  xp: 0,
};

export const RANKS: RankInfo[] = [
  { title: 'Yörünge Çırağı', minXp: 0, nextXp: 350, color: 'text-slate-300', badge: '🛰️' },
  { title: 'Bağlam Kaşifi', minXp: 350, nextXp: 900, color: 'text-cyan-400', badge: '🧭' },
  { title: 'Ajan Mimarı', minXp: 900, nextXp: 1800, color: 'text-indigo-400', badge: '⚡' },
  { title: 'Çoklu-AI Orkestratörü', minXp: 1800, nextXp: 3000, color: 'text-purple-400', badge: '🌌' },
  { title: 'AI & Bulut Ustası', minXp: 3000, nextXp: null, color: 'text-amber-400', badge: '🏆' },
];

export function getRank(xp: number): RankInfo {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) return RANKS[i];
  }
  return RANKS[0];
}

export function calculateXp(p: ProgressState): number {
  let xp = 0;
  xp += p.readGuides.length * 40;
  xp += p.completedLabs.length * 120;
  xp += p.completedMicroChecks.length * 15;
  Object.values(p.completedQuizzes).forEach((score) => {
    xp += score * 35;
  });
  Object.values(p.completedMissionSteps).forEach((steps) => {
    xp += steps.length * 25;
  });
  xp += p.completedPlaygroundMissions.length * 60;
  return xp;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ProgressState>;
        const merged: ProgressState = {
          completedLabs: parsed.completedLabs ?? [],
          completedQuizzes: parsed.completedQuizzes ?? {},
          completedMissionSteps: parsed.completedMissionSteps ?? {},
          completedPlaygroundMissions: parsed.completedPlaygroundMissions ?? [],
          completedMicroChecks: parsed.completedMicroChecks ?? [],
          readGuides: parsed.readGuides ?? [],
          xp: 0,
        };
        merged.xp = calculateXp(merged);
        return merged;
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROGRESS;
  });

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const markGuideRead = useCallback(
    (moduleId: ModuleId) => {
      setProgress((prev) => {
        if (prev.readGuides.includes(moduleId)) return prev;
        const next = { ...prev, readGuides: [...prev.readGuides, moduleId] };
        next.xp = calculateXp(next);
        showToast('+40 XP · Rehber tamamlandı!');
        return next;
      });
    },
    [showToast]
  );

  const markLabCompleted = useCallback(
    (moduleId: ModuleId) => {
      setProgress((prev) => {
        if (prev.completedLabs.includes(moduleId)) return prev;
        const next = { ...prev, completedLabs: [...prev.completedLabs, moduleId] };
        next.xp = calculateXp(next);
        showToast('+120 XP · İnteraktif uygulama başarıyla tamamlandı!');
        return next;
      });
    },
    [showToast]
  );

  const markMicroCheckSolved = useCallback(
    (checkKey: string) => {
      setProgress((prev) => {
        if (prev.completedMicroChecks.includes(checkKey)) return prev;
        const next = {
          ...prev,
          completedMicroChecks: [...prev.completedMicroChecks, checkKey],
        };
        next.xp = calculateXp(next);
        showToast('+15 XP · Hızlı Kontrol doğru!');
        return next;
      });
    },
    [showToast]
  );

  const saveQuizScore = useCallback(
    (moduleId: ModuleId, score: number) => {
      setProgress((prev) => {
        const prevScore = prev.completedQuizzes[moduleId] ?? 0;
        if (score <= prevScore) return prev;
        const diff = (score - prevScore) * 35;
        const next = {
          ...prev,
          completedQuizzes: { ...prev.completedQuizzes, [moduleId]: score },
        };
        next.xp = calculateXp(next);
        showToast(`+${diff} XP · Quiz skoru kaydedildi!`);
        return next;
      });
    },
    [showToast]
  );

  const toggleMissionStep = useCallback(
    (moduleId: ModuleId, stepIndex: number) => {
      setProgress((prev) => {
        const current = prev.completedMissionSteps[moduleId] ?? [];
        const exists = current.includes(stepIndex);
        const updated = exists
          ? current.filter((i) => i !== stepIndex)
          : [...current, stepIndex];
        const next = {
          ...prev,
          completedMissionSteps: { ...prev.completedMissionSteps, [moduleId]: updated },
        };
        next.xp = calculateXp(next);
        if (!exists) {
          showToast('+25 XP · Gerçek görev adımı işaretlendi!');
        }
        return next;
      });
    },
    [showToast]
  );

  const completePlaygroundMission = useCallback(
    (missionId: string) => {
      setProgress((prev) => {
        if (prev.completedPlaygroundMissions.includes(missionId)) return prev;
        const next = {
          ...prev,
          completedPlaygroundMissions: [...prev.completedPlaygroundMissions, missionId],
        };
        next.xp = calculateXp(next);
        showToast('+60 XP · Simülatör görevi tamamlandı!');
        return next;
      });
    },
    [showToast]
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    showToast('İlerleme sıfırlandı.');
  }, [showToast]);

  const exportProgress = useCallback(() => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'antigravity-akademi-ilerleme.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('İlerleme JSON olarak indirildi.');
  }, [progress, showToast]);

  const importProgress = useCallback(
    (jsonText: string) => {
      try {
        const parsed = JSON.parse(jsonText) as Partial<ProgressState>;
        const merged: ProgressState = {
          completedLabs: parsed.completedLabs ?? [],
          completedQuizzes: parsed.completedQuizzes ?? {},
          completedMissionSteps: parsed.completedMissionSteps ?? {},
          completedPlaygroundMissions: parsed.completedPlaygroundMissions ?? [],
          completedMicroChecks: parsed.completedMicroChecks ?? [],
          readGuides: parsed.readGuides ?? [],
          xp: 0,
        };
        merged.xp = calculateXp(merged);
        setProgress(merged);
        showToast('İlerleme başarıyla içe aktarıldı!');
      } catch {
        showToast('Geçersiz JSON dosyası.');
      }
    },
    [showToast]
  );

  const isModuleCompleted = useCallback(
    (moduleId: ModuleId) => {
      const labDone = progress.completedLabs.includes(moduleId);
      const quizDone = (progress.completedQuizzes[moduleId] ?? 0) >= 2;
      return labDone && quizDone;
    },
    [progress]
  );

  return {
    progress,
    rank: getRank(progress.xp),
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
  };
}
