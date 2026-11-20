import { Difficulty, LanguageId, LanguageMeta, LevelChallenge } from '../types/coding';

export const LANGUAGES: LanguageMeta[] = [
  {
    id: 'python',
    name: 'Python',
    apiName: 'Python',
    shortCode: 'PY',
    fileName: 'solution.py',
    tagline: 'Scripting, data structures & clean algorithmic logic',
    accentHex: '#38BDF8',
  },
  {
    id: 'c',
    name: 'C',
    apiName: 'C',
    shortCode: 'C',
    fileName: 'main.c',
    tagline: 'Pointers, memory discipline & low-level control',
    accentHex: '#A78BFA',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    apiName: 'Kotlin',
    shortCode: 'KT',
    fileName: 'Main.kt',
    tagline: 'Null-safe JVM idioms, collections & expressive functions',
    accentHex: '#F472B6',
  },
  {
    id: 'web',
    name: 'HTML/CSS/JS',
    apiName: 'HTML/CSS/JS',
    shortCode: 'WEB',
    fileName: 'app.js',
    tagline: 'DOM interaction, modern layout & client-side JavaScript',
    accentHex: '#FBBF24',
  },
];

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export const LANGUAGE_MAP: Record<LanguageId, LanguageMeta> = LANGUAGES.reduce(
  (acc, lang) => {
    acc[lang.id] = lang;
    return acc;
  },
  {} as Record<LanguageId, LanguageMeta>
);

export function getTrackKey(language: LanguageId, difficulty: Difficulty): string {
  return `${language}:${difficulty}`;
}

export function getLevelId(language: LanguageId, difficulty: Difficulty, level: number): string {
  return `${language}-${difficulty}-${level}`;
}

// Hand-crafted rich curriculum with deeply detailed Python Easy Levels 1–5
// and complete playable Level 1–5 challenges across all languages and difficulties.
const PYTHON_EASY: LevelChallenge[] = [
  {
    id: 'python-Easy-1',
    language: 'python',
    difficulty: 'Easy',
    level: 1,
    title: 'Formatted Greeter & Sum',
    topic: 'Variables, Arithmetic & f-Strings',
    xpReward: 50,
    problem:
      'Write a function `greet_and_sum(name, a, b)` that returns a formatted greeting string containing the user\'s name and the sum of `a` and `b`. Follow the exact output format shown below.',
    requirements: [
      'Define a function named `greet_and_sum(name, a, b)`',
      'Compute the total of `a + b`',
      'Return `"Hello, <name>! Total: <sum>"` using an f-string or string formatting',
    ],
    inputExample: 'greet_and_sum("Ada", 14, 28)',
    outputExample: '"Hello, Ada! Total: 42"',
    starterCode: `def greet_and_sum(name, a, b):
    # Compute the sum of a and b, then return the formatted string
    pass

# Test your function
print(greet_and_sum("Ada", 14, 28))`,
    solutionHintSummary: 'Compute total = a + b and return f"Hello, {name}! Total: {total}".',
    quickNotesPacks: [
      {
        notes: [
          'Prefix string literals with `f` (e.g. `f"Hello, {name}!"`) to embed expressions directly inside curly braces.',
          'Always use `return` to send a value back from a function; `print()` only writes to stdout and returns `None`.',
          'Python uses 4-space indentation to define function bodies instead of curly braces.',
        ],
        keywords: ['def', 'return', 'f-string', 'interpolation', 'arithmetic'],
      },
      {
        notes: [
          'Expressions inside `{}` in an f-string are evaluated at runtime—you can write `{a + b}` inline without a temporary variable.',
          'Check punctuation and spacing carefully: `"Hello, Ada! Total: 42"` includes a comma after Hello and an exclamation mark.',
          'Remove `pass` once you add your implementation so your function executes your return statement.',
        ],
        keywords: ['f"{expr}"', 'str', 'parameters', 'stdout', 'print()'],
      },
    ],
    hints: [
      'Start by replacing `pass` with a variable `total = a + b` inside `greet_and_sum`.',
      'Use a Python f-string: `return f"Hello, {name}! Total: {total}"`.',
      'Complete solution:\n`def greet_and_sum(name, a, b):`\n`    return f"Hello, {name}! Total: {a + b}"`',
    ],
    localChecks: {
      requiredPatterns: [
        { regex: 'def\\s+greet_and_sum\\s*\\(', message: 'Keep the function signature `def greet_and_sum(name, a, b):`.' },
        { regex: 'return\\s+', message: 'Your function needs a `return` statement instead of `pass`.' },
        { regex: '\\+', message: 'Add `a` and `b` using the `+` operator.' },
        { regex: 'Hello,', message: 'Include `"Hello, "` in your returned string.' },
        { regex: 'Total:', message: 'Include `"Total: "` in your returned string.' },
      ],
      sampleRunOutput: 'Hello, Ada! Total: 42\n[Test 1] greet_and_sum("Ada", 14, 28) -> "Hello, Ada! Total: 42" (PASS)\n[Test 2] greet_and_sum("Linus", 5, 7) -> "Hello, Linus! Total: 12" (PASS)',
      successFeedback: 'Clean f-string formatting and accurate arithmetic. Level 2 is now unlocked.',
    },
  },
  {
    id: 'python-Easy-2',
    language: 'python',
    difficulty: 'Easy',
    level: 2,
    title: 'Even, Odd, or Zero Classifier',
    topic: 'Conditionals & Modulo Operator',
    xpReward: 50,
    problem:
      'Implement a function `classify_number(n)` that inspects an integer `n` and returns `"zero"` if `n` is 0, `"even"` if `n` is a non-zero even integer, or `"odd"` otherwise.',
    requirements: [
      'Check `n == 0` first so zero is not misclassified as even',
      'Use the modulo operator `%` to test divisibility by 2',
      'Return lowercase strings: `"zero"`, `"even"`, or `"odd"`',
    ],
    inputExample: 'classify_number(0)\nclassify_number(12)\nclassify_number(-7)',
    outputExample: '"zero"\n"even"\n"odd"',
    starterCode: `def classify_number(n):
    # Return "zero", "even", or "odd"
    pass

for value in (0, 12, -7):
    print(value, "->", classify_number(value))`,
    solutionHintSummary: 'Check if n == 0 first, elif n % 2 == 0 return "even", else return "odd".',
    quickNotesPacks: [
      {
        notes: [
          'The modulo operator `%` returns the remainder of division: `n % 2 == 0` is `True` for all even numbers (including negative even numbers and 0).',
          'Order your `if / elif / else` branches from most specific (`n == 0`) to general (`else`).',
          'Use `==` for equality comparison; single `=` is strictly for variable assignment.',
        ],
        keywords: ['if / elif / else', 'modulo (%)', 'equality (==)', 'boolean', 'branching'],
      },
      {
        notes: [
          'Early returns inside `if` blocks keep control flow flat and avoid unnecessary nesting.',
          'In Python, `(-7) % 2` evaluates to `1`, so checking `n % 2 == 0` works seamlessly for negative integers too.',
          'String comparisons are case-sensitive: return `"even"`, not `"Even"`.',
        ],
        keywords: ['early return', 'remainder', 'int', 'control flow', 'edge case'],
      },
    ],
    hints: [
      'Handle zero first: `if n == 0: return "zero"`. Otherwise `0 % 2 == 0` would return `"even"`.',
      'Add an `elif n % 2 == 0:` branch returning `"even"`, and an `else:` branch returning `"odd"`.',
      'Complete solution:\n`if n == 0:`\n`    return "zero"`\n`elif n % 2 == 0:`\n`    return "even"`\n`else:`\n`    return "odd"`',
    ],
    localChecks: {
      requiredPatterns: [
        { regex: 'def\\s+classify_number\\s*\\(', message: 'Keep the function definition `def classify_number(n):`.' },
        { regex: 'if\\s+', message: 'Use an `if` conditional to branch on the value of `n`.' },
        { regex: '%\\s*2', message: 'Use `n % 2` to determine whether the integer is even or odd.' },
        { regex: '["\']zero["\']', message: 'Return the string `"zero"` when `n == 0`.' },
        { regex: '["\']even["\']', message: 'Return the string `"even"` for even integers.' },
        { regex: '["\']odd["\']', message: 'Return the string `"odd"` for odd integers.' },
      ],
      sampleRunOutput: '0 -> zero\n12 -> even\n-7 -> odd\n[Test 1] classify_number(0) -> "zero" (PASS)\n[Test 2] classify_number(12) -> "even" (PASS)\n[Test 3] classify_number(-7) -> "odd" (PASS)',
      successFeedback: 'All boundary cases including zero and negative odd numbers passed. Level 3 is now unlocked.',
    },
  },
  {
    id: 'python-Easy-3',
    language: 'python',
    difficulty: 'Easy',
    level: 3,
    title: 'Positive Score Aggregator',
    topic: 'Loops, Lists & Filtering',
    xpReward: 50,
    problem:
      'Write a function `sum_positive(scores)` that takes a list of integers (which may include negative penalties) and returns the sum of only the positive numbers (`> 0`). If the list is empty or has no positive values, return `0`.',
    requirements: [
      'Iterate over all elements in `scores`',
      'Ignore zero and negative numbers',
      'Return an integer total (0 for empty lists)',
    ],
    inputExample: 'sum_positive([10, -4, 25, 0, -1, 15])',
    outputExample: '50',
    starterCode: `def sum_positive(scores):
    # Sum only numbers strictly greater than 0
    pass

print(sum_positive([10, -4, 25, 0, -1, 15]))`,
    solutionHintSummary: 'Use a for loop with an accumulator or sum(x for x in scores if x > 0).',
    quickNotesPacks: [
      {
        notes: [
          'A `for item in scores:` loop iterates directly over list values without needing manual index tracking.',
          'Initialize an accumulator variable `total = 0` before the loop so empty lists automatically return `0`.',
          'Generator expressions like `sum(x for x in scores if x > 0)` combine filtering and summation in one readable line.',
        ],
        keywords: ['for loop', 'list', 'accumulator', 'sum()', 'generator expression'],
      },
      {
        notes: [
          'Use `total += x` as shorthand for `total = total + x`.',
          'Strict inequality `x > 0` excludes both negative values and zero cleanly.',
          'Avoid mutating the input list while iterating over it; accumulate into a new value instead.',
        ],
        keywords: ['iteration', 'filtering', '+=', 'comprehension', 'time O(n)'],
      },
    ],
    hints: [
      'Start with `total = 0`, then loop through each element: `for score in scores:`.',
      'Inside the loop, add `if score > 0: total += score`, and return `total` after the loop ends.',
      'Or use Python\'s built-in `sum()` with a generator: `return sum(s for s in scores if s > 0)`.',
    ],
    localChecks: {
      requiredPatterns: [
        { regex: 'def\\s+sum_positive\\s*\\(', message: 'Keep the function definition `def sum_positive(scores):`.' },
        { regex: 'return\\s+', message: 'Make sure your function returns the computed total.' },
        { regex: '(for\\s+.*in\\s+|sum\\s*\\()', message: 'Iterate through `scores` using a `for` loop or `sum(...)`.' },
        { regex: '>\\s*0|0\\s*<', message: 'Filter elements strictly greater than `0` (`> 0`).' },
      ],
      sampleRunOutput: '50\n[Test 1] sum_positive([10, -4, 25, 0, -1, 15]) -> 50 (PASS)\n[Test 2] sum_positive([-5, -2, 0]) -> 0 (PASS)\n[Test 3] sum_positive([]) -> 0 (PASS)',
      successFeedback: 'Great work filtering and aggregating lists cleanly in O(n) time. Level 4 is unlocked.',
    },
  },
  {
    id: 'python-Easy-4',
    language: 'python',
    difficulty: 'Easy',
    level: 4,
    title: 'Word Frequency Counter',
    topic: 'Dictionaries & String Splitting',
    xpReward: 50,
    problem:
      'Write a function `count_words(sentence)` that splits a lowercase sentence on spaces and returns a dictionary mapping each unique word to the number of times it appears.',
    requirements: [
      'Normalize case with `.lower()` and split using `.split()`',
      'Store counts in a `dict` where keys are words and values are integer counts',
      'Return `{}` for an empty string',
    ],
    inputExample: 'count_words("code learn code build")',
    outputExample: '{"code": 2, "learn": 1, "build": 1}',
    starterCode: `def count_words(sentence):
    # Return a dictionary mapping each word to its frequency
    pass

print(count_words("code learn code build"))`,
    solutionHintSummary: 'Initialize counts = {}, split sentence.lower(), and use counts[w] = counts.get(w, 0) + 1.',
    quickNotesPacks: [
      {
        notes: [
          '`sentence.lower().split()` splits on any whitespace and ignores leading/trailing spaces.',
          '`counts.get(word, 0)` safely fetches the current count or `0` if the key does not exist yet.',
          'Dictionaries provide O(1) average lookup and update complexity.',
        ],
        keywords: ['dict', '.split()', '.get()', '.lower()', 'hashing'],
      },
      {
        notes: [
          'Calling `.split()` with no arguments handles multiple consecutive spaces better than `.split(" ")`.',
          'You can also import `Counter` from `collections` and return `dict(Counter(sentence.lower().split()))`.',
          'Empty string `"".split()` produces `[]`, naturally returning an empty dictionary `{}`.',
        ],
        keywords: ['collections.Counter', 'key-value', 'whitespace', 'frequency map'],
      },
    ],
    hints: [
      'Create an empty dictionary `counts = {}` and loop over `sentence.lower().split()`.',
      'For each `word`, update `counts[word] = counts.get(word, 0) + 1`.',
      'Return `counts` after the loop finishes.',
    ],
    localChecks: {
      requiredPatterns: [
        { regex: 'def\\s+count_words\\s*\\(', message: 'Keep the function definition `def count_words(sentence):`.' },
        { regex: 'split\\s*\\(', message: 'Use `.split()` to break the sentence into words.' },
        { regex: 'return\\s+', message: 'Return the frequency dictionary from `count_words`.' },
      ],
      sampleRunOutput: "{'code': 2, 'learn': 1, 'build': 1}\n[Test 1] count_words('code learn code build') -> {'code': 2, 'learn': 1, 'build': 1} (PASS)\n[Test 2] count_words('') -> {} (PASS)",
      successFeedback: 'Accurate frequency map construction with O(n) complexity. Final Easy level unlocked!',
    },
  },
  {
    id: 'python-Easy-5',
    language: 'python',
    difficulty: 'Easy',
    level: 5,
    title: 'Palindrome Validator',
    topic: 'String Slicing & Normalization',
    xpReward: 50,
    problem:
      'Write a function `is_palindrome(text)` that returns `True` if `text` reads the same forward and backward after ignoring case and spaces, and `False` otherwise.',
    requirements: [
      'Remove spaces and convert text to lowercase before comparing',
      'Compare the cleaned string against its reverse using slicing `[::-1]`',
      'Return a boolean (`True` or `False`)',
    ],
    inputExample: 'is_palindrome("Never Odd Or Even")',
    outputExample: 'True',
    starterCode: `def is_palindrome(text):
    # Return True if text is a palindrome ignoring spaces and case
    pass

print(is_palindrome("Never Odd Or Even"))
print(is_palindrome("CodeForge"))`,
    solutionHintSummary: 'Clean with text.replace(" ", "").lower() and return cleaned == cleaned[::-1].',
    quickNotesPacks: [
      {
        notes: [
          'Slice notation `s[::-1]` steps backward by `-1`, producing a reversed copy of the string.',
          'Chain `.replace(" ", "").lower()` to strip spaces and normalize letter casing before comparison.',
          'Directly returning a boolean expression like `return cleaned == cleaned[::-1]` is concise and Pythonic.',
        ],
        keywords: ['slicing [::-1]', '.replace()', '.lower()', 'boolean', 'palindrome'],
      },
      {
        notes: [
          'Strings in Python are immutable, so `.replace()` and `.lower()` return new strings without altering the original.',
          'For alphanumeric-only filtering, `"".join(ch.lower() for ch in text if ch.isalnum())` handles punctuation too.',
          'A single-character or empty string is trivially a palindrome (`True`).',
        ],
        keywords: ['immutability', 'step slice', 'normalization', '.isalnum()'],
      },
    ],
    hints: [
      'Normalize the string first: `cleaned = text.replace(" ", "").lower()`.',
      'Reverse a string in Python using slice step `-1`: `cleaned[::-1]`.',
      'Return `cleaned == cleaned[::-1]`.',
    ],
    localChecks: {
      requiredPatterns: [
        { regex: 'def\\s+is_palindrome\\s*\\(', message: 'Keep `def is_palindrome(text):`.' },
        { regex: 'return\\s+', message: 'Return a boolean result (`True` or `False`).' },
        { regex: '(::-1|reversed)', message: 'Reverse the normalized string using `[::-1]` or `reversed()`.' },
      ],
      sampleRunOutput: 'True\nFalse\n[Test 1] is_palindrome("Never Odd Or Even") -> True (PASS)\n[Test 2] is_palindrome("CodeForge") -> False (PASS)',
      successFeedback: 'Python Easy track mastered! Try Medium difficulty or explore another language.',
    },
  },
];

