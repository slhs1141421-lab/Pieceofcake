export const PRODUCTS = [
  {
    id: 'cloud-strawberry',
    name: '赫本復古緞帶戚風',
    subName: 'Hepburn Lavender Ribbon Cake',
    description: '夢幻粉紫色戚風抹上特調芋香奶油，黑色蝴蝶結緞帶環繞，優雅流溢的法式復古治癒神作。',
    image: '/src/assets/images/lavender_ribbon_cake_1779625997854.png',
    price: 'NT$ 280',
    tags: ['Elegant', 'Vintage', 'Healing'],
    category: 'cloud'
  },
  {
    id: 'dark-chocolate',
    name: '熔岩黑巧克力塔',
    subName: 'Dark Chocolate Tart',
    description: '70% 苦甜巧克力與酥脆塔皮，濃郁爆發的味覺體驗。',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=2000',
    price: 'NT$ 320',
    tags: ['Adult', 'Rich'],
    category: 'adult'
  },
  {
    id: 'caramel-salt',
    name: '黑酷怪獸奧利奧巧克力蛋糕',
    subName: 'Oreo Monster Chocolate Cake',
    description: '極黑竹炭可可戚風疊上雙重碎屑生乳，頂層端坐呆萌大眼 Oreo 小鬼怪，用超萌幽默魔法擊褪負能量！',
    image: '/src/assets/images/oreo_monster_cake_1779525745412.png',
    price: 'NT$ 260',
    tags: ['Oreo', 'Chocolate', 'Cute'],
    category: 'cloud'
  },
  {
    id: 'matcha-zen',
    name: '靜岡雙層綠意抹茶蛋糕',
    subName: 'Shizuoka Double Matcha Cake',
    description: '雙層濕潤抹茶戚風，夾入香濃抹茶慕斯，頂部覆蓋北海道鮮奶油並灑上一圈翠綠抹茶粉，回甘茶香繚繞不絕。',
    image: '/src/assets/images/shizuoka_matcha_cake_1779525508276.png',
    price: 'NT$ 260',
    tags: ['Matcha', 'Double', 'Healing'],
    category: 'adult'
  },
  {
    id: 'strawberry-souffle',
    name: '經典草莓鮮奶油雙層戚風',
    subName: 'Classic Strawberry Cream Layer Cake',
    description: '蓬鬆濕潤的雙層戚風蛋糕，抹上香濃滑順的生乳鮮奶油，夾入飽滿多汁的新鮮大湖草莓，交疊出酸甜輕盈的經典療癒滋味。',
    image: '/src/assets/images/strawberry_cream_cake_1779622054442.png',
    price: 'NT$ 220',
    tags: ['Warm', 'Sweet', 'Healing'],
    category: 'cloud'
  },
  {
    id: 'blueberry-mille-feuille',
    name: '法式藍莓千層派',
    subName: 'Blueberry Mille-feuille',
    description: '焦糖化鬆脆千層酥，夾入香濃香草卡士達，與新鮮藍莓交織出酸甜的多層次療癒感。',
    image: '/src/assets/images/blueberry_mille_feuille_1779280212348.png',
    price: 'NT$ 250',
    tags: ['Crispy', 'Fruity', 'Premium'],
    category: 'cloud'
  },
  {
    id: 'royal-crown',
    name: '法式巴洛克皇冠珍珠戚風',
    subName: 'French Baroque Crown Pearl Chiffon',
    description: '溫柔象牙白生乳抹面，擠上巴洛克宮廷宮殿蕾絲花邊，戴上一盞奢華銀色浮雕皇冠與愛心微光燭火.綴以透亮珍珠與天藍、白絲蕾絲雙緞帶，點亮一生僅有的夢幻儀式感。',
    image: '/src/assets/images/royal_crown_cake_1779953895675.png',
    price: 'NT$ 360',
    tags: ['Royal', 'Crown', 'Celebration'],
    category: 'cloud'
  },
  {
    id: 'dream-butterfly',
    name: '「朝櫻幻境」幻彩舞蝶戚風',
    subName: 'Sakura Butterfly Fantasy Chiffon',
    description: '溫柔漸層粉彩抹面，手貼輕盈靈動的幻彩紙蝴蝶，頂部端坐一顆剔透的水晶泡泡球與純白小天使雕像，營造如夢似幻的早櫻仙境氛圍。',
    image: '/src/assets/images/dream_butterfly_centered_1779884309877.png',
    price: 'NT$ 340',
    tags: ['Dreamy', 'Butterfly', 'Elegant'],
    category: 'cloud'
  },
  {
    id: 'double-cherry-drip',
    name: '「春櫻落雨」雙層櫻桃生乳淋醬戚風',
    subName: 'Spring Sakura Double Tier Cherry Drip',
    description: '細密象牙白抹面，頂部與底層圍繞春櫻粉嫩鮮奶油淋醬，妝點手作粉色小糖花、大顆鮮紅甜櫻桃與象牙絲緞蝴蝶結。驚艷無比的雙層視覺，帶來最溫柔的奢華慶祝。',
    image: '/src/assets/images/double_cherry_centered_1779884330547.png',
    price: 'NT$ 380',
    tags: ['Double-Tier', 'Cherry', 'Cute'],
    category: 'cloud'
  }
];

