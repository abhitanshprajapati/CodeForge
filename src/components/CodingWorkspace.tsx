import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Loader2,
  Play,
  RefreshCw,
  RotateCcw,
  Terminal,
  X,
} from 'lucide-react';
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { LANGUAGE_MAP } from '../data/curriculum';
import { evaluateCode, fetchHint, fetchQuickNotes } from '../services/api';
import {
  EvaluateResponse,
  LevelChallenge,
  QuickNotesResponse,
} from '../types/coding';

interface CodingWorkspaceProps {
  challenge: LevelChallenge;
  backLabel: string;
  initialCode: string;
  isAlreadyCompleted: boolean;
  nextChallenge?: LevelChallenge;
  onCodeChange: (levelId: string, code: string) => void;
  onLevelPassed: (challenge: LevelChallenge, xpAwarded: number) => void;
  onBack: () => void;
  onOpenNext: (next: LevelChallenge) => void;
}

/** Render inline `code` segments wrapped in backticks with monospace styling */
function renderInlineCode(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="rounded bg-slate-800/90 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export function CodingWorkspace({
  challenge,
  backLabel,
  initialCode,
  isAlreadyCompleted,
  nextChallenge,
  onCodeChange,
  onLevelPassed,
  onBack,
  onOpenNext,
}: CodingWorkspaceProps) {
  const langMeta = LANGUAGE_MAP[challenge.language];
  const [code, setCode] = useState(initialCode);
  const [notesData, setNotesData] = useState<QuickNotesResponse>({
    notes: challenge.quickNotesPacks[0].notes,
    keywords: challenge.quickNotesPacks[0].keywords,
    source: 'local',
  });
  const [notesPackIdx, setNotesPackIdx] = useState(0);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);

  const [hintText, setHintText] = useState<string | null>(null);
  const [hintNotice, setHintNotice] = useState<string | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const [evalResult, setEvalResult] = useState<EvaluateResponse | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [justAwardedXp, setJustAwardedXp] = useState<number>(0);

  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset workspace state when switching to a different challenge
  useEffect(() => {
    setCode(initialCode);
    setNotesData({
      notes: challenge.quickNotesPacks[0].notes,
      keywords: challenge.quickNotesPacks[0].keywords,
      source: 'local',
    });
    setNotesPackIdx(0);
    setHintText(null);
    setHintNotice(null);
    setHintIndex(0);
    setEvalResult(null);
    setJustAwardedXp(0);
  }, [challenge.id]);

  const handleEditorChange = (nextCode: string) => {
    setCode(nextCode);
    onCodeChange(challenge.id, nextCode);
  };

  const handleResetCode = () => {
    setCode(challenge.starterCode);
    onCodeChange(challenge.id, challenge.starterCode);
    setEvalResult(null);
  };

  const handleRefreshNotes = async () => {
    if (isLoadingNotes) return;
    setIsLoadingNotes(true);
    const nextPack = notesPackIdx + 1;
    try {
      const res = await fetchQuickNotes(
        challenge,
        langMeta.apiName,
        nextPack
      );
      setNotesData(res);
      setNotesPackIdx(nextPack);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleGetHint = async () => {
    if (isLoadingHint) return;
    setIsLoadingHint(true);
    try {
      const res = await fetchHint(
        challenge,
        langMeta.apiName,
        code,
        hintIndex
      );
      setHintText(res.hint);
      setHintNotice(res.fallbackNotice ?? null);
      setHintIndex((prev) => prev + 1);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleRunAndCheck = async () => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    try {
      const res = await evaluateCode(
        challenge,
        langMeta.apiName,
        code
      );
      setEvalResult(res);
      if (res.passed) {
        const xpToGrant = res.xp_awarded > 0 ? res.xp_awarded : 50;
        if (!isAlreadyCompleted) {
          setJustAwardedXp(xpToGrant);
        }
        onLevelPassed(challenge, xpToGrant);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleEditorKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter / Cmd+Enter triggers Run & Check Code
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunAndCheck();
      return;
    }

    // Tab inserts spaces cleanly
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const indent = challenge.language === 'web' ? '  ' : '    ';
      const updated = code.slice(0, start) + indent + code.slice(end);
      handleEditorChange(updated);
      window.requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + indent.length;
          textareaRef.current.selectionEnd = start + indent.length;
        }
      });
    }
  };

  const handleScrollSync = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lineCount = Math.max(12, code.split('\n').length);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-[#0B0F17]">
      {/* Workspace Breadcrumb & Navigation Strip */}
      <div className="border-b border-slate-800/90 bg-[#0E1420]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700/90 bg-[#111827] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {backLabel}
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
              <span className="font-semibold text-slate-200">{langMeta.name}</span>
              <span aria-hidden="true">·</span>
              <span>{challenge.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-300">
                Level 0{challenge.level}
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline truncate text-slate-300">
                {challenge.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs">
            <span className="font-mono tabular-nums text-amber-400">
              +{challenge.xpReward} XP
            </span>
            {(isAlreadyCompleted || evalResult?.passed) && (
              <span className="flex items-center gap-1 font-medium text-emerald-400 whitespace-nowrap">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Passed
              </span>
            )}
            {(isAlreadyCompleted || evalResult?.passed) && nextChallenge && (
              <button
                type="button"
                onClick={() => onOpenNext(nextChallenge)}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Next: Level {nextChallenge.level}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Split-Screen Coding Workspace */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 lg:grid-cols-12">
        {/* LEFT PANEL: Problem Statement, I/O Example, Quick Notes */}
        <section
          aria-label="Problem statement and quick notes"
          className="flex flex-col border-b border-slate-800/90 lg:col-span-5 lg:border-b-0 lg:border-r lg:overflow-y-auto"
        >
          <div className="space-y-6 p-5 sm:p-6">
            {/* Problem Header */}
            <div>
              <p className="text-xs font-medium text-sky-400">{challenge.topic}</p>
              <h1 className="mt-1.5 text-xl font-bold tracking-tight text-slate-100 text-balance">
                {challenge.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {renderInlineCode(challenge.problem)}
              </p>

              {/* Requirements */}
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {challenge.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500"
                    />
                    <span className="leading-relaxed">{renderInlineCode(req)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Input / Output Example */}
            <div className="border-t border-slate-800/90 pt-5">
              <h2 className="text-xs font-semibold text-slate-200">
                Input &amp; Output Example
              </h2>
              <div className="mt-3 rounded-lg border border-slate-800 bg-[#111827] divide-y divide-slate-800/80 font-mono text-xs">
                <div className="p-3.5">
                  <div className="text-[11px] font-sans font-medium text-slate-400">
                    Input
                  </div>
                  <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap text-slate-200 leading-relaxed">
                    {challenge.inputExample}
                  </pre>
                </div>
                <div className="p-3.5">
                  <div className="text-[11px] font-sans font-medium text-slate-400">
                    Expected Output
                  </div>
                  <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap text-emerald-300 leading-relaxed">
                    {challenge.outputExample}
                  </pre>
                </div>
              </div>
            </div>

            {/* Quick Notes Section */}
            <div className="border-t border-slate-800/90 pt-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xs font-semibold text-slate-200">
                    Quick Notes
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Syntax rules &amp; concept keywords
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRefreshNotes}
                  disabled={isLoadingNotes}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[#111827] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${isLoadingNotes ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  Refresh Quick Notes
                </button>
              </div>

              {notesData.fallbackNotice && (
                <p className="mt-3 text-xs text-amber-300">
                  {notesData.fallbackNotice}
                </p>
              )}

              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                {notesData.notes.map((note, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="mt-0.5 font-mono text-xs tabular-nums text-slate-500 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{renderInlineCode(note)}</span>
                  </li>
                ))}
              </ul>

              {/* Concept Keywords — clean unboxed monospace metadata with separators */}
              <div className="mt-4 border-t border-slate-800/70 pt-3.5">
                <span className="text-xs font-medium text-slate-400">
                  Concept keywords:{' '}
                </span>
                <span className="font-mono text-xs text-sky-300 leading-relaxed">
                  {notesData.keywords.join(' · ')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Code Editor, Controls, Hint & Output Console */}
        <section
          aria-label="Code editor and output console"
          className="flex flex-col lg:col-span-7"
        >
          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/90 bg-[#111827] px-4 py-2.5 sm:px-5">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span>{langMeta.fileName}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-sans text-slate-500">Ctrl+Enter to run</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetCode}
                title="Reset editor to starter code"
                className="flex items-center gap-1.5 rounded-lg border border-slate-700/90 bg-[#0B0F17] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </button>

              <button
                type="button"
                onClick={handleGetHint}
                disabled={isLoadingHint}
                className="flex items-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-300 transition-colors hover:bg-sky-500/20 disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {isLoadingHint ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                Get Hint
              </button>

              <button
                type="button"
                onClick={handleRunAndCheck}
                disabled={isEvaluating}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {isEvaluating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                )}
                Run &amp; Check Code
              </button>
            </div>
          </div>

          {/* Code Editor Surface */}
          <div className="relative flex flex-1 min-h-[300px] lg:min-h-[360px] bg-[#0B0F17]">
            {/* Line Number Gutter */}
            <div
              ref={gutterRef}
              aria-hidden="true"
              className="w-12 shrink-0 select-none overflow-hidden border-r border-slate-800/80 bg-[#0D121D] py-4 pr-3 text-right font-mono text-xs leading-6 text-slate-600 tabular-nums"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => handleEditorChange(e.target.value)}
              onKeyDown={handleEditorKeyDown}
              onScroll={handleScrollSync}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              aria-label="Code editor"
              className="code-editor flex-1 resize-none bg-transparent p-4 font-mono text-[13px] leading-6 text-slate-100 placeholder:text-slate-600 focus:outline-none"
            />
          </div>

          {/* Contextual Hint Panel (rendered on demand) */}
          {hintText && (
            <div className="border-t border-sky-500/30 bg-[#0F1B2D] px-5 py-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 text-xs leading-relaxed text-sky-100">
                  <Lightbulb
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-semibold text-sky-300">Hint: </span>
                    <span className="whitespace-pre-wrap">
                      {renderInlineCode(hintText)}
                    </span>
                    {hintNotice && (
                      <p className="mt-1 text-[11px] text-amber-300">
                        {hintNotice}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHintText(null)}
                  aria-label="Dismiss hint"
                  className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Output Console */}
          <div className="border-t border-slate-800/90 bg-[#111827]">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Terminal className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                <span>Output Console</span>
              </div>

              {isEvaluating ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-sky-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Evaluating...
                </span>
              ) : evalResult ? (
                <div className="flex items-center gap-3 text-xs">
                  {evalResult.passed ? (
                    <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      All Checks Passed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Needs Revision
                    </span>
                  )}

                  {evalResult.passed && justAwardedXp > 0 && (
                    <span className="font-mono font-semibold tabular-nums text-amber-400">
                      +{justAwardedXp} XP earned
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs text-slate-500">Idle</span>
              )}
            </div>

            <div className="min-h-[168px] max-h-[260px] overflow-y-auto p-5">
              {!evalResult && !isEvaluating && (
                <p className="font-mono text-xs text-slate-500">
                  Click &ldquo;Run &amp; Check Code&rdquo; or press Ctrl+Enter to evaluate your solution.
                </p>
              )}

              {isEvaluating && (
                <p className="font-mono text-xs text-slate-400">
                  Evaluating your {langMeta.name} code and simulating output...
                </p>
              )}

              {evalResult && !isEvaluating && (
                <div className="space-y-3.5">
                  {evalResult.fallbackNotice && (
                    <p className="text-xs text-amber-300">
                      {evalResult.fallbackNotice}
                    </p>
                  )}

                  <div>
                    <div className="text-[11px] font-medium text-slate-400">
                      Stdout / Evaluation Output
                    </div>
                    <pre
                      className={`mt-1.5 overflow-x-auto rounded-lg border p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                        evalResult.passed
                          ? 'border-emerald-500/30 bg-[#0B0F17] text-emerald-300'
                          : 'border-rose-500/30 bg-[#0B0F17] text-rose-300'
                      }`}
                    >
                      {evalResult.output || '(no stdout output)'}
                    </pre>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-slate-300">
                      <span className="font-semibold text-slate-200">Feedback: </span>
                      {renderInlineCode(evalResult.feedback)}
                    </p>

                    {evalResult.passed && nextChallenge && (
                      <button
                        type="button"
                        onClick={() => onOpenNext(nextChallenge)}
                        className="flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Continue to Level {nextChallenge.level}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