// Helper to build complete, domain-authentic challenges for all remaining tracks
function makeTrack(
  language: LanguageId,
  difficulty: Difficulty,
  specs: Array<{
    level: number;
    title: string;
    topic: string;
    problem: string;
    requirements: string[];
    inputExample: string;
    outputExample: string;
    starterCode: string;
    notes: string[];
    altNotes: string[];
    keywords: string[];
    hints: string[];
    requiredPatterns: { regex: string; message: string }[];
    sampleRunOutput: string;
  }>
): LevelChallenge[] {
  return specs.map((s) => ({
    id: getLevelId(language, difficulty, s.level),
    language,
    difficulty,
    level: s.level,
    title: s.title,
    topic: s.topic,
    xpReward: 50,
    problem: s.problem,
    requirements: s.requirements,
    inputExample: s.inputExample,
    outputExample: s.outputExample,
    starterCode: s.starterCode,
    solutionHintSummary: s.hints[s.hints.length - 1],
    quickNotesPacks: [
      { notes: s.notes, keywords: s.keywords },
      { notes: s.altNotes, keywords: [...s.keywords].reverse() },
    ],
    hints: s.hints,
    localChecks: {
      requiredPatterns: s.requiredPatterns,
      sampleRunOutput: s.sampleRunOutput,
      successFeedback: `All checks passed for ${s.title}. ${s.level < 5 ? `Level ${s.level + 1} is now unlocked.` : 'Track complete!'}`,
    },
  }));
}

const PYTHON_MEDIUM = makeTrack('python', 'Medium', [
  {
    level: 1,
    title: 'Two-Sum Index Pair',
    topic: 'Hash Maps & Complement Lookup',
    problem: 'Given a list of integers `nums` and an integer `target`, return the indices `[i, j]` of the two numbers that add up to `target` in O(n) time.',
    requirements: ['Use a dictionary to store seen numbers and their indices', 'Return a two-element list `[i, j]`', 'Avoid O(n^2) nested loops'],
    inputExample: 'two_sum([2, 7, 11, 15], 9)',
    outputExample: '[0, 1]',
    starterCode: `def two_sum(nums, target):
    # Store seen values in a dict for O(n) lookup
    pass

print(two_sum([2, 7, 11, 15], 9))`,
    notes: ['Use `enumerate(nums)` to get both index `i` and value `num` cleanly.', 'Compute `complement = target - num` and check if it is already in `seen`.', 'Dictionary membership `complement in seen` runs in O(1) average time.'],
    altNotes: ['Insert `seen[num] = i` after checking so you never pair an element with itself.', 'If multiple pairs exist, returning on the first match ensures minimal index order.'],
    keywords: ['enumerate()', 'dict', 'complement', 'O(n)', 'hash lookup'],
    hints: ['Create `seen = {}` and iterate with `for i, num in enumerate(nums):`.', 'Check `if target - num in seen: return [seen[target - num], i]`.', 'Otherwise save `seen[num] = i`.'],
    requiredPatterns: [
      { regex: 'def\\s+two_sum', message: 'Keep `def two_sum(nums, target):`.' },
      { regex: 'return\\s+', message: 'Return the matching index pair.' },
      { regex: 'for\\s+', message: 'Iterate over `nums` to locate the complement.' },
    ],
    sampleRunOutput: '[0, 1]\n[Test 1] two_sum([2, 7, 11, 15], 9) -> [0, 1] (PASS)',
  },
  {
    level: 2,
    title: 'Group Anagrams',
    topic: 'Sorted Keys & Defaultdict',
    problem: 'Write `group_anagrams(words)` that groups strings that are anagrams of each other into sublists.',
    requirements: ['Sort each word\'s characters to form a canonical tuple or string key', 'Group words sharing the same key', 'Return a list of grouped word lists'],
    inputExample: 'group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])',
    outputExample: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]',
    starterCode: `def group_anagrams(words):
    # Group words with matching sorted character signatures
    pass

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))`,
    notes: ['`"".join(sorted(word))` produces an identical string key for all anagrams.', '`collections.defaultdict(list)` avoids manual key initialization.', 'Return `list(groups.values())` to convert dict values into a list of lists.'],
    altNotes: ['Tuples of sorted characters (`tuple(sorted(word))`) are hashable and work directly as dict keys.', 'Time complexity is O(n * k log k) where k is max word length.'],
    keywords: ['sorted()', 'defaultdict', 'canonical key', 'values()'],
    hints: ['Build a dict `groups = {}` and compute `key = "".join(sorted(word))`.', 'Use `groups.setdefault(key, []).append(word)`.', 'Return `list(groups.values())`.'],
    requiredPatterns: [
      { regex: 'def\\s+group_anagrams', message: 'Keep `def group_anagrams(words):`.' },
      { regex: 'sorted\\s*\\(', message: 'Use `sorted()` to create the anagram signature key.' },
      { regex: 'return\\s+', message: 'Return the list of anagram groups.' },
    ],
    sampleRunOutput: "[['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]\n[Test 1] Grouped 6 words into 3 anagram buckets (PASS)",
  },
  {
    level: 3,
    title: 'Balanced Brackets',
    topic: 'Stacks & Matching Pairs',
    problem: 'Write `is_balanced(s)` to verify whether a string containing `()[]{}` has properly closed and nested brackets.',
    requirements: ['Push opening brackets onto a list used as a stack', 'Pop and verify matching bracket on every closing symbol', 'Return `True` only if the stack is empty at the end'],
    inputExample: 'is_balanced("({[]})")',
    outputExample: 'True',
    starterCode: `def is_balanced(s):
    # Use a stack to verify matching brackets
    pass

print(is_balanced("({[]})"))`,
    notes: ['Python lists act as LIFO stacks with `.append()` and `.pop()`.', 'Map closing brackets to opening ones: `pairs = {")": "(", "]": "[", "}": "{"}`.', 'Guard against calling `.pop()` on an empty stack by checking `if not stack:` first.'],
    altNotes: ['Early-return `False` as soon as a mismatch occurs.', 'At the end of the loop, `return len(stack) == 0` catches unclosed opening brackets.'],
    keywords: ['stack', 'LIFO', '.append()', '.pop()', 'dict mapping'],
    hints: ['Maintain `stack = []` and a dictionary mapping each closing bracket to its opening bracket.', 'If the char is an opener, append it; if closer, verify `stack` is non-empty and `stack.pop() == pairs[ch]`.', 'Return `not stack` at the end.'],
    requiredPatterns: [
      { regex: 'def\\s+is_balanced', message: 'Keep `def is_balanced(s):`.' },
      { regex: 'pop\\s*\\(', message: 'Use `.pop()` to match closing brackets from the stack.' },
      { regex: 'return\\s+', message: 'Return a boolean indicating whether brackets are balanced.' },
    ],
    sampleRunOutput: 'True\n[Test 1] is_balanced("({[]})") -> True (PASS)\n[Test 2] is_balanced("([)]") -> False (PASS)',
  },
  {
    level: 4,
    title: 'Sliding Window Max Sum',
    topic: 'Fixed Sliding Window',
    problem: 'Write `max_window_sum(nums, k)` that returns the largest sum of any contiguous subarray of length `k`.',
    requirements: ['Compute the first window sum of size `k`', 'Slide the window by adding the entering element and subtracting the leaving element', 'Achieve O(n) linear time'],
    inputExample: 'max_window_sum([2, 1, 5, 1, 3, 2], 3)',
    outputExample: '9',
    starterCode: `def max_window_sum(nums, k):
    # Maintain a running window sum of size k
    pass

print(max_window_sum([2, 1, 5, 1, 3, 2], 3))`,
    notes: ['Initial window sum is `window = sum(nums[:k])`.', 'For `i` in `range(k, len(nums))`, update `window += nums[i] - nums[i - k]`.', 'Track `best = max(best, window)` at each slide step.'],
    altNotes: ['Sliding windows avoid recomputing overlapping sums, dropping complexity from O(n*k) to O(n).', 'Return `0` if `len(nums) < k`.'],
    keywords: ['sliding window', 'subarray', 'max()', 'O(n)'],
    hints: ['Start with `window = sum(nums[:k])` and `best = window`.', 'Loop `for i in range(k, len(nums)): window += nums[i] - nums[i - k]`.', 'Update `best = max(best, window)` and return `best`.'],
    requiredPatterns: [
      { regex: 'def\\s+max_window_sum', message: 'Keep `def max_window_sum(nums, k):`.' },
      { regex: 'for\\s+', message: 'Slide across the array with a `for` loop.' },
      { regex: 'return\\s+', message: 'Return the maximum subarray sum.' },
    ],
    sampleRunOutput: '9\n[Test 1] max_window_sum([2, 1, 5, 1, 3, 2], 3) -> 9 (PASS)',
  },
  {
    level: 5,
    title: 'Merge Overlapping Intervals',
    topic: 'Sorting & Interval Merging',
    problem: 'Given a list of `[start, end]` intervals, write `merge_intervals(intervals)` to merge all overlapping ranges and return them sorted.',
    requirements: ['Sort intervals by start time', 'Merge current interval with the previous if `start <= prev_end`', 'Return the consolidated list'],
    inputExample: 'merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])',
    outputExample: '[[1, 6], [8, 10], [15, 18]]',
    starterCode: `def merge_intervals(intervals):
    # Sort by start and merge overlapping intervals
    pass

print(merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]]))`,
    notes: ['`intervals.sort(key=lambda x: x[0])` sorts intervals by start coordinate.', 'Compare `start <= merged[-1][1]` to detect overlap.', 'Extend the end bound with `merged[-1][1] = max(merged[-1][1], end)`.'],
    altNotes: ['Handle empty input early with `if not intervals: return []`.', 'Dominant cost is sorting at O(n log n).'],
    keywords: ['sort(key=...)', 'lambda', 'intervals', 'greedy'],
    hints: ['Sort intervals first, then seed `merged = [intervals[0]]`.', 'For each `[s, e]` in `intervals[1:]`, merge if `s <= merged[-1][1]`.', 'Otherwise append `[s, e]` to `merged` and return `merged`.'],
    requiredPatterns: [
      { regex: 'def\\s+merge_intervals', message: 'Keep `def merge_intervals(intervals):`.' },
      { regex: 'sort', message: 'Sort the intervals by start coordinate.' },
      { regex: 'return\\s+', message: 'Return the merged interval list.' },
    ],
    sampleRunOutput: '[[1, 6], [8, 10], [15, 18]]\n[Test 1] Merged overlapping intervals accurately (PASS)',
  },
]);

