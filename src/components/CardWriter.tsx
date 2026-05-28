import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, Smile, Coffee, Feather, RotateCcw, Check, Quote, Send } from 'lucide-react';

// Cute Card Themes
export const CARD_THEMES = [
  {
    id: 'strawberry',
    name: '草莓甜心派 🍓',
    bg: 'bg-[#FFF0F2] text-[#8C2D3D]',
    borderClass: 'border-[#FCA5B3] border-dashed',
    accentColor: '#EB9FB0',
    previewBg: 'bg-gradient-to-br from-[#FFF0F2] via-[#FFE3E7] to-[#FED6DB]',
    stickerDefault: '🍓',
    badgeClass: 'bg-[#EB9FB0]/20 text-[#8C2D3D]'
  },
  {
    id: 'honey',
    name: '小蜜怪之歌 🍯',
    bg: 'bg-[#FFFBEB] text-[#78350F]',
    borderClass: 'border-[#FDE047] border-double border-4',
    accentColor: '#FBBF24',
    previewBg: 'bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]',
    stickerDefault: '🍯',
    badgeClass: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'souffle',
    name: '雲朵舒芙蕾 ☁️',
    bg: 'bg-[#F0F9FF] text-[#075985]',
    borderClass: 'border-[#BAE6FD] border-solid',
    accentColor: '#38BDF8',
    previewBg: 'bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]',
    stickerDefault: '☁️',
    badgeClass: 'bg-sky-100 text-sky-800'
  },
  {
    id: 'lavender',
    name: '薰衣晚香 🌌',
    bg: 'bg-[#FAF5FF] text-[#581C87]',
    borderClass: 'border-[#E9D5FF] border-[3px] border-dotted',
    accentColor: '#C084FC',
    previewBg: 'bg-gradient-to-br from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]',
    stickerDefault: '🌟',
    badgeClass: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'forest',
    name: '抹茶小幸運 🍀',
    bg: 'bg-[#F0FDF4] text-[#166534]',
    borderClass: 'border-[#BBF7D0] border-dashed border-2',
    accentColor: '#4ADE80',
    previewBg: 'bg-gradient-to-br from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0]',
    stickerDefault: '🍀',
    badgeClass: 'bg-emerald-100 text-emerald-800'
  }
];

// Quick Greeting Templates
const GREETING_TEMPLATES = [
  {
    category: '🎂 生日專屬',
    text: '祝你生日快樂！天天都像今天的海鹽草莓蛋糕一樣甜美幸福，煩惱通通煙消雲散！大口大口吃下所有的甜，我們都要天天開心喔！🎈🎉'
  },
  {
    category: '💝 暖心告白',
    text: '和你分享甜點，是我最幸福的時刻。聽說吃甜食會分泌多巴胺，但對我來說，光是看著你微笑，就早已是全世界最甜的存在了。愛你唷！💖'
  },
  {
    category: '🧸 感謝有你',
    text: '最親愛的！謝謝你一直以來的照顧與包容。在有些疲憊的日常裡，願這款精緻的小甜點能為你充飽電，吃完又是充滿魔法的一天！辛苦啦！✨☕'
  },
  {
    category: '🎉 祝賀拍拍',
    text: '恭喜！努力有了最棒的回報！來點美味的法式千層和馬卡龍，屬於你的美好高光時刻，值得用全世界最極致的甜味好好大肆慶祝一番！🥂🍰'
  }
];

// Cute Font Options (using playful Google Web Fonts)
const FONT_OPTIONS = [
  { id: 'sans', name: '暖心圓體', class: 'font-sans' },
  { id: 'serif', name: '浪漫手札', class: 'font-serif italic' },
  { id: 'mono', name: '極客萌打', class: 'font-mono' }
];

