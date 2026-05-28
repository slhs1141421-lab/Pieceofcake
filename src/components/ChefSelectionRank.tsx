import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../lib/ShopContext';
import { PRODUCTS } from '../constants';
import { 
  TrendingUp, Award, ShoppingCart, Flame, 
  Sparkles, RefreshCw, Layers, ThumbsUp, HelpCircle
} from 'lucide-react';

interface ProductStats {
  id: string;
  name: string;
  subName: string;
  image: string;
  price: number;
  clicks: number;
  sales: number;
}

// Baseline starting statistics for realistic, elegant presentation
const INITIAL_STATS: Record<string, { clicks: number; sales: number }> = {
  'cloud-strawberry': { clicks: 1240, sales: 480 },
  'dark-chocolate': { clicks: 960, sales: 380 },
  'caramel-salt': { clicks: 1420, sales: 512 },
  'matcha-zen': { clicks: 1100, sales: 440 },
  'strawberry-souffle': { clicks: 880, sales: 290 },
  'blueberry-mille-feuille': { clicks: 1040, sales: 360 },
  'royal-crown': { clicks: 1650, sales: 620 },
  'dream-butterfly': { clicks: 1380, sales: 490 },
  'double-cherry-drip': { clicks: 1510, sales: 580 }
};

interface ChefSelectionRankProps {
  onSelectProduct: (id: string) => void;
  onAddToCart: (item: any) => void;
}