const PYTHON_HARD = makeTrack('python', 'Hard', [
  {
    level: 1,
    title: 'LRU Cache Engine',
    topic: 'OrderedDict & O(1) Eviction',
    problem: 'Implement an `LRUCache` class with `get(key)` and `put(key, value)` operations running in O(1) time, evicting the least recently used entry when capacity is exceeded.',
    requirements: ['Initialize with integer `capacity`', 'Move accessed keys to the most-recent position', 'Evict oldest key when `len(cache) > capacity`'],
    inputExample: 'cache = LRUCache(2); cache.put(1, 10); cache.put(2, 20); cache.get(1); cache.put(3, 30); cache.get(2)',
    outputExample: '-1',
    starterCode: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.store = OrderedDict()

    def get(self, key):
        pass

    def put(self, key, value):
        pass`,
    notes: ['`OrderedDict.move_to_end(key)` promotes an item to most-recently-used in O(1).', '`popitem(last=False)` evicts the oldest entry from the front.', 'Return `-1` in `get` when key is missing.'],
    altNotes: ['Updating an existing key in `put` must also call `move_to_end(key)`.', 'Doubly linked list + hash map is the classic manual equivalent of `OrderedDict`.'],
    keywords: ['OrderedDict', 'move_to_end', 'popitem', 'O(1) cache'],
    hints: ['In `get`, if `key not in self.store: return -1`, else `self.store.move_to_end(key)` and return `self.store[key]`.', 'In `put`, set `self.store[key] = value`, call `move_to_end(key)`, and evict if `len(self.store) > self.capacity`.'],
    requiredPatterns: [
      { regex: 'class\\s+LRUCache', message: 'Keep `class LRUCache`.' },
      { regex: 'move_to_end', message: 'Promote accessed keys with `move_to_end`.' },
      { regex: 'popitem', message: 'Evict the least recently used entry with `popitem(last=False)`.' },
    ],
    sampleRunOutput: '[Test 1] get(1) -> 10, evicted key 2, get(2) -> -1 (PASS)',
  },
  {
    level: 2,
    title: 'Shortest Grid Path (BFS)',
    topic: 'Breadth-First Search & Queues',
    problem: 'Write `shortest_path(grid)` that finds the minimum number of steps from `(0, 0)` to `(rows-1, cols-1)` moving 4-directionally across `0` cells (`1` is blocked). Return `-1` if unreachable.',
    requirements: ['Use `collections.deque` for O(1) queue pops', 'Track visited cells to avoid cycles', 'Explore up, down, left, right neighbors'],
    inputExample: 'shortest_path([[0,0,0],[1,1,0],[0,0,0]])',
    outputExample: '4',
    starterCode: `from collections import deque

def shortest_path(grid):
    # Run BFS from (0, 0) to bottom-right
    pass`,
    notes: ['BFS guarantees the shortest path in unweighted grids.', 'Store `(row, col, steps)` tuples in the deque.', 'Mark cells visited when enqueuing, not when dequeuing, to prevent duplicates.'],
    altNotes: ['Check bounds `0 <= nr < rows and 0 <= nc < cols` before reading `grid[nr][nc]`.', 'If start or end cell is `1`, immediately return `-1`.'],
    keywords: ['BFS', 'deque', 'visited set', '4-directional'],
    hints: ['Initialize `q = deque([(0, 0, 0)])` and `visited = {(0, 0)}`.', 'Pop `(r, c, d)` and return `d` when `(r, c) == (rows - 1, cols - 1)`.', 'Push valid unvisited neighbors with `d + 1`.'],
    requiredPatterns: [
      { regex: 'def\\s+shortest_path', message: 'Keep `def shortest_path(grid):`.' },
      { regex: 'deque', message: 'Use `deque` for BFS queue traversal.' },
      { regex: 'return\\s+', message: 'Return the minimum step count or `-1`.' },
    ],
    sampleRunOutput: '[Test 1] shortest_path(3x3 grid) -> 4 steps (PASS)',
  },
  {
    level: 3,
    title: 'Coin Change Min Coins',
    topic: 'Bottom-Up Dynamic Programming',
    problem: 'Given coin denominations `coins` and a target `amount`, write `min_coins(coins, amount)` to return the fewest coins needed to make `amount`, or `-1` if impossible.',
    requirements: ['Create a DP table of size `amount + 1`', 'Initialize unreachable states to `float("inf")`', 'Transition with `dp[a] = min(dp[a], dp[a - c] + 1)`'],
    inputExample: 'min_coins([1, 2, 5], 11)',
    outputExample: '3',
    starterCode: `def min_coins(coins, amount):
    # Compute minimum coins using bottom-up DP
    pass`,
    notes: ['Base case: `dp[0] = 0` because 0 coins make amount 0.', 'For each sub-amount `a` from `1` to `amount`, test every coin `c <= a`.', 'Check `dp[amount] == float("inf")` before returning `-1`.'],
    altNotes: ['Greedy fails on non-canonical denominations like `[1, 3, 4]` for target `6` (greedy gives 3 coins, DP gives 2).', 'Space complexity is O(amount).'],
    keywords: ['DP table', 'optimal substructure', 'min()', 'float("inf")'],
    hints: ['Initialize `dp = [float("inf")] * (amount + 1)` and `dp[0] = 0`.', 'Loop `for a in range(1, amount + 1):` and `for c in coins:`.', 'Return `-1 if dp[amount] == float("inf") else dp[amount]`.'],
    requiredPatterns: [
      { regex: 'def\\s+min_coins', message: 'Keep `def min_coins(coins, amount):`.' },
      { regex: 'min\\s*\\(', message: 'Use `min()` for the DP transition.' },
      { regex: 'return\\s+', message: 'Return the minimum coin count or `-1`.' },
    ],
    sampleRunOutput: '[Test 1] min_coins([1, 2, 5], 11) -> 3 (PASS)\n[Test 2] min_coins([1, 3, 4], 6) -> 2 (PASS)',
  },
  {
    level: 4,
    title: 'Course Schedule Topological Sort',
    topic: 'Directed Graphs & Cycle Detection',
    problem: 'Given `num_courses` and prerequisite pairs `[course, prereq]`, write `can_finish(num_courses, prerequisites)` returning `True` if all courses can be completed without a cycle.',
    requirements: ['Build an adjacency list and in-degree array', 'Use Kahn\'s algorithm (BFS queue of 0-indegree nodes)', 'Return `processed == num_courses`'],
    inputExample: 'can_finish(2, [[1, 0]])',
    outputExample: 'True',
    starterCode: `from collections import deque

def can_finish(num_courses, prerequisites):
    # Detect cycles using topological sort
    pass`,
    notes: ['Each prerequisite `[a, b]` adds a directed edge `b -> a` and increments `indegree[a]`.', 'Start queue with every course having `indegree == 0`.', 'If a cycle exists, nodes in the cycle never reach `indegree == 0`.'],
    altNotes: ['Kahn\'s algorithm runs in O(V + E) time.', 'DFS with 3-state coloring (unvisited, visiting, visited) is another valid approach.'],
    keywords: ['DAG', 'Kahn algorithm', 'in-degree', 'topological sort'],
    hints: ['Build `graph = [[] for _ in range(num_courses)]` and `indegree = [0] * num_courses`.', 'Enqueue all nodes with `indegree[i] == 0` and decrement neighbor in-degrees as you pop.', 'Return `taken == num_courses`.'],
    requiredPatterns: [
      { regex: 'def\\s+can_finish', message: 'Keep `def can_finish(num_courses, prerequisites):`.' },
      { regex: 'for\\s+', message: 'Traverse the prerequisite graph.' },
      { regex: 'return\\s+', message: 'Return a boolean indicating whether all courses can finish.' },
    ],
    sampleRunOutput: '[Test 1] can_finish(2, [[1, 0]]) -> True (PASS)\n[Test 2] can_finish(2, [[1, 0], [0, 1]]) -> False (PASS)',
  },
  {
    level: 5,
    title: 'Trie Prefix Dictionary',
    topic: 'Prefix Trees & Search',
    problem: 'Implement a `Trie` class supporting `insert(word)`, `search(word)`, and `starts_with(prefix)`.',
    requirements: ['Represent nodes with a children dictionary and an `is_end` flag', 'Walk character by character during lookup', 'Distinguish full word match from prefix match'],
    inputExample: 't = Trie(); t.insert("forge"); t.starts_with("for"); t.search("for")',
    outputExample: 'True, False',
    starterCode: `class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        pass

    def search(self, word):
        pass

    def starts_with(self, prefix):
        pass`,
    notes: ['Nested dicts with a sentinel key like `"#": True` make concise Python tries.', '`insert`, `search`, and `starts_with` each run in O(L) time for word length L.', 'Use `node = node.setdefault(ch, {})` when inserting characters.'],
    altNotes: ['`starts_with` only verifies that the path exists; `search` also checks the end-of-word marker.', 'Tries power autocomplete engines and IP routing tables.'],
    keywords: ['Trie', 'prefix tree', 'setdefault()', 'O(L)'],
    hints: ['In `insert`, loop `for ch in word: node = node.setdefault(ch, {})` then mark `node["#"] = True`.', 'Write a helper `_walk(text)` that returns the ending node or `None`.', '`search` checks `node is not None and "#" in node`; `starts_with` checks `node is not None`.'],
    requiredPatterns: [
      { regex: 'class\\s+Trie', message: 'Keep `class Trie`.' },
      { regex: 'def\\s+insert', message: 'Implement `insert(self, word)`.' },
      { regex: 'def\\s+search', message: 'Implement `search(self, word)`.' },
      { regex: 'def\\s+starts_with', message: 'Implement `starts_with(self, prefix)`.' },
    ],
    sampleRunOutput: '[Test 1] insert("forge"), starts_with("for") -> True, search("for") -> False (PASS)',
  },
]);

const C_EASY = makeTrack('c', 'Easy', [
  {
    level: 1,
    title: 'Standard Output & Arithmetic',
    topic: 'printf & Format Specifiers',
    problem: 'Complete `main()` to declare two integers `a = 18` and `b = 24`, compute their sum, and print `"Sum: 42"` followed by a newline using `printf`.',
    requirements: ['Include `<stdio.h>`', 'Use `%d` format specifier inside `printf`', 'Return `0` from `main()`'],
    inputExample: 'a = 18, b = 24',
    outputExample: 'Sum: 42',
    starterCode: `#include <stdio.h>

int main(void) {
    int a = 18;
    int b = 24;
    // Print "Sum: 42\\n" using printf

    return 0;
}`,
    notes: ['`%d` prints signed `int` values in `printf`.', 'Always terminate C statements with a semicolon `;`.', 'Include `\\n` at the end of `printf` to flush line-buffered stdout cleanly.'],
    altNotes: ['`int main(void)` explicitly specifies that `main` takes no parameters.', 'Returning `0` signals successful process exit to the operating system.'],
    keywords: ['#include <stdio.h>', 'printf', '%d', 'int', 'return 0'],
    hints: ['Compute `int sum = a + b;`.', 'Call `printf("Sum: %d\\n", sum);`.'],
    requiredPatterns: [
      { regex: 'printf\\s*\\(', message: 'Use `printf(...)` to print the formatted sum.' },
      { regex: '%d', message: 'Include the `%d` integer specifier in your format string.' },
      { regex: 'Sum:', message: 'Match the `"Sum: "` output prefix.' },
    ],
    sampleRunOutput: 'Sum: 42\n[GCC Check] Exit code 0 · Output matched (PASS)',
  },
  {
    level: 2,
    title: 'Max of Three Integers',
    topic: 'Functions & Conditionals in C',
    problem: 'Write a function `int max3(int a, int b, int c)` that returns the largest of three integer arguments.',
    requirements: ['Declare a `max` variable initialized to `a`', 'Compare against `b` and `c` using `if` statements', 'Return the largest integer'],
    inputExample: 'max3(12, 47, 31)',
    outputExample: '47',
    starterCode: `#include <stdio.h>

int max3(int a, int b, int c) {
    // Return the maximum of a, b, and c
    return 0;
}

int main(void) {
    printf("%d\\n", max3(12, 47, 31));
    return 0;
}`,
    notes: ['C requires explicit parameter and return types on every function.', 'Tracking `int m = a;` then updating `if (b > m) m = b;` is clean and branch-minimal.', 'Boolean conditions in `if (...)` must be wrapped in parentheses.'],
    altNotes: ['Nested ternary operators work too, though two sequential `if` checks are easier to audit.', 'Make sure `max3` is defined or prototyped before `main()`.'],
    keywords: ['int', 'if (...)', 'function signature', 'comparison'],
    hints: ['Start with `int m = a;`.', 'Add `if (b > m) m = b;` and `if (c > m) m = c;`, then `return m;`.'],
    requiredPatterns: [
      { regex: 'int\\s+max3', message: 'Keep the `int max3(int a, int b, int c)` signature.' },
      { regex: '(if\\s*\\(|\\?)', message: 'Compare `a`, `b`, and `c` with conditionals.' },
      { regex: 'return\\s+[^0]', message: 'Return the computed maximum instead of `0`.' },
    ],
    sampleRunOutput: '47\n[Test 1] max3(12, 47, 31) -> 47 (PASS)',
  },
  {
    level: 3,
    title: 'Pointer Swap Utility',
    topic: 'Pointers & Dereferencing',
    problem: 'Implement `void swap(int *x, int *y)` so it swaps the integer values stored at the memory addresses `x` and `y`.',
    requirements: ['Dereference pointers with `*x` and `*y`', 'Use a temporary `int temp` variable', 'Mutate the caller\'s variables in place'],
    inputExample: 'a = 5, b = 9; swap(&a, &b);',
    outputExample: 'a = 9, b = 5',
    starterCode: `#include <stdio.h>

void swap(int *x, int *y) {
    // Swap the values pointed to by x and y
}

int main(void) {
    int a = 5, b = 9;
    swap(&a, &b);
    printf("a = %d, b = %d\\n", a, b);
    return 0;
}`,
    notes: ['`&a` passes the memory address of `a` into `int *x`.', 'Dereferencing `*x` reads or writes the integer stored at that address.', 'C passes arguments by value, so pointers are required for in-place mutation.'],
    altNotes: ['`int temp = *x; *x = *y; *y = temp;` is safe even when values are large (no overflow).', 'Never dereference a `NULL` pointer.'],
    keywords: ['pointer (*)', 'address-of (&)', 'dereference', 'pass-by-reference'],
    hints: ['Save `*x` into `int temp = *x;`.', 'Assign `*x = *y;` and then `*y = temp;`.'],
    requiredPatterns: [
      { regex: 'void\\s+swap\\s*\\(', message: 'Keep `void swap(int *x, int *y)`.' },
      { regex: '\\*x', message: 'Dereference `x` with `*x`.' },
      { regex: '\\*y', message: 'Dereference `y` with `*y`.' },
    ],
    sampleRunOutput: 'a = 9, b = 5\n[Test 1] In-place pointer swap verified (PASS)',
  },
  {
    level: 4,
    title: 'Array Sum with Length',
    topic: 'Arrays & For Loops',
    problem: 'Write `int array_sum(const int arr[], int n)` that loops through an integer array of length `n` and returns the sum of its elements.',
    requirements: ['Accept `const int arr[]` and its explicit length `n`', 'Accumulate sum in a `for` loop from `0` to `n - 1`', 'Return the total'],
    inputExample: 'array_sum({3, 6, 9, 12}, 4)',
    outputExample: '30',
    starterCode: `#include <stdio.h>

int array_sum(const int arr[], int n) {
    // Sum all n elements in arr
    return 0;
}

int main(void) {
    int nums[] = {3, 6, 9, 12};
    printf("%d\\n", array_sum(nums, 4));
    return 0;
}`,
    notes: ['Arrays decay to pointers when passed to C functions, so always pass length `n` explicitly.', 'Using `const int arr[]` documents that the function will not modify the array.', 'Keep loop bounds strictly `< n` to prevent out-of-bounds reads.'],
    altNotes: ['Initialize `int total = 0;`—uninitialized local variables in C hold garbage values.', 'Array indexing `arr[i]` is equivalent to `*(arr + i)`.'],
    keywords: ['const', 'array decay', 'for loop', 'bounds safety'],
    hints: ['Initialize `int total = 0;`.', 'Loop `for (int i = 0; i < n; i++) { total += arr[i]; }` and `return total;`.'],
    requiredPatterns: [
      { regex: 'for\\s*\\(', message: 'Use a `for` loop to traverse `arr`.' },
      { regex: 'arr\\s*\\[', message: 'Read elements with `arr[i]`.' },
    ],
    sampleRunOutput: '30\n[Test 1] array_sum({3, 6, 9, 12}, 4) -> 30 (PASS)',
  },
  {
    level: 5,
    title: 'Manual String Length',
    topic: 'Null-Terminated Strings',
    problem: 'Implement `int my_strlen(const char *s)` without calling `strlen()` by counting characters until the null terminator `\'\\0\'`.',
    requirements: ['Walk `s` until `s[len] == \'\\0\'`', 'Do not use `<string.h>`', 'Return the character count excluding `\'\\0\'`'],
    inputExample: 'my_strlen("CodeForge")',
    outputExample: '9',
    starterCode: `#include <stdio.h>

int my_strlen(const char *s) {
    // Count characters until '\\0'
    return 0;
}

int main(void) {
    printf("%d\\n", my_strlen("CodeForge"));
    return 0;
}`,
    notes: ['C strings are `char` arrays terminated by the zero byte `\'\\0\'`.', 'A `while (s[len] != \'\\0\') len++;` loop stops right at the terminator.', 'Empty string `""` has `\'\\0\'` at index 0, so `my_strlen("")` returns `0`.'],
    altNotes: ['Pointer arithmetic `const char *p = s; while (*p) p++; return (int)(p - s);` is also idiomatic.', 'Never forget space for `\'\\0\'` when allocating string buffers.'],
    keywords: ['char *', 'null terminator', 'while loop', 'C-string'],
    hints: ['Start with `int len = 0;`.', 'Use `while (s[len] != \'\\0\') { len++; }` and return `len`.'],
    requiredPatterns: [
      { regex: 'while\\s*\\(|for\\s*\\(', message: 'Iterate through `s` until the null terminator.' },
      { regex: '\\\\0|\\*s|\\*p', message: 'Check for the null terminator `\'\\0\'`.' },
    ],
    sampleRunOutput: '9\n[Test 1] my_strlen("CodeForge") -> 9 (PASS)',
  },
]);

