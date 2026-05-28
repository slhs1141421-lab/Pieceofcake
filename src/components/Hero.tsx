import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../lib/ShopContext';

export default function Hero() {
  const { t } = useShop();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cake">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[60%] aspect-square bg-berry/10 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square bg-cake-dark/20 rounded-full blur-3xl opacity-40"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-8 inline-block"
          >
            <span className="px-6 py-2 rounded-full border border-berry/20 text-berry text-[10px] font-bold tracking-[0.4em] uppercase bg-white/30 backdrop-blur-sm">
              {t('hero_subtitle')}
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-12">
            Piece <br />
            <span className="text-berry italic font-serif relative">
              of Cake.
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute left-0 bottom-2 h-[2px] bg-berry/30"
              />
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-sm md:text-base opacity-75 mb-12 leading-relaxed font-bold text-ink/90 whitespace-pre-line">
            {t('hero_desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center space-x-4 border border-ink/10 px-10 py-5 rounded-full bg-ink text-cake hover:bg-berry transition-all duration-500 shadow-xl"
            >
              <span className="text-xs font-black tracking-widest uppercase">{t('shop_now')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#gift-sets"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center space-x-4 border border-berry px-10 py-5 rounded-full bg-white text-berry hover:bg-cake transition-all duration-500 shadow-xl font-bold"
            >
              <span className="text-xs font-black tracking-widest uppercase">{t('build_gift')}</span>
              <span className="text-base">🎁</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 opacity-20"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-ink" />
        </motion.div>
      </div>
    </section>
  );
}
