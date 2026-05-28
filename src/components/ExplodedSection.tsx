import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CAKE_EXPLODED_DATA, PRODUCTS, PRODUCT_DATA } from '../constants';
import { X, Plus, Minus, Clock, Flame, Camera, Layers, Eye, Sparkles } from 'lucide-react';

// Live virtual camera ingredient configurations for each recipe option
const INGREDIENTS_LOOKUP: Record<string, {
  elements: { icon: string; name: string; origin: string; desc: string }[];
  bgGradient: string;
  themeColor: string;
  shutterSpeed: string;
  aperture: string;
}> = {
  'cloud-strawberry': {
    elements: [
      { icon: '🥛', name: '薰衣草山芋生乳', origin: '北海道十勝小農', desc: '手打低溫熟成，帶有極輕盈的天然芋香' },
      { icon: '🥚', name: '紅殼香草雞蛋', origin: '自然放牧無抗生素', desc: '高蛋黃比例，氣孔密實軟綿的關鍵' },
      { icon: '🌿', name: '皇家伯爵紅茶葉', origin: '英國唐寧尊榮莊園', desc: '佛手柑純香環繞，帶有深邃橡木茶韻' },
      { icon: '🍮', name: '手作輕黑糖布丁', origin: '主廚深夜文火手作', desc: '純手工蔗糖微苦熬製，Q彈滑嫩' }
    ],
    bgGradient: 'from-purple-100 to-amber-50',
    themeColor: 'purple',
    shutterSpeed: '1/125s',
    aperture: 'f/2.8'
  },
  'dark-chocolate': {
    elements: [
      { icon: '🍫', name: '70% 比利時甘納許', origin: 'Belcolade 頂級莊園', desc: '大師級苦甜巧克力，苦韻回甘帶果酸色澤' },
      { icon: '🧉', name: '微粒子熟成可可粉', origin: '法國 Valrhona 法芙娜', desc: '可可香氣濃烈厚實，極度優雅的苦甜靈魂' },
      { icon: '🧈', name: 'AOP 認證艾許奶油', origin: '法國 AOP 皇家認證', desc: '手工木桶攪乳，帶有獨特堅果與橡木純香' },
      { icon: '🧂', name: '手採結晶鹽之花', origin: '法國吉蘭特鹽田', desc: '極其珍罕的手採純鹽結晶，點亮巧克力深邃層次' }
    ],
    bgGradient: 'from-zinc-100 to-stone-200',
    themeColor: 'amber',
    shutterSpeed: '1/160s',
    aperture: 'f/2.0'
  },
  'caramel-salt': {
    elements: [
      { icon: '🍪', name: 'Oreo 巧克破裂脆餅', origin: '原廠厚切經典夾心', desc: '酥脆帶有焦香味的可可餅乾，治癒咀嚼感' },
      { icon: '🥛', name: '十勝重乳起司鮮乳', origin: '北海道草飼乳源', desc: '保證無添加，乳脂肪高達 35% 濃醇香郁' },
      { icon: '🪨', name: '超微細極黑竹炭粉', origin: '日本高山燒製孟宗竹', desc: '天然色素排毒高纖，讓蛋糕體蓬鬆而不油膩' },
      { icon: '🍯', name: '文火焦糖海鹽醬', origin: '私藏低溫糖蜜熬製', desc: '甜中帶乾淨清咸，融化在舌尖的太妃糖香' }
    ],
    bgGradient: 'from-zinc-200 to-indigo-50',
    themeColor: 'zinc',
    shutterSpeed: '1/200s',
    aperture: 'f/1.8'
  },
  'matcha-zen': {
    elements: [
      { icon: '🍵', name: '手摘一盤石磨抹茶', origin: '靜岡御前崎單一茶園', desc: '覆蓋栽培鎖住葉綠素，石磨慢磨，細緻如霧' },
      { icon: '🍃', name: '初採極細茶香綠粉', origin: '京都宇治小山園', desc: '茶道等級微苦特調，帶有青翠的海苔甜香' },
      { icon: '🥚', name: '朝日小農鮮雞蛋', origin: '日系高標安全牧場', desc: '純素飼料餵養，無蛋腥，打發力一流' },
      { icon: '🥛', name: '極冷鮮乳生乳霜', origin: '十勝小麥放牧牛', desc: '如天鵝絨純淨極緻，微苦抹茶的完美舒緩伴侶' }
    ],
    bgGradient: 'from-emerald-50 to-amber-50',
    themeColor: 'emerald',
    shutterSpeed: '1/180s',
    aperture: 'f/2.2'
  },
  'strawberry-souffle': {
    elements: [
      { icon: '🍓', name: '大湖產地產紅草莓', origin: '每日清晨人工首摘', desc: '糖酸比完美的紅寶石草莓，果肉扎實多汁' },
      { icon: '🥛', name: '北海道鮮萃生乳面', origin: '十勝原鮮直送契作', desc: '高爽口度，如同舌尖落雪般自然消融' },
      { icon: '🪵', name: '波旁天然香草莢籽', origin: '馬達加斯加手工香草', desc: '手工刮取黑金種籽，淡淡蜜香與大地芬芳' },
      { icon: '🌾', name: '日本特級紫羅蘭麵粉', origin: '日清頂級研磨小麥', desc: '超低灰粉，成就戚風蛋糕羽毛般鬆軟奇蹟' }
    ],
    bgGradient: 'from-pink-50 to-amber-50',
    themeColor: 'pink',
    shutterSpeed: '1/125s',
    aperture: 'f/1.4'
  },
  'blueberry-mille-feuille': {
    elements: [
      { icon: '🫐', name: '晨露飽滿高山藍莓', origin: '無農藥友善契作園', desc: '高抗氧化花青素，顆顆爆汁微酸微香甜' },
      { icon: '🧈', name: '紐西蘭金桶純生奶油', origin: '天然草飼生乳乳酪', desc: '特有金黃色澤，高熔點帶出256摺焦糖深邃香脆' },
      { icon: '🍮', name: '手工香草香緹卡士達', origin: '主廚慢火手攪濃打', desc: '融合香草籽與豐盈蛋香，微甜綿密而不黏口' },
      { icon: '🍨', name: '極細糖晶防潮雪白糖粉', origin: '特級微粒子工學', desc: '均勻篩在藍莓縫隙，不吸水，提供微光甜感' }
    ],
    bgGradient: 'from-blue-50 to-yellow-50',
    themeColor: 'blue',
    shutterSpeed: '1/150s',
    aperture: 'f/2.8'
  },
  'royal-crown': {
    elements: [
      { icon: '👑', name: '微型精工鍍銀王冠', origin: '巴洛克原創藝術手作', desc: '耀眼巴洛克珍珠雕出高貴風範，享用後可完美保存收藏' },
      { icon: '🍵', name: '頂級琥珀皇家伯爵茶', origin: '唐寧皇室特別提供', desc: '深熟紅茶中揉和佛手柑極致優雅，淡雅高潔' },
      { icon: '🍯', name: '野生百花熟成冬蜜', origin: '養蜂人限量精萃', desc: '天然原蜜回甘清亮，完美取代加工糖份' },
      { icon: '✨', name: '可食用典雅金箔銀片', origin: '金澤老字號手工藝', desc: '極薄亮金箔，如碎星灑落緞面增添奢華尊貴感' }
    ],
    bgGradient: 'from-stone-100 to-amber-50',
    themeColor: 'stone',
    shutterSpeed: '1/100s',
    aperture: 'f/2.0'
  }
};

