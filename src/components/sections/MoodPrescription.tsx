import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCT_DATA } from '../../constants';
import DestinedCardFlip from './DestinedCardFlip';
import { useShop } from '../../lib/ShopContext';

const MOODS_LANG = {
  zh: {
    title: "情緒處方",
    heading_main: "為你的情緒 ",
    heading_italic: "開立處方.",
    heading_desc: "選擇你現在的心情，讓我們為你推薦最適合的甜點，讓負能量瞬間退散。",
    placeholder: "請選擇上方的心情標籤...",
    label_prescription: "您的專屬處方",
    prefix_suggestion: "針對「",
    suffix_suggestion: "」的甜點建議",
    items: [
      { id: 'happy', emoji: '🥰', name: '開心', description: '讓好心情更上一層樓！', color: 'bg-green-50' },
      { id: 'sad', emoji: '😢', name: '傷心', description: '甜點是最溫柔的擁抱。', color: 'bg-blue-50' },
      { id: 'angry', emoji: '😡', name: '生氣', description: '冰涼與甜蜜能消暑降火。', color: 'bg-red-50' },
      { id: 'nervous', emoji: '😰', name: '緊張', description: '咬一口，找回平靜的節奏。', color: 'bg-purple-50' },
      { id: 'calm', emoji: '😌', name: '平靜', description: '陪你享受當下的寧靜。', color: 'bg-orange-50' },
      { id: 'confused', emoji: '🤔', name: '不知道要選什麼', description: '當你的心無法決定，就讓運氣替你開路。', color: 'bg-yellow-50' }
    ]
  },
  en: {
    title: "Mood Prescription",
    heading_main: "Prescribe for your ",
    heading_italic: "Mood Today.",
    heading_desc: "Select your current mood, and let us recommend the perfect dessert to melt your stress away instantly.",
    placeholder: "Please select a mood from above...",
    label_prescription: "Your Special Remedy",
    prefix_suggestion: "Dessert suggestion for \"",
    suffix_suggestion: "\"",
    items: [
      { id: 'happy', emoji: '🥰', name: 'Happy', description: 'Elevate your high spirits to the clouds!', color: 'bg-green-50' },
      { id: 'sad', emoji: '😢', name: 'Sad', description: 'Dessert is the gentlest hug you can get.', color: 'bg-blue-50' },
      { id: 'angry', emoji: '😡', name: 'Angry', description: 'Sweet coolness of cream will calm down your fire.', color: 'bg-red-50' },
      { id: 'nervous', emoji: '😰', name: 'Nervous', description: 'Take a sweet bite of relief and slow down your pace.', color: 'bg-purple-50' },
      { id: 'calm', emoji: '😌', name: 'Calm', description: 'Companion for your peaceful mindful moment.', color: 'bg-orange-50' },
      { id: 'confused', emoji: '🤔', name: 'Indecisive', description: 'If your heart cannot decide, let luck guide your path.', color: 'bg-yellow-50' }
    ]
  },
  ja: {
    title: "心情處方",
    heading_main: "あなたの気分に ",
    heading_italic: "処方箋を。",
    heading_desc: "今の気分をタップしてください。心身を極上スイーツで満たし、負のエネルギーをそっと溶かします。",
    placeholder: "上の気分マークを選んでください...",
    label_prescription: "パーソナル処方箋",
    prefix_suggestion: "「",
    suffix_suggestion: "」へのスイーツの提案",
    items: [
      { id: 'happy', emoji: '🥰', name: 'ハッピー', description: '最高のご機嫌をもっと輝かせましょう！', color: 'bg-green-50' },
      { id: 'sad', emoji: '😢', name: 'やかなしい', description: '甘いスイーツは最も優しい寄り添いです。', color: 'bg-blue-50' },
      { id: 'angry', emoji: '😡', name: 'イライラ', description: '冷たくて滑らかな甘さが熱い心をなだめます。', color: 'bg-red-50' },
      { id: 'nervous', emoji: '😰', name: '緊張する', description: '一口食べて、いつもの心地よいリズムを取り戻して。', color: 'bg-purple-50' },
      { id: 'calm', emoji: '😌', name: 'おだやか', description: '今ここにある穏やかな時間が味わえます。', color: 'bg-orange-50' },
      { id: 'confused', emoji: '🤔', name: '迷っている', description: '心で決められないなら、運命のカードに任せましょう。', color: 'bg-yellow-50' }
    ]
  },
  ko: {
    title: "감정 처방전",
    heading_main: "당신의 마음에 ",
    heading_italic: "처방전을 드립니다.",
    heading_desc: "지금 느끼고 있는 마음에 어울리는 완벽한 힐링 디저트를 추천해 드립니다.",
    placeholder: "위에 있는 마음 표정을 선택해주세요...",
    label_prescription: "당신만을 위한 디저트 처방",
    prefix_suggestion: "「",
    suffix_suggestion: "」를 위한 달콤한 처방",
    items: [
      { id: 'happy', emoji: '🥰', name: '기쁨', description: '좋은 기분을 날아갈 듯 더 행복하게!', color: 'bg-green-50' },
      { id: 'sad', emoji: '😢', name: '슬픔', description: '달콤한 케이크는 언제나 따뜻한 포옹입니다.', color: 'bg-blue-50' },
      { id: 'angry', emoji: '😡', name: '화남', description: '시원하고 진한 달콤함이 타오르는 마음을 가라앉힙니다.', color: 'bg-red-50' },
      { id: 'nervous', emoji: '😰', name: '긴장됨', description: '한 입 베어 물고 마음의 평정을 찾아보세요.', color: 'bg-purple-50' },
      { id: 'calm', emoji: '😌', name: '평온함', description: '지금 여기에 머무는 평화로운 동伴자입니다.', color: 'bg-orange-50' },
      { id: 'confused', emoji: '🤔', name: '선택 장애', description: '스스로 결정하기 힘들다면 운명의 카드를 믿어보세요.', color: 'bg-yellow-50' }
    ]
  }
};

