import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const MODEL_NAME = 'gemini-4-hydrogen';

function createGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Unexpected Gemini API error';
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // 1. POST /api/evaluate/ — Evaluate user code, simulate output, award +50 XP if correct
  app.post('/api/evaluate/', async (req: Request, res: Response) => {
    const {
      language = '',
      difficulty = '',
      level = 1,
      problem = '',
      requirements = [],
      inputExample = '',
      outputExample = '',
      code = '',
    } = req.body ?? {};

    if (!code || typeof code !== 'string' || !code.trim()) {
      res.status(400).json({ error: 'Please provide code to evaluate.' });
      return;
    }

    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    try {
      const reqList = Array.isArray(requirements)
        ? requirements.map((r: unknown) => `- ${String(r)}`).join('\n')
        : '';

      const prompt = [
        `Language: ${language}`,
        `Difficulty: ${difficulty} (Level ${level})`,
        `Problem: ${problem}`,
        reqList ? `Requirements:\n${reqList}` : '',
        inputExample ? `Example Input:\n${inputExample}` : '',
        outputExample ? `Expected Output:\n${outputExample}` : '',
        `User Code:\n\`\`\`\n${code}\n\`\`\``,
      ]
        .filter(Boolean)
        .join('\n\n');

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            'You are a friendly, accurate coding instructor and code evaluator for a gamified learning platform. ' +
            'Evaluate the user code strictly against the problem statement, language syntax, and requirements. ' +
            'Simulate running the user code on the example input (and obvious edge cases) and report the realistic simulated stdout or error message in `output`. ' +
            'Set `passed` to true ONLY if the code is valid syntax in the requested language and solves the problem accurately (do not pass placeholder `pass` or `TODO()` stubs). ' +
            'If `passed` is true, write an encouraging 1-2 sentence `feedback` note highlighting what they did well. ' +
            'If `passed` is false, write a clear, beginner-friendly `feedback` explanation of what went wrong and how to fix it (2-3 concise sentences max).',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              passed: {
                type: Type.BOOLEAN,
                description: 'Whether the submitted code correctly solves the problem.',
              },
              output: {
                type: Type.STRING,
                description: 'Simulated stdout output, test case trace, or syntax/runtime error.',
              },
              feedback: {
                type: Type.STRING,
                description: 'Concise praise if passed, or a clear beginner-friendly fix if failed.',
              },
            },
            required: ['passed', 'output', 'feedback'],
          },
        },
      });

      const raw = (response.text ?? '{}').trim();
      const parsed = JSON.parse(raw) as {
        passed?: boolean;
        output?: string;
        feedback?: string;
      };

      const passed = Boolean(parsed.passed);
      res.json({
        passed,
        output: typeof parsed.output === 'string' ? parsed.output : '',
        feedback: typeof parsed.feedback === 'string' ? parsed.feedback : '',
        xp_awarded: passed ? 50 : 0,
      });
    } catch (err) {
      console.error('Gemini /api/evaluate/ error:', err);
      res.status(502).json({ error: getErrorMessage(err) });
    }
  });

  // 2. POST /api/quick-notes/ — Generate concise syntax tips & concept keywords
  app.post('/api/quick-notes/', async (req: Request, res: Response) => {
    const {
      language = 'Python',
      difficulty = 'Easy',
      level = 1,
      topic = 'Core Fundamentals',
      problem = '',
    } = req.body ?? {};

    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    try {
      const prompt = [
        `Generate fresh, concise study notes for:`,
        `Language: ${language}`,
        `Difficulty: ${difficulty}`,
        `Level: ${level}`,
        `Topic: ${topic}`,
        problem ? `Problem context: ${problem}` : '',
        'Provide 3 crisp, practical syntax tips (wrap code snippets in backticks) and 5 short concept keywords.',
      ]
        .filter(Boolean)
        .join('\n');

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            'You are a concise coding reference author. Return exactly 3 short, practical syntax/idiom tips tailored to the language, difficulty, and topic, plus 4-6 concise concept keywords. Do not reveal the full solution to the problem.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              notes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 concise syntax tips or best practices with inline backtick code.',
              },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4 to 6 short concept keywords or syntax tokens.',
              },
            },
            required: ['notes', 'keywords'],
          },
        },
      });

      const raw = (response.text ?? '{}').trim();
      const parsed = JSON.parse(raw) as {
        notes?: string[];
        keywords?: string[];
      };

      res.json({
        notes: Array.isArray(parsed.notes) ? parsed.notes.slice(0, 4) : [],
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords.slice(0, 6) : [],
      });
    } catch (err) {
      console.error('Gemini /api/quick-notes/ error:', err);
      res.status(502).json({ error: getErrorMessage(err) });
    }
  });

  // 3. POST /api/hint/ — Give a short 2-sentence hint without revealing the full solution
  app.post('/api/hint/', async (req: Request, res: Response) => {
    const { language = 'Python', problem = '', code = '' } = req.body ?? {};

    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    try {
      const prompt = [
        `Language: ${language}`,
        `Problem: ${problem}`,
        `Student's Current Code:\n\`\`\`\n${code}\n\`\`\``,
        'Write a helpful 2-sentence hint pointing out the next step or bug without giving away the full solution code.',
      ].join('\n\n');

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            'You are a patient coding mentor. Respond with a short, encouraging hint of AT MOST 2 sentences. Guide the learner toward the next step based on their current code, and NEVER provide the complete solution.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hint: {
                type: Type.STRING,
                description: 'A short 2-sentence hint without revealing the full solution.',
              },
            },
            required: ['hint'],
          },
        },
      });

      const raw = (response.text ?? '{}').trim();
      const parsed = JSON.parse(raw) as { hint?: string };
      res.json({
        hint: typeof parsed.hint === 'string' ? parsed.hint : '',
      });
    } catch (err) {
      console.error('Gemini /api/hint/ error:', err);
      res.status(502).json({ error: getErrorMessage(err) });
    }
  });

  // Mount Vite middleware in development or serve built static files in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CodeForge server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