const C_MEDIUM = makeTrack('c', 'Medium', [
  {
    level: 1,
    title: 'In-Place String Reversal',
    topic: 'Two-Pointer Buffer Mutation',
    problem: 'Write `void reverse_str(char *s)` to reverse a mutable C string in place using left and right indices.',
    requirements: ['Find the string length', 'Swap `s[left]` and `s[right]` while `left < right`', 'Preserve the trailing `\'\\0\'`'],
    inputExample: 'char buf[] = "kernel"; reverse_str(buf);',
    outputExample: 'lenrek',
    starterCode: `#include <stdio.h>
#include <string.h>

void reverse_str(char *s) {
    // Reverse s in place using two pointers
}`,
    notes: ['Only mutate `char buf[] = "..."` arrays, never read-only string literals.', 'Two-pointer reversal uses O(1) extra stack space.', 'Stop when `left >= right` so characters are not swapped back.'],
    altNotes: ['`size_t len = strlen(s);` handles empty strings safely if you guard `if (len == 0) return;`.'],
    keywords: ['two pointers', 'in-place', 'strlen', 'char[]'],
    hints: ['Set `int l = 0, r = (int)strlen(s) - 1;`.', 'While `l < r`, swap `s[l]` and `s[r]`, then `l++` and `r--`.'],
    requiredPatterns: [
      { regex: 'while\\s*\\(|for\\s*\\(', message: 'Loop with two converging indices.' },
      { regex: 'reverse_str', message: 'Keep `void reverse_str(char *s)`.' },
    ],
    sampleRunOutput: 'lenrek\n[Test 1] reverse_str("kernel") -> "lenrek" (PASS)',
  },
  {
    level: 2,
    title: 'Dynamic Int Array with malloc',
    topic: 'Heap Allocation & free',
    problem: 'Implement `int *range_array(int n)` that allocates an `int` array of size `n` on the heap, fills it with `0..n-1`, and returns the pointer.',
    requirements: ['Allocate `n * sizeof(int)` bytes using `malloc`', 'Check for `NULL` allocation failure', 'Fill indices `0` to `n - 1`'],
    inputExample: 'range_array(5)',
    outputExample: '0 1 2 3 4',
    starterCode: `#include <stdlib.h>

int *range_array(int n) {
    // Allocate heap memory and populate 0..n-1
    return NULL;
}`,
    notes: ['Always multiply element count by `sizeof(int)` in `malloc`.', 'Verify `if (!arr) return NULL;` before writing to allocated memory.', 'The caller is responsible for calling `free()` on the returned pointer.'],
    altNotes: ['`calloc(n, sizeof(int))` zeroes memory automatically.', 'Never return a pointer to a local stack array.'],
    keywords: ['malloc', 'sizeof', 'NULL check', 'heap'],
    hints: ['Call `int *arr = malloc((size_t)n * sizeof(int));`.', 'Check `if (!arr) return NULL;`, loop `arr[i] = i`, and `return arr;`.'],
    requiredPatterns: [
      { regex: 'malloc|calloc', message: 'Allocate the array on the heap with `malloc` or `calloc`.' },
      { regex: 'sizeof', message: 'Use `sizeof(int)` for portable allocation sizing.' },
    ],
    sampleRunOutput: '0 1 2 3 4\n[Test 1] Heap array allocated and verified with zero leaks (PASS)',
  },
  {
    level: 3,
    title: 'Struct Point Distance',
    topic: 'Structs & Member Access',
    problem: 'Define `int manhattan(const Point *a, const Point *b)` returning `|a->x - b->x| + |a->y - b->y|`.',
    requirements: ['Access struct pointer fields with `->`', 'Use `abs()` from `<stdlib.h>`', 'Return the integer Manhattan distance'],
    inputExample: 'manhattan(&(Point){1, 2}, &(Point){4, 6})',
    outputExample: '7',
    starterCode: `#include <stdlib.h>

typedef struct {
    int x;
    int y;
} Point;

int manhattan(const Point *a, const Point *b) {
    return 0;
}`,
    notes: ['Use `ptr->field` to access members of a struct through a pointer.', 'Passing `const Point *` avoids copying large structs by value.', '`abs()` computes integer absolute value.'],
    altNotes: ['`(*a).x` is equivalent to `a->x`, though `->` is standard C style.'],
    keywords: ['typedef struct', 'arrow (->)', 'const pointer', 'abs()'],
    hints: ['Compute `abs(a->x - b->x) + abs(a->y - b->y)`.', 'Return that sum directly.'],
    requiredPatterns: [
      { regex: '->', message: 'Access struct pointer fields using `->`.' },
      { regex: 'abs\\s*\\(', message: 'Use `abs()` for coordinate differences.' },
    ],
    sampleRunOutput: '7\n[Test 1] manhattan((1,2), (4,6)) -> 7 (PASS)',
  },
  {
    level: 4,
    title: 'Bitwise Power-of-Two Check',
    topic: 'Bitwise Operations',
    problem: 'Write `int is_power_of_two(unsigned int n)` returning `1` if `n` is a power of two and `0` otherwise in O(1) using bitwise operators.',
    requirements: ['Ensure `n > 0`', 'Test `(n & (n - 1)) == 0`', 'Return `1` or `0`'],
    inputExample: 'is_power_of_two(64)',
    outputExample: '1',
    starterCode: `int is_power_of_two(unsigned int n) {
    // Use bitwise AND trick
    return 0;
}`,
    notes: ['Powers of two have exactly one `1` bit in binary (e.g. `8 = 1000`).', 'Subtracting 1 flips all trailing zeros to ones (`7 = 0111`).', 'Watch operator precedence: `==` binds tighter than `&`, so always parenthesize `(n & (n - 1)) == 0`.'],
    altNotes: ['`0` satisfies `(0 & -1) == 0`, which is why the `n > 0` guard is essential.'],
    keywords: ['bitwise AND (&)', 'precedence', 'unsigned int', 'O(1)'],
    hints: ['Return `n > 0 && (n & (n - 1)) == 0`.'],
    requiredPatterns: [
      { regex: '&', message: 'Use the bitwise `&` operator.' },
      { regex: 'n\\s*-\\s*1', message: 'Combine `n` with `(n - 1)`.' },
    ],
    sampleRunOutput: '1\n[Test 1] is_power_of_two(64) -> 1, is_power_of_two(0) -> 0 (PASS)',
  },
  {
    level: 5,
    title: 'Binary Search in Sorted Array',
    topic: 'Divide & Conquer Search',
    problem: 'Write `int binary_search(const int arr[], int n, int target)` returning the index of `target` or `-1` if absent.',
    requirements: ['Avoid integer overflow with `mid = lo + (hi - lo) / 2`', 'Narrow `lo` or `hi` each iteration', 'Return `-1` when `lo > hi`'],
    inputExample: 'binary_search({2, 5, 8, 12, 16}, 5, 12)',
    outputExample: '3',
    starterCode: `int binary_search(const int arr[], int n, int target) {
    // Implement O(log n) binary search
    return -1;
}`,
    notes: ['`lo + (hi - lo) / 2` prevents signed integer overflow on large arrays.', 'Update `lo = mid + 1` or `hi = mid - 1` so the loop always terminates.', 'Runs in O(log n) time.'],
    altNotes: ['Use `while (lo <= hi)` when `hi` starts at `n - 1`.'],
    keywords: ['binary search', 'overflow safety', 'O(log n)'],
    hints: ['Set `int lo = 0, hi = n - 1;` and loop `while (lo <= hi)`.', 'Compute `int mid = lo + (hi - lo) / 2;` and compare `arr[mid]` with `target`.'],
    requiredPatterns: [
      { regex: 'while\\s*\\(', message: 'Use a `while` loop for binary search.' },
      { regex: '/\\s*2|>>\\s*1', message: 'Compute the midpoint index `mid`.' },
    ],
    sampleRunOutput: '3\n[Test 1] binary_search(..., 12) -> index 3 (PASS)',
  },
]);

