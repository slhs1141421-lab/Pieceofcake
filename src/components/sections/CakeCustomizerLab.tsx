import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../lib/ShopContext';
import { 
  Sparkles, Layers, Sliders, Check, ShoppingCart, 
  RotateCcw, Compass, Info, Award, HelpCircle
} from 'lucide-react';

interface IngredientBase {
  id: string;
  name: string;
  specs: string;
  desc: string;
  color: string;
  textColor: string;
}

interface IngredientCore {
  id: string;
  name: string;
  specs: string;
  desc: string;
  color: string;
}

// 1. Foundation Options - Completely flat color representations
const BASES: IngredientBase[] = [
  {
    id: 'chiffon',
    name: '雲朵戚風 (Airy Chiffon)',
    specs: '馬卡龍淺黃色系幾何塊面',
    desc: '蓬鬆輕質的鵝黃基座，象徵純粹的平面美學與柔軟邊界。',
    color: '#FCF7DA',
    textColor: '#854D0E'
  },
  {
    id: 'brownie',
    name: '熔岩布朗尼 (Rich Brownie)',
    specs: '高壓深棕黑巧穩重極簡量體',
    desc: '高飽和的可可深啡幾何體，為頂部配料搭建穩固的色調壓艙。',
    color: '#2A1713',
    textColor: '#FCD34D'
  },
  {
    id: 'sablee',
    name: '法式酥脆塔皮 (Pâte Sablée)',
    specs: '焦香橙黃色調均值結構',
    desc: '洗鍊的暖橘褐色塔座，勾勒出極度舒適的幾何底線。',
    color: '#D2914E',
    textColor: '#ffffff'
  }
];

// 2. Core Flow Options - Flat drip colors
const CORES: IngredientCore[] = [
  {
    id: 'caramel',
    name: '海鹽焦糖醬 (Sea-salt Caramel)',
    specs: '金黃太妃流動液滴色塊',
    desc: '規律流瀉的鹹甜焦糖塊面，提供暖色調的規整律動感。',
    color: '#AA581E'
  },
  {
    id: 'berry',
    name: '野莓果凝 (Artisan Berry Compote)',
    specs: '高明度寶石紅流汁色塊',
    desc: '亮麗的深紅漿果液體，以邊界清晰的色滴點綴蛋糕外沿。',
    color: '#B00E2F'
  },
  {
    id: 'chocolate',
    name: '黑巧流心 (Dark Fondant)',
    specs: '極低調濃墨可可阻性滴落',
    desc: '深沉純粹的黑巧液，與暖色基底構成強烈的明暗幾何拉鋸。',
    color: '#1F100E'
  },
  {
    id: 'matcha',
    name: '小山園抹茶 (Uji Matcha Compote)',
    specs: '寂靜深邃洗滌翠綠塊面',
    desc: '草木原萃的濃郁翠綠，為蛋糕抹上純粹清爽的高對比平衡。',
    color: '#0A3B1C'
  }
];

interface CakeCustomizerLabProps {
  onAddToCart: (item: any) => void;
}

