import { motion } from 'motion/react';
import { Mic, HeartPulse, ChefHat, Navigation } from 'lucide-react';
import LiveVoiceAgent from './LiveVoiceAgent';

export default function VoiceAI() {
  return (
    <section id="voice-ai" className="py-20 bg-slate-900 text-white overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-slate-800 border border-slate-700 p-8 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">جرب المساعد الصوتي بنفسك</h3>
                <p className="text-slate-400">اضغط على الزر وابدأ الكلام، المساعد هيسمعك ويرد عليك في نفس اللحظة.</p>
              </div>
              
              <LiveVoiceAgent />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1.5 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm mb-6 border border-primary/20">
              <Mic size={16} />
              <span>حصرياً في هَوا</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              تكلم، وهَوا <span className="text-primary">ينفذ</span>
            </h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed">
              أول تطبيق توصيل بمساعد صوتي ذكي يفهم لغتك الطبيعية. اطلب، تتبع، وادفع بصوتك بس. جرب المحادثة الحية الآن!
            </p>

            <div className="space-y-6">
              {[
                { icon: <Navigation size={24} />, title: 'تنقل وتحكم كامل', desc: 'قول "افتح السلة" أو "فين طلبي؟" والمساعد هيقوم بالباقي.' },
                { icon: <ChefHat size={24} />, title: 'مكتبة وصفات طبخ', desc: 'اسأل عن أي وصفة، والمساعد هيقولك المكونات ويضيفها لسلتك فوراً.' },
                { icon: <HeartPulse size={24} />, title: 'نصائح صحية', desc: 'استشر المساعد عن السعرات الحرارية أو البدائل الصحية لأي منتج.' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 + (index * 0.1) }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
