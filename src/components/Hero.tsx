import { motion } from 'motion/react';
import {
  ChevronDown,
  ClipboardList,
  Download,
  Home,
  MapPin,
  Mic,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  User,
  UtensilsCrossed,
} from 'lucide-react';

const marqueeItems = [
  'سوبر ماركت',
  'صيدلية',
  'مطاعم',
  'اكتب طلبك بنفسك',
  'توصيل سريع',
  'مساعد صوتي',
  'عروض يومية',
  'طلب من أي مكان',
];

const featureBullets = [
  'اطلب من الماركت أو المطاعم أو الصيدلية من شاشة واحدة',
  'استخدم الميكروفون وقل طلبك باللهجة المصرية',
  'حمّل التطبيق وابدأ الطلب المباشر فوراً',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(191,255,54,0.18),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#f5f7fb_55%,_#eef2f7_100%)] pt-32 pb-0 transition-colors duration-500 dark:bg-[radial-gradient(circle_at_top_right,rgba(191,255,54,0.14),transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_60%,#020617_100%)] lg:pt-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-8rem] top-[-7rem] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute left-[-10rem] top-40 h-80 w-80 rounded-full bg-slate-300/30 blur-3xl dark:bg-slate-700/20" />
      </div>

      <div className="relative mx-auto mb-20 grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:gap-10 lg:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center lg:text-right"
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-slate-200"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            أول تطبيق يخلّي الطلب أسهل وأسرع في منطقتك
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.05] text-slate-950 dark:text-white sm:text-6xl lg:mx-0 lg:text-7xl"
          >
            اطلب أي حاجة
            <br />
            <span className="bg-gradient-to-l from-primary via-lime-400 to-lime-600 bg-clip-text text-transparent">
              وهَوا يجيبهالك
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:mx-0 lg:text-xl"
          >
            منصة طلبات محلية للمطاعم والماركت والصيدليات، مع تجربة سريعة ومساعد صوتي
            يخلّي كتابة الطلب أو قوله أسهل من أي وقت.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6 }}
            className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <motion.a
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href="package-756655/Hawa.apk"
              download="Hawa.apk"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-8 py-4 text-lg font-extrabold text-white shadow-2xl shadow-slate-900/15 transition-colors hover:bg-slate-800 dark:bg-primary dark:text-slate-900 dark:hover:bg-primary-hover"
            >
              <Download size={22} className="text-primary dark:text-slate-900" />
              حمّل التطبيق الآن
            </motion.a>

            <motion.a
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white/85 px-8 py-4 text-lg font-bold text-slate-800 shadow-sm backdrop-blur transition-colors hover:border-primary dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:hover:border-primary"
            >
              اكتشف المزايا
            </motion.a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            className="mt-8 grid gap-3 text-right"
          >
            {featureBullets.map((item) => (
              <li
                key={item}
                className="flex items-start justify-end gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300 sm:text-base"
              >
                <span>{item}</span>
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[360px]"
        >
          <div className="absolute inset-x-8 top-10 h-24 rounded-full bg-primary/25 blur-3xl" />
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative aspect-[0.5] overflow-hidden rounded-[3.2rem] border-[12px] border-slate-950 bg-slate-950 shadow-[0_35px_90px_-30px_rgba(15,23,42,0.6)] ring-4 ring-slate-900/60 dark:ring-slate-700/40"
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
                    <span className="truncate">...ber Abou Ayad Street, QL</span>
                    <MapPin size={14} className="text-primary" />
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  <ShoppingCart size={18} />
                </div>
              </div>

              <div className="text-right text-sm font-semibold text-slate-400 dark:text-slate-500">
                مساء الخير
              </div>

              <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <Search size={16} className="text-slate-400 dark:text-slate-300" />
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  بتدور على إيه؟
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#1d2135_0%,#1f2430_40%,#0c0f14_100%)] p-5 text-white shadow-xl">
                <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-slate-600/30 blur-lg" />
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <span className="inline-flex rounded-full bg-primary/20 px-3 py-1 text-[11px] font-extrabold text-primary">
                      من أي مكان
                    </span>
                    <h3 className="mt-3 text-[1.7rem] font-extrabold leading-tight">
                      اكتب كل اللي
                      <br />
                      تحتاجه
                    </h3>
                    <button className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-extrabold text-slate-950">
                      ابدأ طلبك
                    </button>
                  </div>

                  <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/5">
                    <ShoppingBag size={44} className="text-white/90" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-[1.9rem] bg-white p-4 text-center shadow-sm dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <Store size={28} />
                  </div>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">الماركت</span>
                </div>

                <div className="flex flex-col items-center gap-2 rounded-[1.9rem] bg-white p-4 text-center shadow-sm dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <UtensilsCrossed size={28} />
                  </div>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">المطاعم</span>
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
          </motion.div>
        </motion.div>
      </div>

      <div className="relative border-y border-slate-200/70 bg-white/70 py-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />

        <motion.div
          className="flex w-max items-center gap-4 whitespace-nowrap"
          animate={{ x: [0, -900] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-extrabold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
