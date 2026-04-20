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
    description: 'كل مقاضي البيت والأدوية بتوصلك لحد باب البيت في أسرع وقت.',
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
    <section id="features" className="section-shell bg-white py-20 transition-colors duration-500 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.55, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold dark:text-white">
            كل اللي تحتاجه في <span className="text-primary">تطبيق واحد</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            هَوا مش مجرد تطبيق توصيل أكل، هَوا بيوفرلك كل خدمات التوصيل اللي ممكن تتخيلها في مكان واحد.
          </p>
        </m.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <m.div
              key={feature.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: shouldReduceMotion ? 0.28 : 0.45, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              className="group rounded-3xl border border-slate-100 bg-slate-50 p-8 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/30 dark:hover:shadow-primary/5"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm transition-all group-hover:bg-primary group-hover:text-slate-900 dark:bg-slate-800 dark:text-white">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold dark:text-white">{feature.title}</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">{feature.description}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
