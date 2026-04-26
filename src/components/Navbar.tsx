import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from '../lib/motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

function sectionHref(sectionId: string) {
  if (typeof window === 'undefined') {
    return `#${sectionId}`;
  }

  return window.location.pathname.startsWith('/join-us') ? `/#${sectionId}` : `#${sectionId}`;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;

  const featuresHref = sectionHref('features');
  const voiceAiHref = sectionHref('voice-ai');
  const joinUsHref = pathname.startsWith('/join-us') ? '#join-us' : sectionHref('join-us');

  return (
    <nav className="fixed z-50 w-full border-b border-white/70 bg-white/[0.72] shadow-[0_14px_50px_-42px_rgba(15,23,42,0.9)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-bold dark:text-white">هَوا</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href={featuresHref}
              className="font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            >
              المميزات
            </a>
            <a
              href={voiceAiHref}
              className="font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            >
              المساعد الصوتي
            </a>
            <a
              href={joinUsHref}
              className="font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            >
              انضم إلينا
            </a>
            <ThemeToggle />
            <m.a
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 24 }}
              href="/package-756655/Hawa.apk"
              download="Hawa.apk"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-bold text-slate-900 shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
            >
              <Download size={20} />
              حمّل التطبيق
            </m.a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="text-slate-900 dark:text-white"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.18 : 0.28, ease: 'easeOut' }}
            className="overflow-hidden border-b border-white/70 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95 md:hidden"
          >
            <div className="space-y-4 px-4 pt-2 pb-6">
              <a
                href={featuresHref}
                className="block font-semibold text-slate-600 dark:text-slate-300"
                onClick={() => setIsOpen(false)}
              >
                المميزات
              </a>
              <a
                href={voiceAiHref}
                className="block font-semibold text-slate-600 dark:text-slate-300"
                onClick={() => setIsOpen(false)}
              >
                المساعد الصوتي
              </a>
              <a
                href={joinUsHref}
                className="block font-semibold text-slate-600 dark:text-slate-300"
                onClick={() => setIsOpen(false)}
              >
                انضم إلينا
              </a>
              <a
                href="/package-756655/Hawa.apk"
                download="Hawa.apk"
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-center font-bold text-slate-900"
              >
                <Download size={20} />
                حمّل التطبيق الآن
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