interface MoodPrescriptionProps {
  onSelectProduct: (id: string) => void;
  onViewProduct: (id: string) => void;
  onAddToCart?: (product: any) => void;
}

export default function MoodPrescription({ onSelectProduct, onViewProduct, onAddToCart }: MoodPrescriptionProps) {
  const { language, t, convertPrice } = useShop();
  const translations = MOODS_LANG[language] || MOODS_LANG.zh;
  const moods = translations.items;

  // Selected mood index state
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const selectedMood = moods.find(m => m.id === selectedMoodId) || null;

  const getRecommendedProducts = (moodId: string) => {
    if (moodId === 'happy') return PRODUCT_DATA.healing.slice(0, 2);
    if (moodId === 'sad') return [PRODUCT_DATA.healing[2]];
    if (moodId === 'angry') return [PRODUCT_DATA.healing[3]];
    if (moodId === 'nervous') return [PRODUCT_DATA.healing[4]];
    return [PRODUCT_DATA.healing[1]];
  };

  return (
    <section id="prescription" className="py-24 bg-cake/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-20">
          <h2 className="text-[11px] font-bold tracking-[0.4em] mb-4 opacity-40 uppercase">{translations.title}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            {translations.heading_main} <span className="text-berry italic">{translations.heading_italic}</span>
          </h3>
          <p className="mt-6 text-sm opacity-60 max-w-lg mx-auto">
            {translations.heading_desc}
          </p>
        </div>

        {/* Mood Selector */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-24">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMoodId(mood.id)}
              className={`px-8 py-6 bg-white border border-ink/5 rounded-[32px] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col items-center space-y-3 ${
                selectedMoodId === mood.id ? 'border-berry border-2 scale-105 shadow-berry/10' : 'hover:border-berry/30'
              }`}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="text-sm font-bold">{mood.name}</span>
            </button>
          ))}
        </div>

        {/* Result Area */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!selectedMood ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 border-2 border-dashed border-ink/10 rounded-[40px] opacity-40"
              >
                <p className="text-sm italic">{translations.placeholder}</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedMood.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 animate-in-glow"
              >
                {selectedMood.id === 'confused' ? (
                  <DestinedCardFlip onAddToCart={onAddToCart || (() => {})} onSelectProduct={onSelectProduct} />
                ) : (
                  <>
                    <div className="mb-12">
                      <h4 className="text-[11px] font-bold tracking-[0.3em] mb-2 opacity-40 uppercase">{translations.label_prescription}</h4>
                      <h5 className="text-3xl font-display font-bold text-berry italic">
                        {translations.prefix_suggestion}{selectedMood.name}{translations.suffix_suggestion}
                      </h5>
                      <p className="mt-2 text-sm opacity-60">{selectedMood.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {getRecommendedProducts(selectedMood.id).map((product) => (
                        <div 
                          key={product.id} 
                          className="bg-white p-8 rounded-[40px] shadow-sm border border-ink/5 text-left group hover:shadow-2xl transition-all duration-500 cursor-pointer"
                          onClick={() => onSelectProduct(product.id)}
                        >
                          <div className="flex gap-6 items-center">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-cake-dark shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <h5 className="font-display font-bold text-xl mb-1">{t('prod_' + product.id + '_name')}</h5>
                              <p className="text-berry font-bold text-sm">{convertPrice(product.price)}</p>
                            </div>
                          </div>
                          <p className="mt-6 text-xs opacity-60 leading-relaxed min-h-[40px]">{t('prod_' + product.id + '_desc')}</p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProduct(product.id);
                            }}
                            className="mt-8 w-full py-4 rounded-full border border-ink text-[10px] font-bold tracking-widest uppercase hover:bg-ink hover:text-cake transition-all flex items-center justify-center gap-2"
                          >
                            {t('btn_add_to_cart')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
