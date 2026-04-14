import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bike, Loader2, Store } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  loading: boolean;
  error: string | null;
  success: string | null;
};

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
  loading: false,
  error: null,
  success: null,
};

export default function JoinUs() {
  const [driverForm, setDriverForm] = useState<DriverFormState>(initialDriverForm);
  const [vendorForm, setVendorForm] = useState<VendorFormState>(initialVendorForm);
  const [driverSubmission, setDriverSubmission] = useState<SubmissionState>(initialSubmissionState);
  const [vendorSubmission, setVendorSubmission] = useState<SubmissionState>(initialSubmissionState);

  const submitDriverApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDriverSubmission({ loading: true, error: null, success: null });

    const { error } = await supabase.from('driver_applications').insert({
      full_name: driverForm.fullName.trim(),
      phone: driverForm.phone.trim(),
      vehicle_type: driverForm.vehicleType,
    });

    if (error) {
      setDriverSubmission({
        loading: false,
        error: 'تعذر إرسال طلب المندوب حالياً. حاول مرة أخرى.',
        success: null,
      });
      return;
    }

    setDriverForm(initialDriverForm);
    setDriverSubmission({
      loading: false,
      error: null,
      success: 'تم استلام طلبك. فريق هَوا سيتواصل معك قريباً.',
    });
  };

  const submitVendorApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVendorSubmission({ loading: true, error: null, success: null });

    const { error } = await supabase.from('vendor_applications').insert({
      business_name: vendorForm.businessName.trim(),
      phone: vendorForm.phone.trim(),
      business_type: vendorForm.businessType,
    });

    if (error) {
      setVendorSubmission({
        loading: false,
        error: 'تعذر إرسال طلب التاجر حالياً. حاول مرة أخرى.',
        success: null,
      });
      return;
    }

    setVendorForm(initialVendorForm);
    setVendorSubmission({
      loading: false,
      error: null,
      success: 'تم تسجيل متجرك بنجاح. سنراجع الطلب ونتواصل معك.',
    });
  };

  return (
    <section id="join-us" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 40, damping: 15, mass: 1.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">
            انضم لعائلة <span className="text-primary">هَوا</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            سواء كنت تبحث عن فرصة عمل مرنة أو تريد تكبير مبيعات متجرك، يمكن الآن
            إرسال الطلب مباشرة وسنراجعه من خلال لوحة البيانات.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 40, damping: 15, mass: 1.5 }}
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-[2.5rem] shadow-lg border border-slate-100 dark:border-slate-800 relative overflow-hidden group transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-slate-900 mb-8">
              <Bike size={40} />
            </div>
            <h3 className="text-3xl font-bold mb-4 dark:text-white">سجل كمندوب توصيل</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              املأ البيانات الأساسية وسنضيف طلبك إلى قائمة التوظيف الفعلية في
              Supabase لمراجعته والتواصل معك.
            </p>

            <form className="space-y-4" onSubmit={submitDriverApplication}>
              <input
                type="text"
                value={driverForm.fullName}
                onChange={(event) =>
                  setDriverForm((current) => ({ ...current, fullName: event.target.value }))
                }
                placeholder="الاسم بالكامل"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-slate-50 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
              <input
                type="tel"
                value={driverForm.phone}
                onChange={(event) =>
                  setDriverForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="رقم الموبايل"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-slate-50 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
              <select
                value={driverForm.vehicleType}
                onChange={(event) =>
                  setDriverForm((current) => ({ ...current, vehicleType: event.target.value }))
                }
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                <option value="">نوع المركبة</option>
                <option value="motorcycle">موتوسيكل</option>
                <option value="bicycle">عجلة</option>
                <option value="car">سيارة</option>
              </select>

              {driverSubmission.error && (
                <p className="text-sm font-medium text-red-500">{driverSubmission.error}</p>
              )}
              {driverSubmission.success && (
                <p className="text-sm font-medium text-emerald-600">{driverSubmission.success}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={driverSubmission.loading}
                className="w-full bg-slate-900 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-primary text-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
              >
                {driverSubmission.loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    قدم طلبك الآن
                    <ArrowLeft size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 40, damping: 15, mass: 1.5, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-slate-900 dark:bg-slate-800 text-white p-8 lg:p-12 rounded-[2.5rem] shadow-lg relative overflow-hidden group transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
            <div className="w-20 h-20 bg-slate-800 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary mb-8">
              <Store size={40} />
            </div>
            <h3 className="text-3xl font-bold mb-4">سجل كشريك / تاجر</h3>
            <p className="text-slate-300 dark:text-slate-400 mb-8 text-lg">
              بيانات المتجر ستُرسل مباشرة إلى جدول الشركاء في Supabase ليتم
              متابعتها وربطها بفريق المبيعات.
            </p>

            <form className="space-y-4" onSubmit={submitVendorApplication}>
              <input
                type="text"
                value={vendorForm.businessName}
                onChange={(event) =>
                  setVendorForm((current) => ({ ...current, businessName: event.target.value }))
                }
                placeholder="اسم المتجر"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-700 dark:border-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-slate-800 dark:bg-slate-900 text-white placeholder:text-slate-400"
              />
              <input
                type="tel"
                value={vendorForm.phone}
                onChange={(event) =>
                  setVendorForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="رقم الموبايل"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-700 dark:border-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-slate-800 dark:bg-slate-900 text-white placeholder:text-slate-400"
              />
              <select
                value={vendorForm.businessType}
                onChange={(event) =>
                  setVendorForm((current) => ({ ...current, businessType: event.target.value }))
                }
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-700 dark:border-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-slate-800 dark:bg-slate-900 text-slate-400"
              >
                <option value="">نوع النشاط</option>
                <option value="restaurant">مطعم</option>
                <option value="supermarket">سوبر ماركت</option>
                <option value="pharmacy">صيدلية</option>
                <option value="other">أخرى</option>
              </select>

              {vendorSubmission.error && (
                <p className="text-sm font-medium text-red-300">{vendorSubmission.error}</p>
              )}
              {vendorSubmission.success && (
                <p className="text-sm font-medium text-emerald-300">{vendorSubmission.success}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={vendorSubmission.loading}
                className="w-full bg-primary disabled:opacity-70 disabled:cursor-not-allowed text-slate-900 px-6 py-4 rounded-xl font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
              >
                {vendorSubmission.loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    سجل متجرك
                    <ArrowLeft size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
