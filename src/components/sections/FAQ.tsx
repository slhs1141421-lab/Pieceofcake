import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, MessageSquare, Sparkles, Heart } from 'lucide-react';
import { useShop } from '../../lib/ShopContext';

const LOCALIZED_FAQ = {
  zh: {
    sidebar_badge: "Support Center",
    sidebar_title_1: "療癒",
    sidebar_title_2: "大樓的",
    sidebar_title_3: "常見問題",
    sidebar_desc: "對於這份甜點，如果您有任何疑惑，我們都在這裡為您解答。🍰",
    cta_title: "還想聊聊嗎？✨",
    cta_desc: "如果是關於特別需求或大量訂購，歡迎直接私訊或是撥打電話。",
    cta_tel: "TEL: 02-1234-5678",
    cta_line: "LINE: @sweet_healing",
    solution_suffix: " 份解答",
    data: [
      {
        category: '1. 關於產品 Production',
        emoji: '🧁',
        items: [
          { q: '甜點的甜度可以調整嗎？', a: '為了呈現甜點師調配出的最佳療癒比例，甜度是固定的。我們選用優質低昇糖糖材，讓您品嚐甜美時也毫無負擔。' },
          { q: '收到後如果沒馬上吃，該怎麼處理？', a: '請立即放置於冰箱保存。冷凍通常可保存 14 天，建議享用前退冰 20 分鐘；冷藏則建議在 3 天內享用完畢，以保最佳風味。' },
          { q: '為什麼這款甜點看起來跟照片有一點點不同？', a: '因為我們堅持手工製作，每一份甜點都是一份獨一無二的療癒創作。色彩與裝飾會隨著季節鮮果與手作感有些微差異，這正是手作的溫度。' },
          { q: '甜點有添加防腐劑嗎？', a: '我們承諾 100% 無添加任何化學防腐劑。我們依賴低溫供應鏈環境與專業真空包裝技術來確保每一口的鮮美與純淨。' }
        ]
      },
      {
        category: '2. 訂單相關 Orders',
        emoji: '📅',
        items: [
          { q: '如何更改訂單內容、日期？', a: '由於製作名額有限，若需更改請於取貨 3 天前來電或透過官方客服洽詢。我們會全力協調，但無法保戰新日期仍有名額。' },
          { q: '如果需要臨時取消訂單怎麼辦？', a: '因為甜點為下單後才開始準備新鮮食材，3 天內的取消將會酌收食材成本費用。詳細規則請參考結帳頁面的服務條款。' }
        ]
      },
      {
        category: '3. 取件相關 Delivery',
        emoji: '🏬',
        items: [
          { q: '取件時需要注意什麼？', a: '取件時請提供訂單編號或訂購人姓名。核對蛋糕品項後請務必仔細檢查整體狀況，離店後因溫控不當或碰撞導致的損壞，恕無法提供協助。' },
          { q: '請問可以停門口，蛋糕送出來嗎？', a: '為了確保蛋糕在您手上是完美的，我們堅持邀請您入店核對品項與保存提醒。美好的療癒，值得您停留這幾分鐘親自感受。' }
        ]
      }
    ]
  },
  en: {
    sidebar_badge: "Support Center",
    sidebar_title_1: "Healing",
    sidebar_title_2: "Atelier",
    sidebar_title_3: "Frequently Asked Qs",
    sidebar_desc: "If you have any questions about our sweet treats, we are always here to guide you. 🍰",
    cta_title: "Still want to talk? ✨",
    cta_desc: "For special requests or bulk orders, please contact us directly via phone or line.",
    cta_tel: "TEL: +886 2 1234 5678",
    cta_line: "LINE: @sweet_healing",
    solution_suffix: " Answers",
    data: [
      {
        category: '1. Products Selection',
        emoji: '🧁',
        items: [
          { q: 'Can the sweetness level of the desserts be adjusted?', a: 'To present the absolute best healing balance created by the pastry chef, the sweetness is fixed. We choose premium low glycemic index sweeteners, so you can enjoy the sweetness without burden.' },
          { q: 'How should I store them if not eaten immediately?', a: 'Please place them in the refrigerator immediately. Freezing generally lasts up to 14 days (recommended to thaw for 20 minutes before serving); chilling is recommended to be consumed within 3 days for the finest flavor.' },
          { q: 'Why does this dessert look slightly different from the photo?', a: 'Because we insist on handmade preparation, every dessert is a unique piece of healing artwork. Colors and decorations might vary slightly with seasonal fresh fruits and handcraft feel, which represents the warmth of handmade baking.' },
          { q: 'Are there any preservatives added to the desserts?', a: 'We guarantee 100% free of any chemical preservatives. We rely on strict low-temperature cold chain and professional vacuum sealing technologies to ensure peak freshness and purity.' }
        ]
      },
      {
        category: '2. Orders & Policies',
        emoji: '📅',
        items: [
          { q: 'How can I change my order details or pickup date?', a: 'Due to limited daily slots, please contact us via phone or online customer service at least 3 days before pickup. We will do our absolute best to coordinate, but cannot guarantee availability.' },
          { q: 'What if I need to cancel my order at the last minute?', a: 'Because your desserts are custom baked with fresh ingredients right after ordering, cancellations within 3 days will incur ingredient cost fees. Please refer to our terms of service on the checkout page.' }
        ]
      },
      {
        category: '3. Store Pickup Help',
        emoji: '🏬',
        items: [
          { q: 'What should I pay attention to during store pickup?', a: 'Please provide your order number or name. After verifying the items, please make sure to check their overall condition carefully. We cannot assist with damages due to subsequent improper temperature control or bumps after leaving.' },
          { q: 'Can I park at the storefront and have the cake brought out?', a: 'To ensure the cake is in perfect condition when handed over, we insist on inviting you inside to double-check and receive premium storage tips. A beautiful healing experience is worth staying for these few minutes to feel in person.' }
        ]
      }
    ]
  },
  ja: {
    sidebar_badge: "カスタマーサポート",
    sidebar_title_1: "心癒す",
    sidebar_title_2: "スイーツの",
    sidebar_title_3: "よくあるご質問",
    sidebar_desc: "私たちのスイーツについてご不明な点がございましたら、いつでもお手伝いいたします。🍰",
    cta_title: "もっと話したいですか？✨",
    cta_desc: "特別なご要望や大口注文がございましたら、お気軽にお電話またはLINEでお問い合わせください。",
    cta_tel: "TEL: +886 2 1234 5678",
    cta_line: "LINE: @sweet_healing",
    solution_suffix: " 個の回答",
    data: [
      {
        category: '1. 商品について Production',
        emoji: '🧁',
        items: [
          { q: 'スイーツの甘さは調節可能ですか？', a: 'シェフが調合した最高の「癒しの黄金比」をお届けするため、甘さは固定となっております。低GI（糖甘味）素材を厳選し、体に優しい甘みを実現しました。' },
          { q: 'すぐに食べない場合、どのように保存すればよいですか？', a: '速やかに冷蔵庫または冷凍庫に入れてください。冷凍保存は14日間（食べる25分前に常温解凍がおすすめ）、冷蔵は3日以内にお召し上がりいただくことで、最高の風味をお楽しみいただけます。' },
          { q: '届いた商品が写真と少しだけ違って見えるのはなぜですか？', a: '私たちは手作りにこだわっているため、ひとつひとつのスイーツが「世界にひとつだけの作品」です。旬の果物や手作業による微細な個性が、手作りならではの温もりを伝えます。' },
          { q: '防腐剤は使用していますか？', a: '保存料・防腐剤は100%一切使用しておりません。徹底した冷蔵配送と特殊な真空包装技術により、素材本来の新鮮さと純粋な美味しさをお守りしています。' }
        ]
      },
      {
        category: '2. ご注文について Orders',
        emoji: '📅',
        items: [
          { q: '注文内容や受取日の変更はどのように行いますか？', a: '１日の製造数に限りがあるため、変更をご希望の場合は受取日の3日前までに、お電話またはオンラインカスタマーサービスへご連絡ください。全力で調整いたします。' },
          { q: '急なキャンセルが必要な場合はどうすればよいですか？', a: 'ご注文後に新鮮な食材を準備するため、受取日3日前以降のキャンセルは食材実費をいただく場合がございます。詳細はチェックアウト画面の利用規約をご参照ください。' }
        ]
      },
      {
        category: '3. 店舗受取について Pickup',
        emoji: '🏬',
        items: [
          { q: '店舗での受取時に持参・確認するものはありますか？', a: 'お受取の際は注文番号、またはご注文者様のお名前をご提示ください。お持ち帰り後の温度変化や衝撃による破損は、保証の対象外となりますのでご了承ください。' },
          { q: '店の前に車を停めて、スタッフにケーキを持ってきてもらうことはできますか？', a: '完璧な状態でお渡しするため、店内でケーキの状態を最終確認いただき、保存方法をご案内しております。最高の癒しの瞬間を、ぜひ店内で体験してください。' }
        ]
      }
    ]
  },
  ko: {
    sidebar_badge: "고객 지원",
    sidebar_title_1: "아틀리에",
    sidebar_title_2: "디저트",
    sidebar_title_3: "자주 묻는 질문",
    sidebar_desc: "디저트에 대한 질문이 있으시면 언제든지 친절히 답변해 드립니다. 🍰",
    cta_title: "더 이야기 나누고 싶으신가요? ✨",
    cta_desc: "특별한 요청이나 대량 주문 건이 있을 경우, 편하게 전화 또는 라인으로 문의 주시기 바랍니다.",
    cta_tel: "TEL: +886 2 1234 5678",
    cta_line: "LINE: @sweet_healing",
    solution_suffix: " 개의 답변",
    data: [
      {
        category: '1. 제품 관련 생산 안내 Production',
        emoji: '🧁',
        items: [
          { q: '디저트의 당도를 조절할 수 있나요？', a: '파티셰가 조율한 최상의 맛의 약속을 위해 당도는 고정되어 있습니다. 고품질의 천연 감미료를 사용하여 마음껏 드셔도 부담스럽지 않도록 준비했습니다.' },
          { q: '받은 후 바로 먹지 않을 경우 어떻게 보관해야 하나요？', a: '즉시 냉장 또는 냉동 보관해 주십시오. 냉동은 일반적으로 14일간 보관이 가능하며 드시기 20분 전에 자연 해동하는 것을 권장합니다. 냉장은 3일 이내에 드셔야 최적의 풍미를 즐기실 수 있습니다.' },
          { q: '디저트가 실물 사진과 약간 다르게 보이는 이유는 무엇인가요？', a: '모든 디저트를 수작업으로 준비하기에, 각각의 디저트는 세상에 단 하나뿐인 예술품과도 같습니다. 계절 과일과 수제 느낌에 따라 디자인에 미세한 차이가 있을 수 있습니다.' },
          { q: '디저트에 화학 보존료가 첨가되어 있나요？', a: '저희는 100% 화학 보존제를 전혀 사용하지 않습니다. 철저한 저온 콜드체인과 전문 진공 밀봉 기술을 사용하여 매 순간 신선하고 건강하게 전해드립니다.' }
        ]
      },
      {
        category: '2. 주문 및 결제 관련 Orders',
        emoji: '📅',
        items: [
          { q: '주문 세부 사항이나 수령 예정일은 어떻게 변경하나요？', a: '하루 제작 수량이 한정되어 있어, 변경을 원하시면 수령일 기준 최소 3일 전까지 고객센터나 전화를 통해 문의해 주시기 바랍니다. 최대한 조율해 드릴 수 있도록 노력하겠습니다.' },
          { q: '주문을 갑자기 취소해야 할 경우 어떻게 해야 하나요？', a: '예약과 주문 즉시 신선한 재료 수급 및 전처리에 들어가므로, 수령 전 3일 이내의 취소 요청은 소정의 원재료 수수료가 청구됩니다. 상세사항은 주문 페이지의 약관을 참고해주세요.' }
        ]
      },
      {
        category: '3. 매장 수령 안내 Pickup',
        emoji: '🏬',
        items: [
          { q: '매장 수령 시 주의해야 할 사항이 있나요？', a: '수령 시 주문 번호나 예약자 성함을 제시해주십시오. 파손 방지를 위해 매장에서 케이크 외관을 확실히 점검해 주셔야 하며, 매장 밖에서의 보관 부주의나 충격으로 인한 손상은 지원이 어렵습니다.' },
          { q: '매장 앞에 차를 대고, 디저트를 밖으로 받아갈 수 있나요？', a: '디저트의 완벽한 퀄리티 보장과 신선한 보관 팁 안내를 위해, 매장 내에서 직접 확인 후 서명해 주셔야 합니다. 소중한 힐링 서비스를 위해 매장 내에서 잠시 머물러 주세요.' }
        ]
      }
    ]
  }
};

