import { useEffect, useRef, useState } from 'react';
import { Loader2, Mic, MicOff } from 'lucide-react';
import { m, useReducedMotion } from '../lib/motion';

let googleGenAiModulePromise: Promise<typeof import('@google/genai')> | null = null;

const LIVE_MODEL = 'gemini-2.0-flash-exp';
const SYSTEM_INSTRUCTION =
  "أنت مساعد ذكي لتطبيق توصيل طلبات اسمه 'هَوا'. تحدث باللغة العربية بلهجة مصرية ودودة. ساعد المستخدم فيما يخص التطبيق.";

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

  const sessionRef = useRef<any | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextPlayTimeRef = useRef(0);
  const isDisconnectingRef = useRef(false);
  const isSessionReadyRef = useRef(false);

  const disconnect = (closeSession = true) => {
    if (isDisconnectingRef.current) {
      return;
    }

    isDisconnectingRef.current = true;
    isSessionReadyRef.current = false;

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

    if (closeSession && sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch {
        // The SDK can throw when the socket has already closed.
      }
    }

    sessionRef.current = null;
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

  const startMicrophoneStreaming = () => {
    if (!processorRef.current || !sourceRef.current || !audioContextRef.current || !sessionRef.current) {
      return;
    }

    if (processorRef.current.onaudioprocess) {
      return;
    }

    processorRef.current.onaudioprocess = (event: AudioProcessingEvent) => {
      if (!isSessionReadyRef.current || !sessionRef.current) {
        return;
      }

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

      try {
        sessionRef.current.sendRealtimeInput({
          audio: { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' },
        });
      } catch (sendError) {
        console.error('Failed to send Gemini Live audio chunk', sendError);
        setError('انقطع الاتصال بالمساعد الصوتي.');
        disconnect(false);
      }
    };

    sourceRef.current.connect(processorRef.current);
    processorRef.current.connect(audioContextRef.current.destination);
  };

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const { GoogleGenAI, Modality } = await loadGoogleGenAi();
      const tokenResponse = await fetch('/api/gemini-live-token', { method: 'POST' });

      if (!tokenResponse.ok) {
        throw new Error('Gemini Live token endpoint failed');
      }

      const tokenPayload = (await tokenResponse.json()) as { token?: string; model?: string };

      if (!tokenPayload.token) {
        throw new Error('Gemini Live token endpoint returned no token');
      }

      audioContextRef.current = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)!({
        sampleRate: 16000,
      });

      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      sourceRef.current = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

      const ai = new GoogleGenAI({
        apiKey: tokenPayload.token,
        httpOptions: { apiVersion: 'v1alpha' },
      });

      const session = await ai.live.connect({
        model: tokenPayload.model ?? LIVE_MODEL,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'charon' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onmessage: (message: any) => {
            if (message.setupComplete) {
              isSessionReadyRef.current = true;
              setIsConnected(true);
              setIsConnecting(false);
              startMicrophoneStreaming();
              return;
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (base64Audio) {
              playAudioChunk(base64Audio);
            }

            if (message.serverContent?.interrupted) {
              nextPlayTimeRef.current = audioContextRef.current?.currentTime ?? 0;
            }
          },
          onerror: (event) => {
            console.error('Gemini Live socket error', event);
            setError('حدث خطأ في الاتصال.');
            disconnect(false);
          },
          onclose: (event) => {
            if (!isDisconnectingRef.current) {
              console.warn('Gemini Live socket closed', {
                code: event.code,
                reason: event.reason,
                wasClean: event.wasClean,
              });
              setError(event.reason || '');
              disconnect(false);
            }
          },
        },
      });

      sessionRef.current = session;

      if (isSessionReadyRef.current) {
        startMicrophoneStreaming();
      }
    } catch (connectError) {
      console.error('Failed to connect Gemini Live assistant', connectError);
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
        onClick={isConnected ? () => disconnect() : connect}
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
