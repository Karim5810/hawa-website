import { Download, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Logo />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">هَوا</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              أسهل وأسرع تطبيق توصيل في مصر. اطلب أي حاجة، من أي مكان، وهنجيبهالك لحد باب البيت.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-slate-900 dark:hover:bg-primary dark:hover:text-slate-900 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-slate-900 dark:hover:bg-primary dark:hover:text-slate-900 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-slate-900 dark:hover:bg-primary dark:hover:text-slate-900 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">المميزات</a></li>
              <li><a href="#voice-ai" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">المساعد الصوتي</a></li>
              <li><a href="#join-us" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">انضم كمندوب</a></li>
              <li><a href="#join-us" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">سجل متجرك</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">المساعدة</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">الشروط والأحكام</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">حمل التطبيق</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6">متوفر الآن للتحميل المباشر</p>
            <a 
              href="package-756655/Hawa.apk"
              download="Hawa.apk"
              className="bg-slate-900 dark:bg-primary text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-primary-hover transition-colors flex items-center justify-center gap-3 w-full"
            >
              <Download size={20} className="text-primary dark:text-slate-900" />
              تحميل التطبيق
            </a>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} تطبيق هَوا. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
