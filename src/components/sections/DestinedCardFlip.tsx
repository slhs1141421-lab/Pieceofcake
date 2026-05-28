import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, ShoppingBag, Heart, AlertCircle, Shuffle } from 'lucide-react';
import { PRODUCT_DATA } from '../../constants';
import { useShop } from '../../lib/ShopContext';

// Goofy quote banks localized for Traditional Chinese, English, Japanese, and Korean
const CARD_FLIP_TRANSLATIONS: Record<string, any> = {
  zh: {
    badge: "選擇困難症救星",
    title: "🧁 Piece of Cake 「命定甜點偵測器」",
    subtitle: "每個都想吃，大腦快當機了嗎？交給直覺，翻開這張牌，看看哪款甜點今天點名要跟你回家！",
    pairing: "🔮 命定磁場配對中...",
    pairing_sub1: "烘焙紙重疊中 • 貪心鬼模式配對",
    pairing_sub0: "攪拌器狂熱運轉中 • 塔皮酥鬆度確認",
    draw_badge: "誰是你的命定？",
    congrats: "✨ 恭喜！翻開了您的本日命定甜點 ✨",
    today_special: "本日主推 👑",
    sugar_warning: "⚠️ 全糖警告!",
    choose_specs: "挑選規格與尺寸 🍰",
    retry_fated: "我不信命，再抽一次 ⇆",
    retry_shuffle: "重新洗牌重新出發 🪄",
    easter1: "別再挑了，再抽下去蛋糕都要害羞了！",
    easter2: "這麼花心？難怪你選擇困難 (笑)！已為您掛載「全糖警告」",
    toast_keep: "🎉 已為您保留這份命定小確幸：",
    toast_go: "！快去結帳吧 💝",
    quotes: [
      "「叮咚！偵測成功！你的胃剛剛發來訊號，說它想見這一位。」",
      "「嗶嗶嗶！情緒掃描結果：你現在的體內含糖量偏低，建議立即補充這一份療癒。」",
      "「別猶豫了，這款甜點剛剛在後台說它想跟你走。」",
      "「我看見了...你的下午茶時光，缺的就是這一味！」",
      "「這是跨越了 50 幾種食譜，才終於與你相遇的命定款。」",
      "「別看其他的了，今天就是我。跟我回家吧！」",
      "「我知道你在想什麼，不用懷疑，你的直覺是對的。」"
    ]
  },
  en: {
    badge: "Indecision Savior",
    title: "🧁 Destiny Dessert Detector",
    subtitle: "Can't choose? Is your brain about to freeze? Trust your intuition, flip a card and see which dessert nominated itself to go home with you today!",
    pairing: "🔮 Matching Destined Aura...",
    pairing_sub1: "Overlapping Baking Paper • Greedy Match Mode",
    pairing_sub0: "Whisk Spinning Wildly • Confirming Tart Crust Flakiness",
    draw_badge: "Who is your destiny?",
    congrats: "✨ Congrats! You flipped your Destined Dessert of the day ✨",
    today_special: "Today's Special 👑",
    sugar_warning: "⚠️ Full Sugar Warning!",
    choose_specs: "Choose Size & Styling 🍰",
    retry_fated: "I don't believe in fate, pull again! ⇆",
    retry_shuffle: "Reshuffle & Start Over 🪄",
    easter1: "Stop picking, the cakes are getting shy if you keep drawing!",
    easter2: "So fickle-minded? No wonder you have choice paralysis (haha)! Full Sugar warning loaded.",
    toast_keep: "🎉 We reserved this destined piece of happiness: ",
    toast_go: "! Go check out now 💝",
    quotes: [
      "Ding-dong! Detection successful! Your stomach just sent a signal saying it wants to meet this one.",
      "Bip bip bip! Emotion scan result: your sugar levels are low, immediate sweet healing is recommended.",
      "Don't hesitate, this dessert in the kitchen lobby just said it wants to go home with you.",
      "I see it... My vision of your afternoon coffee breaks lacks this exact flavor!",
      "This is your fated match, meeting you after crossing more than 50 recipes.",
      "Don't look at others, it is me today. Come home with me!",
      "I know what you are thinking, no need to doubt, your instincts are spot-on."
    ]
  },
  ja: {
    badge: "優柔不断の救世主",
    title: "🧁 「運命のスイーツ検出器」",
    subtitle: "どれも美味しそうで迷っちゃう？ 直感に任せて、このカードを引いてみましょう！今日あなたを指名したスイーツはどれ？",
    pairing: "🔮 運命をマッチング中...",
    pairing_sub1: "クッキングシート重ね合わせ中 • 欲張りモード発動",
    pairing_sub0: "ミキサー爆走中 • タルト生地のサクサク度を確認中",
    draw_badge: "あなたの運命は？",
    congrats: "✨ おめでとう！本日の運命のスイーツが開かれました ✨",
    today_special: "本日のおすすめ 👑",
    sugar_warning: "⚠️ 糖分全開注意！",
    choose_specs: "サイズと仕様を選ぶ 🍰",
    retry_fated: "運命なんて信じない、もう一枚！ ⇆",
    retry_shuffle: "リシャッフルして再出発 🪄",
    easter1: "もう選ぶのはやめて！これ以上引くとケーキが恥ずかしがっちゃう！",
    easter2: "そんなに迷うの？通りで優柔不断なわけだ（笑）！「糖分全開警告」を付与しました",
    toast_keep: "🎉 運命のささやかな幸せをキープしました：",
    toast_go: "！お早めにお会計へどうぞ 💝",
    quotes: [
      "ピンポーン！検出成功！お腹から「このケーキに会いたい」とシグナルが出ていますよ。",
      "ピピピ！感情スキャンの結果：体内のハッピー成分が不足しています。この癒やしを今すぐチャージ！",
      "迷わないで、このケーキはついさっき「あなたと一緒に帰りたい」と言っていましたよ。",
      "見えました... あなたのティータイムに足りないのは、まさにこのフレーバーです！",
      "50種以上のレシピを乗り越え、ついにあなたと出会った至高のデスティニーケーキです。",
      "他を見ないで、今日は私だけにして。私と一緒に帰りましょう！",
      "何を考えているかお見通しです。疑う必要はありません、インスピレーションを信じて！"
    ]
  },
  ko: {
    badge: "결정장애 구세주",
    title: "🧁 Piece of Cake 「운명 손맛 디저트 탐지기」",
    subtitle: "전부 먹고 싶어서 머리가 지끈거리나요? 직관을 믿고 이 카드를 뒤집어 보세요. 오늘 당신의 간택을 기다린 디저트는 무엇일까요?",
    pairing: "🔮 운명의 미식 매칭 중...",
    pairing_sub1: "베이킹 페이퍼 세팅 완료 • 식탐 모드 매칭 중",
    pairing_sub0: "거품기 초고속 회전 중 • 시트 바삭함 최종 확인 중",
    draw_badge: "당신의 운명은 누구?",
    congrats: "✨ 축하합니다! 오늘의 운명 디저트가 뒤집혔습니다 ✨",
    today_special: "오늘의 추천 👑",
    sugar_warning: "⚠️ 당 수치 주의 경보!",
    choose_specs: "옵션 및 사이즈 선택하기 🍰",
    retry_fated: "운명은 개척하는 것, 다시 뽑기 ⇆",
    retry_shuffle: "카드 셔플 완료! 다시 시작하기 🪄",
    easter1: "그만 뽑으세요! 자꾸 뒤집으면 케이크들이 수줍어해요!",
    easter2: "이렇게 우유부단하다니요? 당신을 위한 '시럽 만땅 당 주입' 모드를 적용했습니다.",
    toast_keep: "🎉 당신의 운명적인 행복 초이스를 보관했습니다: ",
    toast_go: "! 지금 바로 구매해 보세요 💝",
    quotes: [
      "딩동! 탐지 성공! 방금 위장에서 이 친구를 꼭 만나보고 싶다는 간절한 신호를 보냈습니다.",
      "띠디딕! 감정 스캔 완료: 현재 당 수치가 너무 낮습니다. 즉시 이 간식을 드셔야 합니다.",
      "망설이지 마세요. 이 디저트가 방금 주방에서 당신을 따라가고 싶다고 선택을 기다렸어요.",
      "보입니다... 완벽한 오후 커피 타임, 당신에게 부족했던 건 바로 이 맛입니다!",
      "50여 가지의 엄선된 레시피를 거쳐 마침내 당신과 우연히 마주한 운명적인 한 입입니다.",
      "다른 건 쳐다도 보지 마세요. 오늘은 바로 나입니다. 나를 데려가 주세요!",
      "무슨 생각 하시는지 다 알아요. 의심하지 마세요, 첫 번째 느낌이 백 퍼센트 맞습니다."
    ]
  }
};

