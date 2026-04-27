import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AudioWaveform, ChefHat, HeartPulse, Mic, Navigation, Sparkles } from 'lucide-react';
import { m, useReducedMotion } from '../lib/motion';

const LiveVoiceAgent = lazy(() => import('./LiveVoiceAgent'));

const voiceFeatures = [
  {
    icon: <Navigation size={24} />,
    title: 'تنقل وتحكم كامل',
    desc: 'قول "افتح السلة" أو "فين طلبي؟" والمساعد هيقوم بالباقي.',
  },
  {
    icon: <ChefHat size={24} />,
    title: 'مكتبة وصفات طبخ',
    desc: 'اسأل عن أي وصفة، والمساعد هيقولك المكونات ويضيفها لسلتك فوراً.',
  },
  {
    icon: <HeartPulse size={24} />,
    title: 'نصائح صحية',
    desc: 'استشر المساعد عن السعرات الحرارية أو البدائل الصحية لأي منتج.',
  },
];

function VoiceAgentFallback() {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="h-14 w-64 animate-pulse rounded-full bg-slate-700/70" />
      <p className="text-center text-sm text-slate-400">يتم تجهيز تجربة المساعد الصوتي الآن...</p>
    </div>
  );
}

export default function VoiceAI() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadAgent, setShouldLoadAgent] = useState(false);

  useEffect(() => {
    const sectionNode = sectionRef.current;

    if (!sectionNode || shouldLoadAgent) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadAgent(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px' },
    );

    observer.observe(sectionNode);

    return () => observer.disconnect();
  }, [shouldLoadAgent]);

  return (
    <section
      ref={sectionRef}
      id="voice-ai"
      className="section-shell relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(179,255,56,0.18),transparent_28rem),linear-gradient(135deg,#020617_0%,#0f172a_48%,#020617_100%)] py-24 text-white transition-colors duration-500"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="premium-grid absolute inset-0 opacity-25" />
        <div className="absolute bottom-[-14rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <m.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.55, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[100px]" />
            <div className="relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.065] p-8 shadow-2xl shadow-black/25 backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(179,255,56,0.16),transparent_18rem)]" />
              <div className="pulse-ring absolute h-56 w-56 rounded-full border border-primary/30" />
              <div className="pulse-ring absolute h-72 w-72 rounded-full border border-primary/20 [animation-delay:0.55s]" />
              <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-primary/25 bg-slate-950/70 shadow-[0_0_80px_rgba(179,255,56,0.22)]">
                <AudioWaveform size={38} className="text-primary" />
            
              </div>
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-white">جرّب المساعد الصوتي بنفسك</h3>
                <p className="text-slate-400">
                  اضغط على الزر وابدأ الكلام، المساعد هيسمعك ويرد عليك في نفس اللحظة.
                </p>
              </div>

              <div className="relative z-10">
                {shouldLoadAgent ? (
                  <Suspense fallback={<VoiceAgentFallback />}>
                    <LiveVoiceAgent />
                  </Suspense>
                ) : (
                  <VoiceAgentFallback />
                )}
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -36, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.55, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary shadow-lg shadow-primary/5">
              <Sparkles size={16} />
              <span>حصرياً في هَوا</span>
            </div>
            <h2 className="mb-6 text-4xl font-black leading-tight lg:text-5xl">
              تكلم، وهَوا <span className="text-primary">ينفذ</span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-slate-300">
              أول تطبيق توصيل بمساعد صوتي ذكي يفهم لغتك الطبيعية. اطلب، تتبع، وادفع بصوتك بس. جرّب المحادثة الحية الآن.
            </p>

            <div className="space-y-6">
              {voiceFeatures.map((item, index) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0.25 : 0.4, delay: 0.12 + index * 0.06, ease: 'easeOut' }}
                  whileHover={shouldReduceMotion ? undefined : { x: -6 }}
                  className="group flex gap-4 rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur transition-colors hover:border-primary/25 hover:bg-white/[0.075]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-primary transition-colors group-hover:bg-primary group-hover:text-slate-950">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
