import { Flame, Trophy } from 'lucide-react';
import { NavTab } from '../types/coding';

interface TopBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  xp: number;
  streak: number;
  onBrandClick: () => void;
}

const NAV_ITEMS: { id: NavTab; label: string }[] = [
  { id: 'arena', label: 'Arena' },
  { id: 'practice', label: 'Practice' },
  { id: 'leaderboard', label: 'Leaderboard' },
];

export function TopBar({
  activeTab,
  onSelectTab,
  xp,
  streak,
  onBrandClick,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/90 bg-[#0B0F17]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:gap-8 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={onBrandClick}
          className="text-lg font-bold tracking-tight text-slate-100 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded whitespace-nowrap shrink-0 cursor-pointer"
        >
          CodeForge
        </button>

        {/* Zone 2: Primary Navigation Tabs */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 sm:gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative px-2.5 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded ${
                  isActive
                    ? 'text-slate-100'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-[13px] h-0.5 bg-emerald-400"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: XP & Streak Metrics */}
        <div className="flex items-center gap-3 sm:gap-4 text-sm shrink-0">
          <div
            className="flex items-center gap-1.5 text-slate-200 whitespace-nowrap shrink-0"
            title="Total Experience Points"
          >
            <Trophy className="h-4 w-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-mono font-semibold tabular-nums">
              {xp.toLocaleString()}
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">XP</span>
          </div>

          <span aria-hidden="true" className="h-4 w-px bg-slate-800" />

          <div
            className="flex items-center gap-1.5 text-slate-200 whitespace-nowrap shrink-0"
            title="Current Coding Streak"
          >
            <Flame className="h-4 w-4 text-orange-400 shrink-0" aria-hidden="true" />
            <span className="font-mono font-semibold tabular-nums">{streak}</span>
            <span className="hidden sm:inline text-xs text-slate-400">
              {streak === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