// Cute Stickers Choice (renders on card)
const STICKERS = [
  { char: '🍒', name: '小櫻桃' },
  { char: '🧸', name: '軟萌熊' },
  { char: '🍰', name: '草莓切片' },
  { char: '🌟', name: '亮晶晶' },
  { char: '💖', name: '蜜桃心' },
  { char: '🦖', name: '恐龍寶寶' },
  { char: '🐾', name: '貓爪印' },
  { char: '🧁', name: '小甜點' },
  { char: '🌻', name: '向日葵' },
  { char: '🎈', name: '歡樂氣球' }
];

// Stamp / Wax Seal Choices
const SEALS = [
  { id: 'love', char: '🕊️', name: 'With Love', text: 'WITH LOVE' },
  { id: 'handmade', char: '🧁', name: '特製烘焙', text: 'ONLY FOR YOU' },
  { id: 'smile', char: '🐾', name: '小蜜怪印記', text: 'SWEET LIFE' }
];

export const ENVELOPE_STYLES = [
  {
    id: 'classic-oat',
    name: '經典優雅燕麥 ✉️',
    bg: 'bg-[#E9DFD0]',
    bgHex: '#E9DFD0',
    border: 'border-[#D9CEBF]',
    borderHex: '#D9CEBF',
    leftFlap: 'bg-[#F1E8DC]',
    rightFlap: 'bg-[#F1E8DC]',
    bottomFlap: 'bg-[#E8DDD0]',
    topFlap: 'bg-[#E1D4C3]',
    textColor: 'text-stone-700',
    desc: '質樸溫潤、文藝復古手工紙感'
  },
  {
    id: 'sweet-rose',
    name: '法式草莓蜜粉 🎀',
    bg: 'bg-[#FFE4E6]',
    bgHex: '#FFE4E6',
    border: 'border-[#FCA5B3]',
    borderHex: '#FCA5B3',
    leftFlap: 'bg-[#FFF1F2]',
    rightFlap: 'bg-[#FFF1F2]',
    bottomFlap: 'bg-[#FFE4E6]',
    topFlap: 'bg-[#FFD3D9]',
    textColor: 'text-[#8C2D3D]',
    desc: '浪漫迷人、戀愛草莓法式風情'
  },
  {
    id: 'matcha-mint',
    name: '初綠嫩芽草本 🍀',
    bg: 'bg-[#ECFDF5]',
    bgHex: '#ECFDF5',
    border: 'border-[#A7F3D0]',
    borderHex: '#A7F3D0',
    leftFlap: 'bg-[#F0FDF4]',
    rightFlap: 'bg-[#F0FDF4]',
    bottomFlap: 'bg-[#D1FAE5]',
    topFlap: 'bg-[#A7F3D0]',
    textColor: 'text-[#166534]',
    desc: '清香抹茶、法式療癒之境'
  },
  {
    id: 'royal-navy',
    name: '極致深夜星空 🌌',
    bg: 'bg-[#1E293B]',
    bgHex: '#1E293B',
    border: 'border-[#334155]',
    borderHex: '#334155',
    leftFlap: 'bg-[#334155]',
    rightFlap: 'bg-[#334155]',
    bottomFlap: 'bg-[#1E293B]',
    topFlap: 'bg-[#0F172A]',
    textColor: 'text-sky-200',
    desc: '靜謐神秘、奢華皇家深邃藍'
  }
];

interface CardWriterProps {
  recipient: string;
  setRecipient: (val: string) => void;
  cardContent: string;
  setCardContent: (val: string) => void;
  sender?: string;
  setSender?: (val: string) => void;
  selectedCardThemeId: string;
  setSelectedCardThemeId: (val: string) => void;
  selectedFontId?: string;
  setSelectedFontId?: (val: string) => void;
  selectedSticker?: string;
  setSelectedSticker?: (val: string) => void;
  selectedSealId?: string;
  setSelectedSealId?: (val: string) => void;
  borderStyleId?: string;
  setBorderStyleId?: (val: string) => void;
  selectedEnvelopeStyleId?: string;
  setSelectedEnvelopeStyleId?: (val: string) => void;
}

