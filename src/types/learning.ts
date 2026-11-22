export type TrackId = 'antigravity' | 'aistudio' | 'github-vercel' | 'claude-chatgpt';

export type ModuleId =
  // Track 1: Antigravity
  | 'ecosystem'
  | 'context'
  | 'commands'
  | 'security'
  | 'customizations'
  | 'multiagent'
  | 'sdk'
  // Track 2: Google AI Studio
  | 'aistudio-basics'
  | 'aistudio-prompting'
  | 'aistudio-tools'
  | 'aistudio-build'
  | 'aistudio-api'
  // Track 3: GitHub & Vercel
  | 'gv-git-basics'
  | 'gv-github'
  | 'gv-vercel-deploy'
  | 'gv-env-domains'
  // Track 4: Claude & ChatGPT
  | 'cc-claude-basics'
  | 'cc-claude-code'
  | 'cc-chatgpt-basics'
  | 'cc-ai-matrix';

export type AppView = 'academy' | 'playground' | 'studio' | 'cheatsheet';

export type LessonTab = 'guide' | 'lab' | 'quiz' | 'mission';

export interface TrackInfo {
  id: TrackId;
  title: string;
  shortTitle: string;
  tagline: string;
  badgeColor: string;
}

export interface MicroCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConceptCard {
  title: string;
  badge?: string;
  description: string;
  bullets?: string[];
  codeSnippet?: {
    label: string;
    code: string;
  };
  tip?: string;
  microCheck?: MicroCheck;
}

export interface ComparisonRow {
  feature: string;
  col1: string;
  col2: string;
  col3?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RealWorldMission {
  title: string;
  goal: string;
  copyablePrompt: string;
  steps: string[];
  expectedOutcome: string;
}

export interface CurriculumModule {
  id: ModuleId;
  track: TrackId;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  iconName: string;
  accentColor: string;
  summary: string;
  concepts: ConceptCard[];
  comparison?: {
    title: string;
    headers: string[];
    rows: ComparisonRow[];
  };
  quiz: QuizQuestion[];
  realMission: RealWorldMission;
}

export interface ProgressState {
  completedLabs: ModuleId[];
  completedQuizzes: Record<string, number>;
  completedMissionSteps: Record<string, number[]>;
  completedPlaygroundMissions: string[];
  completedMicroChecks: string[]; // "<moduleId>:<conceptIdx>"
  readGuides: ModuleId[];
  xp: number;
}

export interface RankInfo {
  title: string;
  minXp: number;
  nextXp: number | null;
  color: string;
  badge: string;
}
