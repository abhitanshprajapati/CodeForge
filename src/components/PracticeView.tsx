import { ArrowRight, CheckCircle2, Search, Shuffle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ALL_CHALLENGES, DIFFICULTIES, LANGUAGES, LANGUAGE_MAP } from '../data/curriculum';
import { Difficulty, LanguageId, LevelChallenge, UserProgress } from '../types/coding';

interface PracticeViewProps {
  progress: UserProgress;
  onOpenChallenge: (challenge: LevelChallenge) => void;
}

export function PracticeView({ progress, onOpenChallenge }: PracticeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [langFilter, setLangFilter] = useState<LanguageId | 'all'>('all');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');

  const completedSet = useMemo(
    () => new Set(progress.completedLevelIds),
    [progress.completedLevelIds]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_CHALLENGES.filter((c) => {
      if (langFilter !== 'all' && c.language !== langFilter) return false;
      if (diffFilter !== 'all' && c.difficulty !== diffFilter) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.topic.toLowerCase().includes(q) ||
        LANGUAGE_MAP[c.language].name.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, langFilter, diffFilter]);

  const handleRandomDrill = () => {
    const pool = filtered.length > 0 ? filtered : ALL_CHALLENGES;
    const unsolved = pool.filter((c) => !completedSet.has(c.id));
    const source = unsolved.length > 0 ? unsolved : pool;
    const pick = source[Math.floor(Math.random() * source.length)];
    if (pick) onOpenChallenge(pick);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl text-balance">
            Practice Drills
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Jump directly into any challenge across all languages and difficulty tiers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRandomDrill}
          className="flex items-center gap-2 self-start sm:self-auto rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
          Launch Random Drill
        </button>
      </div>

      {/* Filter Controls */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, topic, or concept..."
            aria-label="Search coding drills"
            className="w-full rounded-lg border border-slate-800 bg-[#111827] py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Language Filter */}
          <div className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#111827] p-1">
            <button
              type="button"
              onClick={() => setLangFilter('all')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                langFilter === 'all'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLangFilter(lang.id)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  langFilter === lang.id
                    ? 'bg-slate-800 text-slate-100'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#111827] p-1">
            <button
              type="button"
              onClick={() => setDiffFilter('all')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                diffFilter === 'all'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Any Tier
            </button>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDiffFilter(d)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  diffFilter === d
                    ? 'bg-slate-800 text-slate-100'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* High-Density Challenge Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-[#111827]">
        {filtered.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-slate-300">No drills match your current filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setLangFilter('all');
                setDiffFilter('all');
              }}
              className="mt-3 rounded-lg border border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400">
                  <th className="py-3 pl-5 pr-3 font-medium">Challenge</th>
                  <th className="px-3 py-3 font-medium">Language</th>
                  <th className="px-3 py-3 font-medium">Difficulty</th>
                  <th className="px-3 py-3 font-medium text-right">Reward</th>
                  <th className="py-3 pl-3 pr-5 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.map((challenge) => {
                  const langMeta = LANGUAGE_MAP[challenge.language];
                  const isPassed = completedSet.has(challenge.id);
                  return (
                    <tr
                      key={challenge.id}
                      onClick={() => onOpenChallenge(challenge)}
                      className="group transition-colors hover:bg-slate-800/40 cursor-pointer"
                    >
                      <td className="py-3.5 pl-5 pr-3">
                        <div className="font-medium text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {challenge.title}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-400">
                          Level 0{challenge.level} · {challenge.topic}
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
                      <td className="px-3 py-3.5 text-xs whitespace-nowrap">
                        <span
                          className={
                            challenge.difficulty === 'Easy'
                              ? 'text-emerald-400'
                              : challenge.difficulty === 'Medium'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }
                        >
                          {challenge.difficulty}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-right font-mono text-xs tabular-nums text-amber-400/90 whitespace-nowrap">
                        +{challenge.xpReward} XP
                      </td>
                      <td className="py-3.5 pl-3 pr-5 text-right text-xs whitespace-nowrap">
                        {isPassed ? (
                          <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-medium text-slate-400 group-hover:text-slate-100">
                            Solve
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