export default function CakeCustomizerLab({ onAddToCart }: CakeCustomizerLabProps) {
  const { language, convertPrice } = useShop();

  // Basic options states (fully flat vectors) - no default values
  const [base, setBase] = useState<IngredientBase | null>(null);
  const [core, setCore] = useState<IngredientCore | null>(null);

  // Size option: 4-inch, 6-inch, 8-inch
  const [size, setSize] = useState<'4inch' | '6inch' | '8inch' | null>(null);
  
  // Candle option: none, slim, number
  const [candle, setCandle] = useState<'none' | 'slim' | 'number' | null>(null);
  const [candleNum, setCandleNum] = useState<number>(5);

  // Cutlery sets: 0 set, 1 set, 2 sets
  const [cutlery, setCutlery] = useState<number | null>(null);

  // Dynamic Ornaments states (as flat layers, priced per item)
  const [hasChocolateShards, setHasChocolateShards] = useState<boolean>(false);
  const [hasSprinkles, setHasSprinkles] = useState<boolean>(false);
  const [hasPixelDust, setHasPixelDust] = useState<boolean>(false);

  // Success Notification state
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Submit and Toggle back state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Reset helper to snap back to unselected configurations
  const handleReset = () => {
    setBase(null);
    setCore(null);
    setSize(null);
    setCandle(null);
    setCandleNum(5);
    setCutlery(null);
    setHasChocolateShards(false);
    setHasSprinkles(false);
    setHasPixelDust(false);
    setIsSubmitted(false);
  };

  // Pricing Logic (Base Cost + Layers + Custom Accessories)
  const basePrice = base ? 500 : 0;
  const chocolateShardsCost = (base && hasChocolateShards) ? 50 : 0;
  const sprinklesCost = (base && hasSprinkles) ? 30 : 0;
  const pixelDustCost = (base && hasPixelDust) ? 20 : 0;

  const sizeCost = size === '6inch' ? 150 : size === '8inch' ? 300 : 0;
  const candleCost = candle === 'number' ? 10 : 0;
  const cutleryCost = 0;

  const finalTotal = (base && core)
    ? (basePrice + chocolateShardsCost + sprinklesCost + pixelDustCost + sizeCost + candleCost + cutleryCost)
    : 0;

  // Structural aesthetics analysis mapping (去心理化與去構造化 - 色彩與比例美學)
  const getSymmetryReport = () => {
    if (!base) {
      return {
        title: language === 'zh' ? '幾何探索中' : 'Awaiting Recipe Input',
        desc: language === 'zh' 
          ? '請選擇下方的幾何基座探索極簡美學結構與色彩配置。'
          : 'Please select a solid base below to initiate structural balance.'
      };
    }
    if (base.id === 'brownie') {
      return {
        title: language === 'zh' ? '深色系幾何平衡' : 'Dark Geometric Balance',
        desc: language === 'zh' 
          ? '利用深棕色主體與頂層幾何配料的俐落切割，在封閉體態中構建出具備極簡現代感的視覺平衡。'
          : 'Utilizing rich cocoa elements contrasted with razor-flat geometric toppings to craft high balance.'
      };
    }
    if (base.id === 'chiffon') {
      return {
        title: language === 'zh' ? '馬卡龍色系散點' : 'Macaron Palette Scattering',
        desc: language === 'zh'
          ? '以淺色調圓角幾何主體結合頂部規律鋪排的純色扁平糖點，呈現富含節奏感的東方禪意美學。'
          : 'Blending pastel bases with neatly ordered flat point motifs to inspire rhythm and digital playfulness.'
      };
    }
    // Default fallback Sablée combination
    return {
      title: language === 'zh' ? '暖焦糖質樸線條' : 'Warm-Caramel Rustic Edges',
      desc: language === 'zh'
        ? '以和諧的黃金色層對比俐落垂直輪廓，強調純色塊面的視覺厚實度與絕對極簡主義。'
        : 'Aligning rustic amber with straight-forward flat flows to create warm color blocks and heavy focus.'
    };
  };

  const report = getSymmetryReport();

  const missingOptions: string[] = [];
  if (!base) missingOptions.push(language === 'zh' ? '基座' : 'Base');
  if (!core) missingOptions.push(language === 'zh' ? '流溢' : 'Drips');
  if (!size) missingOptions.push(language === 'zh' ? '尺寸' : 'Size');
  if (!candle) missingOptions.push(language === 'zh' ? '蠟燭' : 'Candle');
  if (cutlery === null) missingOptions.push(language === 'zh' ? '餐具' : 'Cutlery');

  const isAllSelected = missingOptions.length === 0;

  // Handle customizable cart placement
  const handleAddToCartCustom = () => {
    if (isSubmitted) {
      // 再次按下時恢復原始值
      handleReset();
      return;
    }

    if (!isAllSelected) {
      return;
    }

    // Default fallbacks in case they submit with empty choices (user friendly option)
    const finalBase = base || BASES[0];
    const finalCore = core || CORES[0];
    const finalSize = size || '4inch';
    const finalCandle = candle || 'none';
    const finalCutlery = cutlery === null ? 1 : cutlery;

    // Generate active ornaments string for checkout description
    const ornamentsList = [
      hasChocolateShards ? '幾何巧克力片' : null,
      hasSprinkles ? '扁平化糖珠' : null,
      hasPixelDust ? '極簡粉末裝飾' : null
    ].filter(Boolean).join(' ✖ ') || '純素平面';

    const renderSizeStr = finalSize === '4inch' ? '4 吋' : finalSize === '6inch' ? '6 吋' : '8 吋';
    const renderCandleStr = finalCandle === 'none' ? '不需要蠟燭' : finalCandle === 'slim' ? '單支直立蠟燭' : `數字蠟燭 (${candleNum})`;
    const renderCutleryStr = finalCutlery === 0 ? '自備餐具' : `${finalCutlery} 組 (共 ${finalCutlery * 4} 入)`;

    const customCakeItem = {
      id: `custom-sticker-cake-${Date.now()}`,
      name: language === 'zh' 
        ? `【幾何客製】${finalBase.name.split(' ')[0]} ✖ ${finalCore.name.split(' ')[0]} (${renderSizeStr})`
        : `[Custom Sticker] Chibi Chiffon & Flat Geometric Cake (${renderSizeStr})`,
      price: finalTotal,
      size: `${renderSizeStr} (Q版封裝)`,
      remarks: language === 'zh'
        ? `底座:${finalBase.name} | 流溢:${finalCore.name} | 蠟燭:${renderCandleStr} | 餐具:${renderCutleryStr} | 裝飾:[${ornamentsList}] | 美學:[${report.title}]`
        : `Base:${finalBase.name}, Drips:${finalCore.name}, Candle:${renderCandleStr}, Cutlery:${renderCutleryStr}, Layers:${ornamentsList}, Theme:${report.title}`,
      candleType: finalCandle === 'none' ? 'none' : finalCandle === 'slim' ? 'slim' : `number-${candleNum}`,
      cutleryCount: finalCutlery * 4,
      isCustomLabCake: true,
      diagnosticTitle: report.title,
      diagnosticCode: `ST_2D_${finalBase.id.toUpperCase()}_${finalCore.id.toUpperCase()}`
    };

    onAddToCart(customCakeItem);
    setShowNotification(true);
    setIsSubmitted(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4500);
  };

  return (
    <section id="custom-lab" className="py-24 bg-stone-100 border-t border-stone-250 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Flat Aesthetic Gallery Title Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-stone-250 pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-250/60 rounded-full text-[10px] font-mono tracking-widest text-stone-800 border border-stone-300 uppercase">
              <Layers size={11} className="text-berry" />
              Chibi Flat Geometric Laboratory
            </div>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight font-black text-stone-900 leading-none">
              Q版平面幾何研製室
            </h2>
            <p className="text-sm text-stone-600 font-sans leading-relaxed">
              {language === 'zh' 
                ? '進入極致「符號化」與「扁平化」的貼紙收藏箱。此處不展示剖面或情緒陰影，而是專注於幾何層次美感與純色圖層之堆疊。蛋糕將以完全封閉、飽和、正視的Q版幾何型物，演繹平面配料的絕對平衡。'
                : 'Step into a fully flat, stylized, sticker-inspired chibi vector design studio. Our architectural focus is front-on, closed-geometric, with zero shadows or gradients.'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2 lg:pt-0 shrink-0 select-none font-mono">
            <span className="text-[10px] font-bold tracking-wider px-3.5 py-2 bg-white shadow-sm border border-stone-250 rounded-xl text-stone-700">
              PERSPECTIVE: ZERO_PERSPECTIVE_2D
            </span>
            <span className="text-[10px] font-bold tracking-wider px-3.5 py-2 bg-white shadow-sm border border-stone-250 rounded-xl text-stone-700">
              STYLE: FLAT_STICKER_ICON
            </span>
          </div>
        </div>

        {/* Master Studio Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column A: Interactive Options (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Section 1: Foundation Base */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-250 pb-2">
                <h3 className="text-xs font-mono font-black tracking-widest text-stone-900 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-berry" />
                  01. 幾何基座 (Solid Base)
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {BASES.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setBase(item)}
                    className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      base?.id === item.id 
                        ? 'bg-stone-900 text-white border-stone-950 shadow ring-1 ring-stone-950' 
                        : 'bg-white text-stone-800 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs font-bold font-sans">{item.name}</span>
                      {base?.id === item.id && <Check size={13} className="text-[#A3E635]" />}
                    </div>
                    <span className="text-[8.5px] opacity-70 font-mono mt-0.5">{item.specs}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Core Flow Drip */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-250 pb-2">
                <h3 className="text-xs font-mono font-black tracking-widest text-stone-900 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-berry" />
                  02. 邊緣流溢 (Exterior Core flow)
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {CORES.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCore(item)}
                    className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      core?.id === item.id 
                        ? 'bg-stone-900 text-white border-stone-950 shadow ring-1 ring-stone-950' 
                        : 'bg-white text-stone-800 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs font-bold font-sans">{item.name}</span>
                      {core?.id === item.id && <Check size={13} className="text-[#A3E635]" />}
                    </div>
                    <span className="text-[8.5px] opacity-70 font-mono mt-0.5">{item.specs}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Specs Options (Size, Candle, Cutlery) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-250 pb-2">
                <h3 className="text-xs font-mono font-black tracking-widest text-stone-900 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-berry" />
                  03. 規格與配備 (Size & Accessories)
                </h3>
              </div>
              
              {/* Size Selectors */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-stone-500 block uppercase">
                  蛋糕尺寸 (Cake Size)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSize('4inch')}
                    className={`py-2.5 text-center text-xs font-mono rounded-xl border transition-all ${
                      size === '4inch'
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    4 吋 (+$0)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSize('6inch')}
                    className={`py-2.5 text-center text-xs font-mono rounded-xl border transition-all ${
                      size === '6inch'
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    6 吋 (+$150)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSize('8inch')}
                    className={`py-2.5 text-center text-xs font-mono rounded-xl border transition-all ${
                      size === '8inch'
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    8 吋 (+$300)
                  </button>
                </div>
              </div>

              {/* Candle Selectors */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-stone-500 block uppercase">
                  環保蠟燭 (Eco Candle)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCandle('none')}
                    className={`py-2.5 text-center text-[11px] font-sans rounded-xl border transition-all ${
                      candle === 'none'
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    不需要
                  </button>
                  <button
                    type="button"
                    onClick={() => setCandle('slim')}
                    className={`py-2.5 text-center text-[11px] font-sans rounded-xl border transition-all ${
                      candle === 'slim'
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    直立單支 (+$0)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCandle('number')}
                    className={`py-2.5 text-center text-[11px] font-sans rounded-xl border transition-all ${
                      candle === 'number'
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    數字蠟燭 (+$10)
                  </button>
                </div>
                {candle === 'number' && (
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-250 mt-1.5">
                    <span className="text-xs text-stone-600 font-sans">數字指定 :</span>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={candleNum}
                      onChange={(e) => setCandleNum(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 p-1 text-center font-mono font-bold border border-stone-350 rounded bg-stone-50"
                    />
                    <span className="text-[10px] text-stone-400 font-mono">歲 (0-99)</span>
                  </div>
                )}
              </div>

              {/* Cutlery Selectors */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-stone-500 block uppercase">
                  精緻餐具組 (Cutlery Packs)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCutlery(0)}
                    className={`py-2.5 text-center text-xs font-sans rounded-xl border transition-all ${
                      cutlery === 0
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    不需要
                  </button>
                  <button
                    type="button"
                    onClick={() => setCutlery(1)}
                    className={`py-2.5 text-center text-xs font-sans rounded-xl border transition-all ${
                      cutlery === 1
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    1 組 4入 (+$0)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCutlery(2)}
                    className={`py-2.5 text-center text-xs font-sans rounded-xl border transition-all ${
                      cutlery === 2
                        ? 'bg-stone-900 text-white border-stone-950 font-bold'
                        : 'bg-white text-stone-700 border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    2 組 8入 (+$0)
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Column B: Real-time 2D Sticker Studio Canvas Block (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Flat Scrapbook Page container card - changed to an elegant custard-yellow background */}
            <div className="relative bg-[#FBF6DC] rounded-[3rem] border border-stone-300 p-6 md:p-8 shadow-sm flex flex-col items-center justify-center min-h-[420px] overflow-hidden">
              
              {/* Studio Grid Overlay mapping stickers */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <div className="absolute top-6 left-6 flex items-center gap-1.5 font-mono text-[9px] text-stone-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>FLAT_STICKER_PREVIEW.SVG</span>
              </div>

              <div className="absolute top-6 right-6 font-mono text-[8.5px] text-stone-500 text-right">
                <span>VIEW: 正視圖 (FRONT_2D)</span>
              </div>

              {/* The Actual Flat Vector SVG Canvas Block */}
              <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center my-6">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 300 300"
                  className="w-full h-full drop-shadow-[0_8px_0_rgba(120,113,108,0.15)] drop-shadow-[0_16px_24px_rgba(0,0,0,0.06)]"
                >
                  {/* Thick white sticker outline cut border built behind the whole cake structure */}
                  <g filter="url(#sticker-shadow)">
                    {/* Simplified Cake Base (Thick round rectangle block with deep outline) */}
                    {base ? (
                      <rect 
                        x="60" 
                        y="110" 
                        width="180" 
                        height="120" 
                        rx="32" 
                        ry="32" 
                        fill={base.color} 
                        stroke="#1c1917" 
                        strokeWidth="8"
                        strokeLinejoin="round" 
                      />
                    ) : (
                      <rect 
                        x="60" 
                        y="110" 
                        width="180" 
                        height="120" 
                        rx="32" 
                        ry="32" 
                        fill="#fdfbf7" 
                        stroke="#d6d3d1" 
                        strokeWidth="4"
                        strokeDasharray="8 6"
                        strokeLinejoin="round" 
                      />
                    )}

                    {/* Drips of core flavor naturally flowing under front view flat edges */}
                    {core && base && (
                      <path
                        d="M 57,118 L 57,135 Q 57,155 70,155 Q 82,155 85,135 Q 87,125 102,125 Q 112,125 115,145 Q 118,165 128,165 Q 138,165 141,140 Q 143,125 158,125 Q 168,125 171,150 Q 174,175 185,175 Q 195,175 200,145 Q 203,125 218,125 Q 232,125 235,140 Q 237,155 243,155 L 243,118 Z"
                        fill={core.color}
                        stroke="#1c1917"
                        strokeWidth="8"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Overlay: Geometric Chocolate shards standing or lying on top edge */}
                    {hasChocolateShards && base && (
                      <g id="shards-group">
                        {/* Shard 1: Deep cocoa solid triangle */}
                        <polygon
                          points="110,110 135,70 160,110"
                          fill="#451a03"
                          stroke="#1c1917"
                          strokeWidth="8"
                          strokeLinejoin="round"
                        />
                        {/* Shard 2: Cream block solid semi circle */}
                        <path
                          d="M 85,110 A 20,20 0 0,1 125,110 Z"
                          fill="#b45309"
                          stroke="#1c1917"
                          strokeWidth="8"
                          strokeLinejoin="round"
                        />
                        {/* Shard 3: Smaller gold slice triangle */}
                        <polygon
                          points="140,110 162,75 182,110"
                          fill="#d97706"
                          stroke="#1c1917"
                          strokeWidth="8"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}

                    {/* Decorative layer: Perfectly circular flat candy sprinkles */}
                    {hasSprinkles && base && (
                      <g id="sprinkles-group">
                        <circle cx="95" cy="180" r="8" fill="#ec4899" stroke="#1c1917" strokeWidth="6" />
                        <circle cx="150" cy="195" r="6" fill="#f59e0b" stroke="#1c1917" strokeWidth="6" />
                        <circle cx="195" cy="175" r="9" fill="#06b6d4" stroke="#1c1917" strokeWidth="6" />
                        <circle cx="125" cy="205" r="7" fill="#10b981" stroke="#1c1917" strokeWidth="6" />
                      </g>
                    )}

                    {/* Decorative layer: Small pixel square powder accents */}
                    {hasPixelDust && base && (
                      <g id="pixeldust-group">
                        <rect x="78" y="135" width="8" height="8" fill="#f87171" stroke="#1c1917" strokeWidth="4" transform="rotate(15 78 135)" />
                        <rect x="110" y="152" width="7" height="7" fill="#fbbf24" stroke="#1c1917" strokeWidth="4" transform="rotate(45 110 152)" />
                        <rect x="172" y="138" width="8" height="8" fill="#60a5fa" stroke="#1c1917" strokeWidth="4" transform="rotate(-30 172 138)" />
                        <rect x="215" y="148" width="7" height="7" fill="#34d399" stroke="#1c1917" strokeWidth="4" transform="rotate(10 215 148)" />
                        <rect x="145" y="165" width="7" height="7" fill="#a78bfa" stroke="#1c1917" strokeWidth="4" transform="rotate(25 145 165)" />
                      </g>
                    )}
                  </g>

                  {/* Definition filters for nice clean thick outline sticker shadow look */}
                  <defs>
                    <filter id="sticker-shadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="8" stdDeviation="0" floodColor="#f5f5f4" floodOpacity="1" />
                    </filter>
                  </defs>
                </svg>
              </div>

              {(!base || !core) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50/[0.04] backdrop-blur-[1px] text-center p-6 pointer-events-none select-none">
                  <div className="text-3xl mb-2 animate-bounce duration-1000">🎨</div>
                  <span className="text-[11px] font-sans font-black text-stone-700 uppercase tracking-widest leading-none">
                    {language === 'zh' ? '幾何實驗室配方未解鎖' : 'Formulas Locked'}
                  </span>
                  <span className="text-[9px] font-sans font-bold text-stone-550 mt-1.5 max-w-[180px] leading-relaxed">
                    {language === 'zh' ? '請在左側面板選擇幾何基座與邊緣流溢' : 'Please select solid base & exterior core above'}
                  </span>
                </div>
              )}

            </div>

          </div>

          {/* Column C: Ornaments Toggles, Symmetry Beauty Analysis & Dynamic checkout (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6 lg:self-stretch flex flex-col justify-between">
            
            {/* Flat Ornaments layer Toggles */}
            <div className="bg-white rounded-3xl p-5 border border-stone-250 space-y-4">
              <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-stone-500">
                配料圖層配置 (ORMANENT LAYERS)
              </h4>
              
              <div className="space-y-2 select-none">
                <button
                  onClick={() => setHasChocolateShards(!hasChocolateShards)}
                  className={`w-full py-2.5 px-4 rounded-xl text-left border text-xs font-semibold font-sans flex items-center justify-between transition-all ${
                    hasChocolateShards 
                      ? 'bg-berry/5 text-berry border-berry/30' 
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {hasChocolateShards ? '⬡' : '⬡'} 幾何巧克力片
                  </span>
                  <span className="font-mono text-[10px] opacity-75">+$50</span>
                </button>

                <button
                  onClick={() => setHasSprinkles(!hasSprinkles)}
                  className={`w-full py-2.5 px-4 rounded-xl text-left border text-xs font-semibold font-sans flex items-center justify-between transition-all ${
                    hasSprinkles 
                      ? 'bg-berry/5 text-berry border-berry/30' 
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    ● 扁平化糖珠
                  </span>
                  <span className="font-mono text-[10px] opacity-75">+$30</span>
                </button>

                <button
                  onClick={() => setHasPixelDust(!hasPixelDust)}
                  className={`w-full py-2.5 px-4 rounded-xl text-left border text-xs font-semibold font-sans flex items-center justify-between transition-all ${
                    hasPixelDust 
                      ? 'bg-berry/5 text-berry border-berry/30' 
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    ▪ 微量像素粉末
                  </span>
                  <span className="font-mono text-[10px] opacity-75 font-bold">+$20</span>
                </button>
              </div>
            </div>

            {/* Symmetry style Analysis (色彩與比例美學) */}
            <div className="bg-white rounded-3xl p-5 border border-stone-250 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[10px] font-mono font-black text-[#B45309]">
                  <Award size={13} />
                  <span>色彩與比例美學分析</span>
                </div>

                <div className="space-y-2">
                  <h5 className="text-[13.5px] font-bold text-stone-900 border-l-2 border-berry pl-2">
                    {report.title}
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {report.desc}
                  </p>
                </div>
              </div>

              {/* Status information */}
              <div className="mt-4 pt-4 border-t border-stone-150 select-none">
                <span className="text-[8px] font-mono text-stone-400 block tracking-wide uppercase">
                  DIAGNOSTIC HIERARCHY / 2D_ST_DECOR
                </span>
                <span className="text-[10px] font-mono font-bold text-stone-700 block mt-0.5 uppercase">
                  ST-CALC: {base?.id || 'PENDING'}-{core?.id || 'PENDING'}
                </span>
              </div>
            </div>

            {/* Simple Pricing & Checkout Action Panel */}
            <div className="bg-stone-900 text-stone-100 rounded-[2.25rem] p-6 shadow-2xl space-y-4">
              
              <div className="flex justify-between items-end border-b border-stone-800 pb-4 select-none">
                <div>
                  <span className="text-[10px] font-mono text-stone-450 uppercase tracking-widest block">
                    {language === 'zh' ? '極簡建模費' : 'BASE MODEL FEE'}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400 mt-1 block">
                    {convertPrice(basePrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-stone-450 uppercase tracking-widest block">
                    {language === 'zh' ? '當前總計' : 'FINAL PRICE'}
                  </span>
                  <span className="text-2xl font-black text-amber-400 tracking-tight block mt-0.5 font-mono">
                    {convertPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Only [Reset] and [Confirm/Add to Cart] are sustained */}
              <div className="flex gap-2.5 select-none">
                <button
                  onClick={handleReset}
                  className="px-4 py-3.5 bg-stone-850 hover:bg-stone-800 text-stone-300 transition-colors rounded-xl text-xs font-mono border border-stone-750 flex items-center justify-center"
                  title="重置"
                >
                  <RotateCcw size={14} />
                </button>

                <button
                  onClick={handleAddToCartCustom}
                  disabled={!isSubmitted && !isAllSelected}
                  className={`flex-1 py-3.5 font-black tracking-wider text-xs rounded-xl transition-all font-mono flex items-center justify-center gap-2 shadow-lg ${
                    isSubmitted 
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/20 cursor-pointer' 
                      : !isAllSelected
                        ? 'bg-stone-850 text-stone-500 border border-stone-800 cursor-not-allowed shadow-none'
                        : 'bg-amber-400 hover:bg-amber-350 text-stone-950 cursor-pointer'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <RotateCcw size={13} className="stroke-[3px] animate-spin-slow" />
                      {language === 'zh' ? '已送出！再次按下恢復原始值' : 'Sent! Click to Reset'}
                    </>
                  ) : !isAllSelected ? (
                    <span className="text-[10px] text-stone-500">
                      ⚠️ {language === 'zh' ? `請選取：${missingOptions.join(' • ')}` : `Select: ${missingOptions.join(' • ')}`}
                    </span>
                  ) : (
                    <>
                      <ShoppingCart size={13} className="stroke-[3px]" />
                      {language === 'zh' ? '確制定價' : 'CONFIRM CUSTOM DESIGN'}
                    </>
                  )}
                </button>
              </div>

              {/* Float Notification Toast */}
              <AnimatePresence>
                {showNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-stone-950 border border-stone-850 text-[11px] text-stone-300 rounded-xl leading-snug flex items-center gap-2"
                  >
                    <span className="text-emerald-500">✦</span>
                    {language === 'zh' 
                      ? '客製幾何研製貼紙配方成功打包，已注入永續購物袋！' 
                      : 'Customized sticker formula loaded successfully to shopping bag!'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
