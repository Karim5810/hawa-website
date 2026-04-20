import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { m, useReducedMotion } from '../lib/motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
      return;
    }

    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setIsDark(true);
  };

  return (
    <m.button
      whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      onClick={toggleTheme}
      className="rounded-full bg-slate-100 p-2 text-slate-900 transition-colors dark:bg-slate-800 dark:text-white"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </m.button>
  );
}
