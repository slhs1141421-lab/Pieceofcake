import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Copy } from 'lucide-react';
import { useShop } from '../lib/ShopContext';

interface CrummyMascotProps {
  onClaim?: () => void;
}

interface ConfettiItem {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  duration: number;
  char: string;
  color: string;
}

const PASTEL_COLORS = ['#F2B5B5', '#FFF9F1', '#EB9FB0', '#FFD23F', '#4ea8de', '#70e000', '#f72585'];
const CAKE_ICONS = ['🍴', '🍰', '🧁', '🍓', '✨', '⭐', '🎈', '🍬'];

const MASCOT_TRANSLATIONS: Record<string, any> = {
  zh: {
    talks: ['點我有驚喜!'],
    bonus: "特別津貼",
    special_secret: "小偵探的驚喜密件 🕵️‍♂️✨",
    success_copied: "🎉 抓到口袋了！代碼已自動為您貼合至剪貼簿囉！",
    desc: "「抓到你了！這張 $88 的甜點津貼 現在屬於你。別擔心找不到它，代碼已經自動幫你複製好了！等一下結帳時，直接在欄位點擊『貼上』，幸福就降價囉！」",
    btn_copy: "一鍵抓入預算中",
    btn_copied: "已抓入預算中"
  },
  en: {
    talks: ['Click me for a surprise!'],
    bonus: "Special Allowance",
    special_secret: "Mascot's Hidden Secret 🕵️‍♂️✨",
    success_copied: "🎉 Caught! Coupon code copied to clipboard successfully!",
    desc: "Gotcha! This $88 dessert allowance coupon now belongs to you. Since it has already been copied to your clipboard, simply click 'Paste' during checkout to claim your savings!",
    btn_copy: "Grab Voucher Into Budget",
    btn_copied: "Saved in budget"
  },
  ja: {
    talks: ['クリックしてサプライズ！'],
    bonus: "特別割引チケット",
    special_secret: "チリ探偵の秘密のメッセージ 🕵️‍♂️✨",
    success_copied: "🎉 キャッチ！コードが自動的にクリップボードにコピーされました！",
    desc: "捕まえた！この $88 オフの特別割引コードはキミのもの。コードはコピー済みだから、注文画面のクーポンコード欄に「貼り付け」してね！幸せをお得に手に入れよう！",
    btn_copy: "ワンクリックで保存する",
    btn_copied: "予算に保存されました"
  },
  ko: {
    talks: ['클릭하면 선물이 있어요!'],
    bonus: "스페셜 용돈",
    special_secret: "꼬마 탐정의 깜짝 편지 🕵️‍♂️✨",
    success_copied: "🎉 성공! 쿠폰 번호가 클립보드에 자동 복사되었습니다!",
    desc: "잡았다! 이 $88 디저트 복지 쿠폰은 이제 당신 것입니다. 쿠폰 번호가 이미 복사되었으니 결제할 때 '붙여넣기' 하셔서 더 달콤한 혜택을 완성해 보세요!",
    btn_copy: "클립보드에 담기",
    btn_copied: "쿠폰북에 저장됨"
  }
};