export const CAKE_EXPLODED_DATA = [
  {
    id: 'cloud-strawberry',
    name: '赫本復古緞帶戚風',
    image: '/src/assets/images/lavender_ribbon_cake_1779625997854.png',
    layers: [
      { id: 'top', name: '法式真絲蝴蝶結緞帶', description: '高雅簡約的黑緞蝴蝶結，增添復古極致之美。', color: 'bg-zinc-950' },
      { id: 'cream', name: '特調芋香乳霜', description: '迷人薰衣草粉紫色調，極度輕盈滑順不甜膩。', color: 'bg-purple-200' },
      { id: 'cake', name: '伯爵戚風與手作布丁', description: '香氣繚繞的伯爵烘焙胚體夾入綿密彈牙滑嫩布丁。', color: 'bg-amber-100' }
    ]
  },
  {
    id: 'dark-chocolate',
    name: '熔岩黑巧克力塔',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=2000',
    layers: [
      { id: 'top', name: '法國可可粉', description: '濃郁可可風味，帶有深層層次感。', color: 'bg-zinc-900' },
      { id: 'ganache', name: '70% 巧克力甘納許', description: '濃郁爆發，苦甜平衡的靈魂居所。', color: 'bg-zinc-800' },
      { id: 'crust', name: '黑可可酥脆塔皮', description: '香氣四溢的奶油塔皮，結構紮實。', color: 'bg-black' }
    ]
  },
  {
    id: 'caramel-salt',
    name: '黑酷怪獸奧利奧巧克力蛋糕',
    image: '/src/assets/images/oreo_monster_cake_1779525745412.png',
    layers: [
      { id: 'top', name: '呆萌大眼甜心 Oreo', description: '帶著逗趣糖果大青眼的巧克力奧利奧，看著看著心就被治癒了！', color: 'bg-zinc-800' },
      { id: 'cream', name: '奧利奧雙重碎屑生乳餡', description: '絲滑的北海道生乳、拌入滿滿的脆口奧利奧餅乾碎，多重香甜綻放。', color: 'bg-zinc-100' },
      { id: 'cake', name: '極黑竹炭可可戚風', description: '輕盈濕潤、少糖高纖的竹炭可可海綿胚，入口即化的鬆軟口感。', color: 'bg-zinc-900' }
    ]
  },
  {
    id: 'matcha-zen',
    name: '靜岡雙層綠意抹茶蛋糕',
    image: '/src/assets/images/shizuoka_matcha_cake_1779525508276.png',
    layers: [
      { id: 'top', name: '宇治抹茶粉與鮮奶油', description: '京都宇治抹粉與北海道極致雪白鮮奶油。', color: 'bg-white' },
      { id: 'cream', name: '靜岡濃抹茶慕斯', description: '雙層濃郁抹茶慕斯，入口絲滑微苦帶微甘。', color: 'bg-green-400' },
      { id: 'cake', name: '日本宇治抹茶戚風', description: '濕潤柔軟、茶韻豐沛的抹茶戚風蛋糕胚。', color: 'bg-green-700' }
    ]
  },
  {
    id: 'strawberry-souffle',
    name: '經典草莓鮮奶油雙層戚風',
    image: '/src/assets/images/strawberry_cream_cake_1779622054442.png',
    layers: [
      { id: 'top', name: '大湖新鮮草莓與鮮奶油花', description: '嚴選新鮮大湖草莓，佐以十勝生乳手作鮮奶油。', color: 'bg-red-400' },
      { id: 'cream', name: '十勝雪白鮮奶油層', description: '蓬鬆香濃乳香，輕盈滑順，完美融和果酸。', color: 'bg-white' },
      { id: 'cake', name: '法式蓬鬆戚風蛋糕胚', description: '彈性與蓬鬆氣孔兼具的經典黃金戚風蛋糕底。', color: 'bg-amber-100' }
    ]
  },
  {
    id: 'blueberry-mille-feuille',
    name: '法式藍莓千層派',
    image: '/src/assets/images/blueberry_mille_feuille_1779280212348.png',
    layers: [
      { id: 'top', name: '新鮮藍莓與糖粉', description: '多汁飽滿的新鮮藍莓伴隨防潮細糖粉。', color: 'bg-indigo-400' },
      { id: 'cream', name: '香草籽卡士達乳霜', description: '特選馬達加斯加香草莢，乳香醇熟濃滑。', color: 'bg-amber-50' },
      { id: 'pastry', name: '極致千層酥皮', description: '256摺工藝，經多次反覆折疊烘烤至極致焦糖香脆。', color: 'bg-amber-700' }
    ]
  },
  {
    id: 'royal-crown',
    name: '法式巴洛克皇冠珍珠戚風',
    image: '/src/assets/images/royal_crown_cake_1779953895675.png',
    layers: [
      { id: 'top', name: '奢華巴洛克銀色雕花皇冠', description: '一頂鑲著珍珠、作工精美的微型主廚典藏銀色皇冠，與亮起溫暖光芒的愛心蠟燭。', color: 'bg-stone-300' },
      { id: 'cream', name: '巴洛克宮廷蕾絲與雙重緞帶', description: '細膩精緻的宮殿蕾絲拉花抹面，纏繞天藍色緞帶與白色純絲蕾絲褶層。', color: 'bg-sky-100' },
      { id: 'cake', name: '頂級象牙白香草生乳戚風胚', description: '雪白高雅的北海道生香草白乳霜外衣，夾入黃金經典戚風與主廚精製香草卡士達、布丁。', color: 'bg-amber-50' }
    ]
  },
  {
    id: 'dream-butterfly',
    name: '「朝櫻幻境」幻彩舞蝶戚風',
    image: '/src/assets/images/dream_butterfly_centered_1779884309877.png',
    layers: [
      { id: 'top', name: '「朝櫻仙境」幻彩紙蝴蝶與天使', description: '手工製振翅幻彩紙蝴蝶、剔透泡泡球，與純白剔透的小天使雕塑。', color: 'bg-purple-100' },
      { id: 'cream', name: '夢幻粉彩漸層渲染乳霜', description: '粉紫渲染乳霜抹面，編織成初春朝霞。', color: 'bg-pink-100' },
      { id: 'cake', name: '香草胚手作布丁', description: '口感蓬鬆香滑的伯爵戚風胚，夾入彈牙綿密手作布丁。', color: 'bg-amber-50' }
    ]
  },
  {
    id: 'double-cherry-drip',
    name: '「春櫻落雨」雙層櫻桃生乳淋醬戚風',
    image: '/src/assets/images/double_cherry_centered_1779884330547.png',
    layers: [
      { id: 'top', name: '大顆深紅櫻桃與優雅絲緞蝴蝶結', description: '精選多汁欲滴的飽滿深紅大櫻桃，以及溫柔垂墜的象牙白絲綢蝴蝶結。', color: 'bg-red-700' },
      { id: 'cream', name: '春櫻淋醬與手作粉色砂糖花', description: '極致滑順鮮奶油圍繞春櫻粉淋醬，並捏製點點嫩粉小砂糖花。', color: 'bg-rose-100' },
      { id: 'cake', name: '高雙層十勝生乳胚', description: '奢華雙層設計，柔軟戚風夾入北海道生鮮奶油與綿密手作布丁。', color: 'bg-yellow-50' }
    ]
  }
];

