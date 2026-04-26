import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Bike, CheckCircle2, Loader2, Store } from 'lucide-react';
import { m, useReducedMotion } from '../lib/motion';
import { supabase } from '../lib/supabase';

type ApplicationKind = 'driver' | 'vendor';

type DriverFormState = {
  fullName: string;
  phone: string;
  vehicleType: string;
};

type VendorFormState = {
  businessName: string;
  phone: string;
  businessType: string;
};

type SubmissionState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string | null;
};

type JoinUsProps = {
  standalone?: boolean;
  focusForm?: ApplicationKind | null;
};

const JOIN_US_SECTION_ID = 'join-us';
const DRIVER_SECTION_ID = 'join-us-driver';
const VENDOR_SECTION_ID = 'join-us-vendor';

const initialDriverForm: DriverFormState = {
  fullName: '',
  phone: '',
  vehicleType: '',
};

const initialVendorForm: VendorFormState = {
  businessName: '',
  phone: '',
  businessType: '',
};

const initialSubmissionState: SubmissionState = {
  status: 'idle',
  message: null,
};

const vehicleOptions = [
  { value: 'motorcycle', label: 'موتوسيكل' },
  { value: 'bicycle', label: 'عجلة' },
  { value: 'car', label: 'سيارة' },
] as const;

const businessOptions = [
  { value: 'restaurant', label: 'مطعم' },
  { value: 'supermarket', label: 'سوبر ماركت' },
  { value: 'pharmacy', label: 'صيدلية' },
  { value: 'other', label: 'نشاط آخر' },
] as const;

const arabicIndicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const easternArabicDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function normalizePhone(value: string) {
  const latinDigits = value.replace(/[٠-٩]/g, (digit) => String(arabicIndicDigits.indexOf(digit)));
  const normalizedDigits = latinDigits.replace(/[۰-۹]/g, (digit) =>
    String(easternArabicDigits.indexOf(digit)),
  );

  const compactValue = normalizedDigits.replace(/[^\d+]/g, '');
  const hasLeadingPlus = compactValue.startsWith('+');
  const digitsOnly = compactValue.replace(/\D/g, '');

  return `${hasLeadingPlus ? '+' : ''}${digitsOnly}`;
}

function validateDriverForm(form: DriverFormState) {
  if (form.fullName.trim().length < 3) {
    return 'من فضلك اكتب الاسم بالكامل بشكل صحيح.';
  }

  if (!/^\+?\d{8,15}$/.test(normalizePhone(form.phone))) {
    return 'من فضلك اكتب رقم موبايل صحيح.';
  }

  if (!form.vehicleType) {
    return 'اختر نوع المركبة قبل إرسال الطلب.';
  }

  return null;
}

function validateVendorForm(form: VendorFormState) {
  if (form.businessName.trim().length < 2) {
    return 'من فضلك اكتب اسم المتجر أو النشاط.';
  }

  if (!/^\+?\d{8,15}$/.test(normalizePhone(form.phone))) {
    return 'من فضلك اكتب رقم موبايل صحيح.';
  }

  if (!form.businessType) {
    return 'اختر نوع النشاط قبل إرسال الطلب.';
  }

  return null;
}

function resolveHighlightedForm(pathname: string, hash: string, fallback: ApplicationKind | null) {
  if (pathname.endsWith('/join-us/driver') || hash === `#${DRIVER_SECTION_ID}`) {
    return 'driver';
  }

  if (pathname.endsWith('/join-us/vendor') || hash === `#${VENDOR_SECTION_ID}`) {
    return 'vendor';
  }

  return fallback;
}

