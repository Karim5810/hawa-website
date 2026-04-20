import { useEffect, useState, startTransition } from 'react';

interface LogoConfig {
  src: string;
  alt?: string;
}

interface BackgroundImageConfig {
  src?: string;
  alt?: string;
}

interface LogoPreloaderProps {
  logo?: LogoConfig;
  backgroundColor?: string;
  duration?: number;
  logoSize?: number;
  videoFile?: string;
  backgroundImage?: BackgroundImageConfig;
  logoInEasing?: string;
  logoOutEasing?: string;
  backgroundFadeEasing?: string;
  style?: React.CSSProperties;
}

/**
 * LogoPreloader
 * Pre-loader with centered logo, animates logo up and out, then fades background
 */
export default function LogoPreloader({
  logo = {
    src: 'hawa-logo.png',
    alt: 'Logo',
  },
  backgroundColor = '#FFFFFF',
  duration = 2,
  logoSize = 80,
  videoFile = '',
  backgroundImage = { src: '', alt: '' },
  logoInEasing = 'cubic-bezier(.7,.2,.2,1)',
  logoOutEasing = 'cubic-bezier(.7,.2,.2,1)',
  backgroundFadeEasing = 'cubic-bezier(.7,.2,.2,1)',
  style,
}: LogoPreloaderProps) {
  const [phase, setPhase] = useState<'init' | 'loading' | 'logoOut' | 'done'>('init');

  useEffect(() => {
    // Animate logo in from bottom
    const t0 = setTimeout(() => {
      startTransition(() => setPhase('loading'));
    }, 50);

    const t1 = setTimeout(() => {
      startTransition(() => setPhase('logoOut'));
    }, duration * 1000 + 50);

    const t2 = setTimeout(() => {
      startTransition(() => setPhase('done'));
    }, duration * 1000 + 750);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration]);

  if (phase === 'done') return null;

  // Animation states
  let logoTranslateY = 0;
  let logoOpacity = 1;

  if (phase === 'init') {
    logoTranslateY = 80;
    logoOpacity = 0;
  } else if (phase === 'loading') {
    logoTranslateY = 0;
    logoOpacity = 1;
  } else if (phase === 'logoOut') {
    logoTranslateY = -80;
    logoOpacity = 0;
  }

  const bgOpacity = phase === 'logoOut' ? 0 : 1;
  const transition = 'all 0.7s cubic-bezier(.7,.2,.2,1)';

  return (
    <div
      style={{
        ...style,
        position: 'relative',
        width: '100%',
        height: '100%',
        background: videoFile || backgroundImage.src ? undefined : backgroundColor,
        backgroundImage: !videoFile && backgroundImage.src ? `url(${backgroundImage.src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `opacity 0.7s cubic-bezier(.7,.2,.2,1)`,
        opacity: bgOpacity,
        pointerEvents: 'all',
        zIndex: 9999,
        overflow: 'hidden',
      }}
      aria-label="Loading"
      role="status"
    >
      {videoFile && (
        <video
          src={videoFile}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: bgOpacity,
            transition: `opacity 0.7s cubic-bezier(.7,.2,.2,1)`,
          }}
          aria-hidden="true"
        />
      )}
      <img
        src={logo.src}
        alt={logo.alt || 'Logo'}
        style={{
          width: logoSize,
          height: logoSize,
          objectFit: 'contain',
          transition,
          transform: `translateY(${logoTranslateY}px)`,
          opacity: logoOpacity,
          willChange: 'transform, opacity',
          userSelect: 'none',
          zIndex: 1,
        }}
        draggable={false}
      />
    </div>
  );
}
