import { useEffect, useState } from 'react';
import { ArenaView } from './components/ArenaView';
import { CodingWorkspace } from './components/CodingWorkspace';
import { LeaderboardView } from './components/LeaderboardView';
import { PracticeView } from './components/PracticeView';
import { TopBar } from './components/TopBar';
import { getChallengesForTrack, getTrackKey } from './data/curriculum';
import {
  isSoundEnabled,
  playSound,
  setSoundEnabled,
} from './services/soundEffects';
import {
  Difficulty,
  LanguageId,
  LevelChallenge,
  NavTab,
  UserProgress,
} from './types/coding';

const PROGRESS_STORAGE_KEY = 'codeforge_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  streak: 1,
  unlockedLevels: {
    'python:Easy': 1,
    'python:Medium': 1,
    'python:Hard': 1,
    'c:Easy': 1,
    'c:Medium': 1,
    'c:Hard': 1,
    'kotlin:Easy': 1,
    'kotlin:Medium': 1,
    'kotlin:Hard': 1,
    'web:Easy': 1,
    'web:Medium': 1,
    'web:Hard': 1,
  },
  completedLevelIds: [],
  codeDrafts: {},
};

function loadProgress(): UserProgress {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      xp: typeof parsed.xp === 'number' ? parsed.xp : DEFAULT_PROGRESS.xp,
      streak:
        typeof parsed.streak === 'number' ? parsed.streak : DEFAULT_PROGRESS.streak,
      unlockedLevels: {
        ...DEFAULT_PROGRESS.unlockedLevels,
        ...(parsed.unlockedLevels ?? {}),
      },
      completedLevelIds: Array.isArray(parsed.completedLevelIds)
        ? parsed.completedLevelIds
        : [],
      codeDrafts:
        parsed.codeDrafts && typeof parsed.codeDrafts === 'object'
          ? parsed.codeDrafts
          : {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('arena');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('python');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
  const [activeWorkspaceChallenge, setActiveWorkspaceChallenge] =
    useState<LevelChallenge | null>(null);
  const [workspaceOriginTab, setWorkspaceOriginTab] = useState<NavTab>('arena');

  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playSound('click');
    }
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage persistence errors in restricted iframes
    }
  }, [progress]);

  const handleOpenChallenge = (challenge: LevelChallenge, origin: NavTab) => {
    setWorkspaceOriginTab(origin);
    setSelectedLanguage(challenge.language);
    setSelectedDifficulty(challenge.difficulty);
    setActiveWorkspaceChallenge(challenge);
  };

  const handleCodeChange = (levelId: string, code: string) => {
    setProgress((prev) => ({
      ...prev,
      codeDrafts: {
        ...prev.codeDrafts,
        [levelId]: code,
      },
    }));
  };

  const handleLevelPassed = (challenge: LevelChallenge, xpAwarded: number) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedLevelIds.includes(challenge.id);
      const trackKey = getTrackKey(challenge.language, challenge.difficulty);
      const currentUnlocked = prev.unlockedLevels[trackKey] ?? 1;
      const nextUnlocked = Math.min(5, Math.max(currentUnlocked, challenge.level + 1));

      return {
        ...prev,
        xp: alreadyCompleted ? prev.xp : prev.xp + xpAwarded,
        streak: alreadyCompleted
          ? prev.streak
          : Math.max(1, prev.streak + (prev.completedLevelIds.length === 0 ? 0 : 1)),
        unlockedLevels: {
          ...prev.unlockedLevels,
          [trackKey]: nextUnlocked,
        },
        completedLevelIds: alreadyCompleted
          ? prev.completedLevelIds
          : [...prev.completedLevelIds, challenge.id],
      };
    });
  };

  const handleSelectTab = (tab: NavTab) => {
    setActiveWorkspaceChallenge(null);
    setActiveTab(tab);
  };

  const getNextChallenge = (challenge: LevelChallenge): LevelChallenge | undefined => {
    const track = getChallengesForTrack(challenge.language, challenge.difficulty);
    return track.find((c) => c.level === challenge.level + 1);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100">
      <TopBar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        xp={progress.xp}
        streak={progress.streak}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        onBrandClick={() => handleSelectTab('arena')}
      />

      {activeWorkspaceChallenge ? (
        <CodingWorkspace
          challenge={activeWorkspaceChallenge}
          backLabel={
            workspaceOriginTab === 'practice' ? 'Back to Practice' : 'Back to Arena'
          }
          initialCode={
            progress.codeDrafts[activeWorkspaceChallenge.id] ??
            activeWorkspaceChallenge.starterCode
          }
          isAlreadyCompleted={progress.completedLevelIds.includes(
            activeWorkspaceChallenge.id
          )}
          nextChallenge={getNextChallenge(activeWorkspaceChallenge)}
          onCodeChange={handleCodeChange}
          onLevelPassed={handleLevelPassed}
          onBack={() => {
            setActiveWorkspaceChallenge(null);
            setActiveTab(workspaceOriginTab);
          }}
          onOpenNext={(next) => {
            setActiveWorkspaceChallenge(next);
          }}
        />
      ) : activeTab === 'arena' ? (
        <ArenaView
          selectedLanguage={selectedLanguage}
          selectedDifficulty={selectedDifficulty}
          progress={progress}
          onSelectLanguage={setSelectedLanguage}
          onSelectDifficulty={setSelectedDifficulty}
          onOpenLevel={(challenge) => handleOpenChallenge(challenge, 'arena')}
        />
      ) : activeTab === 'practice' ? (
        <PracticeView
          progress={progress}
          onOpenChallenge={(challenge) => handleOpenChallenge(challenge, 'practice')}
        />
      ) : (
        <LeaderboardView
          progress={progress}
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
}