const C_HARD = makeTrack('c', 'Hard', [
  {
    level: 1,
    title: 'Singly Linked List Reversal',
    topic: 'Pointer Rewiring',
    problem: 'Implement `Node *reverse_list(Node *head)` to reverse a singly linked list in O(n) time and O(1) space.',
    requirements: ['Track `prev`, `curr`, and `next` pointers', 'Rewire `curr->next = prev`', 'Return the new head `prev`'],
    inputExample: '1 -> 2 -> 3 -> NULL',
    outputExample: '3 -> 2 -> 1 -> NULL',
    starterCode: `#include <stddef.h>

typedef struct Node {
    int val;
    struct Node *next;
} Node;

Node *reverse_list(Node *head) {
    // Reverse pointers iteratively
    return NULL;
}`,
    notes: ['Save `Node *next = curr->next;` before overwriting `curr->next = prev;`.', 'Advance `prev = curr; curr = next;` each iteration.', 'When `curr` becomes `NULL`, `prev` is the new head.'],
    altNotes: ['Handles empty list (`NULL`) and single-node lists automatically.'],
    keywords: ['linked list', 'prev/curr/next', 'O(1) space'],
    hints: ['Initialize `Node *prev = NULL, *curr = head;`.', 'Inside `while (curr)`, save `next`, reverse `curr->next`, and advance both pointers.'],
    requiredPatterns: [
      { regex: 'while\\s*\\(', message: 'Traverse the list using a `while` loop.' },
      { regex: '->next', message: 'Rewire `curr->next` pointers.' },
    ],
    sampleRunOutput: '3 -> 2 -> 1 -> NULL\n[Test 1] Linked list reversed in place (PASS)',
  },
  {
    level: 2,
    title: 'Custom memcpy Implementation',
    topic: 'Void Pointers & Byte Copies',
    problem: 'Implement `void *my_memcpy(void *dst, const void *src, size_t n)` copying `n` raw bytes from `src` to `dst`.',
    requirements: ['Cast `void *` to `unsigned char *` for byte arithmetic', 'Copy `n` bytes in a loop', 'Return the original `dst` pointer'],
    inputExample: 'my_memcpy(out, "C99", 4)',
    outputExample: '"C99"',
    starterCode: `#include <stddef.h>

void *my_memcpy(void *dst, const void *src, size_t n) {
    // Copy n bytes from src to dst
    return dst;
}`,
    notes: ['Standard C forbids pointer arithmetic on `void *`; cast to `unsigned char *` first.', 'Return the original `dst` pointer to match `<string.h>` conventions.'],
    altNotes: ['For overlapping buffers, `memmove` is required instead of `memcpy`.'],
    keywords: ['void *', 'unsigned char *', 'size_t', 'byte copy'],
    hints: ['Declare `unsigned char *d = dst; const unsigned char *s = src;`.', 'Loop `for (size_t i = 0; i < n; i++) d[i] = s[i];` and `return dst;`.'],
    requiredPatterns: [
      { regex: 'char\\s*\\*', message: 'Cast to `unsigned char *` or `char *` for byte-level copying.' },
      { regex: 'for\\s*\\(|while\\s*\\(', message: 'Loop over all `n` bytes.' },
    ],
    sampleRunOutput: '[Test 1] Copied 4 raw bytes accurately (PASS)',
  },
  {
    level: 3,
    title: 'Ring Buffer Enqueue',
    topic: 'Circular Queues & Wraparound',
    problem: 'Implement `int rb_push(RingBuf *rb, int val)` for a fixed-capacity ring buffer, returning `0` on success or `-1` if full.',
    requirements: ['Check `rb->count == rb->cap` for full state', 'Write to `rb->data[rb->tail]` and wrap `tail = (tail + 1) % cap`', 'Increment `rb->count`'],
    inputExample: 'rb_push(&rb, 42)',
    outputExample: '0',
    starterCode: `typedef struct {
    int *data;
    int head, tail, count, cap;
} RingBuf;

int rb_push(RingBuf *rb, int val) {
    // Enqueue val into circular buffer
    return -1;
}`,
    notes: ['Modulo wraparound `(rb->tail + 1) % rb->cap` keeps indices inside `[0, cap)`.', 'Tracking `count` cleanly distinguishes full from empty states.'],
    altNotes: ['Ring buffers are foundational in embedded UART drivers and audio pipelines.'],
    keywords: ['ring buffer', 'wraparound', 'struct', 'O(1)'],
    hints: ['If `rb->count == rb->cap` return `-1`.', 'Store `rb->data[rb->tail] = val;`, update `rb->tail = (rb->tail + 1) % rb->cap;`, increment `rb->count++`, return `0`.'],
    requiredPatterns: [
      { regex: '%', message: 'Wrap `tail` using modulo `%`.' },
      { regex: 'rb->', message: 'Update `RingBuf` fields via `->`.' },
    ],
    sampleRunOutput: '[Test 1] Enqueue + wraparound verified (PASS)',
  },
  {
    level: 4,
    title: 'Function Pointer Comparator',
    topic: 'qsort & Callbacks',
    problem: 'Write a comparator `int cmp_desc(const void *a, const void *b)` suitable for `qsort` that sorts integers in descending order without subtraction overflow.',
    requirements: ['Cast pointers to `const int *` and dereference', 'Return `-1`, `0`, or `1` cleanly', 'Avoid `(*b - *a)` overflow traps'],
    inputExample: 'qsort(arr, 4, sizeof(int), cmp_desc)',
    outputExample: '99 42 10 -5',
    starterCode: `int cmp_desc(const void *a, const void *b) {
    // Compare two ints for descending qsort order
    return 0;
}`,
    notes: ['Cast `int x = *(const int *)a; int y = *(const int *)b;`.', 'Using `(x < y) - (x > y)` avoids signed integer overflow on `INT_MIN`.'],
    altNotes: ['For descending order, return negative when `x > y` so `x` comes first.'],
    keywords: ['qsort', 'const void *', 'callback', 'overflow-safe'],
    hints: ['Extract `int x = *(const int *)a;` and `int y = *(const int *)b;`.', 'Return `(y > x) - (y < x)`.'],
    requiredPatterns: [
      { regex: 'const\\s+int\\s*\\*', message: 'Cast `const void *` arguments to `const int *`.' },
      { regex: 'return\\s+', message: 'Return comparison result (-1, 0, or 1).' },
    ],
    sampleRunOutput: '99 42 10 -5\n[Test 1] Descending comparator verified including INT_MIN (PASS)',
  },
  {
    level: 5,
    title: 'Arena Bump Allocator',
    topic: 'Memory Alignment & Arenas',
    problem: 'Implement `void *arena_alloc(Arena *a, size_t size)` returning an 8-byte aligned pointer from `a->buf`, or `NULL` if insufficient space remains.',
    requirements: ['Align `a->offset` up to an 8-byte boundary', 'Check `aligned + size <= a->cap`', 'Advance `a->offset` and return `a->buf + aligned`'],
    inputExample: 'arena_alloc(&arena, 24)',
    outputExample: 'aligned pointer',
    starterCode: `#include <stddef.h>

typedef struct {
    unsigned char *buf;
    size_t cap;
    size_t offset;
} Arena;

void *arena_alloc(Arena *a, size_t size) {
    // Bump allocate with 8-byte alignment
    return NULL;
}`,
    notes: ['Round up to a multiple of 8 using `(offset + 7) & ~(size_t)7`.', 'Check bounds before advancing `a->offset`.', 'Arena allocators free all allocations at once in O(1) by resetting `offset = 0`.'],
    altNotes: ['Aligned pointers avoid CPU penalties and undefined behavior on strict architectures.'],
    keywords: ['arena allocator', 'alignment', 'size_t', 'bump pointer'],
    hints: ['Compute `size_t aligned = (a->offset + 7) & ~(size_t)7;`.', 'If `aligned + size > a->cap` return `NULL`; else set `a->offset = aligned + size;` and return `a->buf + aligned`.'],
    requiredPatterns: [
      { regex: 'offset', message: 'Read and advance `a->offset`.' },
      { regex: 'cap', message: 'Verify capacity against `a->cap`.' },
    ],
    sampleRunOutput: '[Test 1] 8-byte aligned arena allocation verified (PASS)',
  },
]);

const KOTLIN_EASY = makeTrack('kotlin', 'Easy', [
  {
    level: 1,
    title: 'String Templates & Immutable Vals',
    topic: 'val, Functions & Templates',
    problem: 'Write a Kotlin function `formatProfile(name: String, level: Int): String` that returns `"$name · Level $level"`.',
    requirements: ['Use Kotlin string templates (`$name`, `$level`)', 'Prefer single-expression syntax or explicit `return`', 'Keep parameters immutable'],
    inputExample: 'formatProfile("Nadia", 4)',
    outputExample: '"Nadia · Level 4"',
    starterCode: `fun formatProfile(name: String, level: Int): String {
    // Return "<name> · Level <level>"
    TODO()
}

fun main() {
    println(formatProfile("Nadia", 4))
}`,
    notes: ['Prefix variables with `$` inside double-quoted strings (`"$name"`).', 'Single-expression functions can be written concisely: `fun f(x: Int) = x * 2`.', 'Replace `TODO()` with your implementation; `TODO()` throws `NotImplementedError` at runtime.'],
    altNotes: ['Use `${expr}` whenever embedding a property access or expression inside a string template.', 'Kotlin defaults to `val` (read-only) over `var` (mutable).'],
    keywords: ['fun', 'val', 'string template', 'expression body'],
    hints: ['Replace `TODO()` with `return "$name · Level $level"`.'],
    requiredPatterns: [
      { regex: 'fun\\s+formatProfile', message: 'Keep `fun formatProfile(name: String, level: Int): String`.' },
      { regex: '\\$name|\\$\\{name\\}', message: 'Interpolate `name` with `$name`.' },
      { regex: '\\$level|\\$\\{level\\}', message: 'Interpolate `level` with `$level`.' },
    ],
    sampleRunOutput: 'Nadia · Level 4\n[Test 1] formatProfile("Nadia", 4) -> "Nadia · Level 4" (PASS)',
  },
  {
    level: 2,
    title: 'Null-Safe Greeting',
    topic: 'Nullable Types & Elvis Operator',
    problem: 'Write `safeGreeting(nickname: String?): String` that returns `"Welcome, <nickname>"` if non-null and non-blank, or `"Welcome, Developer"` otherwise.',
    requirements: ['Handle `String?` safely without `!!`', 'Use safe call `?.` and Elvis operator `?:`', 'Treat blank strings as fallback'],
    inputExample: 'safeGreeting(null)\nsafeGreeting("Kai")',
    outputExample: '"Welcome, Developer"\n"Welcome, Kai"',
    starterCode: `fun safeGreeting(nickname: String?): String {
    // Use ?. and ?: to handle null or blank nicknames
    TODO()
}`,
    notes: ['`nickname?.takeIf { it.isNotBlank() } ?: "Developer"` handles both `null` and whitespace-only strings.', 'Avoid the non-null assertion `!!` in idiomatic Kotlin.', 'The Elvis operator `?:` evaluates its right-hand side only when the left side is `null`.'],
    altNotes: ['`isNullOrBlank()` is a standard library extension on `CharSequence?`.'],
    keywords: ['String?', 'Elvis (?:)', 'safe call (?.)', 'takeIf'],
    hints: ['Extract `val display = nickname?.takeIf { it.isNotBlank() } ?: "Developer"`.', 'Return `"Welcome, $display"`.'],
    requiredPatterns: [
      { regex: 'fun\\s+safeGreeting', message: 'Keep `fun safeGreeting(nickname: String?): String`.' },
      { regex: '\\?:|isNullOrBlank', message: 'Use the Elvis operator `?:` or `isNullOrBlank()`.' },
    ],
    sampleRunOutput: 'Welcome, Developer\nWelcome, Kai\n[Test 1] Null-safe greeting checks passed (PASS)',
  },
  {
    level: 3,
    title: 'Grade Classifier with when',
    topic: 'when Expressions & Ranges',
    problem: 'Write `letterGrade(score: Int): String` using a Kotlin `when` expression: `90..100 -> "A"`, `80..89 -> "B"`, `70..79 -> "C"`, `60..69 -> "D"`, else `"F"`.',
    requirements: ['Use `when (score)` as an expression', 'Use closed integer ranges (`in 90..100`)', 'Include an `else` branch'],
    inputExample: 'letterGrade(86)',
    outputExample: '"B"',
    starterCode: `fun letterGrade(score: Int): String = when (score) {
    // Map score ranges to A, B, C, D, or F
    else -> "F"
}`,
    notes: ['`in 90..100` checks inclusive range membership inside `when`.', 'When used as an expression, `when` must be exhaustive (include `else`).', 'No `break` statements are needed in Kotlin `when` branches.'],
    altNotes: ['Expression-body functions (`= when (score) { ... }`) remove boilerplate `return` keywords.'],
    keywords: ['when', 'in range', 'IntRange', 'exhaustive'],
    hints: ['Add branches `in 90..100 -> "A"`, `in 80..89 -> "B"`, `in 70..79 -> "C"`, `in 60..69 -> "D"`.'],
    requiredPatterns: [
      { regex: 'when\\s*\\(', message: 'Use a Kotlin `when` expression.' },
      { regex: '90\\.\\.100', message: 'Use inclusive range `in 90..100`.' },
    ],
    sampleRunOutput: 'B\n[Test 1] letterGrade(86) -> "B" (PASS)',
  },
  {
    level: 4,
    title: 'Filter & Double Even Numbers',
    topic: 'Collection Pipelines',
    problem: 'Write `doubleEvens(nums: List<Int>): List<Int>` that filters for even integers and returns each doubled.',
    requirements: ['Chain `.filter { ... }` and `.map { ... }`', 'Keep the input list unmodified', 'Return a new `List<Int>`'],
    inputExample: 'doubleEvens(listOf(1, 2, 3, 4, 6))',
    outputExample: '[4, 8, 12]',
    starterCode: `fun doubleEvens(nums: List<Int>): List<Int> {
    // Chain filter and map
    TODO()
}`,
    notes: ['`it` is the implicit name of a single lambda parameter in Kotlin.', '`nums.filter { it % 2 == 0 }.map { it * 2 }` reads left-to-right like a pipeline.', 'Kotlin\'s `List<T>` is read-only by default.'],
    altNotes: ['For very large datasets, `.asSequence()` makes the chain lazy.'],
    keywords: ['filter', 'map', 'lambda', 'it', 'List<Int>'],
    hints: ['Return `nums.filter { it % 2 == 0 }.map { it * 2 }`.'],
    requiredPatterns: [
      { regex: 'filter', message: 'Use `.filter { ... }` to select even numbers.' },
      { regex: 'map', message: 'Use `.map { ... }` to double each number.' },
    ],
    sampleRunOutput: '[4, 8, 12]\n[Test 1] doubleEvens([1, 2, 3, 4, 6]) -> [4, 8, 12] (PASS)',
  },
  {
    level: 5,
    title: 'Data Class Summary',
    topic: 'data class & Destructuring',
    problem: 'Given `data class Task(val title: String, val done: Boolean)`, write `pendingTitles(tasks: List<Task>): List<String>` returning titles of tasks where `done` is `false`.',
    requirements: ['Filter where `!it.done`', 'Map to `it.title`', 'Return `List<String>`'],
    inputExample: 'pendingTitles(listOf(Task("Build", true), Task("Test", false)))',
    outputExample: '["Test"]',
    starterCode: `data class Task(val title: String, val done: Boolean)

fun pendingTitles(tasks: List<Task>): List<String> {
    // Return titles of incomplete tasks
    TODO()
}`,
    notes: ['`data class` auto-generates `equals`, `hashCode`, `toString`, and `copy`.', 'Use `.filterNot { it.done }.map { it.title }` for crisp readability.'],
    altNotes: ['`Task::title` can be passed as a member reference: `.map(Task::title)`.'],
    keywords: ['data class', 'filterNot', 'member reference'],
    hints: ['Return `tasks.filter { !it.done }.map { it.title }`.'],
    requiredPatterns: [
      { regex: 'filter', message: 'Filter incomplete tasks.' },
      { regex: 'title', message: 'Extract the `title` property.' },
    ],
    sampleRunOutput: '[Test]\n[Test 1] pendingTitles returned 1 pending task (PASS)',
  },
]);

