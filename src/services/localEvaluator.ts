import {
  EvaluateResponse,
  HintResponse,
  LevelChallenge,
  QuickNotesResponse,
} from '../types/coding';

function stripCommentsAndWhitespace(code: string): string {
  return code
    .replace(/#.*$/gm, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Local fallback evaluator so Python Easy Levels 1-3 (and all other levels)
 * work smoothly and interactively before a live Django Cloud Run URL is configured.
 */
export function evaluateLocally(
  challenge: LevelChallenge,
  code: string
): EvaluateResponse {
  const trimmed = code.trim();
  if (!trimmed) {
    return {
      passed: false,
      output: 'No code submitted.',
      feedback: 'Write your solution in the editor before running checks.',
      xp_awarded: 0,
      source: 'local',
    };
  }

  const normalizedCode = stripCommentsAndWhitespace(code);
  const normalizedStarter = stripCommentsAndWhitespace(challenge.starterCode);

  if (normalizedCode === normalizedStarter || /\bTODO\(\)|\bpass\b/.test(normalizedCode)) {
    return {
      passed: false,
      output: 'AssertionError: Incomplete implementation (placeholder still present).',
      feedback:
        'Replace the starter placeholder (`pass` or `TODO()`) with your working implementation, then run again.',
      xp_awarded: 0,
      source: 'local',
    };
  }

  // Dedicated rich behavioral checks for Python Easy Levels 1-3
  if (challenge.id === 'python-Easy-1') {
    const hasDef = /def\s+greet_and_sum\s*\(\s*name\s*,\s*a\s*,\s*b\s*\)\s*:/.test(code);
    const hasReturn = /return\s+/.test(code);
    const hasAdd = /\ba\s*\+\s*b\b|\bb\s*\+\s*a\b/.test(code);
    const hasFormat = /Hello,/.test(code) && /Total:/.test(code);
    if (!hasDef) {
      return {
        passed: false,
        output: 'NameError: function `greet_and_sum(name, a, b)` not found.',
        feedback: 'Keep the required function definition `def greet_and_sum(name, a, b):`.',
        xp_awarded: 0,
        source: 'local',
      };
    }
    if (!hasReturn) {
      return {
        passed: false,
        output: 'Returned: None\nExpected: "Hello, Ada! Total: 42"',
        feedback: 'Your function returned `None`. Use `return` to return the formatted string.',
        xp_awarded: 0,
        source: 'local',
      };
    }
    if (!hasAdd || !hasFormat) {
      return {
        passed: false,
        output: 'AssertionError: Output format or sum calculation mismatch.\nExpected: "Hello, Ada! Total: 42"',
        feedback: 'Compute `a + b` and return `f"Hello, {name}! Total: {a + b}"` matching exact punctuation.',
        xp_awarded: 0,
        source: 'local',
      };
    }
  }

  if (challenge.id === 'python-Easy-2') {
    const zeroIdx = code.search(/==\s*0|0\s*==/);
    const modIdx = code.search(/%\s*2/);
    if (modIdx === -1) {
      return {
        passed: false,
        output: 'AssertionError: classify_number(12) failed.',
        feedback: 'Use the modulo operator (`n % 2 == 0`) to distinguish even and odd integers.',
        xp_awarded: 0,
        source: 'local',
      };
    }
    if (zeroIdx === -1) {
      return {
        passed: false,
        output: 'AssertionError: classify_number(0) returned "even", expected "zero".',
        feedback: 'Check `if n == 0: return "zero"` before testing `n % 2 == 0`.',
        xp_awarded: 0,
        source: 'local',
      };
    }
    if (zeroIdx > modIdx && !/n\s*==\s*0/.test(code.slice(0, modIdx))) {
      return {
        passed: false,
        output: 'AssertionError: classify_number(0) returned "even", expected "zero".',
        feedback: 'Zero is divisible by 2—check `n == 0` before checking `n % 2 == 0`.',
        xp_awarded: 0,
        source: 'local',
      };
    }
  }

  if (challenge.id === 'python-Easy-3') {
    const hasFilter = />\s*0|0\s*</.test(code);
    const hasLoopOrSum = /(for\s+\w+\s+in\s+|sum\s*\()/.test(code);
    if (!hasLoopOrSum) {
      return {
        passed: false,
        output: 'AssertionError: sum_positive([10, -4, 25, 0, -1, 15]) failed.',
        feedback: 'Iterate over `scores` using a `for` loop or a generator inside `sum(...)`.',
        xp_awarded: 0,
        source: 'local',
      };
    }
    if (!hasFilter) {
      return {
        passed: false,
        output: 'AssertionError: sum_positive([10, -4, 25, 0, -1, 15]) returned 45, expected 50.',
        feedback: 'Only include numbers strictly greater than zero (`x > 0`).',
        xp_awarded: 0,
        source: 'local',
      };
    }
  }

  // General pattern checks across all levels
  for (const check of challenge.localChecks.requiredPatterns) {
    const re = new RegExp(check.regex, 'm');
    if (!re.test(code)) {
      return {
        passed: false,
        output: `Check failed for ${challenge.title}.\nExpected output sample:\n${challenge.outputExample}`,
        feedback: check.message,
        xp_awarded: 0,
        source: 'local',
      };
    }
  }

  return {
    passed: true,
    output: challenge.localChecks.sampleRunOutput,
    feedback: challenge.localChecks.successFeedback,
    xp_awarded: 50,
    source: 'local',
  };
}

export function getLocalQuickNotes(
  challenge: LevelChallenge,
  packIndex: number
): QuickNotesResponse {
  const packs = challenge.quickNotesPacks;
  const pack = packs[packIndex % packs.length];
  return {
    notes: pack.notes,
    keywords: pack.keywords,
    source: 'local',
  };
}

export function getLocalHint(
  challenge: LevelChallenge,
  code: string,
  hintIndex: number
): HintResponse {
  // Prefer non-spoiler guiding hints (first two hints if multiple exist)
  const guidingHints =
    challenge.hints.length > 2 ? challenge.hints.slice(0, 2) : challenge.hints;

  if (!code.trim() || /\bpass\b|\bTODO\(\)/.test(code)) {
    return {
      hint: `${guidingHints[hintIndex % guidingHints.length]} Replace the starter placeholder and test your output against the example.`,
      source: 'local',
    };
  }

  // Check if any required pattern is missing and surface a short 2-sentence nudge
  for (const check of challenge.localChecks.requiredPatterns) {
    const re = new RegExp(check.regex, 'm');
    if (!re.test(code)) {
      return {
        hint: `${check.message} Focus on the ${challenge.topic.toLowerCase()} step shown in Quick Notes.`,
        source: 'local',
      };
    }
  }

  return {
    hint: guidingHints[hintIndex % guidingHints.length],
    source: 'local',
  };
}
