import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Menu, X, Globe, User, Search, 
  MessageCircle, ChevronDown, Check, LogOut, Sparkles, Send
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useShop, Currency } from '../lib/ShopContext';
import { Language } from '../lib/translations';
import { cn } from '../lib/utils';
import { PRODUCTS } from '../constants';

interface Staff {
  id: string;
  name: string;
  avatar: string;
  role: string;
  greeting: string;
}

const NAVBAR_LOCALIZATIONS: Record<string, any> = {
  zh: {
    chef_intro: "您好！我是 Piece of Cake 的甜點主廚 🍰 今日想來點什麼配方的療癒甜品呢？",
    chef_shy: "哎呀，我好像太害羞了，暫時說不出話來... 🧁",
    chef_error: "哎呀，思考太用力我的主廚帽差點飛走... 🧁 似乎網路稍微打了個盹，您可以再問一次嗎？✨",
    title: "與療癒客服聊聊",
    role: "專屬心靈特派員",
    exchange_staff: "🔄 換客服",
    choose_staff_title: "💖 請選擇您的專屬客服 💖",
    choose_staff_sub: "我們有五位超萌小動物為您提供療癒解答",
    thinking: "正在努力攪拌思考中... 🧁外星科技傳輸中",
    input_placeholder: "和 {name} 聊點有趣的吧...",
    search_placeholder: "搜尋我們的心靈烘焙，如：草莓, 巧克力...",
    search_tag: "搜尋結果 Search results",
    all_recs: "全品項推薦 All Desserts",
    no_results: "沒有找到符合條件的治癒小甜品 🧁",
    staffs: [
      { id: 'pupu', name: '噗噗', avatar: '🐶', role: '萌犬客服 🐾', greeting: '汪汪！我是噗噗 🐶🐾 今天肚子特別餓～有沒有特別想點的甜點呀？我可以幫你熱情嗅嗅口味汪！' },
      { id: 'jiujiu', name: '啾啾', avatar: '🦄', role: '夢幻客服 🌈', greeting: '啾啾！我是美麗的啾啾 🦄✨ 帶著彩虹糖霜小魔法降臨！讓我來為您的烘焙難題點綴童話色彩吧！🌈🦄' },
      { id: 'hongdou', name: '紅豆', avatar: '🐰', role: '兔兔客服 🥕', greeting: '哈囉！我是紅豆 🐰🥕 蹦蹦蹦～向您請安！想要做出最溫暖治癒的下午茶選擇，交給我準沒錯蹦蹦！🐰' },
      { id: 'daidai', name: '呆呆', avatar: '🐘', role: '大象客服 🍃', greeting: '波波🐘～我是思考慢吞吞但超級可靠、大耳朵很會傾聽的呆呆 🐘🍃 有任何心事或訂單問題，快說給我聽波～' },
      { id: 'feifei', name: '肥肥', avatar: '🐷', role: '小豬客服 🍎', greeting: '哼哼！我是愛吃蛋糕點心的大吃貨肥肥 🐷 這裡所有甜點我都偷吃過（噓！），問我哪最好吃最肥美最合意，哼哼！🍎' }
    ]
  },
  en: {
    chef_intro: "Hello! I am the head dessert chef of Piece of Cake 🍰 What flavor of sweet healing are you looking for today?",
    chef_shy: "Uh oh, I seem too shy to say anything... 🧁",
    chef_error: "Oops, I listened so hard my chef hat almost flew off... 🧁 Let's try asking again once the network wakes up! ✨",
    title: "Chat with Healing Support",
    role: "Exclusive Soul Agent",
    exchange_staff: "🔄 Swap Agent",
    choose_staff_title: "💖 Choose Your Support Agent 💖",
    choose_staff_sub: "We have five adorable magical animals ready to help you",
    thinking: "is whisking up some delicious thoughts... 🧁",
    input_placeholder: "Chat about sweet things with {name}...",
    search_placeholder: "Search our healing desserts, e.g., Strawberry, Chocolate...",
    search_tag: "Search results",
    all_recs: "All Desserts",
    no_results: "No sweet healing desserts found matching this search 🧁",
    staffs: [
      { id: 'pupu', name: 'Pupu', avatar: '🐶', role: 'Cute Doggy 🐾', greeting: 'Woof woof! I am Pupu 🐶🐾 I am super hungry today! Is there a dessert you want to try? I can sniff out the best flavors! Woof!' },
      { id: 'jiujiu', name: 'Jiujiu', avatar: '🦄', role: 'Dreamy Support 🌈', greeting: 'Chirp! I am the beautiful Jiujiu 🦄✨ carrying pastel frosting magic! Let me light up your baking doubts with fairytale colors! 🌈🦄' },
      { id: 'hongdou', name: 'Hongdou', avatar: '🐰', role: 'Bunny Support 🥕', greeting: 'Hoppy hello! I am Hongdou 🐰🥕 hopping by to greet you! Want to craft the coziest afternoon tea? Leave it all to me! Hop hop! 🐰' },
      { id: 'daidai', name: 'Daidai', avatar: '🐘', role: 'Elephant Support 🍃', greeting: 'Pawoo elephant wave 🐘~ I might talk slow but I am super reliable and my big ears love to listen! Pour your heart out to me~ 🐘🍃' },
      { id: 'feifei', name: 'Feifei', avatar: '🐷', role: 'Piggy Support 🍎', greeting: 'Oink oink! I am Feifei 🐷 the ultimate dessert foodie! I have tried every single cake here (shh!). Ask me which one is the absolute juiciest and sweestest! Oink! 🍎' }
    ]
  },
  ja: {
    chef_intro: "こんにちは！Piece of Cake のパティシエです 🍰 本日はどのような甘い癒やしをお探しですか？",
    chef_shy: "あら、ちょっと恥ずかしくて言葉が出ないみたい… 🧁",
    chef_error: "おっと、考えすぎてパティシエの帽子が吹き飛びそうでした… 🧁 ネットの接続が起きたら、もう一度聞いてみてください！✨",
    title: "癒やしのサポートチャット",
    role: "専属ソウルエージェント",
    exchange_staff: "🔄 客服を交代",
    choose_staff_title: "💖 専属カスタマー選定 💖",
    choose_staff_sub: "5匹のキュートな動物サポートがあなたを待っています",
    thinking: "がただいまお返事を美味しくミキシング中です... 🧁",
    input_placeholder: "{name} と楽しくおしゃべりしよう...",
    search_placeholder: "私たちの心霊ケーキを検索（いちご、チョコなど）...",
    search_tag: "検索結果 Search results",
    all_recs: "全商品おすすめ All Desserts",
    no_results: "条件に合う癒やしのスイーツが見つかりませんでした 🧁",
    staffs: [
      { id: 'pupu', name: 'ププ', avatar: '🐶', role: 'ワンコサポート 🐾', greeting: 'ワンワン！僕ププだよ 🐶🐾 今日はお腹ぺこぺこ！どれが食べたい？くんくんして一番美味しいフレーバーを見つけてあげるよ、ワン！' },
      { id: 'jiujiu', name: 'ジュジュ', avatar: '🦄', role: '夢のサポート 🌈', greeting: 'ジュジュッ！美しいユニコーンのジュジュだよ 🦄✨ 虹色魔法パステルを連れてきたよ！あなたの甘いお悩みをファンタジーカラーで彩るね！🌈🦄' },
      { id: 'hongdou', name: 'アンコ', avatar: '🐰', role: 'ウサギサポート 🥕', greeting: 'こんにちは！アンコだよ 🐰🥕 ぴょんぴょん！最高の温かい午後ティーを作るなら、私に全部お任せ、ぴょんぴょん！🐰' },
      { id: 'daidai', name: 'ダイダイ', avatar: '🐘', role: 'ゾウさんサポート 🍃', greeting: 'パオーン 🐘~ おっとり屋さんだけど、大きなお耳でキミのお話を一生懸命聞くダイダイだよ。どんなことでも聞かせてね 🐘🍃' },
      { id: 'feifei', name: 'フェイフェイ', avatar: '🐷', role: '子豚ちゃんサポート 🍎', greeting: 'ブーブー！スイーツ大好きな食いしん坊フェイフェイだよ 🐷 ここのケーキは全部をつまみ食いしたぞ（内緒ね！）。どれが一番美味しいか聞いてブー！ 🍎' }
    ]
  },
  ko: {
    chef_intro: "안녕하세요! Piece of Cake의 수석 디저트 셰프입니다 🍰 오늘 하루 마침표를 찍어줄 달콤한 힐링 레시피를 추천해 드릴까요?",
    chef_shy: "어머나, 수줍어서 그런지 생각이 정리가 안 되네요... 🧁",
    chef_error: "이런! 너무 골똘히 생각했나 봐요 🧁 인터넷 연결 상태를 확인 후 다시 말씀해 주세요. ✨",
    title: "힐링 숍 메신저",
    role: "전용 감성 가이드",
    exchange_staff: "🔄 상담원 교체",
    choose_staff_title: "💖 나만의 전담 상담원 선택하기 💖",
    choose_staff_sub: "다섯 종류의 귀여운 큐피드 반려동물들이 대기하고 있습니다",
    thinking: "님이 열심히 거품기로 답변을 휘핑하고 있습니다... 🧁",
    input_placeholder: "{name} 상담원과 맛있는 이야기 나누기...",
    search_placeholder: "달콤한 디저트 검색 (딸기, 초콜릿, 녹차 등)...",
    search_tag: "검색 결과 Search results",
    no_results: "검색하신 조건에 맞는 치유 초콜릿이나 무스 케이크를 찾지 못했습니다 🧁",
    all_recs: "전체 메뉴 추천 All Desserts",
    staffs: [
      { id: 'pupu', name: '푸푸', avatar: '🐶', role: '멍뭉이 상담원 🐾', greeting: '멍멍! 나는 푸푸 🐶🐾 오늘 배가 많이 고파요! 먹고 싶은 케이크가 있나요? 취향을 킁늠 냄새 맡아서 알려줄게요, 멍!' },
      { id: 'jiujiu', name: '쥬쥬', avatar: '🦄', role: '꿈나라 레인보우 🌈', greeting: '쥬쥬! 유니콘 쥬쥬가 떴습니다 🦄✨ 무지개 파스텔 크림으로 동화 속에 있는 것처럼 달착지근한 고민을 싹 해결할게요! 🌈🦄' },
      { id: 'hongdou', name: '팥알이', avatar: '🐰', role: '꼬마 토끼 🥕', greeting: '안녕하세요! 깡총깡총 팥알이 🐰🥕 인사드려요! 가장 따뜻한 꿀맛 오후의 간식 티타임을 위한 환상의 궁합, 저와 함께 준비해 보아요! 🐰' },
      { id: 'daidai', name: '대대', avatar: '🐘', role: '코끼리 상담원 🍃', greeting: '뿌우🐘~ 생각은 조금 느려도 마음만은 든든하고 귀가 아주 커서 경청을 잘하는 대대 🐘🍃입니다. 고민거리가 있으면 다 말해줘요!' },
      { id: 'feifei', name: '피피', avatar: '🐷', role: '꿀꿀이 상담원 🍎', greeting: '꿀꿀! 디저트 킬러 피피 등장 🐷 여기 있는 모든 조각 케이크는 내가 맛봤지(쉿 비밀!). 가장 풍성하고 달콤한 추천 품목을 확인해 봐요, 꿀! 🍎' }
    ]
  }
};

