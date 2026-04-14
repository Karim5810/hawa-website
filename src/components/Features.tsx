import { motion } from 'motion/react';
import { PenTool, ShoppingCart, Utensils, Map, HeadphonesIcon, Wallet } from 'lucide-react';

const features = [
  {
    icon: <PenTool size={32} />,
    title: 'اكتب طلبك بنفسك',
    description: 'مش لاقي اللي بتدور عليه؟ اكتب طلبك بالتفصيل وهنجيبهولك من أي مكان.'
  },
  {
    icon: <ShoppingCart size={32} />,
    title: 'سوبر ماركت وصيدلية',
    description: 'كل مقاضي البيت والأدوية بتوصلك لحد باب البيت في أسرع وقت.'
  },
  {
    icon: <Utensils size={32} />,
    title: 'أفضل المطاعم',
    description: 'اطلب من مطاعمك المفضلة واستمتع بأكلك الساخن.'
  },
  {
    icon: <Map size={32} />,
    title: 'تتبع مباشر',
    description: 'تابع طلبك خطوة بخطوة على الخريطة لحد ما يوصلك.'
  },
  {
    icon: <Wallet size={32} />,
    title: 'محفظة هَوا',
    description: 'ادفع بسهولة وأمان واشحن محفظتك لاستخدام أسرع.'
  },
  {
    icon: <HeadphonesIcon size={32} />,
    title: 'دعم فني 24/7',
    description: 'فريق دعم متواجد دايماً لمساعدتك في أي وقت.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">كل اللي تحتاجه في <span className="text-primary">تطبيق واحد</span></h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            هَوا مش مجرد تطبيق توصيل أكل، هَوا بيوفرلك كل خدمات التوصيل اللي ممكن تتخيلها في مكان واحد.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/5 transition-all border border-slate-100 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/30 group"
            >
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 shadow-sm group-hover:bg-primary group-hover:text-slate-900 group-hover:scale-110 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
