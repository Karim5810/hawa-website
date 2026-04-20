import { useEffect, useRef, useState } from 'react';
import { Loader2, Mic, MicOff } from 'lucide-react';
import { m, useReducedMotion } from '../lib/motion';

let googleGenAiModulePromise: Promise<typeof import('@google/genai')> | null = null;

function loadGoogleGenAi() {
  if (!googleGenAiModulePromise) {
    googleGenAiModulePromise = import('@google/genai');
  }

  return googleGenAiModulePromise;
}

export default function LiveVoiceAgent() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const sessionRef = useRef<Promise<any> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextPlayTimeRef = useRef(0);
  const isDisconnectingRef = useRef(false);

  const disconnect = () => {
    if (isDisconnectingRef.current) {
      return;
    }

    isDisconnectingRef.current = true;

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
      processorRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (sessionRef.current) {
      void sessionRef.current
        .then((session) => session.close())
        .catch(() => undefined);
      sessionRef.current = null;
    }

    nextPlayTimeRef.current = 0;
    setIsConnected(false);
    setIsConnecting(false);

    window.setTimeout(() => {
      isDisconnectingRef.current = false;
    }, 0);
  };

  const playAudioChunk = (base64Audio: string) => {
    if (!audioContextRef.current) {
      return;
    }

    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);

    for (let index = 0; index < binaryString.length; index += 1) {
      bytes[index] = binaryString.charCodeAt(index);
    }

    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);

    for (let index = 0; index < int16Array.length; index += 1) {
      float32Array[index] = int16Array[index] / 32768;
    }

    const audioBuffer = audioContextRef.current.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);

    const currentTime = audioContextRef.current.currentTime;
    if (nextPlayTimeRef.current < currentTime) {
      nextPlayTimeRef.current = currentTime;
    }

    source.start(nextPlayTimeRef.current);
    nextPlayTimeRef.current += audioBuffer.duration;
  };

  const connect = async () => {
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      setError('مفتاح Gemini غير متوفر حالياً.');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      const { GoogleGenAI, Modality } = await loadGoogleGenAi();

      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)!({
        sampleRate: 16000,
      });

      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      sourceRef.current = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

      const ai = new GoogleGenAI({ apiKey: geminiApiKey });

      const sessionPromise = ai.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'charon' } },
          },
          systemInstruction:
            "أنت مساعد ذكي لتطبيق توصيل طلبات اسمه 'هَوا'. تحدث باللغة العربية بلهجة مصرية ودودة. ساعد المستخدم فيما يخص التطبيق.",
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);

            if (!processorRef.current || !sourceRef.current || !audioContextRef.current) {
              return;
            }

            processorRef.current.onaudioprocess = (event: AudioProcessingEvent) => {
              const inputData = event.inputBuffer.getChannelData(0);
              const pcm16 = new Int16Array(inputData.length);

              for (let index = 0; index < inputData.length; index += 1) {
                pcm16[index] = Math.max(-32768, Math.min(32767, inputData[index] * 32768));
              }

              const buffer = new Uint8Array(pcm16.buffer);
              let binary = '';

              for (let index = 0; index < buffer.byteLength; index += 1) {
                binary += String.fromCharCode(buffer[index]);
              }

              const base64Data = btoa(binary);

              void sessionPromise.then((session) =>
                session.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' },
                }),
              );
            };

            sourceRef.current.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current.destination);
          },
          onmessage: (message: any) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (base64Audio) {
              playAudioChunk(base64Audio);
            }

            if (message.serverContent?.interrupted) {
              nextPlayTimeRef.current = audioContextRef.current?.currentTime ?? 0;
            }
          },
          onerror: () => {
            setError('حدث خطأ في الاتصال.');
            disconnect();
          },
          onclose: () => {
            if (!isDisconnectingRef.current) {
              disconnect();
            }
          },
        },
      });

      sessionRef.current = sessionPromise;
    } catch {
      setError('تعذر الوصول إلى الميكروفون أو الاتصال بالخادم.');
      setIsConnecting(false);
      disconnect();
    }
  };

  useEffect(() => () => disconnect(), []);

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <m.button
        whileHover={shouldReduceMotion || isConnecting ? undefined : { scale: 1.03 }}
        whileTap={shouldReduceMotion || isConnecting ? undefined : { scale: 0.97 }}
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className={`relative flex items-center justify-center gap-3 rounded-full px-8 py-4 text-lg font-bold shadow-xl transition-all ${
          isConnected
            ? 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600'
            : 'bg-primary text-slate-900 shadow-primary/20 hover:bg-primary-hover'
        }`}
      >
        {isConnecting ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            جاري الاتصال...
          </>
        ) : isConnected ? (
          <>
            <MicOff size={24} />
            إنهاء المحادثة
          </>
        ) : (
          <>
            <Mic size={24} />
            تحدث مع المساعد الآن
          </>
        )}

        {isConnected && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-slate-900 bg-red-500" />
          </span>
        )}
      </m.button>

      {isConnected && <p className="animate-pulse text-sm text-primary">المساعد يستمع إليك...</p>}
    </div>
  );
}