export default function ChefSelectionRank({ onSelectProduct, onAddToCart }: ChefSelectionRankProps) {
  const { t, convertPrice, language } = useShop();
  const [metric, setMetric] = useState<'clicks' | 'sales'>('sales');
  const [statsList, setStatsList] = useState<ProductStats[]>([]);
  const [trafficActive, setTrafficActive] = useState(false);
  const [activeComboIndex, setActiveComboIndex] = useState<number>(0);
  const [simulationLogStr, setSimulationLogStr] = useState<string>('');

  // Floating notifications for interactive simulated actions
  const [bubbles, setBubbles] = useState<Array<{ id: number; text: string; x: number; y: number }>>([]);

  // Load stats from localStorage or hook standard counts
  const loadStats = () => {
    const raw = localStorage.getItem('cake_product_metrics');
    let currentMetrics: Record<string, { clicks: number; sales: number }> = {};
    if (raw) {
      try {
        currentMetrics = JSON.parse(raw);
      } catch {
        currentMetrics = { ...INITIAL_STATS };
      }
    } else {
      currentMetrics = { ...INITIAL_STATS };
      localStorage.setItem('cake_product_metrics', JSON.stringify(currentMetrics));
    }

    // Merge with master PRODUCTS list
    const list: ProductStats[] = PRODUCTS.map(p => {
      // Extract numeric value from "NT$ 280" -> 280
      const priceVal = parseInt(p.price.replace(/[^0-9]/g, ''), 10) || 0;
      const m = currentMetrics[p.id] || { clicks: 100, sales: 20 };
      return {
        id: p.id,
        name: p.name,
        subName: p.subName,
        image: p.image,
        price: priceVal,
        clicks: m.clicks,
        sales: m.sales
      };
    });

    setStatsList(list);
  };

  useEffect(() => {
    loadStats();

    // Listen to custom window events for click tracking
    const handleProductClickEvent = (e: any) => {
      const prodId = e.detail?.id;
      if (prodId) {
        incrementMetricInStorage(prodId, 'clicks', 1);
      }
    };

    window.addEventListener('track-product-click', handleProductClickEvent);
    return () => {
      window.removeEventListener('track-product-click', handleProductClickEvent);
    };
  }, [language]);

  const incrementMetricInStorage = (id: string, type: 'clicks' | 'sales', increment: number) => {
    const raw = localStorage.getItem('cake_product_metrics');
    let currentMetrics: Record<string, { clicks: number; sales: number }> = {};
    if (raw) {
      try {
        currentMetrics = JSON.parse(raw);
      } catch {
        currentMetrics = { ...INITIAL_STATS };
      }
    } else {
      currentMetrics = { ...INITIAL_STATS };
    }

    if (!currentMetrics[id]) {
      currentMetrics[id] = { clicks: 100, sales: 20 };
    }

    currentMetrics[id][type] += increment;
    localStorage.setItem('cake_product_metrics', JSON.stringify(currentMetrics));
    loadStats();
  };

  // Live simulation of traffic
  const handleSimulateTraffic = () => {
    if (trafficActive) return;
    setTrafficActive(true);
    setSimulationLogStr(language === 'zh' ? '正在載入動態流量伺服器...' : 'Initializing live traffic simulation...');

    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      // Select 1-2 random products to receive random hits
      const randomIndex1 = Math.floor(Math.random() * PRODUCTS.length);
      const randomProduct = PRODUCTS[randomIndex1];
      const isSale = Math.random() > 0.6; // 40% chance of a purchase, 60% click

      if (isSale) {
        incrementMetricInStorage(randomProduct.id, 'sales', 1);
        incrementMetricInStorage(randomProduct.id, 'clicks', 3); // Purchase also triggers view clicks
        
        // Spawn text bubble
        const text = `🎉 NT$ ${randomProduct.price} • ` + (language === 'zh' ? '成功售出' : 'Sold!');
        setBubbles(prev => [...prev, {
          id: Date.now() + Math.random(),
          text,
          x: 20 + Math.random() * 60,
          y: 35 + Math.random() * 30
        }]);

        setSimulationLogStr(
          language === 'zh' 
            ? `【售出】一位匿名顧客訂購了「${randomProduct.name}」` 
            : `[Order] Someone ordered \"${randomProduct.name}\"`
        );
      } else {
        incrementMetricInStorage(randomProduct.id, 'clicks', Math.floor(Math.random() * 5) + 1);
        
        // Spawn text bubble
        const text = `🔥 +Click`;
        setBubbles(prev => [...prev, {
          id: Date.now() + Math.random(),
          text,
          x: 20 + Math.random() * 60,
          y: 35 + Math.random() * 30
        }]);

        setSimulationLogStr(
          language === 'zh' 
            ? `【點擊】「${randomProduct.name}」獲得高頻點擊關注` 
            : `[View] \"${randomProduct.name}\" received view hits`
        );
      }

      // Cleanup oldest bubble after 1.5s
      setTimeout(() => {
        setBubbles(prev => prev.slice(1));
      }, 1500);

      if (ticks >= 15) {
        clearInterval(interval);
        setTrafficActive(false);
        setSimulationLogStr(language === 'zh' ? '模擬流量分析完成。數據已入庫。' : 'Simulation complete. Metrics synced.');
      }
    }, 450);
  };

  // Soft Reset helper
  const handleResetMetrics = () => {
    localStorage.setItem('cake_product_metrics', JSON.stringify(INITIAL_STATS));
    loadStats();
    setSimulationLogStr(language === 'zh' ? '已重設為主廚原廠 baseline 數據。' : 'Metrics reset to chef base data.');
  };

  // Sort and pick top items
  const sortedStats = [...statsList].sort((a, b) => {
    if (metric === 'clicks') return b.clicks - a.clicks;
    return b.sales - a.sales;
  });

  const top3 = sortedStats.slice(0, 3);

  // Suggested Combo Formats based on current Top ranking components
  const COMBOS: any[] = [];

  const currentCombo = COMBOS[activeComboIndex] || COMBOS[0];

  // Price solver for standard combos
  const getComboPrice = (combo: { items: string[]; fixedDiscount?: number; discountRate?: number } | undefined) => {
    let originalTotal = 0;
    if (!combo) return { originalTotal: 0, finalComboPrice: 0, itemsDetail: [] };
    const itemsDetail = combo.items.map(itemId => {
      const match = PRODUCTS.find(p => p.id === itemId);
      const priceVal = match ? parseInt(match.price.replace(/[^0-9]/g, ''), 10) || 0 : 0;
      originalTotal += priceVal;
      return { name: match?.name || itemId, price: priceVal };
    });

    let finalComboPrice = originalTotal;
    if (combo.discountRate) {
      finalComboPrice = Math.round(originalTotal * combo.discountRate);
    } else if (combo.fixedDiscount) {
      finalComboPrice = originalTotal - combo.fixedDiscount;
    }

    return { originalTotal, finalComboPrice, itemsDetail };
  };

  const { originalTotal, finalComboPrice, itemsDetail } = getComboPrice(currentCombo);

  // Add all combination items to the global cart at once
  const handleAddComboToCart = () => {
    if (!currentCombo) return;
    const matchedProducts = currentCombo.items.map(itemId => PRODUCTS.find(p => p.id === itemId)).filter(Boolean);
    
    // We add them as linked items in one customized bundle
    const comboCartItem = {
      id: `combo-pack-${Date.now()}`,
      name: `🧁 主廚組合 • ${currentCombo.title}`,
      price: finalComboPrice,
      size: '份量套裝 (Combo Set)',
      remarks: `主廚私藏榜推薦：「${currentCombo.title}」，內含：${itemsDetail.map(i => i.name).join(' ✖ ')}`,
      candleType: 'none',
      cutleryCount: 2,
      isComboSet: true,
      itemsIncluded: matchedProducts.map(p => ({ id: p?.id, name: p?.name }))
    };

    // Trigger cart utility
    onAddToCart(comboCartItem);

    // Track simulated sell-through directly in live metrics
    currentCombo.items.forEach(itemId => {
      incrementMetricInStorage(itemId, 'sales', 1);
    });
  };

  return (
    <div className="mt-20 border-t border-ink/10 pt-20">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h3 className="text-xs font-bold tracking-[0.4em] mb-3 text-berry uppercase flex items-center gap-2">
            <Award size={13} /> Exclusive Chef Recommendation
          </h3>
          <h4 className="text-3xl md:text-4xl font-display font-black tracking-tight text-ink">
            {language === 'zh' ? '主廚私藏熱度榜' : 'Chef’s Bestseller Rank'}
          </h4>
          <p className="text-xs text-ink/50 mt-2 max-w-xl leading-relaxed">
            {language === 'zh' 
              ? '店內雲朵與微苦甜點的數據回饋。每一次顧客的點擊、細節預覽和下單購買，皆會觸發實時統計排名。' 
              : 'Live tracking of item clicks and verified customer purchases in our kitchen.'}
          </p>
        </div>

        {/* Metric selection controls */}
        <div className="flex bg-cake-dark p-1 rounded-full border border-ink/5 overflow-hidden shrink-0 select-none">
          <button
            onClick={() => setMetric('sales')}
            className={`px-5 py-2 rounded-full text-[10px] font-mono font-black tracking-wider transition-all uppercase ${
              metric === 'sales'
                ? 'bg-berry text-white shadow'
                : 'text-ink/65 hover:text-ink'
            }`}
          >
            🔥 {language === 'zh' ? '銷量排行' : 'Sales Rank'}
          </button>
          <button
            onClick={() => setMetric('clicks')}
            className={`px-5 py-2 rounded-full text-[10px] font-mono font-black tracking-wider transition-all uppercase ${
              metric === 'clicks'
                ? 'bg-berry text-white shadow'
                : 'text-ink/65 hover:text-ink'
            }`}
          >
            👀 {language === 'zh' ? '點擊熱度' : 'Click Volume'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Podium / Rankings */}
        <div className={`${COMBOS.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4 flex flex-col justify-between`}>
          
          <div className="space-y-3.5">
            {top3.map((item, index) => {
              const rankColor = index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-stone-400' : 'bg-amber-700/70';
              const isTop = index === 0;

              return (
                <motion.div
                  key={item.id}
                  layoutId={`rank-card-${item.id}`}
                  className={`relative overflow-hidden p-5 rounded-[1.75rem] border transition-all flex items-center gap-5 cursor-pointer ${
                    isTop 
                      ? 'bg-white shadow-xl border-amber-500/20 shadow-amber-500/5' 
                      : 'bg-white/80 hover:bg-white border-ink/5 shadow-sm'
                  }`}
                  onClick={() => onSelectProduct(item.id)}
                >
                  {/* Rank Sticker */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-base shrink-0 ${rankColor}`}>
                    {index + 1}
                  </div>

                  {/* Product thumbnail */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 border border-ink/5 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Primary info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h5 className="font-display font-medium text-lg text-ink truncate pr-1">
                        {language === 'zh' ? item.name : item.subName}
                      </h5>
                      {isTop && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[8px] rounded font-mono font-extrabold uppercase tracking-wide">
                          TOP HOT
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-ink/45 font-mono truncate">{item.subName}</p>
                  </div>

                  {/* Dynamic interactive metric readouts with micro bars */}
                  <div className="text-right shrink-0 pr-1">
                    <span className="text-sm font-bold tracking-tight block text-berry">
                      {convertPrice(item.price)}
                    </span>
                    <span className="text-[10px] font-mono text-ink/50 block mt-0.5">
                      {metric === 'clicks' 
                        ? `👁 ${item.clicks.toLocaleString()} views` 
                        : `🛒 ${item.sales.toLocaleString()} sold`}
                    </span>
                  </div>

                  {/* Soft Background absolute progress percentage line */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-berry/15 transition-all duration-500 rounded-b-full pointer-events-none" 
                    style={{ 
                      width: metric === 'clicks' 
                        ? `${Math.min(100, (item.clicks / 2000) * 100)}%`
                        : `${Math.min(100, (item.sales / 800) * 100)}%`
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Simulation Console Frame */}
          <div className="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl border border-ink/5 p-5 mt-4">
            
            {/* Spawn container inside for simulation bubbles feedback */}
            <AnimatePresence>
              {bubbles.map(b => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: -45, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute pointer-events-none px-2.5 py-1 bg-berry text-white text-[9.5px] font-mono font-black tracking-wider rounded-lg shadow-lg z-50 select-none whitespace-nowrap"
                  style={{ left: `${b.x}%`, top: `${b.y}%` }}
                >
                  {b.text}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-mono font-black tracking-widest text-[#9A3412] uppercase flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${trafficActive ? 'bg-orange-500 animate-ping' : 'bg-stone-400'}`} />
                  {language === 'zh' ? '物理數據模擬操作' : 'PHYSICAL SIMULATION CONTROLLER'}
                </p>
                <p className="text-[11.5px] text-ink/70 font-mono">
                  {simulationLogStr || (language === 'zh' ? '狀態: 準備就緒。點擊一鍵模擬注入顧客點擊率。' : 'Status: Ready. Click to inject simulated shop traffic.')}
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto self-stretch sm:self-auto shrink-0 select-none">
                <button
                  onClick={handleResetMetrics}
                  className="px-4 py-2.5 bg-stone-150 hover:bg-stone-200 text-[10px] font-mono text-stone-700 transition-colors rounded-xl border border-stone-300"
                >
                  重置數據
                </button>
                <button
                  onClick={handleSimulateTraffic}
                  disabled={trafficActive}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-stone-900 hover:bg-stone-850 disabled:bg-stone-400 text-white text-[10px] font-mono tracking-wider font-extrabold uppercase rounded-xl transition-colors shadow flex items-center justify-center gap-1.5"
                >
                  <RefreshCw size={11} className={trafficActive ? 'animate-spin' : ''} />
                  {language === 'zh' ? '一鍵流量模擬' : 'Simulate Traffic'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pre-packaged Suggested Combo Pack */}
        {COMBOS.length > 0 && (
          <div className="lg:col-span-5 bg-stone-900 text-stone-100 rounded-[2.5rem] p-7 md:p-8 flex flex-col justify-between border border-stone-950 shadow-2xl relative">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-berry/10 filter blur-2xl rounded-full pointer-events-none" />

            {/* Heading with single combo details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-stone-850 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-extrabold flex items-center gap-1">
                  <Sparkles size={11} />
                  {language === 'zh' ? '主廚特調組合' : 'CHEF EXCLUSIVE COMBO'}
                </span>
                <span className="px-2 py-0.5 bg-amber-500 text-stone-950 font-mono text-[9px] uppercase font-black tracking-wider rounded">
                  Recommended
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl md:text-2xl font-serif font-black tracking-tight text-white leading-tight">
                  {currentCombo?.title}
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  {currentCombo?.desc}
                </p>
              </div>

              {/* List of items inside combo on the shelf */}
              <div className="bg-stone-950/40 rounded-2xl p-4.5 border border-stone-800 space-y-3 mt-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 block">
                  Combo Contents / 組合包含品項
                </span>
                <div className="space-y-2.5">
                  {currentCombo?.items.map((itemId: string) => {
                    const match = PRODUCTS.find(p => p.id === itemId);
                    if (!match) return null;
                    return (
                      <div key={itemId} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                          <span className="font-serif font-medium text-stone-200">
                            {language === 'zh' ? match.name : match.subName}
                          </span>
                        </div>
                        <span className="text-stone-400 font-mono text-[11px]">
                          {match.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Calculation summary bottom block */}
            <div className="mt-8 border-t border-stone-850 pt-5 space-y-4">
              
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-stone-500 tracking-wider">
                    {language === 'zh' ? '原價總計' : 'Regular Total'}
                  </span>
                  <span className="text-sm font-mono text-stone-400 line-through block mt-0.5">
                    {convertPrice(originalTotal)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-amber-500/15 text-amber-500 text-[8.5px] rounded border border-amber-500/20 font-mono tracking-wide">
                    {currentCombo?.discountTxt}
                  </span>
                  <span className="text-3xl font-display font-black text-amber-500 tracking-tight block mt-1">
                    {convertPrice(finalComboPrice)}
                  </span>
                </div>
              </div>

              {/* Packaging CTA Pack Button */}
              <button
                onClick={handleAddComboToCart}
                className="w-full py-4 bg-amber-500 hover:bg-amber-450 text-stone-950 rounded-2xl text-xs font-mono font-black tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={14} className="stroke-[3px]" />
                {language === 'zh' ? '一鍵打包私藏組合' : 'One-Click Add Combo to Cart'}
              </button>
              <p className="text-[9.5px] text-stone-500 text-center font-mono">
                * 點擊加入組合將同時推高上述各單品的點擊數值。
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