export default function FAQ() {
  const { language } = useShop();
  const faqData = LOCALIZED_FAQ[language] || LOCALIZED_FAQ.zh;
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="faq" className="py-32 bg-[#fffaf0] relative overflow-hidden font-cute">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-berry/5 rounded-full blur-3xl -mr-[20rem] -mt-[10rem] opacity-50" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-cake/20 rounded-full blur-3xl -ml-[15rem] -mb-[10rem] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* Left Side: Header & Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-berry/10 rounded-full text-sans font-bold">
                  <Sparkles size={16} className="text-berry" />
                  <span className="text-xs tracking-[0.2em] uppercase text-berry">{faqData.sidebar_badge}</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-sans font-black uppercase tracking-tighter text-ink leading-[0.85] -rotate-1">
                  {faqData.sidebar_title_1}<br />{faqData.sidebar_title_2}<br /><span className="text-berry">{faqData.sidebar_title_3}</span>
                </h1>
                <p className="text-base font-sans font-bold opacity-60 max-w-xs leading-relaxed">
                  {faqData.sidebar_desc}
                </p>
              </div>

              {/* Category Selector (Desktop) */}
              <div className="hidden lg:block space-y-4 pt-4">
                {faqData.data.map((group, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`w-full text-left px-8 py-5 rounded-[2rem] transition-all flex items-center justify-between group ${
                      activeCategory === idx 
                        ? 'bg-white shadow-2xl shadow-berry/10 text-berry translate-x-4 border-l-8 border-berry' 
                        : 'text-ink/40 hover:text-ink hover:bg-white/50 hover:translate-x-2'
                    }`}
                  >
                      <span className="text-lg font-sans font-bold flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                        activeCategory === idx ? 'bg-berry/10' : 'bg-cake'
                      }`}>
                        {group.emoji}
                      </span>
                      {group.category.split(' ')[1]}
                    </span>
                    <HelpCircle size={20} className={`transition-opacity ${activeCategory === idx ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>

              {/* Contact Card */}
              <div className="bg-ink text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group rotate-1">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                  <MessageSquare size={100} />
                </div>
                <h3 className="text-2xl font-sans font-bold mb-4">{faqData.cta_title}</h3>
                <p className="text-sm font-sans font-bold opacity-60 mb-8 leading-relaxed">{faqData.cta_desc}</p>
                <div className="space-y-4">
                  <p className="text-lg font-sans font-bold tracking-widest text-berry">{faqData.cta_tel}</p>
                  <p className="text-lg font-sans font-bold tracking-widest text-cake">{faqData.cta_line}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {/* Mobile Category Select */}
              <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                {faqData.data.map((group, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`px-8 py-4 rounded-full text-sm font-sans font-bold whitespace-nowrap transition-all flex items-center gap-3 ${
                      activeCategory === idx ? 'bg-berry text-white shadow-lg shadow-berry/20 scale-105' : 'bg-white text-ink/40'
                    }`}
                  >
                    <span className="text-lg">{group.emoji}</span>
                    {group.category.split(' ')[1]}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="mb-12 pb-8 border-b-6 border-cake flex items-center justify-between">
                  <h2 className="text-3xl font-sans font-bold text-ink flex items-center gap-6">
                    <span className="w-16 h-16 rounded-[1.8rem] bg-berry text-white flex items-center justify-center text-3xl shadow-xl shadow-berry/20 -rotate-2">
                      {faqData.data[activeCategory]?.emoji}
                    </span>
                    {faqData.data[activeCategory]?.category}
                  </h2>
                  <div className="text-xs font-sans font-bold tracking-widest text-ink/20 uppercase">
                    {faqData.data[activeCategory]?.items?.length}{faqData.solution_suffix}
                  </div>
                </div>

                <div className="space-y-6">
                  {faqData.data[activeCategory]?.items?.map((item, idx) => {
                    const id = `cat-${activeCategory}-item-${idx}`;
                    const isOpen = openIndex === id;
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group border-[6px] rounded-[2.5rem] transition-all duration-500 overflow-hidden ${
                          isOpen 
                            ? 'border-berry/40 bg-white shadow-2xl shadow-berry/15' 
                            : 'border-white bg-white/60 hover:bg-white hover:border-cake hover:shadow-xl hover:shadow-ink/5'
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : id)}
                          className="w-full px-10 py-9 flex items-center justify-between text-left"
                        >
                          <span className={`font-sans font-bold text-xl md:text-2xl leading-tight transition-colors duration-500 pr-10 ${
                            isOpen ? 'text-berry' : 'text-ink'
                          }`}>
                            {item.q}
                          </span>
                          <div className={`w-12 h-12 shrink-0 rounded-full transition-all duration-500 flex items-center justify-center border-4 ${
                            isOpen ? 'bg-berry border-berry text-white rotate-180 shadow-lg shadow-berry/20' : 'bg-cake/30 border-ink/5 text-ink/30'
                          }`}>
                            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                            >
                              <div className="px-10 pb-10 pt-2">
                                <div className="p-8 bg-cake/20 rounded-[2rem] border-4 border-white relative shadow-inner">
                                  <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <Heart size={32} className="text-berry fill-berry animate-pulse" />
                                  </div>
                                  <p className="text-lg md:text-xl font-sans font-bold text-ink/70 leading-relaxed text-left">
                                    「 {item.a} 」
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