export default function JoinUs({ standalone = false, focusForm = null }: JoinUsProps) {
  const [driverForm, setDriverForm] = useState<DriverFormState>(initialDriverForm);
  const [vendorForm, setVendorForm] = useState<VendorFormState>(initialVendorForm);
  const [driverSubmission, setDriverSubmission] = useState<SubmissionState>(initialSubmissionState);
  const [vendorSubmission, setVendorSubmission] = useState<SubmissionState>(initialSubmissionState);
  const [highlightedForm, setHighlightedForm] = useState<ApplicationKind | null>(focusForm);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const syncHighlightedForm = () => {
      const nextHighlightedForm = resolveHighlightedForm(
        window.location.pathname,
        window.location.hash,
        focusForm,
      );
      setHighlightedForm(nextHighlightedForm);
    };

    syncHighlightedForm();
    window.addEventListener('hashchange', syncHighlightedForm);

    return () => {
      window.removeEventListener('hashchange', syncHighlightedForm);
    };
  }, [focusForm]);

  const submitDriverApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateDriverForm(driverForm);
    if (validationError) {
      setDriverSubmission({ status: 'error', message: validationError });
      return;
    }

    setDriverSubmission({ status: 'submitting', message: 'جاري إرسال طلبك الآن...' });

    try {
      const { error } = await supabase.from('driver_applications').insert({
        full_name: driverForm.fullName.trim(),
        phone: normalizePhone(driverForm.phone),
        vehicle_type: driverForm.vehicleType,
      });

      if (error) {
        throw error;
      }

      setDriverForm(initialDriverForm);
      setDriverSubmission({
        status: 'success',
        message: 'تم استلام طلبك بنجاح. سيقوم فريق هَوا بمراجعته والتواصل معك قريباً.',
      });
    } catch {
      setDriverSubmission({
        status: 'error',
        message: 'تعذر إرسال طلب المندوب حالياً. حاول مرة أخرى بعد قليل.',
      });
    }
  };

  const submitVendorApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateVendorForm(vendorForm);
    if (validationError) {
      setVendorSubmission({ status: 'error', message: validationError });
      return;
    }

    setVendorSubmission({ status: 'submitting', message: 'جاري إرسال بيانات المتجر الآن...' });

    try {
      const { error } = await supabase.from('vendor_applications').insert({
        business_name: vendorForm.businessName.trim(),
        phone: normalizePhone(vendorForm.phone),
        business_type: vendorForm.businessType,
      });

      if (error) {
        throw error;
      }

      setVendorForm(initialVendorForm);
      setVendorSubmission({
        status: 'success',
        message: 'تم تسجيل متجرك بنجاح. سيقوم فريق هَوا بمراجعة الطلب والتواصل معك قريباً.',
      });
    } catch {
      setVendorSubmission({
        status: 'error',
        message: 'تعذر إرسال طلب الشريك حالياً. حاول مرة أخرى بعد قليل.',
      });
    }
  };

  const driverCardClasses =
    highlightedForm === 'driver' ? 'ring-2 ring-primary shadow-2xl shadow-primary/15' : 'shadow-lg';
  const vendorCardClasses =
    highlightedForm === 'vendor' ? 'ring-2 ring-primary shadow-2xl shadow-primary/15' : 'shadow-lg';

  return (
    <section
      id={JOIN_US_SECTION_ID}
      className={`section-shell relative scroll-mt-28 overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] py-24 transition-colors duration-500 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)] ${
        standalone ? 'min-h-[calc(100vh-10rem)] pt-32' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="premium-grid absolute inset-0 opacity-40" />
        <div className="absolute right-[-10rem] top-16 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute left-[-12rem] bottom-20 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-black dark:text-white lg:text-5xl">
            انضم لعائلة <span className="text-primary">هَوا</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            سواء كنت تبحث عن فرصة عمل مرنة أو تريد تكبير مبيعات متجرك، يمكنك الآن إرسال الطلب مباشرة وسنراجعه من خلال لوحة البيانات.
          </p>

          {standalone && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/join-us/driver"
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                صفحة التقديم للمندوبين
              </a>
              <a
                href="/join-us/vendor"
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                صفحة التقديم للتجار
              </a>
            </div>
          )}
        </m.div>

        <div className="grid gap-8 md:grid-cols-2">
          <m.div
            id={DRIVER_SECTION_ID}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: shouldReduceMotion ? 0.28 : 0.45, ease: 'easeOut' }}
            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            className={`group cinematic-shine relative scroll-mt-28 overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 p-8 backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-white/[0.06] lg:p-12 ${driverCardClasses}`}
          >
            <div className="absolute top-0 right-0 h-36 w-36 rounded-bl-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" />
            <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-slate-900 shadow-xl shadow-primary/20">
              <Bike size={40} />
            </div>
            <h3 className="mb-4 text-3xl font-bold dark:text-white">سجل كمندوب توصيل</h3>
            <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
              املأ البيانات الأساسية وسنضيف طلبك إلى قائمة التوظيف الفعلية في Supabase لمراجعته والتواصل معك.
            </p>

            <form className="space-y-4" onSubmit={submitDriverApplication}>
              <input
                type="text"
                value={driverForm.fullName}
                onChange={(event) => {
                  setDriverForm((current) => ({ ...current, fullName: event.target.value }));
                  setDriverSubmission(initialSubmissionState);
                }}
                placeholder="الاسم بالكامل"
                required
                disabled={driverSubmission.status === 'submitting'}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
              <input
                type="tel"
                dir="ltr"
                inputMode="tel"
                value={driverForm.phone}
                onChange={(event) => {
                  setDriverForm((current) => ({ ...current, phone: event.target.value }));
                  setDriverSubmission(initialSubmissionState);
                }}
                placeholder="رقم الموبايل"
                required
                disabled={driverSubmission.status === 'submitting'}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
              <select
                value={driverForm.vehicleType}
                onChange={(event) => {
                  setDriverForm((current) => ({ ...current, vehicleType: event.target.value }));
                  setDriverSubmission(initialSubmissionState);
                }}
                required
                disabled={driverSubmission.status === 'submitting'}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="">نوع المركبة</option>
                {vehicleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div aria-live="polite" className="min-h-12">
                {driverSubmission.status === 'error' && driverSubmission.message && (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {driverSubmission.message}
                  </p>
                )}

                {driverSubmission.status === 'success' && driverSubmission.message && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                      <div>
                        <p className="font-bold">تم إرسال الطلب</p>
                        <p className="mt-1 leading-6">{driverSubmission.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <m.button
                type="submit"
                whileHover={
                  shouldReduceMotion || driverSubmission.status === 'submitting' ? undefined : { scale: 1.01 }
                }
                whileTap={
                  shouldReduceMotion || driverSubmission.status === 'submitting' ? undefined : { scale: 0.99 }
                }
                disabled={driverSubmission.status === 'submitting'}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 font-bold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-primary dark:text-slate-900 dark:hover:bg-primary-hover"
              >
                {driverSubmission.status === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    جاري إرسال الطلب...
                  </>
                ) : (
                  <>
                    قدم طلبك الآن
                    <ArrowLeft size={20} />
                  </>
                )}
              </m.button>
            </form>
          </m.div>

          <m.div
            id={VENDOR_SECTION_ID}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: shouldReduceMotion ? 0.28 : 0.45, delay: 0.06, ease: 'easeOut' }}
            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            className={`group cinematic-shine relative scroll-mt-28 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950 p-8 text-white transition-colors dark:bg-slate-900 lg:p-12 ${vendorCardClasses}`}
          >
            <div className="absolute top-0 right-0 h-36 w-36 rounded-bl-full bg-primary/20 transition-transform duration-500 group-hover:scale-150" />
            <div className="absolute bottom-[-6rem] left-[-5rem] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-primary shadow-xl shadow-black/20 dark:bg-slate-900">
              <Store size={40} />
            </div>
            <h3 className="mb-4 text-3xl font-bold">سجل كشريك / تاجر</h3>
            <p className="mb-8 text-lg text-slate-300 dark:text-slate-400">
              بيانات المتجر سترسل مباشرة إلى جدول الشركاء في Supabase ليتم متابعتها وربطها بفريق المبيعات.
            </p>

            <form className="space-y-4" onSubmit={submitVendorApplication}>
              <input
                type="text"
                value={vendorForm.businessName}
                onChange={(event) => {
                  setVendorForm((current) => ({ ...current, businessName: event.target.value }));
                  setVendorSubmission(initialSubmissionState);
                }}
                placeholder="اسم المتجر"
                required
                disabled={vendorSubmission.status === 'submitting'}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
              />
              <input
                type="tel"
                dir="ltr"
                inputMode="tel"
                value={vendorForm.phone}
                onChange={(event) => {
                  setVendorForm((current) => ({ ...current, phone: event.target.value }));
                  setVendorSubmission(initialSubmissionState);
                }}
                placeholder="رقم الموبايل"
                required
                disabled={vendorSubmission.status === 'submitting'}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
              />
              <select
                value={vendorForm.businessType}
                onChange={(event) => {
                  setVendorForm((current) => ({ ...current, businessType: event.target.value }));
                  setVendorSubmission(initialSubmissionState);
                }}
                required
                disabled={vendorSubmission.status === 'submitting'}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
              >
                <option value="">نوع النشاط</option>
                {businessOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div aria-live="polite" className="min-h-12">
                {vendorSubmission.status === 'error' && vendorSubmission.message && (
                  <p className="rounded-2xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-200">
                    {vendorSubmission.message}
                  </p>
                )}

                {vendorSubmission.status === 'success' && vendorSubmission.message && (
                  <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/40 px-4 py-4 text-sm text-emerald-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                      <div>
                        <p className="font-bold">تم إرسال الطلب</p>
                        <p className="mt-1 leading-6">{vendorSubmission.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <m.button
                type="submit"
                whileHover={
                  shouldReduceMotion || vendorSubmission.status === 'submitting' ? undefined : { scale: 1.01 }
                }
                whileTap={
                  shouldReduceMotion || vendorSubmission.status === 'submitting' ? undefined : { scale: 0.99 }
                }
                disabled={vendorSubmission.status === 'submitting'}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-slate-900 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
              >
                {vendorSubmission.status === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    جاري إرسال الطلب...
                  </>
                ) : (
                  <>
                    سجل متجرك
                    <ArrowLeft size={20} />
                  </>
                )}
              </m.button>
            </form>
          </m.div>
        </div>
      </div>
    </section>
  );
}