export default function CrummyMascot({ onClaim }: CrummyMascotProps) {
  const { language } = useShop();
  const tMascot = MASCOT_TRANSLATIONS[language] || MASCOT_TRANSLATIONS['zh'];

  const [scrollPercent, setScrollPercent] = useState(0);
  const [mouseDistance, setMouseDistance] = useState(9999);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [isRetracted, setIsRetracted] = useState(false);
  const [showRitual, setShowRitual] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const retractTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDistanceRef = useRef(9999);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);

  // Initialize and synchronize bubbleText on language change
  useEffect(() => {
    setBubbleText(tMascot.talks[0]);
  }, [language]);

  // Track window scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track mouse distance to Crummy
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || showRitual) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - elementX, 2) + Math.pow(e.clientY - elementY, 2)
      );
      setMouseDistance(distance);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showRitual]);

  // Handle Speech Bubble Toggling
  useEffect(() => {
    if (showRitual) {
      setShowSpeechBubble(false);
      return;
    }
    
    // Always show speech bubble by default when mascot appears so it is easily discoverable!
    const options = tMascot.talks;
    setBubbleText(options[0]);
    setShowSpeechBubble(true);
  }, [showRitual, tMascot]);

  // Handle direct Hover/Retraction Attempt
  const handleMouseEnterOrClose = () => {
    if (showRitual) return;
    
    // Competitiveness game: mouse gets too close (direct hover)
    // Retract 20px to the right immediately, then pop back out after 1 second
    if (!isRetracted) {
      setIsRetracted(true);
      setShowSpeechBubble(false);
      
      if (retractTimeoutRef.current) clearTimeout(retractTimeoutRef.current);
      retractTimeoutRef.current = setTimeout(() => {
        setIsRetracted(false);
      }, 1000);
    }
  };

  // Generate sprinkles and fork icons burst
  const generateConfettiBurst = () => {
    const burst: ConfettiItem[] = [];
    for (let i = 0; i < 40; i++) {
      // Random coordinates shooting outward from center
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 320;
      burst.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.5 + Math.random() * 1.2,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
        duration: 1.5 + Math.random() * 2,
        char: CAKE_ICONS[Math.floor(Math.random() * CAKE_ICONS.length)],
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)]
      });
    }
    setConfetti(burst);
  };

  // Handle Click / Catching Crummy
  const handleCatch = () => {
    if (showRitual) return;
    generateConfettiBurst();
    setShowRitual(true);
    // Force play a fun bubble sound if allowed, or logs
    console.log("Crummy is caught! Showing digital sprinkles ceremony.");
  };

  // Copy Coupon Code SECRET88
  const handleClaimReward = async () => {
    try {
      await navigator.clipboard.writeText('SECRET88');
      setIsCopied(true);
      localStorage.setItem('sweet_salon_claimed_secret88', 'true');
      
      // Dispatch a storage-like notification event so other components receive it instantly
      window.dispatchEvent(new Event('sweet_salon_claimed_coupon'));
      
      if (onClaim) {
        onClaim();
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Visibility logic by Scroll percentage
  // Sleeping (0% - 3%): Hidden to keep hero header clean.
  // Over 3%: Active, bobbing, and fully accessible.
  const isSleeping = scrollPercent <= 3;
  
  // Custom bobbing class for adorable subtle breathing animation
  const bobbingAnimation = {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <>
      {/* 🍰 Mascot Container */}
      <div 
        ref={containerRef}
        style={{ zIndex: 150 }}
        className="fixed bottom-24 right-0 pointer-events-auto transition-all duration-300 pointer-events-auto"
      >
        <AnimatePresence>
          {!isSleeping && (
            <motion.div
              initial={{ x: 120, opacity: 0 }}
              animate={{ 
                x: isRetracted ? 20 : -10, // Retracts right 20px on hover attempt
                opacity: 1,
                rotate: isRetracted ? [0, -10, 10, 0] : 0
              }}
              exit={{ x: 120, opacity: 0 }}
              transition={{ 
                x: { type: 'spring', damping: 20, stiffness: 300 },
                rotate: { type: 'keyframes', duration: 0.5 },
                default: { duration: 0.3 }
              }}
              className="relative flex flex-col items-end cursor-pointer"
            >
              {/* Adorable speech bubble */}
              <AnimatePresence>
                {showSpeechBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 15 }}
                    className="absolute bottom-24 right-8 bg-[#FFF9F1] border-2 border-[#F1E2D3] px-4 py-2.5 rounded-full shadow-lg whitespace-nowrap text-[11px] font-black text-stone-800 z-55 flex items-center justify-center arrow-bottom select-none"
                  >
                    <span>{bubbleText}</span>
                    <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-[#FFF9F1] border-r-2 border-b-2 border-[#F1E2D3] rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Core Visual of Crummy Mascot */}
              <motion.div
                animate={isRetracted ? {} : bobbingAnimation}
                onMouseEnter={handleMouseEnterOrClose}
                onClick={handleCatch}
                className="relative group pr-4 focus:outline-none"
              >
                {/* Whipped cream and strawberry top crown */}
                <div className="absolute -top-4.5 left-1/2 -translate-x-[65%] flex flex-col items-center z-10 select-none pointer-events-none group-hover:scale-110 transition-transform">
                  <span className="text-lg leading-none filter drop-shadow-md">🍓</span>
                  <div className="w-5.5 h-3.5 bg-white border border-[#F2B5B5] rounded-full -mt-1.2 flex items-center justify-center shadow-xs" />
                </div>

                {/* Main strawberry whipped cream cake head shape */}
                <div className="w-18 h-18 rounded-full bg-[#FFF9F1] border-4 border-[#F2B5B5] shadow-xl flex items-center justify-center relative overscroll-none overflow-hidden hover:border-[#EB9FB0] transition-colors">
                  {/* Subtle frosting swirl background border */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#F2B5B5]/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Glowing core cheek and eye details */}
                  <div className="flex gap-2.5 mt-2.5 z-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />
                      <div className="w-3.5 h-1.5 bg-[#F2B5B5]/85 rounded-full" />
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />
                      <div className="w-3.5 h-1.5 bg-[#F2B5B5]/85 rounded-full" />
                    </div>
                  </div>

                  {/* High contrast visual indicator */}
                  <div className="absolute bottom-1 right-2 bg-rose-500 w-1.5 h-1.5 rounded-full animate-ping pointer-events-none" />
                </div>

                {/* Tiny hidden hint */}
                <span className="absolute -bottom-1 right-8 text-[8px] font-black text-[#F2B5B5] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase select-none">
                  CATCH ME ✨
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🎫 The Reveal Ritual Full Screen Overlay Modal */}
      <AnimatePresence>
        {showRitual && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 overflow-hidden select-none">
            {/* Soft Translucent Cream Blur Canvas Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#FFF9F1]/95 backdrop-blur-xl"
            />

            {/* Sprinkles and fork icons shooting animation container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-1">
              {confetti.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ 
                    x: c.x, 
                    y: c.y, 
                    opacity: [1, 1, 0], 
                    scale: c.scale,
                    rotate: c.rotation
                  }}
                  transition={{ 
                    delay: c.delay,
                    duration: c.duration,
                    ease: "easeOut"
                  }}
                  className="absolute text-xl font-bold"
                  style={{ color: c.color }}
                >
                  {c.char}
                </motion.div>
              ))}
            </div>

            {/* Digital Ticket Container Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative z-10 w-full max-w-xl bg-white rounded-[3.5rem] border-8 border-white shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => {
                  setShowRitual(false);
                  setIsCopied(false);
                }}
                className="absolute top-5 right-5 z-20 p-2 bg-stone-50 text-stone-500 hover:text-stone-900 rounded-full border border-stone-100 transition-all active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT SIDE: Round jagged coupon seam, styled title */}
              <div className="md:w-1/3 bg-[#F2B5B5]/20 p-8 flex flex-col items-center justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-dashed border-[#F2B5B5] overflow-hidden">
                {/* Physical Ticket Scalloped Circles Mockups */}
                <div className="hidden md:block absolute -top-4 right-[-10px] w-6 h-6 bg-[#FFF9F1] border-b-4 border-white rounded-full z-10" />
                <div className="hidden md:block absolute -bottom-4 right-[-10px] w-6 h-6 bg-[#FFF9F1] border-t-4 border-white rounded-full z-10" />

                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm mb-3 mx-auto">
                    🎫
                  </div>
                  <h4 className="font-sans font-black text-sm text-stone-800 tracking-tight leading-snug">
                    Piece of cake <br />
                    {tMascot.bonus}
                  </h4>
                  <span className="text-[10px] font-mono text-[#E63946] font-bold block pt-1.5 border-t border-rose-200/55 uppercase tracking-wider">
                    SPECIAL BONUS
                  </span>
                </div>
              </div>

              {/* MIDDLE / RIGHT CONTENT: Large code & Action CTA card */}
              <div 
                className="md:w-2/3 p-8 md:p-10 flex flex-col justify-between items-center bg-radial-grid text-center space-y-6 relative"
                style={{
                  backgroundImage: 'radial-gradient(circle, #fbf7f3 15%, transparent 16%)',
                  backgroundSize: '12px 12px'
                }}
              >
                {/* Title */}
                <div>
                  <div className="inline-flex gap-1.5 items-center justify-center px-3 py-1 bg-amber-100/60 rounded-full border border-amber-200 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin [animation-duration:12s]" />
                    <span className="text-[9.5px] text-amber-800 font-extrabold tracking-widest leading-none">
                      SHERLOCK CRUMMY
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-black text-stone-900 tracking-tight">
                    {tMascot.special_secret}
                  </h3>
                </div>

                {/* Plaid style code box */}
                <div className="w-full bg-stone-50/80 p-5 rounded-2xl border-2 border-stone-200/60 relative">
                  <span className="text-[8px] font-black text-stone-400 absolute top-2 left-3 uppercase tracking-wider">
                    DECRYPTED COUPON CODE
                  </span>
                  <div className="text-3xl font-mono font-black tracking-[0.2em] text-[#E63946] pl-2 drop-shadow-xs py-1 selection:bg-rose-100 uppercase">
                    SECRET88
                  </div>
                </div>

                {/* Instructional Text */}
                <p className="text-[11.5px] text-stone-500 font-semibold leading-relaxed max-w-sm">
                  {isCopied ? (
                    <span className="text-[#E63946] font-black block animate-pulse">
                      {tMascot.success_copied}
                    </span>
                  ) : null}
                  {tMascot.desc}
                </p>

                {/* Big Action Button */}
                <div className="w-full">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleClaimReward}
                    className={`w-full py-4.5 rounded-2xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isCopied 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-stone-900 hover:bg-[#E63946] text-white hover:shadow-lg'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{tMascot.btn_copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{tMascot.btn_copy}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
