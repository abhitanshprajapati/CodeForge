import {
  EvaluateRequest,
  EvaluateResponse,
  HintRequest,
  HintResponse,
  LevelChallenge,
  QuickNotesRequest,
  QuickNotesResponse,
} from '../types/coding';
import { evaluateLocally, getLocalHint, getLocalQuickNotes } from './localEvaluator';

async function postApi<TReq, TRes>(path: string, payload: TReq): Promise<TRes> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try {
        const errBody = await res.json();
        if (errBody?.error || errBody?.detail) {
          detail = errBody.error || errBody.detail;
        }
      } catch {
        // Non-JSON error body
      }
      throw new Error(detail);
    }

    return (await res.json()) as TRes;
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function evaluateCode(
  challenge: LevelChallenge,
  languageApiName: string,
  code: string
): Promise<EvaluateResponse> {
  const payload: EvaluateRequest = {
    language: languageApiName,
    difficulty: challenge.difficulty,
    level: challenge.level,
    problem: challenge.problem,
    requirements: challenge.requirements,
    inputExample: challenge.inputExample,
    outputExample: challenge.outputExample,
    code,
  };

  try {
    const data = await postApi<EvaluateRequest, EvaluateResponse>(
      '/api/evaluate/',
      payload
    );
    const passed = Boolean(data.passed);
    return {
      passed,
      output: typeof data.output === 'string' ? data.output : '',
      feedback: typeof data.feedback === 'string' ? data.feedback : '',
      xp_awarded: passed ? (typeof data.xp_awarded === 'number' ? data.xp_awarded : 50) : 0,
      source: 'gemini',
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable';
    const fallback = evaluateLocally(challenge, code);
    return {
      ...fallback,
      fallbackNotice: `Live AI evaluation unavailable (${message}). Evaluated with local fallback.`,
    };
  }
}

export async function fetchQuickNotes(
  challenge: LevelChallenge,
  languageApiName: string,
  localPackIndex: number
): Promise<QuickNotesResponse> {
  const payload: QuickNotesRequest = {
    language: languageApiName,
    difficulty: challenge.difficulty,
    level: challenge.level,
    topic: challenge.topic,
    problem: challenge.problem,
  };

  try {
    const data = await postApi<QuickNotesRequest, QuickNotesResponse>(
      '/api/quick-notes/',
      payload
    );
    const notes = Array.isArray(data.notes) ? data.notes.filter(Boolean) : [];
    const keywords = Array.isArray(data.keywords) ? data.keywords.filter(Boolean) : [];
    if (notes.length === 0) {
      throw new Error('Empty notes returned');
    }
    return {
      notes,
      keywords,
      source: 'gemini',
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable';
    const fallback = getLocalQuickNotes(challenge, localPackIndex);
    return {
      ...fallback,
      fallbackNotice: `Live AI notes unavailable (${message}). Loaded local notes.`,
    };
  }
}

export async function fetchHint(
  challenge: LevelChallenge,
  languageApiName: string,
  code: string,
  localHintIndex: number
): Promise<HintResponse> {
  const payload: HintRequest = {
    language: languageApiName,
    problem: challenge.problem,
    code,
  };

  try {
    const data = await postApi<HintRequest, HintResponse>('/api/hint/', payload);
    const hint = typeof data.hint === 'string' ? data.hint.trim() : '';
    if (!hint) {
      throw new Error('Empty hint returned');
    }
    return {
      hint,
      source: 'gemini',
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable';
    const fallback = getLocalHint(challenge, code, localHintIndex);
    return {
      ...fallback,
      fallbackNotice: `Live AI hint unavailable (${message}). Showing local hint.`,
    };
  }
}