const KOTLIN_MEDIUM = makeTrack('kotlin', 'Medium', [
  {
    level: 1,
    title: 'Word Frequency with groupingBy',
    topic: 'Grouping & eachCount',
    problem: 'Write `wordCounts(words: List<String>): Map<String, Int>` returning a frequency map of lowercased words.',
    requirements: ['Normalize words to lowercase', 'Use `groupingBy { it }.eachCount()`', 'Return `Map<String, Int>`'],
    inputExample: 'wordCounts(listOf("Kt", "kt", "Jvm"))',
    outputExample: '{kt=2, jvm=1}',
    starterCode: `fun wordCounts(words: List<String>): Map<String, Int> {
    TODO()
}`,
    notes: ['`groupingBy { it.lowercase() }.eachCount()` counts occurrences without creating intermediate lists.', 'More memory-efficient than `groupBy().mapValues { it.value.size }`.'],
    altNotes: ['Returns an immutable `Map<String, Int>` preserving encounter order.'],
    keywords: ['groupingBy', 'eachCount', 'lowercase()', 'Map'],
    hints: ['Return `words.groupingBy { it.lowercase() }.eachCount()`.'],
    requiredPatterns: [
      { regex: 'groupingBy|groupBy', message: 'Group words using `groupingBy` or `groupBy`.' },
      { regex: 'lowercase', message: 'Normalize words with `.lowercase()`.' },
    ],
    sampleRunOutput: '{kt=2, jvm=1}\n[Test 1] wordCounts verified (PASS)',
  },
  {
    level: 2,
    title: 'Sealed Result Mapper',
    topic: 'sealed interface & Exhaustive when',
    problem: 'Given `sealed interface Outcome` (`Ok(val value: Int)` and `Err(val msg: String)`), write `describe(o: Outcome): String` returning `"OK: $value"` or `"ERR: $msg"`.',
    requirements: ['Match both subtypes in an exhaustive `when`', 'Leverage smart casts to access `o.value` and `o.msg`', 'No `else` branch needed'],
    inputExample: 'describe(Outcome.Ok(200))',
    outputExample: '"OK: 200"',
    starterCode: `sealed interface Outcome {
    data class Ok(val value: Int) : Outcome
    data class Err(val msg: String) : Outcome
}

fun describe(o: Outcome): String = when (o) {
    // Handle Outcome.Ok and Outcome.Err
}`,
    notes: ['Sealed hierarchies let the Kotlin compiler verify exhaustive `when` matching.', 'After `is Outcome.Ok`, Kotlin smart-casts `o` so `o.value` is directly accessible.'],
    altNotes: ['Sealed interfaces model domain states cleanly without runtime exceptions.'],
    keywords: ['sealed interface', 'smart cast', 'is', 'exhaustive when'],
    hints: ['Add `is Outcome.Ok -> "OK: ${o.value}"` and `is Outcome.Err -> "ERR: ${o.msg}"`.'],
    requiredPatterns: [
      { regex: 'is\\s+Outcome\\.Ok', message: 'Match `is Outcome.Ok`.' },
      { regex: 'is\\s+Outcome\\.Err', message: 'Match `is Outcome.Err`.' },
    ],
    sampleRunOutput: 'OK: 200\n[Test 1] Sealed Outcome smart-cast verified (PASS)',
  },
  {
    level: 3,
    title: 'Extension Function Slugify',
    topic: 'Extension Functions',
    problem: 'Create an extension function `fun String.toSlug(): String` that trims whitespace, lowercases the string, and replaces spaces with hyphens `-`.',
    requirements: ['Declare `fun String.toSlug(): String`', 'Use `trim()`, `lowercase()`, and `replace`', 'Collapse consecutive spaces into a single hyphen'],
    inputExample: '"  Kotlin   Arena  ".toSlug()',
    outputExample: '"kotlin-arena"',
    starterCode: `fun String.toSlug(): String {
    // Trim, lowercase, and replace whitespace runs with "-"
    TODO()
}`,
    notes: ['Inside an extension function, `this` refers to the receiver string.', '`Regex("\\\\s+")` collapses multiple spaces into one hyphen cleanly.'],
    altNotes: ['Extension functions add ergonomic utilities without subclassing `String`.'],
    keywords: ['extension function', 'receiver', 'Regex', 'trim()'],
    hints: ['Return `trim().lowercase().replace(Regex("\\\\s+"), "-")`.'],
    requiredPatterns: [
      { regex: 'fun\\s+String\\.toSlug', message: 'Define `fun String.toSlug(): String`.' },
      { regex: 'replace', message: 'Replace spaces with hyphens using `.replace(...)`.' },
    ],
    sampleRunOutput: 'kotlin-arena\n[Test 1] "  Kotlin   Arena  ".toSlug() -> "kotlin-arena" (PASS)',
  },
  {
    level: 4,
    title: 'Partition & Sort Priorities',
    topic: 'Destructuring & partition',
    problem: 'Write `prioritize(items: List<Int>, threshold: Int): List<Int>` that places all values `>= threshold` first (descending) followed by remaining values (ascending).',
    requirements: ['Use `val (high, low) = items.partition { it >= threshold }`', 'Sort `high` descending and `low` ascending', 'Concatenate with `+`'],
    inputExample: 'prioritize(listOf(3, 9, 1, 7, 5), 5)',
    outputExample: '[9, 7, 5, 1, 3]',
    starterCode: `fun prioritize(items: List<Int>, threshold: Int): List<Int> {
    TODO()
}`,
    notes: ['`partition` splits a list into a `Pair<List<T>, List<T>>` in a single pass.', 'Destructure pairs directly with `val (high, low) = ...`.'],
    altNotes: ['`sortedDescending()` and `sorted()` return new lists without mutating inputs.'],
    keywords: ['partition', 'destructuring', 'sortedDescending', 'Pair'],
    hints: ['`val (high, low) = items.partition { it >= threshold }`', 'Return `high.sortedDescending() + low.sorted()`.'],
    requiredPatterns: [
      { regex: 'partition', message: 'Split items using `.partition { ... }`.' },
      { regex: 'sorted', message: 'Sort both partitions.' },
    ],
    sampleRunOutput: '[9, 7, 5, 1, 3]\n[Test 1] Partition & sort verified (PASS)',
  },
  {
    level: 5,
    title: 'Memoized Fibonacci',
    topic: 'Recursion & MutableMap Cache',
    problem: 'Implement `fib(n: Int, memo: MutableMap<Int, Long> = mutableMapOf()): Long` using top-down memoization so `fib(45)` runs instantaneously.',
    requirements: ['Handle base cases `n <= 1`', 'Use `memo.getOrPut(n) { ... }`', 'Return `Long` to prevent 32-bit overflow'],
    inputExample: 'fib(10)',
    outputExample: '55',
    starterCode: `fun fib(n: Int, memo: MutableMap<Int, Long> = mutableMapOf()): Long {
    TODO()
}`,
    notes: ['`memo.getOrPut(n) { ... }` fetches cached values or computes and stores them in one call.', 'Default parameter values let callers invoke `fib(10)` without passing a map.'],
    altNotes: ['Memoization reduces exponential O(2^n) recursion to linear O(n).'],
    keywords: ['getOrPut', 'MutableMap', 'default params', 'Long'],
    hints: ['If `n <= 1` return `n.toLong()`.', 'Return `memo.getOrPut(n) { fib(n - 1, memo) + fib(n - 2, memo) }`.'],
    requiredPatterns: [
      { regex: 'getOrPut|memo\\[', message: 'Cache results in `memo`.' },
      { regex: 'fib\\s*\\(', message: 'Compute recursively with memoization.' },
    ],
    sampleRunOutput: '55\n[Test 1] fib(10) -> 55, fib(45) -> 1134903170 (PASS)',
  },
]);

const KOTLIN_HARD = makeTrack('kotlin', 'Hard', [
  {
    level: 1,
    title: 'Generic Result Fold',
    topic: 'Generics & Higher-Order Functions',
    problem: 'Implement an inline function `mapOk` on a generic `ResultBox<T>` that transforms `Ok<T>` values into `Ok<R>` while preserving `Failure`.',
    requirements: ['Use generic type parameters `<T, R>`', 'Accept a transform lambda `(T) -> R`', 'Match subtypes cleanly'],
    inputExample: 'ResultBox.Ok(21).mapOk { it * 2 }',
    outputExample: 'Ok(42)',
    starterCode: `sealed interface ResultBox<out T> {
    data class Ok<T>(val value: T) : ResultBox<T>
    data class Failure(val error: String) : ResultBox<Nothing>
}

fun <T, R> ResultBox<T>.mapOk(transform: (T) -> R): ResultBox<R> = when (this) {
    // Transform Ok or pass through Failure
}`,
    notes: ['Declaration-site covariance `out T` allows `ResultBox<Nothing>` to be a subtype of any `ResultBox<R>`.', 'Higher-order lambdas `(T) -> R` compose functional pipelines cleanly.'],
    altNotes: ['Marking `mapOk` as `inline` avoids lambda object allocation on the JVM.'],
    keywords: ['generics', 'out variance', 'Nothing', 'higher-order'],
    hints: ['`is ResultBox.Ok -> ResultBox.Ok(transform(value))`', '`is ResultBox.Failure -> this`'],
    requiredPatterns: [
      { regex: 'transform\\s*\\(', message: 'Apply `transform(...)` to the `Ok` value.' },
      { regex: 'ResultBox\\.Failure', message: 'Preserve `ResultBox.Failure` unchanged.' },
    ],
    sampleRunOutput: 'Ok(42)\n[Test 1] Generic functor mapOk verified (PASS)',
  },
  {
    level: 2,
    title: 'Lazy Prime Sequence',
    topic: 'sequence { yield() } Builders',
    problem: 'Write `primes(): Sequence<Int>` using Kotlin\'s `sequence { ... }` coroutine builder to lazily yield prime numbers starting from 2.',
    requirements: ['Use `sequence { ... }` and `yield(n)`', 'Check primality up to `sqrt` or `d * d <= n`', 'Generate arbitrarily many primes lazily'],
    inputExample: 'primes().take(5).toList()',
    outputExample: '[2, 3, 5, 7, 11]',
    starterCode: `fun primes(): Sequence<Int> = sequence {
    // Lazily yield prime integers starting at 2
}`,
    notes: ['`sequence { }` suspends at each `yield()` call until the consumer requests the next element.', 'Checking divisors `d` where `d * d <= n` runs in O(sqrt(n)).'],
    altNotes: ['Infinite sequences compose safely with `.take(k)` and `.first { ... }`.'],
    keywords: ['Sequence', 'yield()', 'lazy evaluation', 'primality'],
    hints: ['Start `var n = 2` inside `while (true)` and yield `n` when no divisor `2..sqrt(n)` divides `n`.'],
    requiredPatterns: [
      { regex: 'yield\\s*\\(', message: 'Emit primes using `yield(...)`.' },
      { regex: 'sequence\\s*\\{', message: 'Use Kotlin\'s `sequence { }` builder.' },
    ],
    sampleRunOutput: '[2, 3, 5, 7, 11]\n[Test 1] Lazy sequence yielded first 5 primes (PASS)',
  },
  {
    level: 3,
    title: 'Type-Safe HTML DSL Builder',
    topic: 'Lambdas with Receiver',
    problem: 'Complete `fun ul(init: UlBuilder.() -> Unit): String` so calling `ul { li("One"); li("Two") }` produces `"<ul><li>One</li><li>Two</li></ul>"`.',
    requirements: ['Instantiate `UlBuilder` and call `apply(init)`', 'Collect `<li>` items inside the builder', 'Render wrapped in `<ul>...</ul>`'],
    inputExample: 'ul { li("One"); li("Two") }',
    outputExample: '"<ul><li>One</li><li>Two</li></ul>"',
    starterCode: `class UlBuilder {
    private val items = mutableListOf<String>()
    fun li(text: String) { items.add("<li>$text</li>") }
    fun build(): String = "<ul>\${items.joinToString("")}</ul>"
}

fun ul(init: UlBuilder.() -> Unit): String {
    TODO()
}`,
    notes: ['`UlBuilder.() -> Unit` is a function literal with receiver—`li(...)` resolves on `UlBuilder`.', '`UlBuilder().apply(init).build()` is a single-line idiomatic DSL entry point.'],
    altNotes: ['This same pattern powers Jetpack Compose, Ktor routing, and Gradle Kotlin DSL.'],
    keywords: ['DSL', 'receiver lambda', 'apply()', 'joinToString'],
    hints: ['Return `UlBuilder().apply(init).build()`.'],
    requiredPatterns: [
      { regex: 'UlBuilder\\(\\)', message: 'Create an instance of `UlBuilder()`.' },
      { regex: 'apply|init', message: 'Invoke the receiver lambda `init`.' },
    ],
    sampleRunOutput: '<ul><li>One</li><li>Two</li></ul>\n[Test 1] Type-safe DSL output verified (PASS)',
  },
  {
    level: 4,
    title: 'Rate-Limited Token Bucket',
    topic: 'State Encapsulation & Clamping',
    problem: 'Implement `TokenBucket.tryConsume(nowMs: Long): Boolean` that refills tokens based on elapsed time (capped at `capacity`) and consumes 1 token if available.',
    requirements: ['Calculate elapsed refill tokens since `lastRefillMs`', 'Clamp tokens with `minOf(capacity.toDouble(), ...)`', 'Decrement by 1 and return `true`, or return `false`'],
    inputExample: 'bucket.tryConsume(1000L)',
    outputExample: 'true',
    starterCode: `class TokenBucket(private val capacity: Int, private val tokensPerSec: Double) {
    private var tokens = capacity.toDouble()
    private var lastRefillMs = 0L

    fun tryConsume(nowMs: Long): Boolean {
        TODO()
    }
}`,
    notes: ['Convert elapsed milliseconds to seconds via `(nowMs - lastRefillMs) / 1000.0`.', 'Guard against negative clock skew using `maxOf(0L, nowMs - lastRefillMs)`.'],
    altNotes: ['`minOf` clamps refilled tokens to `capacity`.'],
    keywords: ['token bucket', 'minOf', 'rate limiter', 'stateful'],
    hints: ['Refill `tokens = minOf(capacity.toDouble(), tokens + ((nowMs - lastRefillMs) / 1000.0) * tokensPerSec)` and update `lastRefillMs = nowMs`.', 'If `tokens >= 1.0`, subtract `1.0` and return `true`; else return `false`.'],
    requiredPatterns: [
      { regex: 'tokens', message: 'Update and check `tokens`.' },
      { regex: 'lastRefillMs', message: 'Track `lastRefillMs`.' },
    ],
    sampleRunOutput: 'true\n[Test 1] Token bucket burst and refill verified (PASS)',
  },
  {
    level: 5,
    title: 'Dijkstra Priority Queue',
    topic: 'Shortest Weighted Path',
    problem: 'Write `shortestDistances(n: Int, edges: List<Triple<Int, Int, Int>>, src: Int): IntArray` returning minimum distances from `src` in a non-negative weighted graph.',
    requirements: ['Use `java.util.PriorityQueue` ordered by distance', 'Relax edges when `d + w < dist[v]`', 'Skip stale heap entries where `d > dist[u]`'],
    inputExample: 'shortestDistances(3, listOf(Triple(0,1,4), Triple(0,2,1), Triple(2,1,2)), 0)',
    outputExample: '[0, 3, 1]',
    starterCode: `import java.util.PriorityQueue

fun shortestDistances(n: Int, edges: List<Triple<Int, Int, Int>>, src: Int): IntArray {
    // Run Dijkstra's algorithm with PriorityQueue
    TODO()
}`,
    notes: ['Initialize `IntArray(n) { Int.MAX_VALUE }` and set `dist[src] = 0`.', 'Order the min-heap with `compareBy<Pair<Int, Int>> { it.second }`.'],
    altNotes: ['Skipping stale entries (`if (d > dist[u]) continue`) avoids needing decrease-key on the heap.'],
    keywords: ['Dijkstra', 'PriorityQueue', 'relaxation', 'O(E log V)'],
    hints: ['Build adjacency list from `edges`, push `src to 0` into `PriorityQueue(compareBy { it.second })`.', 'Pop `(u, d)`, relax each `(v, w)`, and return `dist`.'],
    requiredPatterns: [
      { regex: 'PriorityQueue', message: 'Use `PriorityQueue` for min-distance extraction.' },
      { regex: 'IntArray', message: 'Store and return distances in an `IntArray`.' },
    ],
    sampleRunOutput: '[0, 3, 1]\n[Test 1] Dijkstra shortest paths verified (PASS)',
  },
]);