interface DestinedCardFlipProps {
  onAddToCart: (product: any) => void;
  onSelectProduct: (id: string) => void;
}

export default function DestinedCardFlip({ onAddToCart, onSelectProduct }: DestinedCardFlipProps) {
  const { language, t } = useShop();
  const tCard = CARD_FLIP_TRANSLATIONS[language] || CARD_FLIP_TRANSLATIONS['zh'];

  const [isShuffling, setIsShuffling] = useState(false);
  const [shufflePhase, setShufflePhase] = useState<'idle' | 'shuffling' | 'ready'>('ready');
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [drawCount, setDrawCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Confetti effect setup
  const [confettis, setConfettis] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; delay: number }>>([]);

  // Typewriter text state for each flipped card to delay and increase surprise
  const [typedQuotes, setTypedQuotes] = useState<string[]>(["", "", ""]);
  const typingTimerRefs = useRef<any[]>([]);

  // We set cloud-strawberry as "本日主推" (Today's special) and increase its chance
  const getWeightedRandomDessert = (excludeList: any[]) => {
    const allProducts = [...PRODUCT_DATA.healing];
    // filter out already chosen in current draft to ensure distinct options
    const eligible = allProducts.filter(p => !excludeList.some(ex => ex.id === p.id));
    
    if (eligible.length === 0) return allProducts[0];

    // Compute weights: standard is 1.0, today's special is 1.6 (high likelihood of selection)
    const weights = eligible.map(p => {
      const isSpecial = p.id === 'cloud-strawberry';
      return isSpecial ? 1.6 : 1.0;
    });

    const sum = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * sum;
    
    for (let i = 0; i < eligible.length; i++) {
      rand -= weights[i];
      if (rand <= 0) {
        return eligible[i];
      }
    }
    return eligible[eligible.length - 1];
  };

  // Generate 3 distinct designated cards
  const selectDestinedCards = () => {
    const selection: any[] = [];
    
    for (let c = 0; c < 3; c++) {
      const dessert = getWeightedRandomDessert(selection);
      const quoteIndex = Math.floor(Math.random() * 7);
      selection.push({
        ...dessert,
        quoteIndex,
        // Mark if it's special to display cute label for "greedy" draw
        isGreedySpecial: false 
      });
    }
    return selection;
  };

  const startShuffleCeremony = () => {
    // Clear typing intervals
    typingTimerRefs.current.forEach(timer => clearInterval(timer));
    typingTimerRefs.current = [];

    setIsShuffling(true);
    setShufflePhase('shuffling');
    setSelectedCardIndex(null);
    setTypedQuotes(["", "", ""]);
    
    // Increment pull counter
    const nextCount = drawCount + 1;
    setDrawCount(nextCount);

    // Let cards shuffle for 3 seconds with active interlacing slides
    setTimeout(() => {
      const newSelection = selectDestinedCards();
      
      // If pull count is high, inject the funny Easter egg modifier or high sugar mark!
      if (nextCount > 3) {
        newSelection.forEach(card => {
          card.isGreedySpecial = true; // Flags full-sugar greedy label
        });
      }

      setShuffledCards(newSelection);
      setIsShuffling(false);
      setShufflePhase('ready');
    }, 2800);
  };

  // Run on start
  useEffect(() => {
    const initial = selectDestinedCards();
    setShuffledCards(initial);
  }, []);

  // Trigger confetti burst on click card
  const triggerConfettiBurst = () => {
    const colors = ['#EB9FB0', '#FFD1DC', '#FBE5E5', '#FCE38A', '#95E1D3'];
    const list = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50, // relative offsets
      y: Math.random() * -60 - 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.2
    }));
    setConfettis(list);
    setTimeout(() => setConfettis([]), 3500);
  };

  // Typewriter effect for selected card's quote
  const runTypewriter = (index: number, text: string) => {
    let currentText = "";
    let charIndex = 0;
    
    if (typingTimerRefs.current[index]) {
      clearInterval(typingTimerRefs.current[index]);
    }

    const timer = setInterval(() => {
      if (charIndex < text.length) {
        currentText += text.charAt(charIndex);
        setTypedQuotes(prev => {
          const next = [...prev];
          next[index] = currentText;
          return next;
        });
        charIndex++;
      } else {
        clearInterval(timer);
      }
    }, 45); // Speed of text typed out

    typingTimerRefs.current[index] = timer;
  };

  const handleCardClick = (index: number) => {
    if (isShuffling || selectedCardIndex !== null) return;
    
    setSelectedCardIndex(index);
    triggerConfettiBurst();
    
    // Trigger typewriter reveal after the 180 deg flip (takes about 400ms to face up)
    setTimeout(() => {
      runTypewriter(index, tCard.quotes[shuffledCards[index].quoteIndex || 0]);
    }, 450);
  };

  const handleAddToCart = (product: any) => {
    onAddToCart(product);
    const prodTranslatedName = t(`product.${product.id}.name`, product.name);
    setToastMessage(`${tCard.toast_keep}${prodTranslatedName}${tCard.toast_go}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  // Easter egg funny hints/bubbles
  const renderEasterEggBubble = () => {
    if (drawCount > 3) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#E63946] text-white px-5 py-3 rounded-2xl text-[11px] font-black tracking-wider text-center max-w-sm mx-auto shadow-2xl relative border-2 border-white/20"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-8 border-transparent border-b-[#E63946]" />
          💬 {drawCount === 4 ? tCard.easter1 : tCard.easter2} 🍰
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8 relative max-w-4xl mx-auto">
      {/* Toast alert indicator */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-ink text-white pr-6 pl-5 py-4 pb-4.5 rounded-full z-50 flex items-center gap-3 shadow-3xl border border-cake/20 max-w-md"
          >
            <div className="w-8 h-8 rounded-full bg-berry flex items-center justify-center text-sm shrink-0">
              🍰
            </div>
            <div className="text-left">
              <p className="text-[11px] uppercase font-black tracking-widest text-[#EB9FB0] leading-none mb-1">
                Reserved For You
              </p>
              <p className="text-xs font-bold truncate pr-2">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Headings */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FEE2E2] text-berry px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-spin [animation-duration:8s]" />
          {tCard.badge}
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-ink">
          {tCard.title}
        </h3>
        <p className="text-sm opacity-70 max-w-md mx-auto leading-relaxed">
          {tCard.subtitle}
        </p>
      </div>

      {/* Main Card Zone */}
      <div className="relative min-h-[460px] flex flex-col items-center justify-center py-6">
        
        {/* Confetti element overlay */}
        {confettis.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              x: c.x * 4, 
              y: c.y * 5, 
              scale: 0.2,
              rotate: Math.random() * 720 - 360 
            }}
            transition={{ duration: 2.8, delay: c.delay, ease: "easeOut" }}
            style={{ 
              position: 'absolute',
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              zIndex: 30
            }}
          />
        ))}

        {/* Shuffling Ceremony Loading Indicator */}
        <AnimatePresence mode="wait">
          {shufflePhase === 'shuffling' ? (
            <motion.div
              key="shuffling-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/40 backdrop-blur-md z-40 rounded-[40px] border border-ink/5 flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                {/* Visual Interlacing Overlaying cards representing Shuffle Ceremony */}
                <motion.div 
                  animate={{ x: [-40, 40, -40], y: [0, -10, 0], rotate: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="absolute w-16 h-24 bg-berry border-2 border-white rounded-2xl shadow-md transform -skew-x-6 z-10"
                />
                <motion.div 
                  animate={{ x: [40, -40, 40], y: [-10, 5, -10], rotate: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="absolute w-16 h-24 bg-cake border-2 border-white rounded-2xl shadow-md transform skew-x-6 z-0"
                />
              </div>
              <h4 className="text-lg font-black tracking-widest text-[#E63946] mb-2 animate-pulse">
                {tCard.pairing}
              </h4>
              <p className="text-xs opacity-50 font-mono tracking-wider">
                {drawCount > 3 ? tCard.pairing_sub1 : tCard.pairing_sub0}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* The Cards Display Content Slot */}
        <AnimatePresence mode="wait">
          {selectedCardIndex === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 select-none"
            >
              {shuffledCards.map((card, idx) => {
                const isFlipped = selectedCardIndex === idx;
                const isAnyFlipped = selectedCardIndex !== null;
                const isGreyedOut = isAnyFlipped && !isFlipped;

                return (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(idx)}
                    className={`relative h-[460px] rounded-[32px] cursor-pointer flex-grow transition-opacity duration-300 ${
                      isGreyedOut ? 'opacity-40' : 'opacity-100'
                    }`}
                    style={{ perspective: '1200px' }}
                  >
                    {/* 1. Back of the Card (Face Down) */}
                    <motion.div
                      key="back"
                      initial={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.2 }}
                      whileHover={!isAnyFlipped ? { y: -8, scale: 1.02 } : {}}
                      className="absolute inset-0 bg-gradient-to-br from-[#FAF5F0] to-[#EFE7DD] border-[6px] border-cake/50 rounded-[32px] p-6 flex flex-col justify-between items-center text-center shadow-xl backface-hidden"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <div className="w-full flex justify-between items-center opacity-40">
                        <span className="text-[9px] font-bold tracking-widest font-mono uppercase text-ink/70">★ PIECE OF CAKE</span>
                        <span className="text-xs">✨</span>
                      </div>
                      
                      <div className="space-y-4 py-8 m-auto">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm border border-cake/30 animate-pulse">
                          <Heart className="w-8 h-8 fill-berry text-berry" />
                        </div>
                        <div>
                          <h5 className="font-display font-black text-xs tracking-[0.2em] uppercase text-ink/80">DESTINY CARD</h5>
                          <p className="text-[11px] font-black tracking-widest text-[#E63946] mt-2 animate-bounce">
                            {tCard.draw_badge}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/80 border border-ink/5 px-6 py-2 rounded-full text-[9px] font-black tracking-widest uppercase text-ink shadow-sm mt-auto">
                        ✦ PICK ME ✦
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* Selected Card Focused Spotlight Panel */
            <motion.div
              key="spotlight"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -35 }}
              transition={{ type: "spring", damping: 18, stiffness: 220 }}
              className="w-full max-w-sm px-4 select-none mx-auto relative z-20 flex flex-col items-center"
            >
              {/* Backlit elegant glow aura */}
              <div className="absolute inset-0 -m-12 bg-gradient-to-tr from-berry/15 to-pink-100/35 rounded-full blur-3xl -z-10 animate-pulse" />
              
              <div className="w-full text-center pb-4">
                <span className="inline-block bg-[#FEE2E2] text-berry text-[10.5px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-sm animate-bounce">
                  {tCard.congrats}
                </span>
              </div>

              <div className="relative w-full h-[484px] rounded-[32px] overflow-hidden bg-white border-[8px] border-[#EB9FB0]/40 flex flex-col shadow-[0_32px_64px_-12px_rgba(255,107,157,0.3)]">
                {/* Glowing Cream backdrop light if active */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-50/50 via-white to-pink-50/30 pointer-events-none" />

                {/* Header badges */}
                <div className="relative h-52 bg-[#FAF5F0] overflow-hidden border-b border-ink/5 shrink-0">
                  <motion.img 
                    src={shuffledCards[selectedCardIndex].image} 
                    alt={t(`product.${shuffledCards[selectedCardIndex].id}.name`, shuffledCards[selectedCardIndex].name)} 
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                    animate={{ 
                      y: [0, -6, 0],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Today's Special or Greedy user indicator badge */}
                  {shuffledCards[selectedCardIndex].id === 'cloud-strawberry' && (
                    <span className="absolute top-4 left-4 bg-[#E63946] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md z-20">
                      {tCard.today_special}
                    </span>
                  )}

                  {shuffledCards[selectedCardIndex].isGreedySpecial && (
                    <span className="absolute top-4 right-4 bg-ink text-[#FCE38A] text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-[#FCE38A]/30 z-20">
                      {tCard.sugar_warning}
                    </span>
                  )}

                  {/* Tiny decorative stamp */}
                  <div className="absolute bottom-3 right-3 bg-white/95 text-[8px] font-extrabold px-2.5 py-1 rounded-md text-berry tracking-wider uppercase shadow-sm border border-berry/10 select-none z-10 pointer-events-none">
                    DESSERT DETECTED 🎯
                  </div>
                </div>

                {/* Detailed Description Panel & Typewriter Quote */}
                <div className="p-6.5 flex flex-col justify-between flex-grow text-left relative z-10">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-berry/80">✦ DESTINY FOUND</span>
                    <h4 className="font-display font-black text-lg text-ink leading-tight truncate">
                      {t(`product.${shuffledCards[selectedCardIndex].id}.name`, shuffledCards[selectedCardIndex].name)}
                    </h4>
                    <p className="text-sm font-bold text-[#E63946]">TWD {shuffledCards[selectedCardIndex].price}</p>
                  </div>

                  {/* The typewriter quote */}
                  <div className="my-3 bg-[#FAF5F0] rounded-2.5xl p-4 border border-[#EB9FB0]/20 flex items-start gap-2 h-24 overflow-y-auto shrink-0 shadow-inner">
                    <span className="text-xl shrink-0">💬</span>
                    <p className="text-xs leading-relaxed text-ink/90 font-bold font-mono">
                      {typedQuotes[selectedCardIndex] || "..."}
                    </p>
                  </div>

                  {/* Choose sizing & add to cart button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(shuffledCards[selectedCardIndex].id);
                    }}
                    className="w-full py-4 bg-berry text-white hover:bg-ink hover:text-white rounded-full font-black text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_20px_40px_-10px_rgba(255,107,157,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {tCard.choose_specs}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Funny Easter Egg Dialog bubble */}
      <div className="mt-4 mb-8">
        {renderEasterEggBubble()}
      </div>

      {/* Selection Control Panel (CTAs) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
        <button
          type="button"
          disabled={isShuffling}
          onClick={startShuffleCeremony}
          className={`flex items-center gap-2 px-10 py-4 pb-4.5 rounded-full text-xs font-black tracking-widest uppercase shadow-xl transition-all font-sans ${
            isShuffling 
              ? 'bg-ink/10 text-ink/30 cursor-not-allowed'
              : 'bg-white text-ink border-2 border-ink hover:bg-ink hover:text-cake active:scale-95'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
          {selectedCardIndex !== null ? tCard.retry_fated : tCard.retry_shuffle}
        </button>
      </div>
    </div>
  );
}
