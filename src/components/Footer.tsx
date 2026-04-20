import { Download, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

function sectionHref(sectionId: string) {
  if (typeof window === 'undefined') {
    return `#${sectionId}`;
  }

  return window.location.pathname.startsWith('/join-us')
    ? `/#${sectionId}`
    : `#${sectionId}`;
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8 transition-colors duration-500 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="mb-6 flex items-center gap-3">
              <Logo />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">هَوا</span>
            </a>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              أطلب كل اللى تحتاجة من مطاعم، سوبر ماركت، صيدليات، و أكتر . هَوا هو تطبيق توصيل شامل بيجمع كل احتياجاتك في مكان واحد.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-primary hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-primary dark:hover:text-slate-900"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-primary hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-primary dark:hover:text-slate-900"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-primary hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-primary dark:hover:text-slate-900"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">روابط سريعة</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={sectionHref('features')}
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  المميزات
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('voice-ai')}
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  المساعد الصوتي
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('join-us-driver')}
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  انضم كمندوب
                </a>
              </li>
              <li>
                <a
                  href={sectionHref('join-us-vendor')}
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  سجل متجرك
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">المساعدة</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  الشروط والأحكام
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">حمل التطبيق</h4>
            <p className="mb-6 text-slate-600 dark:text-slate-400">متوفر الآن للتحميل المباشر</p>
            <a
              href="/package-756655/Hawa.apk"
              download="Hawa.apk"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white transition-colors hover:bg-slate-800 dark:bg-primary dark:text-slate-900 dark:hover:bg-primary-hover"
            >
              <Download size={20} className="text-primary dark:text-slate-900" />
              تحميل التطبيق
            </a>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 text-center text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>© {new Date().getFullYear()} تطبيق هَوا. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
