import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Check, Gift, ArrowRight, BookOpen, Send } from 'lucide-react';
import CardWriter, { CARD_THEMES, ENVELOPE_STYLES } from '../CardWriter';
import { useShop } from '../../lib/ShopContext';

const SALON_LOCALIZATIONS: Record<string, any> = {
  zh: {
    item_header: "【獨立精裝手創心意卡】",
    blank_card: "（空白卡片，等待手寫）",
    added_toast: "已將「{theme}」客製賀卡與「{env}」加入購物籃！💝",
    badge: "小蜜怪手創心意信籤門市",
    title_1: "手寫",
    title_2: "幸福賀卡沙龍.",
    desc: "「文字是思念最精緻的外衣。」在此挑選植物天然色素色紙、配對超萌蓋章與工藝香氛封蠟章，寫下專屬悄悄話，我們將為您實體純手工印製成精品卡片，可單獨購買或伴隨甜點出貨！",
    add_box_title: "加入客製手創卡片到購物車",
    add_box_desc: "單獨加購精緻實體印製卡片只要 NT$ 40，若有購買禮盒則免收此卡片費用（已包含在禮盒內）唷！",
    add_btn: "將這張賀卡單獨加入購物車 💝",
    step_1: "STEP 1: 心意入封",
    step_2: "STEP 2: 家書密封",
    step_3: "STEP 3: 熔注蠟液",
    step_4: "STEP 4: 工藝雕蓋",
    step_5: "STEP 5: 凝砂固色",
    step_6: "STEP 6: 置入提籃",
    status_1: "💌 手寫心意信籤，精緻入袋裝封中...",
    status_2: "📐 折疊手工信套，鎖存真摯祝福...",
    status_3: "🔥 特調精緻香氛封蠟，溫潤滴注中...",
    status_4: "✨ 專屬工藝銅章，高壓落印鐫刻...",
    status_5: "👑 刻紋完成！封蓋完美的實體卡片...",
    status_6: "💝 精裝信封正在完美裝箱置入您的甜點籃子！",
    seal_love: "🕊️ With Love",
    seal_handmade: "🧁 特製烘焙",
    seal_stamp: "🐾 小蜜怪印記",
    progress_1: "準備發信",
    progress_2: "心意裝封",
    progress_3: "滴蠟鐫蓋",
    progress_4: "出箱投遞",
    to_label: "To",
    default_recipient: "最親愛的你",
    default_placeholder: "寫下您滿滿的心意祝福與思念...",
    from_label: "From",
    default_sender: "想你的人",
    toast_success: "成功加入購物車 Success",
    toast_close: "關閉"
  },
  en: {
    item_header: "[Standalone Premium Heartmade Card]",
    blank_card: "(Blank card, waiting to be handwritten)",
    added_toast: "Added '{theme}' custom greeting card and '{env}' to basket! 💝",
    badge: "Crummy Handcrafted Message & Letter Boutique",
    title_1: "Handwritten",
    title_2: "Happiness Letter Salon.",
    desc: "'Words are the most exquisite clothing for thoughts.' Select plant-based organic colored paper, pair with cute stamps and custom metallic fragrance wax seals to leave a sweet whisper. We will print this greeting manually into a beautiful standalone card or accompany your dessert delivery!",
    add_box_title: "Add Custom Heartmade Greeting Card",
    add_box_desc: "Add a custom physical card for only NT$ 40! Free option included if you purchase any gift box (wrapped together with your box of cake)!",
    add_btn: "Add standalone card to cart 💝",
    step_1: "STEP 1: Inserting Card",
    step_2: "STEP 2: Sealing Flap",
    step_3: "STEP 3: Melting Wax",
    step_4: "STEP 4: Stamp Engraving",
    step_5: "STEP 5: Air Cooling",
    step_6: "STEP 6: Add to Basket",
    status_1: "💌 Handwritten letter card is carefully sliding into the envelope...",
    status_2: "📐 Folding organic envelope flap to lock in your true hopes...",
    status_3: "🔥 Pouring warm customized fragrance wax droplet...",
    status_4: "✨ Heavy vintage brass stamp engraving under heat...",
    status_5: "👑 Engraved! A perfect bespoke wax seal complete...",
    status_6: "💝 Your premium card is boxing up elegantly into your dessert basket!",
    seal_love: "🕊️ With Love",
    seal_handmade: "🧁 Baked Delight",
    seal_stamp: "🐾 Crummy Stamp",
    progress_1: "Prepare",
    progress_2: "Envelope",
    progress_3: "Wax Seal",
    progress_4: "Deliver",
    to_label: "To",
    default_recipient: "Beloved Star",
    default_placeholder: "Write down your sweet warm thoughts and messages here...",
    from_label: "From",
    default_sender: "Soulmate",
    toast_success: "Successfully Added to Cart",
    toast_close: "Close"
  },
  ja: {
    item_header: "【スタンドアロン特製レターカード】",
    blank_card: "（手書き待ちの空欄カード）",
    added_toast: "「{theme}」カスタムカードと「{env}」をカートに追加しました！💝",
    badge: "小蜜怪手作りメッセージカードサロン",
    title_1: "手書き",
    title_2: "幸せのレターサロン.",
    desc: "「言葉は想いを包む最も気品あるドレスです。」オーガニック色紙、キュートなステッカー、香るシーリングスタンプから自分だけのひそひそ話を選び、手書きの優しさをそのままリアルカードとしてお作りします。単體でもスイーツとセットでも発送可能！",
    add_box_title: "カスタムカードをショッピングバッグに追加",
    add_box_desc: "丁寧に手作りされたプリントカードをわずか NT$ 40 で追加できます！ギフト用ケーキボックスをご注文の場合はなんと無料でお届けいたします（ボックス内に同梱）。",
    add_btn: "カスタムカードを単體で追加する 💝",
    step_1: "STEP 1: カード裝入",
    step_2: "STEP 2: カバー閉鎖",
    step_3: "STEP 3: 熔解ワックス",
    step_4: "STEP 4: ブロンズ打刻",
    step_5: "STEP 5: 冷却固形",
    step_6: "STEP 6: バスケットへ",
    status_1: "💌 手書きカードを丁寧に封筒へスライド中...",
    status_2: "📐 コージーな手作り封筒の折り目をしっかりと密封中...",
    status_3: "🔥 豊かなアロマの滴を注ぎ込んでシーリングベースを形成中...",
    status_4: "✨ 年代物の真鍮スタンプを優しくプレス＆クラフト打刻中...",
    status_5: "👑 エンボス完成！気品溢れるギフトカードになりました...",
    status_6: "💝 プレミアムレターがご指定のスイーツかごへ詰め込まれました！",
    seal_love: "🕊️ With Love",
    seal_handmade: "🧁 特製ケーキ印",
    seal_stamp: "🐾 ラージスタンプ",
    progress_1: "準備中",
    progress_2: "封筒密封",
    progress_3: "蝋印刻印",
    progress_4: "投函発送",
    to_label: "To",
    default_recipient: "大切なあなたへ",
    default_placeholder: "たくさんの愛情、温かいメッセージをここに入力...",
    from_label: "From",
    default_sender: "想いを寄せる者",
    toast_success: "ショッピングバッグに追加完了",
    toast_close: "閉じる"
  },
  ko: {
    item_header: "【스탠드어론 프리미엄 수선화 감사 카드】",
    blank_card: "(손편지를 대기 중인 빈 카드)",
    added_toast: "「{theme}」 맞춤 카드와 「{env}」 봉투를 장바구니에 담았습니다! 💝",
    badge: "큐피드 수제 메신저 레터 부티크",
    title_1: "손편지",
    title_2: "감사 레터 오두막.",
    desc: "'글씨는 마음을 표현하는 가장 단정한 의복입니다.' 천연 꽃잎 염색 종이, 사랑스러운 고양이 젤리 도장, 아로마 왁스 실링을 조화롭게 커스텀하여 전하고 싶었던 비밀 이야기를 담아 보세요. 정성스럽게 레터 백에 함께 담아 출고해 드립니다.",
    add_box_title: "맞춤 수제 레터 카드 추가하기",
    add_box_desc: "정성이 깃든 고급 인쇄 카드를 NT$ 40의 착한 혜택가에 추가해 보세요! 럭셔리 감사 선물 세트 구매 시 카드가 이미 패키지에 포함되어 무료로 발송됩니다.",
    add_btn: "이 편지 카드만 장바구니에 따로 추가하기 💝",
    step_1: "STEP 1: 마음 봉입",
    step_2: "STEP 2: 봉투 접기",
    step_3: "STEP 3: 촛농 주입",
    step_4: "STEP 4: 청동 조각",
    step_5: "STEP 5: 왁스 세팅",
    step_6: "STEP 6: 바구니 담기",
    status_1: "💌 손으로 적어 올린 정성스러운 엽서가 봉투 속으로 미끄러져 들어갑니다...",
    status_2: "📐 따뜻한 향수 편지지의 봉투 플랩을 단단히 내려 세팅합니다...",
    status_3: "🔥 엄선한 천연 에센셜 향기 왁스를 고온으로 달구어 방울방울 적십니다...",
    status_4: "✨ 앤티크 신주 보석 스탬프를 눌러 입체적인 이니셜을 새겨넣습니다...",
    status_5: "👑 왁스 실링 조각 완성! 세상에 단 하나뿐인 시그니처 엠보싱 편지...",
    status_6: "💝 고급 기프트 카드가 디저트 보관 백에 소중히 보관 장착되었습니다!",
    seal_love: "🕊️ With Love",
    seal_handmade: "🧁 장인 베이킹",
    seal_stamp: "🐾 크럼 도장",
    progress_1: "작성",
    progress_2: "봉인 시작",
    progress_3: "실링 스탬프",
    progress_4: "바구니 담기",
    to_label: "To",
    default_recipient: "가장 소중한 당신께",
    default_placeholder: "여기에 따뜻하고 고마운 마음의 말을 한 자씩 새겨 보아요...",
    from_label: "From",
    default_sender: "마음을 전하는 이",
    toast_success: "성공적으로 담겼습니다 Success",
    toast_close: "닫기"
  }
};