interface ExplodedSectionProps {
  productId: string | null;
  viewOnly?: boolean;
  onClose: () => void;
  onAddToCart?: (product: any) => void;
}

export default function ExplodedSection({ productId, viewOnly = false, onClose, onAddToCart }: ExplodedSectionProps) {
  const cake = CAKE_EXPLODED_DATA.find(c => c.id === productId);

  return (
    <AnimatePresence>
      {productId && cake && (
        <ProductDetail cake={cake} onClose={onClose} onAddToCart={onAddToCart} />
      )}
    </AnimatePresence>
  );
}

function ProductDetail({ cake, onClose, onAddToCart }: { cake: typeof CAKE_EXPLODED_DATA[0], onClose: () => void, onAddToCart?: (product: any) => void }) {
  const [selectedSize, setSelectedSize] = useState('6"');
  const [candleType, setCandleType] = useState('none');
  const [candleNumber, setCandleNumber] = useState('');
  const [cutleryCount, setCutleryCount] = useState(1);
  const [remarks, setRemarks] = useState('');

  // Baking countdown states
  const [bakingSeconds, setBakingSeconds] = useState(0);
  const [baseMinutes, setBaseMinutes] = useState(45);
  const [targetTimeStr, setTargetTimeStr] = useState('');

  useEffect(() => {
    const mins = cake.id.includes('matcha') ? 48 
                 : cake.id.includes('dark') || cake.id.includes('chocolate') ? 55 
                 : cake.id.includes('strawberry') || cake.id.includes('berry') ? 42 
                 : 45;
    
    setBaseMinutes(mins);
    
    // Simulate active bake stage starting from roughly 72% to 88% complete
    const percentDone = 72 + Math.floor(Math.random() * 16); 
    const totalSecs = mins * 60;
    const initialRemaining = Math.max(120, Math.floor(totalSecs * (1 - percentDone / 100)));
    
    setBakingSeconds(initialRemaining);
    
    // Target completion time
    const targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() + initialRemaining);
    setTargetTimeStr(targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, [cake.id]);

  useEffect(() => {
    if (bakingSeconds <= 0) return;
    const interval = setInterval(() => {
      setBakingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [bakingSeconds]);

  const currentPercent = Math.min(100, Math.max(0, Math.round(((baseMinutes * 60 - bakingSeconds) / (baseMinutes * 60)) * 100)));

  const getBakingPhase = (pct: number) => {
    if (pct < 25) {
      return {
        step: 1,
        title: '原料備製與比例調配',
        engArr: 'Ingredient Prep',
        desc: '主廚正在精秤頂級法國艾許奶油，與主原料調研至最絲滑的乳化黃金比例。',
        emoji: '⚖️',
        color: 'from-amber-400 to-amber-500'
      };
    } else if (pct < 50) {
      return {
        step: 2,
        title: '低溫揉製與手工打發',
        engArr: 'Artisanal Whipping',
        desc: '職人正不疾不徐地拍打蛋白霜，氣孔均勻密實，這是蛋糕輕盈、蓬鬆的靈魂秘密。',
        emoji: '🥣',
        color: 'from-pink-400 to-pink-500'
      };
    } else if (pct < 75) {
      return {
        step: 3,
        title: '爐心慢火精準烘烤',
        engArr: 'Heart Stone Baking',
        desc: '送入頂級烤箱對流慢火烤焙，微焦溫暖焦糖香氣在蛋糕體內完美熱熟成。',
        emoji: '🔥',
        color: 'from-orange-400 to-rose-500'
      };
    } else if (pct < 90) {
      return {
        step: 4,
        title: '急速冷卻與鮮乳抹面',
        engArr: 'Chilled Prep & Frosting',
        desc: '出爐急速降溫完美鎖水！主廚在工作台前屏氣凝神，正手工抹上細緻的法式生乳霜。',
        emoji: '❄️',
        color: 'from-teal-400 to-cyan-500'
      };
    } else {
      return {
        step: 5,
        title: '細微點綴與出烤終檢',
        engArr: 'Artisan Final Garnish',
        desc: '細緻撒上可食極光微粒與優雅小綴飾。職人品質終檢完成，祝您享用絕佳美味！',
        emoji: '✨',
        color: 'from-amber-400 to-amber-600'
      };
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const matchingProduct = 
    PRODUCT_DATA.healing.find(p => p.id === cake.id) || 
    PRODUCTS.find(p => p.id === cake.id);
  const priceNum = matchingProduct 
    ? (typeof matchingProduct.price === 'number' 
        ? matchingProduct.price 
        : parseInt(String(matchingProduct.price).replace(/[^\d]/g, '')) || 280)
    : 280;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-cake/80 backdrop-blur-md"
    >
      <div className="h-full flex items-center justify-center overflow-auto p-4 md:p-8">
        {/* Checkout Area - Side-by-Side Wide Layout */}
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-5xl bg-white rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(255,107,157,0.2)] overflow-hidden relative border-8 border-white flex flex-col"
          style={{ maxHeight: '90vh' }}
        >
          <div className="overflow-y-auto p-6 md:p-10 scrollbar-hide">
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-4 bg-ink text-cake rounded-full hover:bg-berry hover:scale-110 active:scale-90 transition-all z-50 shadow-md"
            >
              <X size={20} />
            </button>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start text-left mt-4">
              
              {/* Left Column (lg:col-span-6): Product Info, Image, Baking Tracker, and Selected Ingredients */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-berry/10 text-berry rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
                    ✨ Artisan Baked Prescription ✨
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight text-ink italic">
                    {cake.name}
                  </h2>
                </div>

                {/* Cake Finished Image */}
                <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden border border-zinc-100 shadow-sm bg-stone-50">
                  <img 
                    src={cake.image} 
                    alt={cake.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] text-white tracking-wider font-extrabold uppercase border border-white/5">
                      Chef Selected
                    </span>
                    <span className="bg-amber-500/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] text-ink tracking-wider font-black uppercase">
                      Pure ingredients
                    </span>
                  </div>
                </div>

                {/* 預估烘焙完成時間的動態計時器 tracker */}
                <div className="p-6 bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-rose-50/20 rounded-[2.5rem] border-2 border-amber-100/70 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4 border-b border-amber-100/40 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600 font-bold"></span>
                      </span>
                      <span className="text-[11px] font-black tracking-widest text-amber-800 uppercase font-mono">
                        👨‍🍳 實時溫控：職人手工現烤中
                      </span>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-800 font-extrabold px-2.5 py-1 rounded-full border border-amber-500/20 font-mono">
                      ARTISAN LIVE OVEN
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    {/* Timer */}
                    <div className="md:col-span-5 text-center md:text-left space-y-1 border-b md:border-b-0 md:border-r border-amber-100/50 pb-4 md:pb-0 pr-0 md:pr-4">
                      <span className="text-[10px] font-bold text-stone-400 block tracking-wider uppercase">
                        預估出爐倒數 Countdown
                      </span>
                      <div className="flex items-baseline justify-center md:justify-start gap-1">
                        <span className="text-3xl font-mono font-black text-amber-600 tracking-tighter animate-pulse">
                          {bakingSeconds > 0 ? formatTime(bakingSeconds) : '00:00'}
                        </span>
                        <span className="text-xs font-black text-amber-600/70 uppercase">
                          Min
                        </span>
                      </div>
                      <span className="text-[9.2px] font-mono font-black text-stone-500 block mt-1 bg-white/70 inline-block px-2 py-0.5 rounded-lg border border-amber-100/20">
                        ⏰ 預計出爐 {targetTimeStr || '--:--'}
                      </span>
                    </div>

                    {/* Stage Details */}
                    <div className="md:col-span-7 space-y-3">
                      <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                        <span className="text-3xl shrink-0 leading-none">
                          {getBakingPhase(currentPercent).emoji}
                        </span>
                        <div className="text-left">
                          <span className="text-[9px] font-mono tracking-widest font-black uppercase text-amber-700/80 block leading-none">
                            Stage 0{getBakingPhase(currentPercent).step} • {getBakingPhase(currentPercent).engArr}
                          </span>
                          <span className="text-xs font-black text-stone-850 mt-1 block leading-tight font-sans">
                            {getBakingPhase(currentPercent).title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-5 space-y-1.5 text-left">
                    <div className="flex justify-between items-center text-[9px] font-bold text-stone-400 uppercase">
                      <span>準備中 preparing</span>
                      <span className="font-mono text-amber-600 font-extrabold">{currentPercent}% Baked</span>
                      <span>完美出爐 Complete</span>
                    </div>
                    
                    <div className="h-3.5 bg-zinc-100/60 rounded-full overflow-hidden p-[2px] border border-stone-200/50 relative shadow-inner">
                      {/* Active glow dynamic bar */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentPercent}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full bg-gradient-to-r ${getBakingPhase(currentPercent).color} shadow-[0_1px_4px_rgba(245,158,11,0.2)]`}
                      />
                    </div>
                    
                    <p className="text-[10px] text-stone-600 font-medium leading-relaxed mt-2.5 bg-white/50 p-3 rounded-xl border border-amber-100/30 italic">
                      「{getBakingPhase(currentPercent).desc}」
                    </p>
                  </div>
                </div>

                {/* Artisan Ingredients info cards list */}
                {(() => {
                  const lookup = INGREDIENTS_LOOKUP[cake.id] || INGREDIENTS_LOOKUP['cloud-strawberry'];
                  return (
                    <div className="p-5 bg-stone-50/50 rounded-[2rem] border border-stone-100 space-y-3">
                      <span className="text-[10px] font-mono tracking-widest text-stone-400 font-black block w-max uppercase mb-1">
                        🌿 頂級溫控制度原料 Strict Selection
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {lookup.elements.map((el, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-xl border border-stone-200/40 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-start gap-2">
                            <span className="text-lg shrink-0 mt-0.5 leading-none">{el.icon}</span>
                            <div className="text-left leading-normal">
                              <h5 className="text-[9.5px] font-black text-stone-800">{el.name}</h5>
                              <p className="text-[8px] text-stone-400 leading-tight block mt-0.5">{el.origin}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right Column (lg:col-span-6): Purchasing Options, Customizations & Check-out */}
              <div className="lg:col-span-6 space-y-6 bg-zinc-50/30 p-5 lg:p-6 rounded-[2.5rem] border border-stone-100/50 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Size */}
                  <div>
                    <label className="text-xs font-black tracking-widest uppercase text-berry/60 block mb-3 px-1">
                      🎀 尺寸選擇 Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['4"', '6"', '8"'].map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`py-4 rounded-2xl text-base font-black transition-all border-2 ${
                            selectedSize === size 
                              ? 'border-berry bg-berry text-white shadow-md shadow-berry/15' 
                              : 'border-stone-200/60 bg-white text-ink/75 hover:border-berry/30'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Candles */}
                  <div>
                    <label className="text-xs font-black tracking-widest uppercase text-berry/60 block mb-3 px-1">
                      🕯️ 蠟燭服務 Candle
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {[
                        { id: 'none', name: '不需' },
                        { id: 'classic', name: '經典' },
                        { id: 'number', name: '數字' }
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setCandleType(type.id)}
                          className={`py-4 rounded-xl text-xs font-black transition-all border-2 ${
                            candleType === type.id 
                              ? 'border-ink bg-ink text-white shadow-md' 
                              : 'border-stone-200/60 bg-white text-ink/75 hover:border-ink/30'
                          }`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                    {candleType === 'number' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <input
                          type="text"
                          placeholder="請輸入欲訂購的數字 (如: 18)"
                          value={candleNumber}
                          onChange={(e) => setCandleNumber(e.target.value)}
                          className="w-full bg-white border border-stone-200/80 rounded-xl px-4 py-3 text-xs font-bold placeholder:text-ink/30 focus:border-berry/40 focus:ring-0 transition-all outline-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Cutlery Selection */}
                  <div className="p-5 bg-white rounded-[2rem] border border-stone-100 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cake/20 rounded-full flex items-center justify-center text-lg">🍴</div>
                        <div className="text-left">
                          <h4 className="text-xs font-black text-ink">餐具組</h4>
                          <p className="text-[10px] text-stone-400">裝點歡聚的實用包裝</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-stone-50 p-1.5 rounded-full border border-stone-200/60 shadow-inner">
                        <button 
                          type="button"
                          onClick={() => setCutleryCount(prev => Math.max(0, prev - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-ink hover:bg-berry hover:text-white transition-all shadow-sm active:scale-90"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-black w-4 text-center text-berry">{cutleryCount}</span>
                        <button 
                          type="button"
                          onClick={() => setCutleryCount(prev => Math.min(10, prev + 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-ink hover:bg-berry hover:text-white transition-all shadow-sm active:scale-90"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remarks */}
                  <div>
                    <label className="text-xs font-black tracking-widest uppercase text-berry/60 block mb-3 px-1">
                      💌 客製化備註 Remarks
                    </label>
                    <textarea 
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="有什麼想對我們說的？或是對這份驚喜的細節要求..."
                      className="w-full h-24 bg-white border border-stone-200/80 rounded-[1.5rem] p-4 text-xs font-bold placeholder:text-ink/30 focus:border-berry/40 focus:ring-0 transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-200/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-black tracking-wider uppercase text-berry/40 block">Total Healing Price</span>
                      <p className="text-3xl font-display font-bold text-berry tracking-tight">NT$ {priceNum}</p>
                    </div>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart({
                          id: cake.id,
                          name: cake.name,
                          size: selectedSize,
                          price: priceNum,
                          remarks,
                          candleType,
                          cutleryCount,
                          candleNumber: candleType === 'number' ? candleNumber : undefined
                        });
                        onClose();
                      }
                    }}
                    className="w-full bg-berry text-white py-5 rounded-[1.5rem] text-sm font-black tracking-widest uppercase hover:bg-ink hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center group shadow-md shadow-berry/10"
                  >
                    <span>加入愛的購物籃 💖</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