export const NAV_LINKS = [
  { name: 'VISIT OUR SHOP', href: '#location' },
  { name: '療癒專區', href: '#shop' },
  { name: '烘焙研製室', href: '#custom-lab' },
  { name: '自選禮盒', href: '#gift-sets' },
  { name: '情緒處方', href: '#prescription' },
  { name: '常見問題', href: '#faq' }
];

export const PRODUCT_DATA = {
  healing: [
    {
      id: 'cloud-strawberry',
      name: '赫本復古緞帶戚風',
      price: 280,
      image: '/src/assets/images/lavender_ribbon_cake_1779625997854.png',
      description: '夢幻粉紫色戚風抹上特調芋香奶油，黑色蝴蝶結緞帶環繞，優雅流溢的法式復古治癒神作。'
    },
    {
      id: 'dark-chocolate',
      name: '熔岩黑巧克力塔',
      price: 320,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=2000',
      description: '70% 苦甜巧克力與酥脆塔皮，濃郁爆發的味覺體驗。'
    },
    {
      id: 'caramel-salt',
      name: '黑酷怪獸奧利奧巧克力蛋糕',
      price: 260,
      image: '/src/assets/images/oreo_monster_cake_1779525745412.png',
      description: '極黑竹炭可可戚風疊上雙重碎屑生乳，頂層端坐呆萌大眼 Oreo 小鬼怪，用超萌幽默魔法擊褪負能量！'
    },
    {
      id: 'matcha-zen',
      name: '靜岡雙層綠意抹茶蛋糕',
      price: 260,
      image: '/src/assets/images/shizuoka_matcha_cake_1779525508276.png',
      description: '雙層濕潤抹茶戚風，夾入香濃抹茶慕斯，頂部覆蓋北海道鮮奶油並灑上一圈翠綠抹茶粉，回甘茶香繚繞不絕。'
    },
    {
      id: 'strawberry-souffle',
      name: '經典草莓鮮奶油雙層戚風',
      price: 220,
      image: '/src/assets/images/strawberry_cream_cake_1779622054442.png',
      description: '蓬鬆濕潤的雙層戚風蛋糕，抹上香濃滑順的生乳鮮奶油，夾入飽滿多汁的新鮮大湖草莓，交疊出酸甜輕盈的經典療癒滋味。'
    },
    {
      id: 'blueberry-mille-feuille',
      name: '法式藍莓千層派',
      price: 250,
      image: '/src/assets/images/blueberry_mille_feuille_1779280212348.png',
      description: '焦糖化鬆脆千層酥，夾入香濃香草卡士達，與新鮮藍莓交織出酸甜的多層次療癒感。'
    },
    {
      id: 'royal-crown',
      name: '法式巴洛克皇冠珍珠戚風',
      price: 360,
      image: '/src/assets/images/royal_crown_cake_1779953895675.png',
      description: '溫柔象牙白生乳抹面，擠上巴洛克宮廷宮殿蕾絲花邊，戴上一盞奢華銀色浮雕皇冠與愛心微光燭火。綴以透亮珍珠與天藍、白絲蕾絲雙緞帶，點亮一生僅有的夢幻儀式感。'
    },
    {
      id: 'dream-butterfly',
      name: '「朝櫻幻境」幻彩舞蝶戚風',
      price: 340,
      image: '/src/assets/images/dream_butterfly_centered_1779884309877.png',
      description: '溫柔漸層粉彩抹面，手貼輕盈靈動的幻彩紙蝴蝶，頂部端坐一顆剔透的水晶泡泡球與純白小天使雕像，營造如夢似幻的早櫻仙境氛圍。'
    },
    {
      id: 'double-cherry-drip',
      name: '「春櫻落雨」雙層櫻桃生乳淋醬戚風',
      price: 380,
      image: '/src/assets/images/double_cherry_centered_1779884330547.png',
      description: '細密象牙白抹面，頂部與底層圍繞春櫻粉嫩鮮奶油淋醬，妝點手作粉色小糖花、大顆鮮紅甜櫻桃與象牙絲緞蝴蝶結。驚艷無比的雙層視覺，帶來最溫柔的奢華慶祝。'
    }
  ]
};