const getProductEmoji = (id?: string, name: string = "") => {
  if (id?.startsWith('giftbox-') || name.includes('禮盒')) return '🎁';
  
  if (id === 'cloud-strawberry' || name.includes('赫本復古緞帶戚風') || name.includes('緞帶')) return '🎀';
  if (id === 'blueberry-mille-feuille' || name.includes('法式藍莓千層派') || name.includes('藍莓')) return '🥧';
  if (id === 'royal-crown' || name.includes('法式巴洛克皇冠珍珠戚風') || name.includes('皇冠')) return '👑';
  if (id === 'dream-butterfly' || name.includes('朝櫻幻境') || name.includes('舞蝶')) return '🦋';
  if (id === 'double-cherry-drip' || name.includes('春櫻落雨') || name.includes('櫻桃')) return '🍒';
  
  if (name.includes('草莓')) return '🍓';
  if (name.includes('巧克力') || name.includes('奧利奧')) return '🍫';
  if (name.includes('抹茶')) return '🍵';
  if (name.includes('檸檬')) return '🍋';
  return '🥧';
};

export default function Navbar({ cartCount = 0, onOpenCart }: { cartCount?: number, onOpenCart?: () => void }) {
  const { 
    language, setLanguage, 
    currency, setCurrency, 
    user, loginUser, registerUser, logoutUser, 
    convertPrice, t 
  } = useShop();

  const tNavbar = NAVBAR_LOCALIZATIONS[language] || NAVBAR_LOCALIZATIONS['zh'];
  const CUSTOMER_SERVICE_STAFFS: Staff[] = tNavbar.staffs;

  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Chat Staff Representative
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'chef'; text: string }>>([
    { sender: 'chef', text: '您好！我是 Piece of Cake 的甜點主廚 🍰 今日想來點什麼配方的療癒甜品呢？' }
  ]);

  // Sync chef chat intro on language change
  useEffect(() => {
    setChatMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'chef') {
        return [{ sender: 'chef', text: tNavbar.chef_intro }];
      }
      return prev;
    });
  }, [language, tNavbar]);

  const [userChatInput, setUserChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (showChatBox) {
      scrollToBottom();
    }
  }, [chatMessages, isGenerating, showChatBox]);

  // Account Form states (if logged out)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [regName, setRegName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for closing dropdowns on click outside
  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);
  const accRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLanguageDropdown(false);
      }
      if (currRef.current && !currRef.current.contains(e.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (accRef.current && !accRef.current.contains(e.target as Node)) {
        setShowAccountDropdown(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 140; // Higher offset because we have the taller custom dual Navbar now!
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }, 0);
  };

  const handleSendMessage = async () => {
    if (!userChatInput.trim() || isGenerating) return;
    const userMsg = userChatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setUserChatInput('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg,
          history: chatMessages,
          staffName: selectedStaff?.name,
          staffRole: selectedStaff?.role,
          staffEmoji: selectedStaff?.avatar
        })
      });

      if (!response.ok) {
        throw new Error('API server error');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: 'chef', text: data?.reply || '哎呀，我好像太害羞了，暫時說不出話來... 🧁' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { sender: 'chef', text: '哎呀，思考太用力我的主廚帽差點飛走... 🧁 似乎網路稍微打了個盹，您可以再問一次嗎？✨' }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setChatMessages([
      { sender: 'chef', text: staff.greeting }
    ]);
  };

  const submitAuthForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      const success = registerUser(regName, authEmail, authPassword);
      if (success) {
        setShowAccountDropdown(false);
        setIsRegisterMode(false);
        setRegName('');
        setAuthEmail('');
        setAuthPassword('');
      }
    } else {
      const success = loginUser(authEmail, authPassword);
      if (success) {
        setShowAccountDropdown(false);
        setAuthEmail('');
        setAuthPassword('');
      }
    }
  };

  // Nav categories mapped directly to photo items
  const NAV_CATEGORIES: Array<{ nameKey: string; target: string; hasSub: boolean; subs?: string[]; suffix?: string }> = [
    { nameKey: 'nav_products', target: 'shop', hasSub: true, subs: ['sub_products_1', 'sub_products_2', 'sub_products_3'] },
    { nameKey: 'nav_custom_lab', target: 'custom-lab', hasSub: false, suffix: '🔬' },
    { nameKey: 'nav_gifts', target: 'gift-sets', hasSub: true, subs: ['sub_gifts_1', 'sub_gifts_2'] },
    { nameKey: 'nav_card_salon', target: 'card-salon', hasSub: false, suffix: '💌' },
    { nameKey: 'nav_mood_select', target: 'prescription', hasSub: true, subs: ['sub_mood_select_1', 'sub_mood_select_2'] },
    { nameKey: 'nav_reviews', target: 'community', hasSub: true, subs: ['sub_reviews_1', 'sub_reviews_2'] },
    { nameKey: 'nav_qa', target: 'faq', hasSub: true, subs: ['sub_qa_1', 'sub_qa_2', 'sub_qa_3'] }
  ];

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled ? "shadow-md" : "border-gray-100"
      )}>
        {/* Tier 1: Top Bar (White / Cream accent background, Currency, Lang, Chat, Search, User icon) */}
        <div className="relative z-20 bg-white/95 backdrop-blur-md py-4 px-6 md:px-12 border-b border-gray-100/60 text-ink">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Logo area */}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-display font-black tracking-tighter flex items-center group shrink-0"
            >
              <span className="text-berry mr-2 group-hover:rotate-12 transition-transform inline-block text-3xl">🍰</span> 
              <span className="group-hover:text-berry transition-colors font-black">Piece of Cake.</span>
              <span className="ml-[6px] text-[8px] bg-berry/10 text-berry font-black uppercase tracking-[0.25em] px-2 py-0.5 rounded-full border border-berry/20">ATELIER</span>
            </a>

            {/* Top Right Utilities */}
            <div className="flex items-center space-x-6 md:space-x-7 text-ink/80 text-sm font-bold">
              
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button 
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-1.5 hover:text-berry select-none transition-colors py-1 cursor-pointer h-10 px-3 rounded-xl hover:bg-cake/20"
                >
                  <Globe size={15} className="text-gray-400" />
                  <span className="text-xs font-semibold">
                    {language === 'zh' ? '🇹🇼 繁體中文' : language === 'en' ? '🇺🇸 English' : language === 'ja' ? '🇯🇵 日本語' : '🇰🇷 한국어'}
                  </span>
                  <ChevronDown size={14} className={cn("transition-transform duration-300", showLanguageDropdown ? "rotate-180" : "")} />
                </button>
                <AnimatePresence>
                  {showLanguageDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border-4 border-cake text-ink shadow-lg py-2 overflow-hidden z-[99]"
                    >
                      {[
                        { code: 'zh', name: '🇹🇼 繁體中文', tag: 'Traditional Chinese' },
                        { code: 'en', name: '🇺🇸 English', tag: 'US English' },
                        { code: 'ja', name: '🇯🇵 日本語', tag: 'Japanese' },
                        { code: 'ko', name: '🇰🇷 한국어', tag: 'Korean' }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as Language);
                            setShowLanguageDropdown(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 hover:bg-cake/20 text-xs font-black flex justify-between items-center transition-all",
                            language === lang.code ? "text-berry bg-cake/10" : "text-ink/80"
                          )}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-black">{lang.name}</span>
                            <span className="text-[8px] opacity-40 font-bold tracking-wide uppercase">{lang.tag}</span>
                          </div>
                          {language === lang.code && <Check size={12} className="text-berry shrink-0 ml-2" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chat Helpline Trigger */}
              <button 
                onClick={() => setShowChatBox(!showChatBox)}
                className="relative p-2.5 text-gray-500 hover:text-berry transition-colors bg-gray-50/50 hover:bg-cake/20 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title="與主廚對話"
              >
                <MessageCircle size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white" />
              </button>

              {/* Search Icon */}
              <button 
                onClick={() => setShowSearchModal(true)}
                className="p-2.5 text-gray-500 hover:text-berry transition-colors bg-gray-50/50 hover:bg-cake/20 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title="搜尋甜點"
              >
                <Search size={18} />
              </button>

              {/* Shopping Cart Bag (Matching Image's distinct box format) */}
              <button 
                onClick={onOpenCart}
                className="border-2 border-gray-400 text-gray-500 font-bold tracking-widest hover:border-berry hover:text-berry hover:scale-105 transition-all text-xs flex items-center justify-center p-0 w-11 h-11 relative rounded-xl bg-white shadow-sm"
                title={`${t('cart_title')} (${cartCount})`}
              >
                {/* Visual "hanger hook" loop above bag as shown in some store icons */}
                <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-4 h-2 border-2 border-gray-400 border-b-transparent rounded-t-full" />
                <span className="font-mono text-sm font-black mt-0.5">{cartCount}</span>
              </button>

              {/* Mobile primary menu toggle */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="lg:hidden p-2.5 bg-gray-50/50 hover:bg-cake/20 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

            </div>
          </div>
        </div>

        {/* Tier 2: Bottom Navigation Row (Cake yellow/cream background with clear categorizations) */}
        <div className="relative z-10 bg-cake/95 backdrop-blur-md py-3.5 px-6 border-b border-ink/5 hidden lg:block overflow-x-auto text-ink">
          <div className="max-w-7xl mx-auto flex justify-center space-x-12 whitespace-nowrap">
            {NAV_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="relative group/nav py-1">
                <a
                  href={`#${cat.target}`}
                  onClick={(e) => handleScrollTo(e, cat.target)}
                  className="font-medium text-xs tracking-wider text-ink/80 hover:text-berry flex items-center gap-1 cursor-pointer transition-colors font-black"
                >
                  {t(cat.nameKey)}
                  {cat.suffix && <span className="text-[9px] text-berry/80 font-bold">{cat.suffix}</span>}
                  {cat.hasSub && <span className="text-[8px] opacity-70">▼</span>}
                </a>

                {/* Direct display nested box with an integrated hover bridge to prevent flickering/shaking */}
                {cat.hasSub && cat.subs && (
                  <div className="hidden group-hover/nav:block absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 z-50">
                    {/* The main box with a built-in pseudo-element bridging the gap so mouse movement is smooth */}
                    <div className="relative bg-white rounded-2xl border-4 border-cake shadow-[0_20px_40px_-15px_rgba(42,35,35,0.15)] py-2 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']">
                      <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t-4 border-l-4 border-cake" />
                      {cat.subs.map((subKey, sIdx) => (
                        <a
                          key={sIdx}
                          href={`#${cat.target}`}
                          onClick={(e) => handleScrollTo(e, cat.target)}
                          className="block px-4 py-2 text-[11px] font-bold text-ink/75 hover:bg-cake/20 hover:text-berry transition-colors cursor-pointer relative z-10"
                        >
                          {t(subKey) || subKey}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation expands both link categories and utilities */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-cake border-b border-ink/10 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-6">
                
                {/* Secondary list of nav links presenting all categories and sub-items directly */}
                <div className="grid grid-cols-2 gap-6">
                  {NAV_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="block py-2 border-b border-ink/5">
                      <a
                        href={`#${cat.target}`}
                        onClick={(e) => handleScrollTo(e, cat.target)}
                        className="text-sm font-black text-ink/90 hover:text-berry tracking-wide block"
                      >
                        {t(cat.nameKey)}
                        {cat.suffix && <span className="text-[9px] text-berry/80 font-black ml-1">{cat.suffix}</span>}
                      </a>
                      {cat.hasSub && cat.subs && (
                        <div className="mt-2 pl-2.5 flex flex-col space-y-2 border-l-2 border-berry/20">
                          {cat.subs.map((subKey, sIdx) => (
                            <a
                              key={sIdx}
                              href={`#${cat.target}`}
                              onClick={(e) => handleScrollTo(e, cat.target)}
                              className="text-[11px] font-bold text-ink/65 hover:text-berry block py-0.5"
                            >
                              {t(subKey) || subKey}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Interactive Help Chat Box */}
      <AnimatePresence>
        {showChatBox && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-6 right-6 z-[200] w-[350px] bg-cake rounded-[2.5rem] border-8 border-white overflow-hidden shadow-[0_32px_64px_-16px_rgba(42,35,35,0.3)] flex flex-col h-[480px] text-ink"
          >
            {/* Header */}
            <div className="bg-white p-5 pb-4 border-b border-cake-dark/20 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                {selectedStaff ? (
                  <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>{selectedStaff.avatar}</span>
                ) : (
                  <span className="text-2xl animate-spin" style={{ animationDuration: '6s' }}>🍰</span>
                )}
                <div>
                  <h4 className="font-display font-black text-sm italic leading-tight">
                    {selectedStaff ? `${selectedStaff.name}` : tNavbar.title}
                  </h4>
                  <p className="text-[8px] font-black text-berry uppercase tracking-widest mt-0.5">
                    {selectedStaff ? selectedStaff.role : tNavbar.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {selectedStaff && (
                  <button
                    onClick={() => setSelectedStaff(null)}
                    className="p-1 px-2.5 text-[9px] font-bold bg-cake hover:bg-berry hover:text-white rounded-full transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                    title={tNavbar.exchange_staff}
                  >
                    {tNavbar.exchange_staff}
                  </button>
                )}
                <button 
                  onClick={() => setShowChatBox(false)}
                  className="p-1.5 bg-gray-50 hover:bg-berry hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Body (Selection or Messages) */}
            {selectedStaff === null ? (
              <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-hide bg-[#FFFDFB]/80 flex flex-col justify-start">
                <div className="text-center py-2">
                  <span className="text-base font-black text-berry block">{tNavbar.choose_staff_title}</span>
                  <span className="text-[10px] text-ink/60 font-bold block mt-1">{tNavbar.choose_staff_sub}</span>
                </div>
                
                <div className="space-y-2.5">
                  {CUSTOMER_SERVICE_STAFFS.map((staff) => (
                    <motion.button
                      key={staff.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectStaff(staff)}
                      className="w-full text-left bg-white hover:bg-cake/15 border-2 border-stone-150/80 hover:border-berry/40 p-3 rounded-2xl flex items-center gap-4 transition-all shadow-sm group cursor-pointer"
                    >
                      <span className="text-3.5xl scale-110 group-hover:rotate-12 transition-transform duration-300 select-none shrink-0">{staff.avatar}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-display font-black text-xs text-ink/90">{staff.name}</span>
                          <span className="text-[8px] bg-berry/10 text-berry font-black px-1.5 py-0.5 rounded-full">{staff.role}</span>
                        </div>
                        <p className="text-[9px] text-ink/50 mt-1 line-clamp-1 font-medium">{staff.greeting.substring(0, 30)}...</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-hide bg-white/40">
                  {chatMessages.map((msg, mIdx) => (
                    <div 
                      key={mIdx} 
                      className={cn(
                        "flex flex-col max-w-[85%] text-xs",
                        msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <span className="text-[8px] font-black tracking-wider uppercase text-ink/40 mb-1">
                        {msg.sender === 'user' ? (user?.name || 'TRAVELLER ⛵') : `${selectedStaff.name} ${selectedStaff.avatar}`}
                      </span>
                      <div className={cn(
                        "p-3 rounded-2xl leading-relaxed font-semibold shadow-sm border",
                        msg.sender === 'user' 
                          ? "bg-berry text-white rounded-tr-none border-berry/20" 
                          : "bg-white text-ink rounded-tl-none border-gray-100"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isGenerating && (
                    <div className="flex flex-col max-w-[85%] text-xs mr-auto items-start animate-pulse">
                      <span className="text-[8px] font-black tracking-wider uppercase text-ink/40 mb-1">
                        {selectedStaff.name} {selectedStaff.avatar}
                      </span>
                      <div className="p-3 bg-white text-ink border border-gray-100 rounded-2xl rounded-tl-none leading-relaxed font-bold italic">
                        {selectedStaff.name} {tNavbar.thinking}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <div className="p-4 bg-white border-t border-cake-dark/10 flex gap-2 shrink-0">
                  <input
                    type="text"
                    placeholder={tNavbar.input_placeholder.replace('{name}', selectedStaff.name)}
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-cake/20 px-4 py-3 rounded-2xl text-xs font-bold outline-none border border-white/50 focus:border-berry/35"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-berry text-white rounded-xl hover:bg-ink hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Search Modal overlay */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-[600] flex items-start justify-center pt-24 px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearchModal(false)}
              className="absolute inset-0 bg-ink/45 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              className="relative w-full max-w-xl bg-cake border-8 border-white rounded-[3rem] shadow-[0_32px_64px_rgba(42,35,35,0.4)] overflow-hidden"
            >
              {/* Box Header */}
              <div className="p-6 pb-2 flex gap-4 items-center">
                <Search size={20} className="text-berry/75 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder={tNavbar.search_placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-base outline-none text-ink font-bold placeholder-ink/40"
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="p-2 bg-white hover:bg-berry hover:text-white rounded-full transition-all text-xs font-black shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Box results */}
              <div className="max-h-[350px] overflow-y-auto border-t border-white/40 p-6 space-y-3 bg-white/40">
                <span className="text-[9px] font-black tracking-widest text-berry/65 uppercase block">
                  {searchQuery ? tNavbar.search_tag : tNavbar.all_recs}
                </span>
                
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        // Triggers scroll to section or open custom dialog
                        setShowSearchModal(false);
                        const element = document.getElementById('shop');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-white hover:bg-cake/15 border-2 border-white/60 hover:border-berry/30 p-3.5 rounded-2xl flex gap-4 items-center cursor-pointer transition-all active:scale-[0.99] group"
                    >
                      <div className="w-12 h-12 bg-cake rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        {getProductEmoji(p.id, p.name)}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-display font-black text-xs text-ink">{p.name}</h5>
                        <p className="text-[10px] text-ink/50 mt-0.5 line-clamp-1">{p.description}</p>
                      </div>
                      <span className="font-mono text-xs font-black text-berry text-right shrink-0">{convertPrice(p.price)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-ink/55 text-center py-6 font-bold">{tNavbar.no_results}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
