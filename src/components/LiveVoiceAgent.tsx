import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function LiveVoiceAgent() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const playbackQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);
  const nextPlayTimeRef = useRef(0);

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Initialize Audio Context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      // Get Microphone Access
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      sourceRef.current = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
      
      // Create ScriptProcessor for capturing audio (deprecated but widely supported for raw PCM)
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "charon" } },
          },
          systemInstruction: "أنت مساعد ذكي لتطبيق توصيل طلبات اسمه 'هَوا'. تحدث باللغة العربية بلهجة مصرية ودودة. ساعد المستخدم في المطلوب فيما يخص التطبيق.",
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            processorRef.current!.onaudioprocess = (e: AudioProcessingEvent) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Convert Float32 to Int16
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcm16[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
              }
              // Convert to Base64
              const buffer = new Uint8Array(pcm16.buffer);
              let binary = '';
              for (let i = 0; i < buffer.byteLength; i++) {
                binary += String.fromCharCode(buffer[i]);
              }
              const base64Data = btoa(binary);
              
              sessionPromise.then((session) =>
                session.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                })
              );
            };
            
            sourceRef.current!.connect(processorRef.current!);
            processorRef.current!.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              playAudioChunk(base64Audio);
            }
            if (message.serverContent?.interrupted) {
              playbackQueueRef.current = [];
              nextPlayTimeRef.current = audioContextRef.current?.currentTime || 0;
            }
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("حدث خطأ في الاتصال.");
            disconnect();
          },
          onclose: () => {
            disconnect();
          }
        }
      });
      
      sessionRef.current = sessionPromise;
      
    } catch (err) {
      console.error(err);
      setError("تعذر الوصول إلى الميكروفون أو الاتصال بالخادم.");
      setIsConnecting(false);
      disconnect();
    }
  };

  const playAudioChunk = (base64Audio: string) => {
    if (!audioContextRef.current) return;
    
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Decode PCM16 to Float32
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
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

  const disconnect = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    }
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => session.close());
    }
    setIsConnected(false);
    setIsConnecting(false);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl ${
          isConnected 
            ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20' 
            : 'bg-primary text-slate-900 hover:bg-primary-hover shadow-primary/20'
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-slate-900"></span>
          </span>
        )}
      </motion.button>
      
      {isConnected && (
        <p className="text-primary text-sm animate-pulse">المساعد يستمع إليك...</p>
      )}
    </div>
  );
}
