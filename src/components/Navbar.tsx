import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-bold dark:text-white">هَوا</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">المميزات</a>
            <a href="#voice-ai" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">المساعد الصوتي</a>
            <a href="#join-us" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">انضم إلينا</a>
            <ThemeToggle />
            <motion.a 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              href="package-756655/Hawa.apk"
              download="Hawa.apk"
              className="bg-primary text-slate-900 px-6 py-2.5 rounded-full font-bold hover:bg-primary-hover transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Download size={20} />
              حمل التطبيق
            </motion.a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4"
        >
          <a href="#features" className="block text-slate-600 dark:text-slate-300 font-semibold" onClick={() => setIsOpen(false)}>المميزات</a>
          <a href="#voice-ai" className="block text-slate-600 dark:text-slate-300 font-semibold" onClick={() => setIsOpen(false)}>المساعد الصوتي</a>
          <a href="#join-us" className="block text-slate-600 dark:text-slate-300 font-semibold" onClick={() => setIsOpen(false)}>انضم إلينا</a>
          <a 
            href="package-756655/Hawa.apk"
            download="Hawa.apk"
            className="bg-primary text-slate-900 px-6 py-3 rounded-full font-bold text-center flex items-center justify-center gap-2"
          >
            <Download size={20} />
            حمل التطبيق الآن
          </a>
        </motion.div>
      )}
    </nav>
  );
}
