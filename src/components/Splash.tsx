import { useEffect, useState } from 'react';
import LogoPreloader from './LogoPreloader';

const SPLASH_STORAGE_KEY = 'hawa:splash-seen';

export default function Splash() {
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState(1.8);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem(SPLASH_STORAGE_KEY) === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenSplash) {
      return;
    }

    setDuration(prefersReducedMotion ? 0.8 : 1.8);
    setIsVisible(true);

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
      setIsVisible(false);
    }, prefersReducedMotion ? 1000 : 2100);

    return () => window.clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0B0F14]" style={{ zIndex: 999999 }}>
      <LogoPreloader
        logo={{
          src: '/app-logo-hawa.png',
          alt: 'Hawa Logo',
        }}
        backgroundColor="#FFFFFF"
        duration={duration}
        logoSize={150}
      />
    </div>
  );
}
