import {
  ChevronDown,
  ClipboardList,
  Download,
  Home,
  MapPin,
  Mic,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Timer,
  Truck,
  User,
  UtensilsCrossed,
  Zap,
} from 'lucide-react';
import { m, useReducedMotion } from '../lib/motion';

const marqueeItems = [
  'سوبر ماركت',
  'صيدلية',
  'مطاعم',
  'اكتب طلبك بنفسك',
  'توصيل سريع',
  'مساعد صوتي',
  'عروض يومية',
  'اطلب من أي مكان',
];

const featureBullets = [
  'اطلب من الماركت أو المطاعم أو الصيدلية من شاشة واحدة',
  'استخدم الميكروفون وقل طلبك باللهجة المصرية',
  'حمّل التطبيق وابدأ الطلب المباشر فوراً',
];

const heroStats = [
  { label: 'متوسط التوصيل', value: '25 دقيقة' },
  { label: 'خدمات في تطبيق واحد', value: '+6' },
  { label: 'تجربة صوتية مباشرة', value: 'AI' },
];

function getReveal(shouldReduceMotion: boolean, delay = 0) {
  return {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.32 : 0.58, delay, ease: 'easeOut' as const },
  };
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const hoverLift = shouldReduceMotion ? undefined : { y: -4, scale: 1.01 };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#fbfff4_0%,_#f8fafc_42%,_#eef2f7_100%)] pt-32 pb-0 transition-colors duration-500 dark:bg-[linear-gradient(180deg,#020617_0%,#0b1120_54%,#020617_100%)] lg:pt-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-field absolute inset-[-10%] opacity-80 dark:opacity-60" />
        <div className="premium-grid absolute inset-0 opacity-70" />
        <div className="absolute right-[-8rem] top-[-7rem] h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute left-[-9rem] bottom-20 h-96 w-96 rounded-full bg-cyan-200/35 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-slate-950 dark:via-slate-950/70" />
      </div>

      <div className="relative mx-auto mb-20 grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:mb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        <m.div {...getReveal(shouldReduceMotion)} className="text-center lg:text-right">
          <m.span
            {...getReveal(shouldReduceMotion, 0.08)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-white/85 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg shadow-primary/10 backdrop-blur-xl dark:border-primary/20 dark:bg-white/10 dark:text-slate-100"
          >
            <Sparkles size={16} className="text-lime-500" />
            أول تطبيق يخلّي الطلب أسهل وأسرع
          </m.span>

          <m.h1
            {...getReveal(shouldReduceMotion, 0.14)}
            className="mx-auto max-w-2xl text-5xl font-black leading-[1.05] text-slate-950 drop-shadow-sm dark:text-white sm:text-6xl lg:mx-0 lg:text-7xl"
          >
            اطلب كل اللي تحتاجه
            <br />
            <span className="bg-gradient-to-l from-primary via-lime-400 to-cyan-400 bg-clip-text text-transparent">
              يجيلك هَوا 
            </span>
          </m.h1>

          <m.p
            {...getReveal(shouldReduceMotion, 0.2)}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:mx-0 lg:text-xl"
          >
            منصة طلبات محلية للمطاعم والماركت والصيدليات، مع تجربة سريعة ومساعد صوتي يخلّي كتابة الطلب أو قوله أسهل من أي وقت.
          </m.p>

          <m.div
            {...getReveal(shouldReduceMotion, 0.26)}
            className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <m.a
              whileHover={hoverLift}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              href="package-756655/Hawa.apk"
              download="Hawa.apk"
              className="relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-950 px-8 py-4 text-lg font-extrabold text-white shadow-2xl shadow-slate-900/20 transition-colors hover:bg-slate-800 dark:bg-primary dark:text-slate-900 dark:hover:bg-primary-hover"
            >
              <span className="light-sweep absolute inset-y-0 w-16 bg-white/30 blur-sm" />
              <Download size={22} className="text-primary dark:text-slate-900" />
              حمّل التطبيق الآن
            </m.a>

            <m.a
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              href="#features"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white/85 px-8 py-4 text-lg font-bold text-slate-800 shadow-sm backdrop-blur transition-colors hover:border-primary dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:hover:border-primary"
            >
              اكتشف المزايا
            </m.a>
          </m.div>

          <m.div
            {...getReveal(shouldReduceMotion, 0.3)}
            className="mt-8 grid grid-cols-3 gap-3 rounded-[2rem] border border-white/75 bg-white/65 p-3 shadow-xl shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white/80 px-3 py-4 text-center shadow-sm dark:bg-slate-950/45">
                <div className="text-lg font-black text-slate-950 dark:text-white sm:text-2xl">{stat.value}</div>
                <div className="mt-1 text-[11px] font-bold leading-5 text-slate-500 dark:text-slate-400 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </m.div>

          <m.ul {...getReveal(shouldReduceMotion, 0.32)} className="mt-8 grid gap-3 text-right">
            {featureBullets.map((item) => (
              <li
                key={item}
                className="flex items-start justify-end gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300 sm:text-base"
              >
                <span>{item}</span>
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              </li>
            ))}
          </m.ul>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97, y: shouldReduceMotion ? 0 : 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.34 : 0.7, delay: 0.14, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[380px]"
        >
          <div className="absolute inset-x-8 top-10 h-28 rounded-full bg-primary/30 blur-3xl" />
          <m.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 36, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.62, delay: 0.55, ease: 'easeOut' }}
            className={`absolute -right-5 top-16 z-30 hidden items-center gap-3 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:flex ${
              shouldReduceMotion ? '' : 'float-slow gpu-layer'
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-slate-950">
              <Timer size={22} />
            </span>
            <span className="text-right">
              <span className="block text-sm font-black text-slate-950 dark:text-white">25 دقيقة</span>
              <span className="block text-xs font-bold text-slate-500 dark:text-slate-400">توصيل متوقع</span>
            </span>
          </m.div>
          <m.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -36, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.62, delay: 0.68, ease: 'easeOut' }}
            className={`absolute -left-7 bottom-28 z-30 hidden items-center gap-3 rounded-3xl border border-white/70 bg-slate-950/90 px-4 py-3 text-white shadow-2xl shadow-slate-900/20 backdrop-blur-xl sm:flex ${
              shouldReduceMotion ? '' : 'float-slow float-delay gpu-layer'
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-primary">
              <Star size={22} />
            </span>
            <span className="text-right">
              <span className="block text-sm font-black">4.9/5</span>
              <span className="block text-xs font-bold text-slate-300">تجربة أسرع</span>
            </span>
          </m.div>
          <div
            className={`phone-glow relative aspect-[0.5] overflow-hidden rounded-[3.2rem] border-[12px] border-slate-950 bg-slate-950 ring-4 ring-slate-900/60 dark:ring-slate-700/40 ${
              shouldReduceMotion ? '' : 'float-gentle gpu-layer'
            }`}
          >
            <div className="absolute inset-x-0 top-0 z-20 mx-auto h-6 w-32 rounded-b-3xl bg-slate-950" />
            <div className="absolute left-[-14px] top-24 h-12 w-1 rounded-l-md bg-slate-800" />
            <div className="absolute left-[-14px] top-40 h-12 w-1 rounded-l-md bg-slate-800" />
            <div className="absolute right-[-14px] top-32 h-16 w-1 rounded-r-md bg-slate-800" />

            <div className="flex h-full flex-col gap-4 overflow-hidden rounded-[2.35rem] bg-[#f3f4f8] p-4 pt-6 dark:bg-slate-950">
              <div className="mt-1 flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  <User size={18} />
                </div>

                <div className="flex-1 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                  <div className="flex items-center justify-center gap-2">
                    <ChevronDown size={14} className="text-slate-400" />
                    <span className="truncate">Qalyub, Abu Ayad Street</span>
                    <MapPin size={14} className="text-primary" />
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  <ShoppingCart size={18} />
                </div>
              </div>

              <div className="text-right text-sm font-semibold text-slate-400 dark:text-slate-500">مساء الخير</div>

              <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <Search size={16} className="text-slate-400 dark:text-slate-300" />
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">بتدور على إيه؟</span>
              </div>

              <div className="cinematic-shine relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#1d2135_0%,#1f2430_40%,#0c0f14_100%)] p-4 text-white shadow-xl sm:p-5">
                <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-slate-600/30 blur-lg" />
                <div className="absolute -top-12 right-8 h-32 w-32 rounded-full bg-primary/20 blur-xl" />
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <span className="inline-flex rounded-full bg-primary/20 px-3 py-1 text-[11px] font-extrabold text-primary">
                      من أي مكان
                    </span>
                    <h3 className="mt-3 text-[1.35rem] font-extrabold leading-tight sm:text-[1.7rem]">
                      اكتب كل اللي
                      <br />
                      تحتاجه
                    </h3>
                    <button className="mt-4 rounded-full bg-primary px-5 py-2.5 text-xs font-extrabold text-slate-950 sm:px-6 sm:text-sm">
                      ابدأ طلبك
                    </button>
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/5 sm:h-24 sm:w-24">
                    <ShoppingBag size={38} className="text-white/90 sm:size-11" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Truck size={18} />, label: 'سريع' },
                  { icon: <ShieldCheck size={18} />, label: 'آمن' },
                  { icon: <Zap size={18} />, label: 'ذكي' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1 rounded-2xl bg-white px-2 py-3 text-[11px] font-extrabold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200"
                  >
                    <span className="text-primary">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-[1.9rem] bg-white p-4 text-center shadow-sm dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <Store size={28} />
                  </div>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">الماركت</span>
                </div>

                <div className="flex flex-col items-center gap-2 rounded-[1.9rem] bg-white p-4 text-center shadow-sm dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <UtensilsCrossed size={28} />
                  </div>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">المطاعم</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400">
                <span>عرض الكل</span>
                <span className="text-slate-900 dark:text-white">أفضل المطاعم</span>
              </div>

              <div className="mt-auto flex items-center justify-between rounded-[1.8rem] bg-white px-4 py-3 shadow-md dark:bg-slate-900">
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-400">
                  <User size={18} />
                  حسابي
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-400">
                  <ShoppingCart size={18} />
                  السلة
                </div>
                <div className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-slate-950 shadow-[0_16px_35px_-12px_rgba(191,255,54,0.8)]">
                  <Mic size={22} />
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-400">
                  <ClipboardList size={18} />
                  طلباتي
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-800 dark:text-white">
                  <Home size={18} />
                  الرئيسية
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>

      <div className="relative border-y border-slate-200/70 bg-white/70 py-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />

        {shouldReduceMotion ? (
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 px-4">
            {marqueeItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-extrabold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="marquee-track gpu-layer flex w-max items-center gap-4 whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-extrabold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
