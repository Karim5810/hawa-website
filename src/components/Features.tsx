import { HeadphonesIcon, Map, PenTool, ShoppingCart, Utensils, Wallet } from 'lucide-react';
import { m, useReducedMotion } from '../lib/motion';

const features = [
  {
    icon: <PenTool size={32} />,
    title: 'اكتب طلبك بنفسك',
    description: 'مش لاقي اللي بتدور عليه؟ اكتب طلبك بالتفصيل وهنجيبهولك من أي مكان.',
  },
  {
    icon: <ShoppingCart size={32} />,
    title: 'سوبر ماركت وصيدلية',
    description: 'كل طلبات البيت والأدوية بتوصلك لحد باب البيت في أسرع وقت.',
  },
  {
    icon: <Utensils size={32} />,
    title: 'أفضل المطاعم',
    description: 'اطلب من مطاعمك المفضلة واستمتع بأكلك الساخن.',
  },
  {
    icon: <Map size={32} />,
    title: 'تتبع مباشر',
    description: 'تابع طلبك خطوة بخطوة على الخريطة لحد ما يوصلك.',
  },
  {
    icon: <Wallet size={32} />,
    title: 'محفظة هَوا',
    description: 'ادفع بسهولة وأمان واشحن محفظتك لاستخدام أسرع.',
  },
  {
    icon: <HeadphonesIcon size={32} />,
    title: 'دعم فني 24/7',
    description: 'فريق دعم متواجد دائماً لمساعدتك في أي وقت.',
  },
];

export default function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="section-shell relative overflow-hidden bg-white py-24 transition-colors duration-500 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="premium-grid absolute inset-0 opacity-45" />
        <div className="absolute left-[-10rem] top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.55, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="mx-auto mb-4 max-w-3xl text-4xl font-black leading-tight dark:text-white lg:text-5xl">
            كل اللي تحتاجه في <span className="text-primary">تطبيق واحد</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            هَوا مش مجرد تطبيق توصيل أكل، هَوا بيوفرلك كل خدمات التوصيل اللي ممكن تتخيلها في مكان واحد.
          </p>
        </m.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <m.div
              key={feature.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: shouldReduceMotion ? 0.28 : 0.45, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.015 }}
              className="cinematic-shine group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_18px_60px_-38px_rgba(15,23,42,0.75)] backdrop-blur-xl transition-colors hover:border-primary/45 dark:border-white/10 dark:bg-white/[0.055]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-primary shadow-lg shadow-slate-900/10 transition-all group-hover:bg-primary group-hover:text-slate-950 dark:bg-slate-900 dark:text-primary">
                <span className="relative z-10">{feature.icon}</span>
              </div>
              <h3 className="relative mb-3 text-xl font-black text-slate-950 dark:text-white">{feature.title}</h3>
              <p className="relative leading-relaxed text-slate-600 dark:text-slate-400">{feature.description}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
