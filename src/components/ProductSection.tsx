import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useShop } from '../lib/ShopContext';
import ChefSelectionRank from './ChefSelectionRank';

const PRODUCT_NUTRITION: Record<string, {
  calories: number;
  sweetness: number;
  protein: string;
  fat: string;
  carbs: string;
  highlights: string[];
}> = {
  'cloud-strawberry': {
    calories: 250,
    sweetness: 2,
    protein: "4.5g",
    fat: "11.0g",
    carbs: "22.0g",
    highlights: ["北海道十勝生乳奶油", "百花熟成天然冬蜜", "英國唐寧伯爵紅茶葉"]
  },
  'dark-chocolate': {
    calories: 360,
    sweetness: 3,
    protein: "6.2g",
    fat: "18.0g",
    carbs: "29.0g",
    highlights: ["比利時 70% 苦甜巧克力", "法國 AOP 認證奶油", "手採結晶鹽之花"]
  },
  'caramel-salt': {
    calories: 320,
    sweetness: 4,
    protein: "5.0g",
    fat: "15.0g",
    carbs: "35.0g",
    highlights: ["Oreo 巧克破裂脆餅", "北海道草飼乳源起司", "私藏焦糖海鹽醬"]
  },
  'matcha-zen': {
    calories: 240,
    sweetness: 2,
    protein: "5.8g",
    fat: "9.0g",
    carbs: "19.0g",
    highlights: ["靜岡手摘石磨抹草粉", "宇治小山園茶道級抹綠", "海藻糖輕盈低糖配方"]
  },
  'strawberry-souffle': {
    calories: 210,
    sweetness: 2,
    protein: "4.2g",
    fat: "8.0g",
    carbs: "18.0g",
    highlights: ["大湖清晨鮮採紅草莓", "日本特級紫羅蘭麵粉", "馬達加斯加手工香草莢"]
  },
  'blueberry-mille-feuille': {
    calories: 290,
    sweetness: 3,
    protein: "4.8g",
    fat: "14.0g",
    carbs: "24.0g",
    highlights: ["高山晨露鮮飽滿藍莓", "手工香草香緹卡士達", "紐西蘭金桶純生奶油"]
  },
  'royal-crown': {
    calories: 310,
    sweetness: 3,
    protein: "5.1g",
    fat: "12.0g",
    carbs: "32.0g",
    highlights: ["巴洛克手工精工冠冕", "十勝放牧牛極鮮乳面", "野生百花限量熟成蜜"]
  },
  'dream-butterfly': {
    calories: 270,
    sweetness: 2,
    protein: "4.6g",
    fat: "10.0g",
    carbs: "20.0g",
    highlights: ["天然赤藻糖醇代糖", "北海道舒芙蕾輕乾酪", "幻彩舞蝶手作糖藝"]
  },
  'double-cherry-drip': {
    calories: 335,
    sweetness: 4,
    protein: "5.4g",
    fat: "16.0g",
    carbs: "38.0g",
    highlights: ["進口特大鮮甜櫻桃", "春櫻鮮萃粉淋面", "比利時手工白巧克力片"]
  }
};

interface ProductSectionProps {
  onSelectProduct: (id: string) => void;
  onViewProduct: (id: string) => void;
  onAddToCart: (item: any) => void;
}