const WEB_EASY = makeTrack('web', 'Easy', [
  {
    level: 1,
    title: 'Array Price Formatter',
    topic: 'ES6 Arrow Functions & Template Literals',
    problem: 'Write a JavaScript function `formatPrices(prices)` that takes an array of numbers and returns an array of formatted USD strings with two decimal places (e.g. `"$9.50"`).',
    requirements: ['Use `.map()` to transform each number', 'Format to 2 decimals with `.toFixed(2)`', 'Prefix with `$` using a template literal'],
    inputExample: 'formatPrices([9.5, 20, 3.125])',
    outputExample: '["$9.50", "$20.00", "$3.13"]',
    starterCode: `function formatPrices(prices) {
  // Return an array of "$0.00" strings
}

console.log(formatPrices([9.5, 20, 3.125]));`,
    notes: ['Template literals use backticks: `` `$${p.toFixed(2)}` ``.', '`Array.prototype.map` returns a brand-new array without mutating the original.', '`.toFixed(2)` rounds and pads trailing zeroes automatically.'],
    altNotes: ['Arrow functions make `.map` callbacks concise: `prices.map((p) => ...)` .'],
    keywords: ['.map()', '.toFixed(2)', 'template literal', 'immutability'],
    hints: ['Use `return prices.map((p) => `$${p.toFixed(2)}`);`.'],
    requiredPatterns: [
      { regex: 'function\\s+formatPrices|formatPrices\\s*=', message: 'Keep `formatPrices` defined.' },
      { regex: 'map\\s*\\(', message: 'Transform elements using `.map()`.' },
      { regex: 'toFixed\\s*\\(\\s*2\\s*\\)', message: 'Format decimals with `.toFixed(2)`.' },
    ],
    sampleRunOutput: '["$9.50", "$20.00", "$3.13"]\n[Test 1] formatPrices([9.5, 20, 3.125]) matched expected output (PASS)',
  },
  {
    level: 2,
    title: 'Active Task Counter',
    topic: 'Objects, Filtering & Destructuring',
    problem: 'Write `countActive(tasks)` that accepts an array of `{ title, completed }` objects and returns the count of tasks where `completed` is `false`.',
    requirements: ['Filter tasks with `!task.completed`', 'Return the numeric count', 'Handle an empty array by returning `0`'],
    inputExample: 'countActive([{ title: "API", completed: true }, { title: "UI", completed: false }])',
    outputExample: '1',
    starterCode: `function countActive(tasks) {
  // Return count of tasks where completed is false
}

console.log(countActive([
  { title: "API", completed: true },
  { title: "UI", completed: false }
]));`,
    notes: ['`tasks.filter(({ completed }) => !completed).length` uses parameter destructuring cleanly.', 'Always use strict equality `=== false` or logical negation `!completed`.'],
    altNotes: ['`.reduce()` can also count in a single pass without allocating a filtered array.'],
    keywords: ['.filter()', 'destructuring', 'boolean', '.length'],
    hints: ['Return `tasks.filter((t) => !t.completed).length`.'],
    requiredPatterns: [
      { regex: 'countActive', message: 'Keep `countActive` defined.' },
      { regex: 'completed', message: 'Inspect each task\'s `completed` property.' },
      { regex: 'return\\s+', message: 'Return the active task count.' },
    ],
    sampleRunOutput: '1\n[Test 1] countActive returned 1 active task (PASS)',
  },
  {
    level: 3,
    title: 'DOM Card Markup Builder',
    topic: 'Semantic HTML & Escaping',
    problem: 'Write `renderCard(title, summary)` that returns a semantic `<article class="card">` HTML string containing an `<h3>` for `title` and a `<p>` for `summary`.',
    requirements: ['Use `<article class="card">` as the root tag', 'Place `title` inside `<h3>...</h3>`', 'Place `summary` inside `<p>...</p>`'],
    inputExample: 'renderCard("Flexbox", "One-dimensional CSS layout")',
    outputExample: '<article class="card"><h3>Flexbox</h3><p>One-dimensional CSS layout</p></article>',
    starterCode: `function renderCard(title, summary) {
  // Return semantic HTML string for a card
}

console.log(renderCard("Flexbox", "One-dimensional CSS layout"));`,
    notes: ['Semantic landmarks like `<article>`, `<section>`, and `<nav>` improve screen-reader accessibility.', 'Template literals preserve clean HTML structure without string concatenation noise.'],
    altNotes: ['In production apps with untrusted user input, escape `<`, `>`, and `&` before injecting HTML.'],
    keywords: ['<article>', 'semantic HTML', 'template string', 'markup'],
    hints: ['Return `` `<article class="card"><h3>${title}</h3><p>${summary}</p></article>` ``.'],
    requiredPatterns: [
      { regex: '<article', message: 'Wrap the card in an `<article>` element.' },
      { regex: '<h3', message: 'Include an `<h3>` heading for the title.' },
      { regex: '<p', message: 'Include a `<p>` element for the summary.' },
    ],
    sampleRunOutput: '<article class="card"><h3>Flexbox</h3><p>One-dimensional CSS layout</p></article>\n[Test 1] Semantic card HTML verified (PASS)',
  },
  {
    level: 4,
    title: 'CSS Responsive Grid Rules',
    topic: 'CSS Grid & auto-fit',
    problem: 'Write a CSS rule for `.card-grid` that creates a responsive multi-column grid with `1rem` gap and columns that auto-fit at a minimum width of `240px`.',
    requirements: ['Set `display: grid;`', 'Use `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`', 'Set `gap: 1rem;`'],
    inputExample: '.card-grid { ... }',
    outputExample: 'Responsive 240px+ CSS Grid layout',
    starterCode: `.card-grid {
  /* Configure responsive auto-fit CSS Grid */
}`,
    notes: ['`repeat(auto-fit, minmax(240px, 1fr))` adapts column counts automatically without media queries.', '`gap` adds spacing strictly between tracks, never on outer edges.'],
    altNotes: ['Use `minmax(min(240px, 100%), 1fr)` to prevent overflow on ultra-narrow viewports.'],
    keywords: ['display: grid', 'auto-fit', 'minmax()', 'gap'],
    hints: ['Add `display: grid;`, `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`, and `gap: 1rem;`.'],
    requiredPatterns: [
      { regex: 'display\\s*:\\s*grid', message: 'Set `display: grid;`.' },
      { regex: 'grid-template-columns', message: 'Define `grid-template-columns`.' },
      { regex: 'minmax\\s*\\(', message: 'Use `minmax(240px, 1fr)` for fluid responsive columns.' },
    ],
    sampleRunOutput: '[CSS Lint] .card-grid responsive auto-fit rule verified (PASS)',
  },
  {
    level: 5,
    title: 'Debounced Search Handler',
    topic: 'Closures & setTimeout',
    problem: 'Implement `debounce(fn, delayMs)` returning a wrapped function that delays invoking `fn` until `delayMs` milliseconds have passed since the last call.',
    requirements: ['Store a `timerId` inside a closure', 'Clear the pending timer with `clearTimeout(timerId)`', 'Schedule `fn(...args)` with `setTimeout`'],
    inputExample: 'const onSearch = debounce(fetchResults, 300);',
    outputExample: 'Executes once 300ms after last call',
    starterCode: `function debounce(fn, delayMs) {
  // Return a debounced wrapper using closures + setTimeout
}`,
    notes: ['Closures allow the returned function to remember `timerId` across invocations.', 'Rest parameters `(...args)` forward all arguments cleanly to `fn(...args)`.'],
    altNotes: ['Debouncing prevents firing an API request on every single keystroke.'],
    keywords: ['closure', 'setTimeout', 'clearTimeout', '...args'],
    hints: ['Declare `let timerId;` inside `debounce`.', 'Return `(...args) => { clearTimeout(timerId); timerId = setTimeout(() => fn(...args), delayMs); };`.'],
    requiredPatterns: [
      { regex: 'clearTimeout', message: 'Cancel prior timers with `clearTimeout`.' },
      { regex: 'setTimeout', message: 'Schedule execution with `setTimeout`.' },
      { regex: 'return\\s+', message: 'Return the debounced wrapper function.' },
    ],
    sampleRunOutput: '[Test 1] Rapid 5 calls coalesced into 1 execution after 300ms (PASS)',
  },
]);

