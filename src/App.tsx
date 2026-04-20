import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import VoiceAI from './components/VoiceAI';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';
import Splash from './components/Splash';

type JoinUsVariant = 'all' | 'driver' | 'vendor';

function getJoinUsVariant(pathname: string): JoinUsVariant | null {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  if (normalizedPath === '/join-us') {
    return 'all';
  }

  if (normalizedPath === '/join-us/driver') {
    return 'driver';
  }

  if (normalizedPath === '/join-us/vendor') {
    return 'vendor';
  }

  return null;
}

export default function App() {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const joinUsVariant = getJoinUsVariant(pathname);

  if (joinUsVariant) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] text-slate-900 font-sans" dir="rtl">
        <Splash />
        <Navbar />
        <main>
          <JoinUs standalone focusForm={joinUsVariant === 'all' ? null : joinUsVariant} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 font-sans" dir="rtl">
      <Splash />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <VoiceAI />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}