export default function ProductSection({ onSelectProduct, onViewProduct, onAddToCart }: ProductSectionProps) {
  const { t, convertPrice, language } = useShop();
  const [activeCategory, setActiveCategory] = useState<'all' | 'cloud' | 'adult'>('all');
  const [healthFilter, setHealthFilter] = useState<boolean>(false);

  const filteredProductsRaw = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const filteredProducts = healthFilter 
    ? filteredProductsRaw.filter(p => {
        const nut = PRODUCT_NUTRITION[p.id];
        return nut ? (nut.calories < 280 || nut.sweetness <= 2) : true;
      })
    : filteredProductsRaw;

  const categories = [
    { 
      id: 'all', 
      name: language === 'en' ? 'All Treats' : language === 'ja' ? '全品' : language === 'ko' ? '전체 품목' : '全部品項' 
    },
    { 
      id: 'cloud', 
      name: language === 'en' ? 'Cloud Cakes' : language === 'ja' ? '雲ドルケーキ' : language === 'ko' ? '클라우드 케이크' : '雲朵蛋糕系列' 
    },
    { 
      id: 'adult', 
      name: language === 'en' ? 'Spirited Bittersweets' : language === 'ja' ? '大人味シリーズ' : language === 'ko' ? '어른을 위한 쌉싸름한 단맛' : '大人系微苦甜' 
    }
  ];

  const handleProductSelection = (id: string) => {
    // Dispatch a custom event to track click-thru metrics on the bestseller board
    window.dispatchEvent(new CustomEvent('track-product-click', { detail: { id } }));
    onSelectProduct(id);
  };

  return (
    <section id="shop" className="py-24 md:py-32 bg-cake">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-8 md:space-y-0">
          <div className="max-w-lg">
            <h2 className="text-xs font-bold tracking-[0.4em] mb-4 opacity-40 uppercase flex items-center gap-2">
              <Sparkles size={12} className="text-berry" /> Healing Collection
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              {language === 'zh' ? '尋找你的' : language === 'en' ? 'Find Your' : language === 'ja' ? 'お気に入りの' : '당신의 영혼을 위한'} <br />
              <span className="text-berry italic">{t('heading_shop')}.</span>
            </h3>
          </div>
          
          <div className="flex flex-col items-end gap-3.5">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={cn(
                    "px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border",
                    activeCategory === cat.id 
                      ? "bg-berry text-white border-berry shadow-lg" 
                      : "border-ink/10 hover:border-berry/40"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Health / Diet Filter Switch */}
            <div className="flex items-center gap-2.5 bg-white/75 backdrop-blur-md p-1.5 px-3 rounded-full border border-berry/15 shadow-[0_2px_12px_rgba(42,35,35,0.03)] selection:bg-rose-100 pointer-events-auto select-none">
              <span className="text-[10px] font-black tracking-wider text-ink/75 flex items-center gap-1">
                🌱 <span className="text-emerald-700">輕負擔低卡少糖</span>
              </span>
              <button
                type="button"
                onClick={() => setHealthFilter(!healthFilter)}
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  healthFilter ? "bg-emerald-500" : "bg-stone-300"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                    healthFilter ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </button>
              <span className="text-[9px] font-black text-stone-500 font-mono">
                {healthFilter ? 'ON (熱量<280卡 或 甜度≤2)' : 'OFF'}
              </span>
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => handleProductSelection(product.id)}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cake-dark mb-6 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-ink/5">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductSelection(product.id);
                  }}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl border border-ink/5 group/btn z-10"
                >
                  <ShoppingBag size={20} className="text-berry group-hover/btn:scale-110 transition-transform" />
                </button>
                
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/80 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase rounded-full border border-ink/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-display font-bold group-hover:text-berry transition-colors">{t('prod_' + product.id + '_name')}</h4>
                    <p className="text-[10px] opacity-40 font-bold tracking-[0.2em] uppercase">{product.subName}</p>
                  </div>
                  <span className="text-sm font-bold tracking-tight bg-berry/10 px-3 py-1 rounded-lg text-berry">{convertPrice(product.price)}</span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed line-clamp-2">
                  {t('prod_' + product.id + '_desc')}
                </p>

                {/* Minimalist Calorie & Sweetness Dashboard Chart */}
                {(() => {
                  const nut = PRODUCT_NUTRITION[product.id];
                  if (!nut) return null;
                  return (
                    <div 
                      className="relative group/meter mt-3.5 bg-stone-50/70 hover:bg-white border hover:border-emerald-250 p-3 rounded-2xl transition-all duration-300 pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono font-black text-stone-500">
                        <span className="flex items-center gap-1">
                          🔥 <span className="text-stone-800">{nut.calories} kcal</span>
                        </span>
                        <span className="text-[8px] tracking-wide uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700">
                          {nut.calories < 280 ? '輕盈配方' : '經典濃郁'}
                        </span>
                        <span className="flex items-center gap-0.5">
                          🍭 <span className="text-amber-600">甜度: {'★'.repeat(nut.sweetness)}{'☆'.repeat(5-nut.sweetness)}</span>
                        </span>
                      </div>

                      {/* Twin Miniature Progress Bars */}
                      <div className="grid grid-cols-2 gap-3 mt-1.5">
                        {/* Calories Progress Bar */}
                        <div className="h-1 bg-stone-200/60 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${Math.min(100, (nut.calories / 400) * 100)}%` }}
                          />
                        </div>
                        {/* Sweetness Progress Bar */}
                        <div className="h-1 bg-stone-200/60 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${(nut.sweetness / 5) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-[7.5px] text-stone-400 mt-2 flex justify-between select-none leading-none items-center">
                        <span>能量平衡計</span>
                        <span className="text-[8px] text-emerald-600/70 hover:text-emerald-700 font-black cursor-help">
                          成分履歷 • Hover 解密 🧪
                        </span>
                      </div>

                      {/* Exploded Ingredients Popover Tooltip */}
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-emerald-100 shadow-[0_12px_28px_rgba(42,35,35,0.08)] z-50 pointer-events-none opacity-0 translate-y-2 group-hover/meter:opacity-100 group-hover/meter:translate-y-0 transition-all duration-300 text-left">
                        <div className="text-[9.5px] font-mono leading-relaxed space-y-1.5">
                          <h5 className="font-sans font-black text-[11px] text-stone-800 flex items-center gap-1 pb-1 border-b border-stone-150">
                            🔬 職人手作成分履歷 / 100g 
                          </h5>
                          <div className="grid grid-cols-3 gap-1 text-center font-black bg-stone-50 p-1.5 rounded-lg border border-stone-100">
                            <div>
                              <div className="text-emerald-600 text-[10px]">{nut.protein}</div>
                              <div className="text-[7px] text-stone-400">新鮮蛋白質</div>
                            </div>
                            <div>
                              <div className="text-amber-600 text-[10px]">{nut.fat}</div>
                              <div className="text-[7px] text-stone-400">天然乳脂肪</div>
                            </div>
                            <div>
                              <div className="text-indigo-600 text-[10px]">{nut.carbs}</div>
                              <div className="text-[7px] text-stone-400">健康糖水化合物</div>
                            </div>
                          </div>
                          <div>
                            <span className="text-[7.5px] font-sans font-black text-rose-400/80 block uppercase tracking-wide">
                              🌱 烘焙特選選材履歷
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {nut.highlights.map((h, i) => (
                                <span key={i} className="bg-emerald-50 text-emerald-800 text-[8px] px-1.5 py-0.5 rounded border border-emerald-100/50 leading-tight">
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Tooltip arrow decoration */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-emerald-100 rotate-45" />
                      </div>
                    </div>
                  );
                })()}
                
                <div className="pt-4 flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-ink/5 group-hover:bg-berry/20 transition-colors" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-20 group-hover:opacity-100 transition-opacity">Explore</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 主廚私藏熱門排行組件 */}
        <ChefSelectionRank onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
      </div>
    </section>
  );
}