export default function CardWriter({
  recipient,
  setRecipient,
  cardContent,
  setCardContent,
  sender = '備受寵愛的你',
  setSender = () => {},
  selectedCardThemeId,
  setSelectedCardThemeId,
  selectedFontId = 'sans',
  setSelectedFontId = () => {},
  selectedSticker = '🍰',
  setSelectedSticker = () => {},
  selectedSealId = 'love',
  setSelectedSealId = () => {},
  borderStyleId = 'dashed',
  setBorderStyleId = () => {},
  selectedEnvelopeStyleId = 'classic-oat',
  setSelectedEnvelopeStyleId = () => {}
}: CardWriterProps) {
  
  const [activeTab, setActiveTab] = useState<'themes' | 'envelope' | 'text' | 'templates' | 'stickers'>('themes');
  const [showConfetti, setShowConfetti] = useState(false);

  // Find currently active card theme
  const currentTheme = CARD_THEMES.find(t => t.id === selectedCardThemeId) || CARD_THEMES[0];
  const currentFont = FONT_OPTIONS.find(f => f.id === selectedFontId) || FONT_OPTIONS[0];
  const currentSeal = SEALS.find(s => s.id === selectedSealId) || SEALS[0];
  const currentEnvelope = ENVELOPE_STYLES.find(e => e.id === selectedEnvelopeStyleId) || ENVELOPE_STYLES[0];

  // Auto-set matching default sticker if theme changes and user hasn't explicitly customized yet
  const handleThemeChange = (themeId: string) => {
    setSelectedCardThemeId(themeId);
    const target = CARD_THEMES.find(t => t.id === themeId);
    if (target) {
      setSelectedSticker(target.stickerDefault);
    }
    
    // Quick cute micro-animation trigger
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 1500);
  };

  const clearContent = () => {
    if (window.confirm('確定要清空目前寫好的卡片心意內容嗎？')) {
      setCardContent('');
      setRecipient('');
      setSender('備受寵愛的你');
    }
  };

  return (
    <div className="bg-[#FFFDFB] border-2 border-cake-dark/40 rounded-[36px] p-6 md:p-8 shadow-xl space-y-8 relative overflow-hidden">
      {/* Visual Cute Border Top */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#EB9FB0] via-yellow-200 to-sky-300" />
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-berry bg-berry/10 px-2 py-0.5 rounded-full">
              Card Customizer
            </span>
          </div>
          <h4 className="text-xl font-display font-black text-ink flex items-center gap-1.5">
            <span>點亮你的心意小驚喜</span>
            <Sparkles className="w-4.5 h-4.5 text-yellow-500 animate-spin [animation-duration:12s]" />
          </h4>
          <p className="text-xs opacity-60">可寫下暖心祝福，我們將為您手寫印製成實體超美禮卡送達！</p>
        </div>

        <button
          type="button"
          onClick={clearContent}
          className="flex items-center gap-1.5 text-[10px] font-bold text-ink/40 hover:text-berry hover:bg-berry/5 px-3 py-1.5 rounded-full border border-ink/10 transition-all self-start sm:self-center"
        >
          <RotateCcw className="w-3 h-3" />
          <span>重寫卡片</span>
        </button>
      </div>

      {/* Main Grid: Workstation & Live Visual Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Controls Workspace (left 7 cols) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Quick Toolbar Tab selectors */}
          <div className="flex flex-wrap md:flex-nowrap border-b border-ink/5 p-1 gap-1.5 bg-cake/25 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('themes')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-1 rounded-xl text-xs font-black tracking-wider transition-all ${
                activeTab === 'themes' ? 'bg-white shadow-sm text-berry' : 'text-ink/65 hover:bg-white/50'
              }`}
            >
              <span>🎨</span>
              <span>風格底色</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('envelope')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-1 rounded-xl text-xs font-black tracking-wider transition-all ${
                activeTab === 'envelope' ? 'bg-white shadow-sm text-berry' : 'text-ink/65 hover:bg-white/50'
              }`}
            >
              <span>✉️</span>
              <span>信封款式</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-1 rounded-xl text-xs font-black tracking-wider transition-all ${
                activeTab === 'text' ? 'bg-white shadow-sm text-berry' : 'text-ink/65 hover:bg-white/50'
              }`}
            >
              <span>🖋️</span>
              <span>卡片文字</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-1 rounded-xl text-xs font-black tracking-wider transition-all ${
                activeTab === 'templates' ? 'bg-white shadow-sm text-berry' : 'text-ink/65 hover:bg-white/50'
              }`}
            >
              <span>💬</span>
              <span>心意範本</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stickers')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-1 rounded-xl text-xs font-black tracking-wider transition-all ${
                activeTab === 'stickers' ? 'bg-white shadow-sm text-berry' : 'text-ink/65 hover:bg-white/50'
              }`}
            >
              <span>🧸</span>
              <span>貼貼裝飾</span>
            </button>
          </div>

          <div className="min-h-[290px] p-1">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Styling and Color Themes */}
              {activeTab === 'themes' && (
                <motion.div
                  key="themes"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-6"
                >
                  {/* Card Theme Picker */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block">
                      🎈 選擇您的超萌氛圍色調
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CARD_THEMES.map((theme) => {
                        const isSelected = theme.id === selectedCardThemeId;
                        return (
                          <button
                            type="button"
                            key={theme.id}
                            onClick={() => handleThemeChange(theme.id)}
                            className={`p-4 rounded-2xl text-left border-3 transition-all relative overflow-hidden group flex items-center gap-3.5 ${
                              isSelected 
                                ? 'border-berry bg-white shadow-md' 
                                : 'border-ink/5 bg-cake/15 hover:bg-cake/25'
                            }`}
                          >
                            <span className="text-xl shrink-0">{theme.stickerDefault}</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-ink">{theme.name}</span>
                              <span className="text-[10px] opacity-50 mt-0.5">專屬主題心意信籤</span>
                            </div>
                            <div className={`w-3.5 h-3.5 rounded-full border border-ink/20 ml-auto flex items-center justify-center ${
                              isSelected ? 'bg-berry border-berry' : ''
                            }`}>
                              {isSelected && <span className="text-[8px] text-white font-black">✓</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fonts Styles */}
                  <div className="space-y-3 pt-4 border-t border-ink/5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block">
                      🖋️ 選擇您的手繪字體感
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {FONT_OPTIONS.map((font) => (
                        <button
                           type="button"
                          key={font.id}
                          onClick={() => setSelectedFontId(font.id)}
                          className={`px-4 py-2.5 rounded-full text-xs font-bold border-2 transition-all ${
                            selectedFontId === font.id
                              ? 'border-berry bg-berry/5 text-berry font-black'
                              : 'border-ink/5 bg-white hover:bg-cake/20 text-ink/75'
                          } ${font.class}`}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Border Styles */}
                  <div className="space-y-3 pt-4 border-t border-ink/5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block">
                      📐 卡片花邊風格
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { id: 'dashed', label: '可愛縫線段 (Dashed)' },
                        { id: 'solid', label: '簡約圓角邊 (Solid)' },
                        { id: 'double', label: '精裝雙框線 (Elegant)' },
                        { id: 'dotted', label: '森林系點點 (Dotted)' }
                      ].map((style) => (
                        <button
                          type="button"
                          key={style.id}
                          onClick={() => setBorderStyleId(style.id)}
                          className={`px-4 py-2.5 rounded-full text-xs font-medium border-2 transition-all ${
                            borderStyleId === style.id
                              ? 'border-berry bg-berry/10 text-berry font-black shadow-sm'
                              : 'border-ink/5 bg-white hover:bg-cake/20 text-ink/75'
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 5: Envelope Style Picker */}
              {activeTab === 'envelope' && (
                <motion.div
                  key="envelope"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block">
                      ✉️ 選擇實體高級信封款式 (Envelope Style Selection)
                    </label>
                    <p className="text-[10.5px] text-ink/60 leading-relaxed font-sans">
                      購買每張精製心意卡皆隨附專屬手工信封。在此挑選最相配的信封色彩風格，將在「滴蠟封口」的加入購物車動畫中，完美疊合您的客製蠟章！
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ENVELOPE_STYLES.map((env) => {
                        const isSelected = env.id === selectedEnvelopeStyleId;
                        return (
                          <button
                            type="button"
                            key={env.id}
                            onClick={() => setSelectedEnvelopeStyleId(env.id)}
                            className={`p-4 rounded-2xl text-left border-3 transition-all relative overflow-hidden group flex flex-col gap-1.5 ${
                              isSelected 
                                ? 'border-berry bg-white shadow-md' 
                                : 'border-ink/5 bg-cake/15 hover:bg-cake/25'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 w-full justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3.5 h-3.5 rounded-full ${env.bg} border border-[#D9CEBF] shadow-xs shrink-0`} />
                                <span className="text-xs font-black text-ink">{env.name}</span>
                              </div>
                              <div className={`w-3.5 h-3.5 rounded-full border border-ink/20 flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-berry border-berry' : ''
                              }`}>
                                {isSelected && <span className="text-[8px] text-white font-black">✓</span>}
                              </div>
                            </div>
                            <p className="text-[9.5px] opacity-50 font-medium">
                              {env.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Message & Recipient Fields */}
              {activeTab === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Recipient Input */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block">
                        🎁 收件人姓名 (To)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">親愛的</span>
                        <input
                          type="text"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          placeholder="小壽星、暖心閨蜜..."
                          maxLength={15}
                          className="w-full bg-cake/20 border-2 border-transparent focus:border-berry/20 rounded-2xl pl-16 pr-4 py-3.5 text-xs focus:outline-none transition-all font-semibold"
                        />
                      </div>
                    </div>

                    {/* Sender Input */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block">
                        💌 寄件署名 (From)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs opacity-50">自</span>
                        <input
                          type="text"
                          value={sender}
                          onChange={(e) => setSender(e.target.value)}
                          placeholder="想你的人、蜜糖怪..."
                          maxLength={15}
                          className="w-full bg-cake/20 border-2 border-transparent focus:border-berry/20 rounded-2xl pl-10 pr-4 py-3.5 text-xs focus:outline-none transition-all font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main content typing area */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-[#EB9FB0]">
                      <span>✍️ 手打悄悄心意話</span>
                      <span className={cardContent.length > 120 ? 'text-berry' : 'opacity-40'}>
                        {cardContent.length} / 160 字
                      </span>
                    </div>
                    <textarea
                      value={cardContent}
                      onChange={(e) => setCardContent(e.target.value.substring(0, 160))}
                      placeholder="寫下您滿滿的心願與誠摯的思念...（例：祝你吃一口甜入心頭，在新的一歲天天平安快樂！）"
                      className="w-full h-44 bg-cake/20 border-2 border-transparent focus:border-berry/20 rounded-2xl px-5 py-4 text-xs focus:outline-none transition-all resize-none font-medium leading-relaxed"
                    />
                    <p className="text-[10px] opacity-40 text-right">小技巧：可以到「心意範本」挑選我們幫您準備的高級可愛範本唷！💬</p>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Template Quick Paste */}
              {activeTab === 'templates' && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="p-3 bg-berry/5 border border-berry/15 rounded-xl flex gap-2.5 mb-2">
                    <span className="text-xs">💡</span>
                    <p className="text-[10px] text-ink/75 leading-relaxed">
                      寫卡片沒靈感嗎？點擊下方我們特別整理的暖心可愛範本，將直接套用進入卡片內容，您再微調名字即可！
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[240px] overflow-y-auto pr-1">
                    {GREETING_TEMPLATES.map((tpl, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setCardContent(tpl.text);
                          // switch tab to text so they can see/edit
                          setActiveTab('text');
                        }}
                        className="p-4 rounded-2xl border border-ink/5 bg-[#FFFDFB] hover:bg-berry/5 text-left transition-all hover:border-berry/30 hover:shadow-sm space-y-2 group"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-berry text-white">
                            {tpl.category}
                          </span>
                          <span className="text-[9px] text-[#EB9FB0] opacity-0 group-hover:opacity-100 transition-opacity ml-auto font-black">
                            即刻套用 ✨
                          </span>
                        </div>
                        <p className="text-[10.5px] leading-relaxed text-ink/80 font-normal line-clamp-3">
                          {tpl.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Stickers and Ink Seals */}
              {activeTab === 'stickers' && (
                <motion.div
                  key="stickers"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-5"
                >
                  {/* Stamp Sticker selection */}
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block mb-3">
                      🧸 選擇超美右上角貼紙蓋章 (Corner Decoration Stamp)
                    </label>
                    <div className="grid grid-cols-5 gap-2.5">
                      {STICKERS.map((stk) => {
                        const isSelected = selectedSticker === stk.char;
                        return (
                          <button
                            type="button"
                            key={stk.char}
                            onClick={() => setSelectedSticker(stk.char)}
                            className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all text-xs ${
                              isSelected
                                ? 'border-berry bg-berry/5 font-black scale-105 shadow-sm'
                                : 'border-ink/5 bg-white hover:bg-cake/15'
                            }`}
                          >
                            <span className="text-xl">{stk.char}</span>
                            <span className="text-[9px] opacity-40">{stk.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Wax Seal Selector */}
                  <div className="pt-4 border-t border-ink/5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#EB9FB0] block mb-3">
                      🔖 質感封蠟章/心意郵戳 (Bottom Wax Seal)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {SEALS.map((seal) => {
                        const isSelected = selectedSealId === seal.id;
                        return (
                          <button
                            type="button"
                            key={seal.id}
                            onClick={() => setSelectedSealId(seal.id)}
                            className={`p-3 px-4.5 rounded-2xl border-2 flex items-center gap-3 text-left transition-all ${
                              isSelected
                                ? 'border-berry bg-berry/5 font-black'
                                : 'border-ink/5 bg-white hover:bg-cake/15'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${
                              isSelected ? 'bg-berry text-white scale-110' : 'bg-cake/30 text-ink'
                            }`}>
                              {seal.char}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-ink">{seal.name}</span>
                              <span className="text-[8px] opacity-40 bg-zinc-100 flex items-center px-1 rounded font-mono">
                                {seal.text}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Visual Card Preview (right 5 cols) */}
        <div className="xl:col-span-5 flex flex-col items-center justify-center pt-4 xl:pt-0">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.25em] text-berry uppercase bg-berry/5 px-3 py-1 rounded-full border border-berry/10">
              <Gift className="w-3 h-3 animate-bounce" />
              <span>實體卡片模擬 Live Preview</span>
            </span>
          </div>

          {/* Pretty Physical Card Wrapper */}
          <div className="relative group w-full max-w-[310px] aspect-[3/4] transition-all duration-300">
            
            {/* Visual Card Background Glow & Shadow */}
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-[#EB9FB0]/20 to-yellow-200/20 blur-2xl opacity-60 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute -inset-2 border-2 border-dashed border-berry/15 rounded-3xl -z-10 bg-cake/5" />

            {/* Main Physical Card Canvas */}
            <motion.div
              animate={showConfetti ? { rotate: [0, -1, 1, -1, 0], scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 rounded-[24px] shadow-2xl p-6.5 flex flex-col justify-between overflow-hidden transition-all duration-500 border-[3px] select-none ${currentTheme.previewBg} ${
                borderStyleId === 'dashed' ? 'border-[#EB9FB0] border-dashed' :
                borderStyleId === 'solid' ? 'border-berry/40 border-solid' :
                borderStyleId === 'double' ? 'border-berry border-double border-5' :
                'border-[#EB9FB0]/60 border-dotted'
              }`}
            >
              {/* Cute hand-drawn background element decoration */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-white/15 rounded-full blur-lg pointer-events-none" />
              
              {/* Retro Postcard division lines in bg */}
              <div className="absolute inset-x-6 top-16 bottom-20 border-l border-ink/5 pointer-events-none" />

              {/* Card Header */}
              <div className="flex justify-between items-start relative z-10">
                {/* Salutation To Recipient */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#EB9FB0] block leading-none">
                    To
                  </span>
                  <div className={`text-base font-black truncate max-w-[150px] ${currentFont.class} ${currentTheme.bg.split(' ')[1]}`}>
                    💖 {recipient || '心中最甜的你'}
                  </div>
                </div>

                {/* Theme Corner Sticker */}
                <motion.div
                  key={selectedSticker}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 12 }}
                  className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-berry/15 flex items-center justify-center text-3xl select-none transition-all duration-300 group-hover:-translate-y-2.5 group-hover:scale-115 group-hover:rotate-[18deg] group-hover:shadow-lg group-hover:shadow-berry/10"
                >
                  {selectedSticker}
                </motion.div>
              </div>

              {/* Card Letter Content */}
              <div className="flex-1 mt-6 relative z-10 flex flex-col justify-start">
                <div className={`text-xs leading-relaxed whitespace-pre-wrap font-medium tracking-wide ${currentFont.class} ${currentTheme.bg.split(' ')[1]} line-clamp-8 overflow-hidden`}>
                  {cardContent || '在這裡會即刻模擬顯示您打的每一個溫暖字眼唷...\n點擊「卡片文字」來動手寫，或是套用左下角超萌的快速「心意範本」！💬🍰'}
                </div>
              </div>

              {/* Card Footer with Stamp Mark & Wax Seal */}
              <div className="border-t border-[#EB9FB0]/20 pt-4 flex items-center justify-between relative z-10">
                
                {/* Wax Seal visual marker */}
                <div className="flex items-center gap-1.5">
                  <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-berry/80 flex items-center justify-center text-base shadow-lg animate-pulse ring-4 ring-berry/10 select-none">
                      {currentSeal.char}
                    </div>
                    {/* Retro seal label text */}
                    <span className="absolute -right-14 text-[7px] font-serif font-black tracking-tighter text-berry/55 bg-white/40 py-0.5 px-1 rounded border border-berry/10 scale-95 uppercase">
                      {currentSeal.text}
                    </span>
                  </div>
                </div>

                {/* From Sender */}
                <div className="text-right space-y-0.5 max-w-[120px] truncate">
                  <span className="text-[8px] font-black tracking-widest text-[#EB9FB0] uppercase block leading-none">
                    From
                  </span>
                  <span className={`text-[11px] font-bold tracking-tight block ${currentFont.class} ${currentTheme.bg.split(' ')[1]}`}>
                    {sender || '想你的人'} 🧸
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Under-Card Selected Envelope Info Badge */}
          <div className="mt-5 flex items-center gap-2 bg-white/75 backdrop-blur-xs px-4.5 py-2.5 rounded-full border border-ink/5 shadow-sm text-xs justify-center select-none">
            <span className="text-gray-400 font-medium">✨ 搭配專屬信封：</span>
            <div className={`w-3 h-3 rounded-full ${currentEnvelope.bg} border border-[#D9CEBF] shadow-xs`} />
            <span className="font-extrabold text-[#8C2D3D]">{currentEnvelope.name}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