export default function CardSalonSection({ onAddToCart }: { onAddToCart?: (item: any) => void }) {
  const { language, convertPrice } = useShop();
  const tSalon = SALON_LOCALIZATIONS[language] || SALON_LOCALIZATIONS["zh"];

  const [recipient, setRecipient] = useState('');
  const [cardContent, setCardContent] = useState('');
  const [sender, setSender] = useState(() => tSalon.default_sender);
  const [selectedCardThemeId, setSelectedCardThemeId] = useState('strawberry');
  const [selectedFontId, setSelectedFontId] = useState('sans');
  const [selectedSticker, setSelectedSticker] = useState('🍓');
  const [selectedSealId, setSelectedSealId] = useState('love');
  const [borderStyleId, setBorderStyleId] = useState('dashed');
  const [selectedEnvelopeStyleId, setSelectedEnvelopeStyleId] = useState('classic-oat');

  // Interactive added-to-cart toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 💌 Envelope Sealing Animation Pipeline States
  // 'idle' | 'letter-slide' | 'flap-fold' | 'pouring-wax' | 'wax-stamping' | 'completed-seal' | 'flight'
  const [animationStep, setAnimationStep] = useState<string>('idle');

  // Find active theme, envelope and seal details
  const chosenTheme = CARD_THEMES.find(t => t.id === selectedCardThemeId) || CARD_THEMES[0];
  const chosenEnvelope = ENVELOPE_STYLES.find(e => e.id === selectedEnvelopeStyleId) || ENVELOPE_STYLES[0];
  const sealMapping = {
    love: { char: '🕊️', text: 'WITH LOVE', color: 'from-[#E63946] to-[#BD1E51]', glow: 'rgba(230,57,70,0.4)' },
    handmade: { char: '🧁', text: 'ONLY FOR YOU', color: 'from-[#F59E0B] to-[#B45309]', glow: 'rgba(245,158,11,0.4)' },
    smile: { char: '🐾', text: 'SWEET LIFE', color: 'from-[#A855F7] to-[#6B21A8]', glow: 'rgba(168,85,247,0.4)' }
  };
  const activeSealDetails = sealMapping[selectedSealId as keyof typeof sealMapping] || sealMapping.love;

  const handleAddCardToCart = () => {
    // 1. Kickstart the physical animation pipeline
    setAnimationStep('letter-slide');

    // 2. Step: Letter slides into envelope
    setTimeout(() => {
      setAnimationStep('flap-fold');
    }, 1200);

    // 3. Step: Envelope flap folds down
    setTimeout(() => {
      setAnimationStep('pouring-wax');
    }, 2400);

    // 4. Step: Pouring the hot wax
    setTimeout(() => {
      setAnimationStep('wax-stamping');
    }, 3600);

    // 5. Step: Brass stamp descends and engraving
    setTimeout(() => {
      setAnimationStep('completed-seal');
    }, 4800);

    // 6. Step: Envelope flies towards the basket
    setTimeout(() => {
      setAnimationStep('flight');
    }, 6200);

    // 7. Step: Add to Card officially & teardown animation
    setTimeout(() => {
      const sealLabel = selectedSealId === 'love' ? tSalon.seal_love : selectedSealId === 'handmade' ? tSalon.seal_handmade : tSalon.seal_stamp;

      if (onAddToCart) {
        onAddToCart({
          id: `standalone-card-${selectedCardThemeId}-${Date.now()}`,
          name: `${tSalon.item_header}${chosenTheme.name} (${chosenEnvelope.name})`,
          price: 40, 
          cardStyle: chosenTheme.name,
          envelopeStyle: chosenEnvelope.name,
          recipient,
          sender: sender || tSalon.default_sender,
          cardContent: cardContent || tSalon.blank_card,
          cardSticker: selectedSticker,
          cardSeal: sealLabel,
          borderStyle: borderStyleId,
          isCustomCard: true
        });

        setToastMessage(tSalon.added_toast.replace('{theme}', chosenTheme.name).replace('{env}', chosenEnvelope.name));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      }

      // Reset animation back to initial state
      setAnimationStep('idle');
    }, 7000);
  };

  return (
    <section id="card-salon" className="py-24 bg-gradient-to-b from-cake/20 via-white to-cake/30 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-10 left-[-100px] w-[300px] h-[300px] rounded-full bg-berry/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[-100px] w-[350px] h-[350px] rounded-full bg-[#E0F2FE]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-1 bg-berry/10 text-berry text-[10px] uppercase font-black tracking-[0.25em] px-4.5 py-1.5 rounded-full border border-berry/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{tSalon.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-ink">
            {tSalon.title_1} <span className="text-berry italic">{tSalon.title_2}</span>
          </h2>
          <p className="mt-4 text-xs md:text-sm text-ink/65 max-w-2xl mx-auto leading-relaxed">
            {tSalon.desc}
          </p>
        </div>

        {/* Workspace Card Container */}
        <div className="max-w-5xl mx-auto space-y-8">
          <CardWriter
            recipient={recipient}
            setRecipient={setRecipient}
            cardContent={cardContent}
            setCardContent={setCardContent}
            sender={sender}
            setSender={setSender}
            selectedCardThemeId={selectedCardThemeId}
            setSelectedCardThemeId={setSelectedCardThemeId}
            selectedFontId={selectedFontId}
            setSelectedFontId={setSelectedFontId}
            selectedSticker={selectedSticker}
            setSelectedSticker={setSelectedSticker}
            selectedSealId={selectedSealId}
            setSelectedSealId={setSelectedSealId}
            borderStyleId={borderStyleId}
            setBorderStyleId={setBorderStyleId}
            selectedEnvelopeStyleId={selectedEnvelopeStyleId}
            setSelectedEnvelopeStyleId={setSelectedEnvelopeStyleId}
          />

          {/* Checkout & Add to Cart Zone */}
          <div className="flex flex-col items-center justify-center p-8 bg-white/70 backdrop-blur-md rounded-[32px] border-4 border-white shadow-xl max-w-2xl mx-auto text-center space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-widest uppercase text-berry/70 bg-berry/5 px-2.5 py-1 rounded">
                Boutique Letter Card Item
              </span>
              <h4 className="font-display font-black text-lg text-ink">{tSalon.add_box_title}</h4>
              <p className="text-xs opacity-50 px-4">
                {tSalon.add_box_desc}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono font-black text-berry text-center">{convertPrice(40)}</span>
              <button
                onClick={handleAddCardToCart}
                disabled={animationStep !== 'idle'}
                className="bg-gradient-to-r from-berry via-pink-500 to-berry hover:from-ink hover:to-ink text-white font-black text-xs tracking-widest uppercase px-10 py-4.5 rounded-full transition-all shadow-xl hover:shadow-berry/20 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{tSalon.add_btn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 CINEMATIC ENVELOPE STRUCTURAL SEALING OVERLAY */}
      <AnimatePresence>
        {animationStep !== 'idle' && (
          <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-4">
            {/* Dark blur ambient canvas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
            />

            {/* Micro Sparkles Background decoration */}
            <div className="absolute inset-x-0 top-1/4 flex justify-around pointer-events-none opacity-45">
              <span className="text-lg animate-ping [animation-duration:3s]">✨</span>
              <span className="text-xl animate-bounce [animation-duration:5s]">🎈</span>
              <span className="text-sm animate-ping [animation-duration:2.5s]">🌸</span>
            </div>

            {/* Sealing Ceremony Center Widget */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative z-10 w-full max-w-xl bg-[#FAF5F0] border-[10px] border-white rounded-[3.5rem] shadow-[0_48px_96px_-16px_rgba(42,35,35,0.65)] p-8 md:p-14 flex flex-col items-center text-center overflow-hidden"
              style={{
                // Add soft camera body rumble during stamping phase
                transform: animationStep === 'wax-stamping' ? 'translate(1px, -1px) rotate(0.2deg)' : 'none'
              }}
            >
              {/* Stepper Status Badge */}
              <div className="inline-flex items-center gap-2 bg-[#EB9FB0]/15 text-[#821E31] px-5 py-2 rounded-full border border-[#EB9FB0]/30 shadow-sm mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-berry animate-ping" />
                <span className="text-[11px] font-black tracking-widest uppercase">
                  {animationStep === 'letter-slide' && tSalon.step_1}
                  {animationStep === 'flap-fold' && tSalon.step_2}
                  {animationStep === 'pouring-wax' && tSalon.step_3}
                  {animationStep === 'wax-stamping' && tSalon.step_4}
                  {animationStep === 'completed-seal' && tSalon.step_5}
                  {animationStep === 'flight' && tSalon.step_6}
                </span>
              </div>

              {/* Status explanation label */}
              <h3 className="font-display font-black text-xl md:text-2xl text-ink tracking-tight h-10 select-none">
                {animationStep === 'letter-slide' && tSalon.status_1}
                {animationStep === 'flap-fold' && tSalon.status_2}
                {animationStep === 'pouring-wax' && tSalon.status_3}
                {animationStep === 'wax-stamping' && tSalon.status_4}
                {animationStep === 'completed-seal' && tSalon.status_5}
                {animationStep === 'flight' && tSalon.status_6}
              </h3>

              {/* ✉️ Elegant 3D physical envelope mockup wrapper */}
              <div className="relative w-full max-w-[340px] h-[240px] my-10 select-none flex items-center justify-center">
                <motion.div
                  animate={animationStep === 'flight' ? {
                    y: [0, -30, 480],
                    x: [0, 40, 180],
                    scale: [1, 1.1, 0.05],
                    rotate: [0, -10, 45],
                    opacity: [1, 1, 0]
                  } : {}}
                  transition={{ duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
                  className={`relative w-[320px] h-[220px] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] border shrink-0 ${chosenEnvelope.bg} ${chosenEnvelope.border}`}
                  style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                >
                  {/* Sliding Letter Card Inside (starts raised, slides down inside envelope) */}
                  <motion.div
                    initial={{ y: -110, opacity: 0.95, scale: 0.96 }}
                    animate={
                      animationStep === 'letter-slide'
                        ? { y: -110, opacity: 1, scale: 0.96 }
                        : { y: 12, opacity: 0.4, scale: 0.92, zIndex: 0 }
                    }
                    transition={{ type: 'spring', damping: 18, stiffness: 100 }}
                    className={`absolute inset-x-4 top-2 h-[190px] rounded-xl p-3 flex flex-col justify-between shadow-sm border border-berry/10 border-dashed ${chosenTheme.previewBg} select-none`}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5 text-left">
                        <span className="text-[7px] font-bold text-berry leading-none uppercase">{tSalon.to_label}</span>
                        <div className="text-[10px] font-black truncate max-w-[120px] text-stone-900 leading-none">
                          💖 {recipient || tSalon.default_recipient}
                        </div>
                      </div>
                      <span className="text-lg bg-white/80 p-0.5 rounded-md shadow-sm leading-none">{selectedSticker}</span>
                    </div>

                    <div className="flex-1 mt-3 text-left">
                      <p className="text-[8px] leading-relaxed line-clamp-4 font-serif text-stone-800 opacity-80 whitespace-pre-wrap">
                        {cardContent || tSalon.default_placeholder}
                      </p>
                    </div>

                    <div className="border-t border-[#EB9FB0]/20 pt-1 flex items-center justify-between">
                      <span className="text-[6px] font-bold text-berry bg-white/40 px-1 py-0.5 rounded">AUTHENTIC</span>
                      <div className="text-right">
                        <span className="text-[6px] font-black text-stone-400 block leading-none">{tSalon.from_label}</span>
                        <span className="text-[8px] font-bold text-stone-800 tracking-tight block">
                          {sender || tSalon.default_sender}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* 📂 Outer pockets of envelope - visual 3D triangular overlap cuts */}
                  {/* Left flap triangle */}
                  <div 
                    className={`absolute inset-y-0 left-0 w-1/2 ${chosenEnvelope.leftFlap} border-r border-stone-200/20 shadow-sm`}
                    style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)', zIndex: 10 }}
                  />
                  {/* Right flap triangle */}
                  <div 
                    className={`absolute inset-y-0 right-0 w-1/2 ${chosenEnvelope.rightFlap} border-l border-stone-200/20 shadow-sm`}
                    style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', zIndex: 10 }}
                  />
                  {/* Bottom triangular pocket flap */}
                  <div 
                    className={`absolute bottom-0 inset-x-0 h-3/5 ${chosenEnvelope.bottomFlap} border-t border-stone-200/20 shadow-lg`}
                    style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)', zIndex: 11 }}
                  />

                  {/* 📐 Animated Envelope Top triangular Flap */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={
                      animationStep === 'letter-slide'
                        ? { rotateX: 0 }
                        : { rotateX: 180 }
                    }
                    transition={{ duration: 0.95, ease: 'easeOut' }}
                    className={`absolute top-[1px] inset-x-0 h-1/2 ${chosenEnvelope.topFlap} border-b border-black/5`}
                    style={{
                      transformOrigin: 'top',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      zIndex: animationStep === 'letter-slide' ? 5 : 20,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  />

                  {/* 🔥 Melting Wax Droplet (Liquid Pool) */}
                  <AnimatePresence>
                    {(animationStep === 'pouring-wax' || animationStep === 'wax-stamping' || animationStep === 'completed-seal' || animationStep === 'flight') && (
                      <motion.div
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{ scale: 1.0, opacity: 1 }}
                        transition={{ type: 'spring', damping: 14, stiffness: 80 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                        style={{ zIndex: 30 }}
                      >
                        {/* Molten liquid ripple shadow ring */}
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${activeSealDetails.color} relative shadow-xl`}>
                          {/* Emitting Heat smoke aura */}
                          {animationStep === 'pouring-wax' && (
                            <span className="absolute inset-0 bg-white/20 rounded-full animate-ping [animation-duration:1.5s]" />
                          )}

                          {/* Stamp Imprint Details once engraved */}
                          {(animationStep === 'completed-seal' || animationStep === 'flight') && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-1.5 bg-black/10 rounded-full border border-white/20 flex flex-col items-center justify-center text-white"
                            >
                              <span className="text-base select-none leading-none drop-shadow-md">
                                {activeSealDetails.char}
                              </span>
                              <span className="text-[5px] font-black text-white/70 scale-90 tracking-tighter leading-none mt-0.5">
                                {activeSealDetails.text}
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 🥄 Melting wax spoon animation */}
                <AnimatePresence>
                  {animationStep === 'pouring-wax' && (
                    <motion.div
                      initial={{ opacity: 0, x: -90, y: -45, rotate: -15 }}
                      animate={{ opacity: 1, x: -35, y: -50, rotate: 20 }}
                      exit={{ opacity: 0, x: -90, y: -45, rotate: -10 }}
                      transition={{ duration: 0.9, ease: 'easeInOut' }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center gap-1 text-4xl pointer-events-none"
                    >
                      <span>🥄</span>
                      {/* Flowing liquid strand helper */}
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: [0, 50, 0] }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className={`w-1.5 absolute left-8 top-10 bg-gradient-to-b ${activeSealDetails.color} origin-top rounded-b-full`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 🔨 Heavy Antique Handheld Brass Stamp tool */}
                <AnimatePresence>
                  {animationStep === 'wax-stamping' && (
                    <motion.div
                      initial={{ y: -190, rotate: -8, opacity: 0.5 }}
                      animate={{ y: -38, rotate: 0, opacity: 1 }}
                      exit={{ y: -220, opacity: 0 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 120 }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center pointer-events-none"
                    >
                      {/* Wooden handle design representation */}
                      <div className="w-6 h-28 bg-gradient-to-r from-amber-800 to-amber-900 rounded-t-xl border border-amber-950/20 shadow-md">
                        {/* Metallic golden collar ring */}
                        <div className="w-full h-4 bg-yellow-400 mt-24 border-y border-yellow-600" />
                      </div>
                      {/* Heavy round bronze stamp die base */}
                      <div className="w-12 h-6 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600 rounded-md border-b-4 border-yellow-700 shadow-xl" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 💥 Heart/Star particles blow effect on stamping impact */}
                <AnimatePresence>
                  {animationStep === 'wax-stamping' && (
                    <motion.div
                      initial={{ scale: 0.1, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
                    >
                      <div className="absolute w-24 h-24 rounded-full border-4 border-dashed border-yellow-300/60 animate-ping" />
                      <span className="absolute text-xl -translate-y-12 -translate-x-12 animate-bounce">💖</span>
                      <span className="absolute text-lg translate-y-12 translate-x-12 animate-bounce [animation-delay:0.2s]">🌸</span>
                      <span className="absolute text-xl -translate-y-8 translate-x-14 animate-bounce [animation-delay:0.1s]">✨</span>
                      <span className="absolute text-lg translate-y-14 -translate-x-10 animate-bounce [animation-delay:0.3s]">🎈</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative progress helper lines */}
              <div className="w-full max-w-xs space-y-2 font-sans mt-2">
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{
                      width: 
                        animationStep === 'letter-slide' ? '15%' :
                        animationStep === 'flap-fold' ? '35%' :
                        animationStep === 'pouring-wax' ? '55%' :
                        animationStep === 'wax-stamping' ? '75%' :
                        animationStep === 'completed-seal' ? '90%' : '100%'
                    }}
                    transition={{ duration: 1.0 }}
                    className="h-full bg-berry rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[9px] font-black text-stone-400 tracking-wider">
                  <span>{tSalon.progress_1}</span>
                  <span>{tSalon.progress_2}</span>
                  <span>{tSalon.progress_3}</span>
                  <span>{tSalon.progress_4}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Postcard Bottom Marquee Strip */}
      <div className="mt-20 border-y-2 border-dashed border-[#EB9FB0]/30 py-4 bg-white/80 overflow-hidden whitespace-nowrap">
        <div className="flex justify-around items-center text-[10px] font-bold text-ink/40 tracking-[0.2em] uppercase">
          <span>💌 HANDWRITTEN WITH LOVE</span>
          <span>•</span>
          <span>🧁 PIECE OF CAKE LETTER CO.</span>
          <span>•</span>
          <span>🌱 BOTANICAL COLORED PAPER</span>
          <span>•</span>
          <span>🍯 EXCLUSIVE HONEY MONSTER SEAL</span>
        </div>
      </div>

      {/* Beautiful Rich Interactive Action Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-ink text-cake px-8 py-5 rounded-3xl shadow-3xl flex items-center gap-4 border-4 border-berry/30 min-w-[320px] max-w-md"
          >
            <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center shrink-0 shadow-lg text-xl animate-bounce">
              🎉
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-black tracking-widest text-[#EB9FB0]">{tSalon.toast_success}</p>
              <p className="text-xs font-bold font-sans mt-0.5 text-white">{toastMessage}</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-xs opacity-50 hover:opacity-100 font-bold ml-2 underline cursor-pointer hover:text-berry"
            >
              {tSalon.toast_close}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
