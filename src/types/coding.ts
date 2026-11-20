export type LanguageId = 'python' | 'c' | 'kotlin' | 'web';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type NavTab = 'arena' | 'practice' | 'leaderboard';

export interface LanguageMeta {
  id: LanguageId;
  name: string;
  apiName: string;
  shortCode: string;
  fileName: string;
  tagline: string;
  accentHex: string;
}

export interface QuickNotesPack {
  notes: string[];
  keywords: string[];
}

export interface LevelChallenge {
  id: string;
  language: LanguageId;
  difficulty: Difficulty;
  level: number; // 1 to 5
  title: string;
  topic: string;
  xpReward: number;
  problem: string;
  requirements: string[];
  inputExample: string;
  outputExample: string;
  starterCode: string;
  solutionHintSummary: string;
  quickNotesPacks: QuickNotesPack[];
  hints: string[];
  /** Validation tokens & checks used by local fallback evaluator */
  localChecks: {
    requiredPatterns: { regex: string; message: string }[];
    forbiddenOnlyStarter?: boolean;
    sampleRunOutput: string;
    successFeedback: string;
  };
}

export interface EvaluateRequest {
  language: string;
  difficulty: string;
  level: number;
  problem: string;
  requirements?: string[];
  inputExample?: string;
  outputExample?: string;
  code: string;
}

export interface EvaluateResponse {
  passed: boolean;
  output: string;
  feedback: string;
  xp_awarded: number;
  source?: 'gemini' | 'local';
  fallbackNotice?: string;
}

export interface QuickNotesRequest {
  language: string;
  difficulty: string;
  level: number;
  topic: string;
  problem?: string;
}

export interface QuickNotesResponse {
  notes: string[];
  keywords: string[];
  source?: 'gemini' | 'local';
  fallbackNotice?: string;
}

export interface HintRequest {
  language: string;
  problem: string;
  code: string;
}

export interface HintResponse {
  hint: string;
  source?: 'gemini' | 'local';
  fallbackNotice?: string;
}

export interface UserProgress {
  xp: number;
  streak: number;
  /** Map of `${language}:${difficulty}` -> highest unlocked level (1..5) */
  unlockedLevels: Record<string, number>;
  /** Set of completed level IDs like `python-Easy-1` */
  completedLevelIds: string[];
  /** Saved user code drafts per level ID */
  codeDrafts: Record<string, string>;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  handle: string;
  primaryLanguage: LanguageId;
  xp: number;
  weeklyXp: number;
  streak: number;
  levelsCleared: number;
  isCurrentUser?: boolean;
}
