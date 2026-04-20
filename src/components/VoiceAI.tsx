import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ChefHat, HeartPulse, Mic, Navigation } from 'lucide-react';
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
      className="section-shell overflow-hidden bg-slate-900 py-20 text-white transition-colors duration-500"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <m.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.55, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[100px]" />
            <div className="relative flex min-h-[400px] flex-col items-center justify-center rounded-[3rem] border border-slate-700 bg-slate-800 p-8 shadow-2xl">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-white">جرّب المساعد الصوتي بنفسك</h3>
                <p className="text-slate-400">
                  اضغط على الزر وابدأ الكلام، المساعد هيسمعك ويرد عليك في نفس اللحظة.
                </p>
              </div>

              {shouldLoadAgent ? (
                <Suspense fallback={<VoiceAgentFallback />}>
                  <LiveVoiceAgent />
                </Suspense>
              ) : (
                <VoiceAgentFallback />
              )}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -36, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.55, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Mic size={16} />
              <span>حصرياً في هَوا</span>
            </div>
            <h2 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
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
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-primary">
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
