import { ArrowRight, CheckCircle2, Lock, Play } from 'lucide-react';
import { useState } from 'react';
import {
  ALL_CHALLENGES,
  DIFFICULTIES,
  LANGUAGES,
  getChallengesForTrack,
  getTrackKey,
} from '../data/curriculum';
import { Difficulty, LanguageId, LevelChallenge, UserProgress } from '../types/coding';

interface ArenaViewProps {
  selectedLanguage: LanguageId;
  selectedDifficulty: Difficulty;
  progress: UserProgress;
  onSelectLanguage: (lang: LanguageId) => void;
  onSelectDifficulty: (diff: Difficulty) => void;
  onOpenLevel: (challenge: LevelChallenge) => void;
}

export function ArenaView({
  selectedLanguage,
  selectedDifficulty,
  progress,
  onSelectLanguage,
  onSelectDifficulty,
  onOpenLevel,
}: ArenaViewProps) {
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  const trackKey = getTrackKey(selectedLanguage, selectedDifficulty);
  const highestUnlocked = progress.unlockedLevels[trackKey] ?? 1;
  const levels = getChallengesForTrack(selectedLanguage, selectedDifficulty);
  const completedSet = new Set(progress.completedLevelIds);

  const trackCompletedCount = levels.filter((lvl) => completedSet.has(lvl.id)).length;
  const activeLangMeta = LANGUAGES.find((l) => l.id === selectedLanguage)!;

  const getLanguageCompletedCount = (langId: LanguageId) =>
    ALL_CHALLENGES.filter((c) => c.language === langId && completedSet.has(c.id)).length;

  const handleNodeClick = (challenge: LevelChallenge, isUnlocked: boolean) => {
    if (!isUnlocked) {
      setLockedNotice(
        `Pass Level ${challenge.level - 1} in ${activeLangMeta.name} ${selectedDifficulty} to unlock Level ${challenge.level}.`
      );
      return;
    }
    setLockedNotice(null);
    onOpenLevel(challenge);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Arena Header */}
      <section className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl text-balance">
            Coding Arena
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Select a language track and difficulty tier, then clear Levels 1 through 5 in sequence.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono tabular-nums">
          <span>{progress.completedLevelIds.length} / {ALL_CHALLENGES.length} total cleared</span>
        </div>
      </section>

      {/* Language Selector Cards */}
      <section aria-label="Language tracks" className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            1. Choose Language Track
          </h2>
          <span className="text-xs text-slate-400">4 tracks · 15 levels each</span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.id === selectedLanguage;
            const cleared = getLanguageCompletedCount(lang.id);
            const pct = Math.round((cleared / 15) * 100);

            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  onSelectLanguage(lang.id);
                  setLockedNotice(null);
                }}
                className={`group flex flex-col justify-between rounded-xl border p-5 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isSelected
                    ? 'border-emerald-500/60 bg-[#151E2E]'
                    : 'border-slate-800 bg-[#111827] hover:border-slate-700 hover:bg-[#141C2B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/80 bg-[#0B0F17] font-mono text-xs font-semibold tracking-tight"
                      style={{ color: lang.accentHex }}
                    >
                      {lang.shortCode}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isSelected ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-slate-100">
                    {lang.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {lang.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
                    <span>{cleared} / 15 levels</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: isSelected ? '#10B981' : lang.accentHex,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Difficulty Selector & Progression Map */}
      <section aria-label="Level progression map" className="mt-10 border-t border-slate-800/90 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">
              2. {activeLangMeta.name} Progression Map
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              <span className="font-mono tabular-nums text-slate-300">
                {trackCompletedCount} / 5
              </span>{' '}
              completed in {selectedDifficulty} · Pass each level to unlock the next node
            </p>
          </div>

          {/* Interactive Difficulty Segmented Control */}
          <div
            role="tablist"
            aria-label="Difficulty tier"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#111827] p-1 self-start sm:self-auto"
          >
            {DIFFICULTIES.map((diff) => {
              const isActive = diff === selectedDifficulty;
              return (
                <button
                  key={diff}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    onSelectDifficulty(diff);
                    setLockedNotice(null);
                  }}
                  className={`rounded-md px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Connected Progression Pathway (Level 1 to Level 5) */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-8">
          {/* Desktop Horizontal Track Bar */}
          <div className="hidden lg:block mb-6 px-10">
            <div className="relative flex items-center justify-between">
              {/* Background Track */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-800"
              />
              {/* Active Progress Fill */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${Math.min(100, ((Math.max(highestUnlocked, 1) - 1) / 4) * 100)}%`,
                }}
              />

              {levels.map((lvl) => {
                const isCompleted = completedSet.has(lvl.id);
                const isUnlocked = lvl.level <= highestUnlocked || isCompleted;

                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => handleNodeClick(lvl, isUnlocked)}
                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold tabular-nums transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isCompleted
                        ? 'border-emerald-400 bg-emerald-500 text-slate-950 hover:scale-105'
                        : isUnlocked
                        ? 'border-emerald-400 bg-[#0B0F17] text-emerald-300 hover:scale-105'
                        : 'border-slate-700 bg-[#0B0F17] text-slate-500'
                    }`}
                    aria-label={`Level ${lvl.level}: ${lvl.title} (${
                      isCompleted ? 'Completed' : isUnlocked ? 'Unlocked' : 'Locked'
                    })`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    ) : isUnlocked ? (
                      `0${lvl.level}`
                    ) : (
                      <Lock className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 Level Node Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {levels.map((lvl) => {
              const isCompleted = completedSet.has(lvl.id);
              const isUnlocked = lvl.level <= highestUnlocked || isCompleted;
              const isCurrentFrontier = isUnlocked && !isCompleted;

              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleNodeClick(lvl, isUnlocked)}
                  className={`group flex flex-col justify-between rounded-lg border p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isCurrentFrontier
                      ? 'border-emerald-500/60 bg-[#0E1624] hover:border-emerald-400 cursor-pointer'
                      : isCompleted
                      ? 'border-slate-700/90 bg-[#0D131F] hover:border-emerald-500/50 cursor-pointer'
                      : 'border-slate-800/80 bg-[#0B0F17]/70 opacity-65 hover:opacity-80 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-semibold tabular-nums text-slate-400">
                        Level 0{lvl.level}
                      </span>
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          isCompleted
                            ? 'text-emerald-400'
                            : isUnlocked
                            ? 'text-sky-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Passed
                          </>
                        ) : isUnlocked ? (
                          <>
                            <Play className="h-3 w-3" aria-hidden="true" />
                            Open
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3" aria-hidden="true" />
                            Locked
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-slate-100 leading-snug">
                      {lvl.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                      {lvl.topic}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                    <span className="font-mono tabular-nums text-amber-400/90">
                      +{lvl.xpReward} XP
                    </span>
                    <span
                      className={`flex items-center gap-1 font-medium transition-colors ${
                        isUnlocked
                          ? 'text-slate-300 group-hover:text-emerald-400'
                          : 'text-slate-600'
                      }`}
                    >
                      {isCompleted ? 'Review' : isUnlocked ? 'Solve' : 'Locked'}
                      {isUnlocked && (
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {lockedNotice && (
            <p
              role="status"
              className="mt-4 text-xs text-amber-300 border-t border-slate-800/80 pt-3"
            >
              {lockedNotice}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
