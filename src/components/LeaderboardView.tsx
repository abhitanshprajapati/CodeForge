import { Flame, Trophy } from 'lucide-react';
import { useMemo, useState } from 'react';
import { LANGUAGES, LANGUAGE_MAP } from '../data/curriculum';
import { SEED_LEADERBOARD } from '../data/leaderboard';
import { LanguageId, LeaderboardEntry, UserProgress } from '../types/coding';
import { playSound } from '../services/soundEffects';

interface LeaderboardViewProps {
  progress: UserProgress;
  selectedLanguage: LanguageId;
}

type Timeframe = 'all' | 'week';

export function LeaderboardView({
  progress,
  selectedLanguage,
}: LeaderboardViewProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('all');
  const [trackFilter, setTrackFilter] = useState<LanguageId | 'all'>('all');

  const rankedEntries = useMemo(() => {
    const currentUser: LeaderboardEntry = {
      id: 'current-user',
      name: 'You',
      handle: '@you',
      primaryLanguage: selectedLanguage,
      xp: progress.xp,
      weeklyXp: progress.xp,
      streak: progress.streak,
      levelsCleared: progress.completedLevelIds.length,
      isCurrentUser: true,
    };

    const merged = [...SEED_LEADERBOARD, currentUser].filter((entry) => {
      if (trackFilter === 'all') return true;
      return entry.primaryLanguage === trackFilter || entry.isCurrentUser;
    });

    return merged.sort((a, b) => {
      const scoreA = timeframe === 'all' ? a.xp : a.weeklyXp;
      const scoreB = timeframe === 'all' ? b.xp : b.weeklyXp;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return b.streak - a.streak;
    });
  }, [progress, selectedLanguage, timeframe, trackFilter]);

  const userRank = rankedEntries.findIndex((e) => e.isCurrentUser) + 1;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl text-balance">
            Leaderboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Rankings update immediately as you pass Arena levels and earn XP.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Control */}
          <div className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#111827] p-1">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setTimeframe('all');
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                timeframe === 'all'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Time
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setTimeframe('week');
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                timeframe === 'week'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              This Week
            </button>
          </div>

          {/* Track Filter */}
          <div className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#111827] p-1">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setTrackFilter('all');
              }}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                trackFilter === 'all'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Tracks
            </button>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setTrackFilter(lang.id);
                }}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  trackFilter === lang.id
                    ? 'bg-slate-800 text-slate-100'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.shortCode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Standing Strip */}
      <section
        aria-label="Your standing"
        className="mt-6 grid grid-cols-2 divide-y sm:grid-cols-4 sm:divide-y-0 sm:divide-x divide-slate-800 rounded-xl border border-slate-800 bg-[#111827]"
      >
        <div className="p-4 sm:p-5">
          <div className="text-xs text-slate-400">Your Rank</div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-slate-100">
            #{userRank}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="text-xs text-slate-400">Total XP</div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-amber-400">
            {progress.xp.toLocaleString()}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="text-xs text-slate-400">Active Streak</div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-orange-400">
            {progress.streak}d
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="text-xs text-slate-400">Levels Cleared</div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {progress.completedLevelIds.length}
          </div>
        </div>
      </section>

      {/* Standings Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400">
                <th className="w-16 py-3 pl-5 pr-3 font-medium">Rank</th>
                <th className="px-3 py-3 font-medium">Developer</th>
                <th className="px-3 py-3 font-medium">Primary Track</th>
                <th className="px-3 py-3 font-medium text-right">Levels</th>
                <th className="px-3 py-3 font-medium text-right">Streak</th>
                <th className="py-3 pl-3 pr-5 font-medium text-right">
                  {timeframe === 'all' ? 'Total XP' : 'Weekly XP'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {rankedEntries.map((entry, idx) => {
                const rank = idx + 1;
                const langMeta = LANGUAGE_MAP[entry.primaryLanguage];
                const displayedXp = timeframe === 'all' ? entry.xp : entry.weeklyXp;

                return (
                  <tr
                    key={entry.id}
                    className={
                      entry.isCurrentUser
                        ? 'bg-emerald-500/10'
                        : 'hover:bg-slate-800/35 transition-colors'
                    }
                  >
                    <td className="py-3.5 pl-5 pr-3 font-mono text-xs font-semibold tabular-nums text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        {rank === 1 && (
                          <Trophy className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                        )}
                        #{rank}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${
                            entry.isCurrentUser ? 'text-emerald-300' : 'text-slate-100'
                          }`}
                        >
                          {entry.name}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          {entry.handle}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-xs text-slate-300 whitespace-nowrap">
                      <span
                        className="font-mono font-semibold mr-1.5"
                        style={{ color: langMeta.accentHex }}
                      >
                        {langMeta.shortCode}
                      </span>
                      {langMeta.name}
                    </td>
                    <td className="px-3 py-3.5 text-right font-mono text-xs tabular-nums text-slate-300">
                      {entry.levelsCleared}
                    </td>
                    <td className="px-3 py-3.5 text-right font-mono text-xs tabular-nums text-slate-300 whitespace-nowrap">
                      <span className="inline-flex items-center justify-end gap-1">
                        <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
                        {entry.streak}d
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 pr-5 text-right font-mono text-xs font-semibold tabular-nums text-amber-400 whitespace-nowrap">
                      {displayedXp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
