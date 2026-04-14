import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import VoiceAI from './components/VoiceAI';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 font-sans" dir="rtl">
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
