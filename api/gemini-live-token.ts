import { GoogleGenAI, Modality } from '@google/genai';

const LIVE_MODEL = 'gemini-3.1-flash-live-preview';
const SYSTEM_INSTRUCTION =
  "أنت مساعد ذكي لتطبيق توصيل طلبات اسمه 'هَوا'. تحدث باللغة العربية بلهجة مصرية ودودة. ساعد المستخدم فيما يخص التطبيق.";
const TOKEN_REQUEST_TIMEOUT_MS = 30_000;
const TOKEN_REQUEST_ATTEMPTS = 3;

function isNetworkTimeoutError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const cause = error.cause;
  const causeCode =
    typeof cause === 'object' && cause !== null && 'code' in cause ? String((cause as { code?: unknown }).code) : '';

  return error.message.includes('fetch failed') || causeCode === 'UND_ERR_CONNECT_TIMEOUT';
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'Gemini API key is not configured' });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        apiVersion: 'v1alpha',
        retryOptions: { attempts: TOKEN_REQUEST_ATTEMPTS },
        timeout: TOKEN_REQUEST_TIMEOUT_MS,
      },
    });

    const now = Date.now();
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        newSessionExpireTime: new Date(now + 2 * 60 * 1000).toISOString(),
        expireTime: new Date(now + 30 * 60 * 1000).toISOString(),
        liveConnectConstraints: {
          model: LIVE_MODEL,
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'charon' } },
            },
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        },
        lockAdditionalFields: [],
        httpOptions: {
          retryOptions: { attempts: TOKEN_REQUEST_ATTEMPTS },
          timeout: TOKEN_REQUEST_TIMEOUT_MS,
        },
      },
    });

    res.status(200).json({ token: token.name, model: LIVE_MODEL });
  } catch (error) {
    console.error('Failed to create Gemini Live token', error);
    res.status(502).json({
      error: isNetworkTimeoutError(error)
        ? 'Gemini token service timed out. Check your network/VPN/firewall and retry.'
        : 'Failed to create Gemini Live token',
    });
  }
}