const WEB_MEDIUM = makeTrack('web', 'Medium', [
  {
    level: 1,
    title: 'Group By Category Utility',
    topic: 'Array.reduce & Object Grouping',
    problem: 'Write `groupBy(items, key)` that groups an array of objects into a lookup object keyed by `item[key]`.',
    requirements: ['Use `.reduce()` or a `for..of` loop', 'Initialize missing buckets as empty arrays', 'Return the grouped object'],
    inputExample: 'groupBy([{ lang: "py", n: 1 }, { lang: "py", n: 2 }], "lang")',
    outputExample: '{ py: [{ lang: "py", n: 1 }, { lang: "py", n: 2 }] }',
    starterCode: `function groupBy(items, key) {
  // Group objects by item[key]
}`,
    notes: ['`acc[bucket] ??= []` uses nullish coalescing assignment to create missing arrays cleanly.', 'Always return `acc` at the end of a `.reduce()` callback.'],
    altNotes: ['Modern runtimes also offer `Object.groupBy(items, (x) => x[key])`.'],
    keywords: ['.reduce()', 'nullish assignment (??=)', 'lookup map'],
    hints: ['Loop over `items`, read `const k = item[key];`, push into `(result[k] ??= [])`.'],
    requiredPatterns: [
      { regex: 'groupBy', message: 'Keep `groupBy` defined.' },
      { regex: 'return\\s+', message: 'Return the grouped lookup object.' },
    ],
    sampleRunOutput: '{ py: [ ... ] }\n[Test 1] groupBy grouped items accurately (PASS)',
  },
  {
    level: 2,
    title: 'Async Fetch with Timeout',
    topic: 'Promises & AbortController',
    problem: 'Write `async function fetchWithTimeout(url, ms)` that aborts a `fetch` request if it takes longer than `ms` milliseconds.',
    requirements: ['Create an `AbortController`', 'Pass `{ signal: controller.signal }` to `fetch`', 'Clear the timeout inside `finally`'],
    inputExample: 'await fetchWithTimeout("/api/data", 3000)',
    outputExample: 'Response or AbortError',
    starterCode: `async function fetchWithTimeout(url, ms) {
  // Abort fetch if it exceeds ms
}`,
    notes: ['Always clear timers in a `finally` block so resolved requests do not leak timers.', '`controller.abort()` cancels the in-flight HTTP request cleanly.'],
    altNotes: ['`AbortSignal.timeout(ms)` is also available in newer browsers.'],
    keywords: ['async/await', 'AbortController', 'signal', 'finally'],
    hints: ['Create `const ctrl = new AbortController(); const id = setTimeout(() => ctrl.abort(), ms);`.', 'Wrap `return await fetch(url, { signal: ctrl.signal });` in `try { ... } finally { clearTimeout(id); }`.'],
    requiredPatterns: [
      { regex: 'AbortController|AbortSignal', message: 'Use `AbortController` or `AbortSignal` to cancel timed-out requests.' },
      { regex: 'fetch\\s*\\(', message: 'Call `fetch(url, { signal })`.' },
    ],
    sampleRunOutput: '[Test 1] Request aborted cleanly after timeout window (PASS)',
  },
  {
    level: 3,
    title: 'Event Delegation Click Handler',
    topic: 'DOM Bubbling & closest()',
    problem: 'Write `bindListClicks(listEl, onSelect)` that attaches a single click listener to `listEl` and invokes `onSelect(btn.dataset.id)` whenever a child `<button data-id="...">` is clicked.',
    requirements: ['Attach listener to `listEl` only', 'Locate button with `event.target.closest("button[data-id]")`', 'Guard that the button exists inside `listEl`'],
    inputExample: 'bindListClicks(ul, (id) => console.log(id))',
    outputExample: 'Logs clicked item data-id',
    starterCode: `function bindListClicks(listEl, onSelect) {
  // Use event delegation with event.target.closest
}`,
    notes: ['Event delegation scales to thousands of rows with a single listener.', '`.closest()` handles clicks on nested icons or spans inside the button.'],
    altNotes: ['Read `data-id` attributes through `btn.dataset.id`.'],
    keywords: ['addEventListener', 'closest()', 'dataset', 'event delegation'],
    hints: ['Inside `listEl.addEventListener("click", (e) => { ... })`, find `const btn = e.target.closest("button[data-id]");`.', 'If `btn && listEl.contains(btn)` call `onSelect(btn.dataset.id)`.'],
    requiredPatterns: [
      { regex: 'addEventListener', message: 'Attach a click listener with `addEventListener`.' },
      { regex: 'closest', message: 'Use `.closest(...)` for reliable event delegation.' },
    ],
    sampleRunOutput: '[Test 1] Delegated nested button click resolved data-id (PASS)',
  },
  {
    level: 4,
    title: 'Deep Clone Plain Objects',
    topic: 'Recursion & Immutability',
    problem: 'Write `deepClone(value)` to recursively clone nested plain objects and arrays without sharing references.',
    requirements: ['Return primitives and `null` directly', 'Handle arrays via `.map(deepClone)`', 'Clone object keys recursively'],
    inputExample: 'deepClone({ a: 1, nested: [2, { b: 3 }] })',
    outputExample: 'Independent deep copy',
    starterCode: `function deepClone(value) {
  // Recursively clone arrays and plain objects
}`,
    notes: ['`typeof null === "object"` in JS, so check `value === null || typeof value !== "object"` first.', '`Array.isArray(value)` distinguishes arrays from plain objects.'],
    altNotes: ['Native `structuredClone()` also exists in modern browsers and Node 17+.'],
    keywords: ['Array.isArray', 'recursion', 'Object.entries', 'immutability'],
    hints: ['If `value === null || typeof value !== "object"` return `value`.', 'If `Array.isArray(value)` return `value.map(deepClone)`.', 'Otherwise clone entries with `Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepClone(v)]))`.'],
    requiredPatterns: [
      { regex: 'Array\\.isArray|structuredClone', message: 'Handle arrays and objects cleanly.' },
      { regex: 'return\\s+', message: 'Return the cloned structure.' },
    ],
    sampleRunOutput: '[Test 1] Mutating clone left original object untouched (PASS)',
  },
  {
    level: 5,
    title: 'Promise Concurrency Limiter',
    topic: 'Async Worker Pool',
    problem: 'Write `async function runPool(tasks, limit)` that runs an array of async factory functions `() => Promise<T>` with at most `limit` active simultaneously, preserving output order.',
    requirements: ['Spawn `Math.min(limit, tasks.length)` concurrent workers', 'Pull next index safely from shared counter', 'Store results at their original index'],
    inputExample: 'await runPool(jobs, 3)',
    outputExample: 'Ordered array of resolved results',
    starterCode: `async function runPool(tasks, limit) {
  // Execute async task factories with max concurrency = limit
}`,
    notes: ['JavaScript is single-threaded, so `const i = nextIndex++;` before `await` is atomic.', '`await Promise.all(workers)` waits until every worker finishes.'],
    altNotes: ['Worker pools protect backend APIs from unbounded `Promise.all` bursts.'],
    keywords: ['Promise.all', 'concurrency', 'async worker', 'index order'],
    hints: ['Keep `const results = new Array(tasks.length); let next = 0;`.', 'Define an async `worker()` loop `while (next < tasks.length) { const i = next++; results[i] = await tasks[i](); }`.', 'Run `await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker))` and return `results`.'],
    requiredPatterns: [
      { regex: 'Promise\\.all', message: 'Await all workers with `Promise.all`.' },
      { regex: 'await', message: 'Await each task inside the worker loop.' },
    ],
    sampleRunOutput: '[Test 1] Ran 8 async jobs with peak concurrency <= 3 (PASS)',
  },
]);

const WEB_HARD = makeTrack('web', 'Hard', [
  {
    level: 1,
    title: 'Reactive Store (Pub/Sub)',
    topic: 'Observer Pattern & Subscriptions',
    problem: 'Implement `createStore(initialState)` returning `{ getState, setState, subscribe }` where `subscribe(listener)` returns an unsubscribe function.',
    requirements: ['Keep `state` private inside closure', 'Store listeners in a `Set`', 'Notify all listeners whenever `setState` updates state'],
    inputExample: 'const store = createStore({ count: 0 });',
    outputExample: 'Listeners receive updated state',
    starterCode: `function createStore(initialState) {
  // Return { getState, setState, subscribe }
}`,
    notes: ['A `Set` gives O(1) add and delete when subscribing/unsubscribing listeners.', 'Returning `() => listeners.delete(fn)` prevents memory leaks in UI components.'],
    altNotes: ['This exact primitive underlies Zustand and React `useSyncExternalStore`.'],
    keywords: ['Set', 'pub/sub', 'unsubscribe', 'closure'],
    hints: ['Maintain `let state = initialState; const listeners = new Set();`.', 'In `setState(next)`, update `state` and call `listeners.forEach((fn) => fn(state))`.'],
    requiredPatterns: [
      { regex: 'new\\s+Set', message: 'Track subscribers in a `Set`.' },
      { regex: 'subscribe', message: 'Expose `subscribe` returning an unsubscribe callback.' },
    ],
    sampleRunOutput: '[Test 1] Subscribers notified and unsubscribed cleanly (PASS)',
  },
  {
    level: 2,
    title: 'Mini Virtual DOM Differ',
    topic: 'Tree Diffing & Patch Lists',
    problem: 'Write `diffProps(prevProps, nextProps)` returning an array of `{ type: "SET" | "REMOVE", key, value? }` patch operations.',
    requirements: ['Emit `REMOVE` for keys absent in `nextProps`', 'Emit `SET` for added or changed values', 'Skip unchanged keys'],
    inputExample: 'diffProps({ id: "a", title: "Old" }, { id: "a", title: "New" })',
    outputExample: '[{ type: "SET", key: "title", value: "New" }]',
    starterCode: `function diffProps(prevProps, nextProps) {
  // Compute minimal SET and REMOVE patches
}`,
    notes: ['Iterate `Object.keys(prevProps)` for removals and `Object.keys(nextProps)` for additions/updates.', 'Compare with `Object.is` or `!==` to avoid redundant DOM writes.'],
    altNotes: ['Minimal prop diffs keep DOM mutations fast during frequent state updates.'],
    keywords: ['reconciliation', 'Object.keys', 'patch', 'Virtual DOM'],
    hints: ['Build `const patches = [];`, check removed keys first, then changed/new keys, and return `patches`.'],
    requiredPatterns: [
      { regex: 'SET', message: 'Emit `"SET"` patches for added or updated props.' },
      { regex: 'REMOVE', message: 'Emit `"REMOVE"` patches for deleted props.' },
    ],
    sampleRunOutput: '[{ type: "SET", key: "title", value: "New" }]\n[Test 1] Minimal prop patches verified (PASS)',
  },
  {
    level: 3,
    title: 'LRU Memoizer Decorator',
    topic: 'Map Insertion Order',
    problem: 'Write `memoizeLRU(fn, maxSize)` using a JavaScript `Map` that caches function results and evicts the oldest key when size exceeds `maxSize`.',
    requirements: ['Refresh hit keys by deleting and re-inserting into `Map`', 'Evict `cache.keys().next().value` when full', 'Return cached results for repeated inputs'],
    inputExample: 'const fast = memoizeLRU(expensiveFn, 50);',
    outputExample: 'Bounded O(1) cache hits',
    starterCode: `function memoizeLRU(fn, maxSize = 50) {
  // Use Map insertion order for O(1) LRU eviction
}`,
    notes: ['JavaScript `Map` preserves insertion order, making `cache.keys().next().value` the oldest key.', 'On a cache hit, `cache.delete(key); cache.set(key, val);` promotes it to newest.'],
    altNotes: ['Serialize arguments carefully or cache by primary key for single-arg functions.'],
    keywords: ['Map', 'LRU', 'keys().next()', 'memoization'],
    hints: ['Create `const cache = new Map();`.', 'On hit, delete and re-set to mark recent; on miss, compute, insert, and evict if `cache.size > maxSize`.'],
    requiredPatterns: [
      { regex: 'new\\s+Map', message: 'Use a `Map` to track LRU order.' },
      { regex: 'delete', message: 'Use `cache.delete(...)` for promotion/eviction.' },
    ],
    sampleRunOutput: '[Test 1] Cache hit rate and oldest-key eviction verified (PASS)',
  },
  {
    level: 4,
    title: 'Custom Event Emitter',
    topic: 'Event-Driven Architecture',
    problem: 'Implement a class `Emitter` with `on(event, fn)`, `off(event, fn)`, and `emit(event, ...args)` methods.',
    requirements: ['Support multiple listeners per event name', 'Safely ignore `emit` for events with no listeners', 'Allow removing specific listeners via `off`'],
    inputExample: 'emitter.on("save", handler); emitter.emit("save", data);',
    outputExample: 'Invokes registered handler with data',
    starterCode: `class Emitter {
  constructor() {
    this.events = new Map();
  }
  on(event, fn) {}
  off(event, fn) {}
  emit(event, ...args) {}
}`,
    notes: ['Store `Map<string, Set<Function>>` so duplicate registrations are ignored automatically.', 'In `emit`, iterate over a snapshot `[...set]` in case a listener calls `off` mid-emit.'],
    altNotes: ['Optional `once(event, fn)` can wrap `fn` and call `this.off` immediately.'],
    keywords: ['class', 'Map', 'Set', 'event emitter'],
    hints: ['In `on`, create a `Set` if missing and `.add(fn)`.', 'In `off`, call `this.events.get(event)?.delete(fn)`.', 'In `emit`, call `this.events.get(event)?.forEach((fn) => fn(...args))`.'],
    requiredPatterns: [
      { regex: 'on\\s*\\(', message: 'Implement `on(event, fn)`.' },
      { regex: 'off\\s*\\(', message: 'Implement `off(event, fn)`.' },
      { regex: 'emit\\s*\\(', message: 'Implement `emit(event, ...args)`.' },
    ],
    sampleRunOutput: '[Test 1] on / emit / off lifecycle verified (PASS)',
  },
  {
    level: 5,
    title: 'Retry with Exponential Backoff',
    topic: 'Resilient Network Requests',
    problem: 'Write `async function retryBackoff(fn, retries = 3, baseMs = 100)` that retries a failing async function waiting `baseMs * 2^attempt` between attempts.',
    requirements: ['Catch errors and retry up to `retries` times', 'Wait exponentially longer each retry', 'Rethrow the final error if all attempts fail'],
    inputExample: 'await retryBackoff(() => fetch("/api/evaluate/"), 3, 100)',
    outputExample: 'Resolves on transient recovery',
    starterCode: `async function retryBackoff(fn, retries = 3, baseMs = 100) {
  // Retry fn with exponential backoff delay
}`,
    notes: ['Wait helper: `await new Promise((r) => setTimeout(r, delay))`.', 'Compute delay `baseMs * (2 ** attempt)` for attempt `0, 1, 2...`.'],
    altNotes: ['Adding random jitter prevents thundering-herd retries against backend services.'],
    keywords: ['exponential backoff', 'try/catch', 'Promise', 'resilience'],
    hints: ['Loop `for (let attempt = 0; attempt <= retries; attempt++)` around `try { return await fn(); } catch (err) { ... }`.', 'If `attempt === retries` throw `err`; else await `baseMs * 2 ** attempt`.'],
    requiredPatterns: [
      { regex: 'try\\s*\\{', message: 'Wrap `await fn()` in a `try / catch` block.' },
      { regex: 'setTimeout', message: 'Delay retries using `setTimeout`.' },
    ],
    sampleRunOutput: '[Test 1] Recovered on retry #2 with exponential backoff (PASS)',
  },
]);

export const ALL_CHALLENGES: LevelChallenge[] = [
  ...PYTHON_EASY,
  ...PYTHON_MEDIUM,
  ...PYTHON_HARD,
  ...C_EASY,
  ...C_MEDIUM,
  ...C_HARD,
  ...KOTLIN_EASY,
  ...KOTLIN_MEDIUM,
  ...KOTLIN_HARD,
  ...WEB_EASY,
  ...WEB_MEDIUM,
  ...WEB_HARD,
];

export function getChallengesForTrack(language: LanguageId, difficulty: Difficulty): LevelChallenge[] {
  return ALL_CHALLENGES.filter(
    (c) => c.language === language && c.difficulty === difficulty
  ).sort((a, b) => a.level - b.level);
}

export function getChallengeById(id: string): LevelChallenge | undefined {
  return ALL_CHALLENGES.find((c) => c.id === id);
}
