import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, Quote, MessageSquare, ThumbsUp, Camera, User, Sparkles, Upload, Check } from 'lucide-react';
import { useShop } from '../../lib/ShopContext';

// 🚀 俏皮語錄資料庫 (The "Quirky" Database)
const REVIEWS = [
  {
    id: 1,
    user: '週一症候群患者',
    tag: '#原地解脫',
    quote: '原本以為是買蛋糕，結果是買到了靈魂的救贖。',
    longFeedback: '在一成不變、憂鬱窒息的週一，當這款夢幻粉紫色的法式復古緞帶蛋糕擺在桌面上時，所有的疲憊與陰霾頃刻化為烏有。黑色柔美蝴蝶結緞帶精緻地環繞，宛如奧黛麗赫本式的高雅法式浪漫。叉子輕輕切下去的瞬間，極致輕盈鬆軟的戚風糕體與手作布丁相融，溫潤柔滑的特調芋香奶油伴隨濃郁的香草茶韻在舌間緩緩交織化開，軟糯而不過於甜膩。這不只是一口讓人原地解脫的甜品，更是對疲憊靈魂最溫柔的奢華治癒！',
    image: '/src/assets/images/lavender_ribbon_cake_1779625997854.png',
    alt: '赫本芋香雙層復古緞帶戚風',
    rating: 5,
    date: '2026.05.18'
  },
  {
    id: 2,
    user: '辦公室的零食小隊長',
    tag: '#辦公室救星',
    quote: '老闆問我為什麼對著電腦笑，我把網址傳給他，現在全公司都安靜了。',
    longFeedback: '偷偷摸摸在辦公椅上拆開這款黑酷怪獸奧利奧巧克力蛋糕的瞬間，濃郁香甜的深色可可香氣瞬間溢滿周圍。巧克力的苦甜滋味和奧利奧碎片的多重酥脆極具魔力，每一口都在口腔裡引爆瘋狂層次感。隔壁的同事聞香而來，最後連嚴厲的老闆都跑過來偷吃。大家一邊吃一邊對著電腦螢幕傻笑，那種平日堆積如山的沈重壓力秒被洗滌一空。辦公室救星的封號實至名歸，太震撼了！',
    image: '/src/assets/images/oreo_monster_cake_1779525745412.png',
    alt: '黑酷怪獸奧利奧巧克力蛋糕',
    rating: 5,
    date: '2026.05.20'
  },
  {
    id: 3,
    user: '減肥永遠是明天的事',
    tag: '#值得流汗',
    quote: '這口感，我願意為了它再多跑三公里跑步機。',
    longFeedback: '面對跑步機上那刺目的一千卡路里消耗量，我本來下了很大決心這週絕不碰任何碳水化合物。但當我一看到這個精準疊加、層次鮮明的法式藍莓千層派時，心理防線瞬間徹底瓦解。咬下去的一剎那，層層疊疊的酥脆派皮在口中發出清脆的喀嚓聲，隨後是微酸飽滿的進口新鮮藍莓爆汁而出，與溫潤綿密的香草卡士達醬交相輝映。這絕對是我吃過層次最極致、完全值得讓我為它再苦練三公里跑步機的完美神級甜點！',
    image: '/src/assets/images/blueberry_mille_feuille_1779280212348.png',
    alt: '法式藍莓千層派',
    rating: 5,
    date: '2026.05.22'
  },
  {
    id: 4,
    user: '剛與被窩分離的人',
    tag: '#喚醒靈魂',
    quote: '叉子切下去的那一刻，我覺得我終於醒過來了。',
    longFeedback: '每天清晨跟溫暖被窩道別，對我來說都像是失去半條命般的痛苦儀式。直到我切下了經典草莓鮮奶油雙層戚風的一角。那股帶著烘焙麵粉香氣與溫和牛奶甜味的氣息，溫柔地喚醒了落寞的清晨。叉子輕快切下去的微震，空氣中瀰漫開粉嫩草莓的清香，柔滑的鮮奶油和鬆軟的蛋糕體在舌尖繾綣、交融，彷彿早晨微涼的陽光穿透薄霧。吃完的那一刻，幸福而踏實，我意識到我終於再次活過來了！',
    image: '/src/assets/images/strawberry_cream_cake_1779622054442.png',
    alt: '經典草莓鮮奶油雙層戚風',
    rating: 5,
    date: '2026.05.23'
  },
  {
    id: 5,
    user: '專業級甜點糾察隊',
    tag: '#無懈可擊',
    quote: '甜點不會背叛你，它只會溫柔地包裹你的胃。',
    longFeedback: '身為常年探訪各大名店、口味極度挑剔的專業級抹茶糾察隊長，這款靜岡雙層綠意抹茶蛋糕簡直刷新了我的抹茶世界觀。它沒有用大量糖分去妥協抹茶原有的苦澀，而是用完美的雙層比例把靜岡高雅幽香與醇厚茶韻展現得淋漓盡致。上層是如絲綢般細膩的抹茶慕斯，下層是濃醇扎實的磅蛋糕質地，苦與甜的配比拿捏到了極致。它不需要任何虛偽的客套包裝，實力本身就是對胃最溫柔的擁抱。',
    image: '/src/assets/images/shizuoka_matcha_cake_1779525508276.png',
    alt: '靜岡雙層綠意抹茶蛋糕',
    rating: 5,
    date: '2026.05.24'
  }
];

export interface Comment {
  id: string;
  user: string;
  gender: string;
  avatar: string; // Emoji character or data-uri string
  content: string;
  likes: number;
  date: string;
  likedByByCurrUser?: boolean;
}

export interface UserProfile {
  name: string;
  gender: string;
  avatar: string;
}

const PRESET_AVATARS = ['🧁', '🍓', '🍪', '🥑', '🐼', '🐱', '🐻', '🐰', '🦁', '🌿', '🍵', '🎀'];

const INITIAL_COMMENTS: Record<number, Comment[]> = {
  1: [
    {
      id: 'pre-1-1',
      user: '芋泥生乳重度癮君子 💜',
      gender: '👧 / 溫柔小仙女',
      avatar: '🧁',
      content: '這款芋泥真的很綿密細緻！上週末幫閨蜜慶生特地訂了一個，連平常不碰甜點的長輩都直誇溫潤爽口、完全不膩，簡直是芋泥界的天花板！',
      likes: 18,
      date: '2026.05.19'
    },
    {
      id: 'pre-1-2',
      user: '仙女拍照只用原相機 📸',
      gender: '👧 / 溫柔小仙女',
      avatar: '🎀',
      content: '那個深黑色的蝴蝶結緞帶和淡紫色的芋泥戚風，撞色得高雅到不行。拿來拍法式復古風照片簡直仙氣溢出螢幕，少女心完美爆發！',
      likes: 12,
      date: '2026.05.21'
    }
  ],
  2: [
    {
      id: 'pre-2-1',
      user: '薪水小偷一號 🤫',
      gender: '👦 / 帥氣小怪獸',
      avatar: '🍪',
      content: '我們辦公室上次主管請客買了這款，可可苦甜比例大概 70% 恰到好處！咬到裡面酥脆的奧利奧碎片真的驚喜感滿分，超舒壓！',
      likes: 24,
      date: '2026.05.21'
    },
    {
      id: 'pre-2-2',
      user: '美式咖啡靈魂伴侶 ☕',
      gender: '🐾 / 貪吃小精靈',
      avatar: '🍵',
      content: '一般市面的奧利奧蛋糕都甜得讓人頭痛，但這款黑酷怪獸配著濃純的高品質巧克力。再喝一口冰滴美式，下午的工作能多撐好幾個小時。',
      likes: 15,
      date: '2026.05.22'
    }
  ],
  3: [
    {
      id: 'pre-3-1',
      user: '狂暴卡路里燃燒者 🏃‍♀️',
      gender: '👧 / 溫柔小仙女',
      avatar: '🥑',
      content: '這款藍莓千層派皮的層次感跟焦糖酥香真的是殿堂級的！藍莓每一顆都超新鮮爆汁，微酸微甜跟卡士達交融，為了它我願意再多跑五公里！',
      likes: 31,
      date: '2026.05.23'
    }
  ],
  4: [
    {
      id: 'pre-4-1',
      user: '蜜糖過敏原 🧬',
      gender: '🐾 / 貪吃小精靈',
      avatar: '🍓',
      content: '經典的草莓鮮奶油往往最考驗功力。這家的戚風蛋糕胚鬆軟得像剛收攏的雲朵，鮮奶油則是那種純正牧場的牛乳香氣，像春日微溫的細雪般融化。',
      likes: 27,
      date: '2026.05.24'
    }
  ],
  5: [
    {
      id: 'pre-5-1',
      user: '靜岡茶道學徒 🍵',
      gender: '👦 / 帥氣小怪獸',
      avatar: '🌿',
      content: '資深抹茶控含淚認證！沒有用無意義的糖度掩蓋抹茶自身的微苦，而是靜岡純正幽遠的春茶回甘。雙層乳酪的夾心質地高雅，給予滿分回饋。',
      likes: 42,
      date: '2026.05.25'
    }
  ]
};

// 🌟 Localized Testimonials Database
const REVIEWS_TRANSLATED: Record<string, any> = {
  zh: {
    title: "那些胃被收買後的真心話",
    subtitle: "這裡只有誠實的胃，沒有虛偽的客套。",
    badge: "💬 點擊任一評論，探索 100 字真實味蕾體驗",
    click_badge: "真實心得 ✦ CLICK",
    stamp_text: "幸福認證",
    write_as: "以 ",
    write_as_suffix: " 留言",
    modify_profile: "修改匿名資料 🎨",
    input_placeholder: "這款甜點也有觸動你的味蕾點嗎？在此附議您真實、客觀的回饋留言...",
    publish: "發表留言 ✦",
    unlock_title: "填寫匿名品味卡，加入食光沙龍留言",
    unlock_desc: "填寫簡短的暱稱、性別及上傳或自選精美 Preset 頭像，即可開啟品味附議！",
    unlock_btn: "✍️ 解鎖匿名檔案與留言",
    quote_prefix: "「",
    quote_suffix: "」",
    button_close: "確認並關閉",
    unlocked_banner: "修改匿名資料 🎨",
    feedback_placeholder: "還沒有附議留言。留下你的味蕾回饋吧！",
    items: {
      1: {
        user: '週一症候群患者',
        tag: '#原地解脫',
        quote: '原本以為是買蛋糕，結果是買到了靈魂的救贖。',
        longFeedback: '在一成不變、憂鬱窒息的週一，當這款夢幻粉紫色的法式復古緞帶蛋糕擺在桌面上時，所有的疲憊與陰霾頃刻化為烏有。黑色柔美蝴蝶結緞帶精緻地環繞，宛如奧黛麗赫本式的高雅法式浪漫。叉子輕輕切下去的瞬間，極致輕盈鬆軟的戚風糕體與手作布丁相融，溫潤柔滑的特調芋香奶油伴隨濃郁的香草茶韻在舌間緩緩交織化開，軟糯而不過於甜膩。這不只是一口讓人原地解脫的甜品，更是對疲憊靈魂最溫柔的奢華治癒！',
        alt: '赫本芋香雙層復古緞帶戚風'
      },
      2: {
        user: '辦公室的零食小隊長',
        tag: '#辦公室救星',
        quote: '老闆問我為什麼對著電腦笑，我把網址傳給他，現在全公司都安靜了。',
        longFeedback: '偷偷摸摸在辦公椅上拆開這款黑酷怪獸奧利奧巧克力蛋糕的瞬間，濃郁香甜的深色可可香氣瞬間溢滿周圍。巧克力的苦甜滋味和奧利奧碎片的多重酥脆極具魔力，每一口都在口腔裡引爆瘋狂層次感。隔壁的同事聞香而來，最後連嚴厲的老闆都跑過來偷吃。大家一邊吃一邊對著電腦螢幕傻笑，那種平日堆積如山的沈重壓力秒被洗滌一空。辦公室救星的封號實至名規，太震撼了！',
        alt: '黑酷怪獸奧利奧巧克力蛋糕'
      },
      3: {
        user: '減肥永遠是明天的事',
        tag: '#值得流汗',
        quote: '這口感，我願意為了它再多跑三公里跑步機。',
        longFeedback: '面對跑步機上那刺目的一千卡路里消耗量，我本來下了很大決心這週絕不碰任何碳水化合物。但當我一看到這個精準疊加、層次鮮明的法式藍莓千層派時，心理防線瞬間徹底瓦解。咬下去的一剎那，層層疊疊的酥脆派皮在口中發出清脆的喀嚓聲，隨後是微酸飽滿的進口新鮮藍莓爆汁而出，與溫潤綿密的香草卡士達醬交相輝映。這絕對是我吃過層次最極致、完全值得讓我為它再苦練三公里跑步機的完美神級甜點！',
        alt: '法式藍莓千層派'
      },
      4: {
        user: '剛與被窩分離的人',
        tag: '#喚醒靈魂',
        quote: '叉子切下去的那一刻，我覺得我終於醒過來了。',
        longFeedback: '每天清晨跟溫暖被窩道別，對我來說都像是失去半條命般的痛苦儀式。直到我切下了經典草莓鮮奶油雙層戚風的一角。那股帶著烘焙麵粉香氣與溫和牛奶甜味的氣息，溫柔地喚醒了落寞的清晨。叉子輕快切下去的微震，空氣中瀰漫開粉嫩草莓的清香，柔滑的鮮奶油和鬆軟的蛋糕體在舌尖繾綣、交融，彷彿早晨微涼的陽光穿透薄霧。吃完的那一刻，幸福而踏實，我意識到我終於再次活過來了！',
        alt: '經典草莓鮮奶油雙層戚風'
      },
      5: {
        user: '專業級甜點糾察隊',
        tag: '#無懈可擊',
        quote: '甜點不會背叛你，它只會溫柔地包裹你的胃。',
        longFeedback: '身為常年探訪各大名店、口味極度挑剔的專業級抹茶糾察隊長，這款靜岡雙層綠意抹茶蛋糕簡直刷新了我的抹茶世界觀。它沒有用大量糖分去妥協抹茶原有的苦澀，而是用完美的雙層比例把靜岡高雅幽香與醇厚茶韻展現得淋漓盡致。上層是如絲綢般細膩的抹茶慕斯，下層是濃醇扎實的磅蛋糕質地，苦與甜的配比拿捏到了極致。它不需要任何虛偽的客套包裝，實力本身就是對胃最溫柔的擁抱。',
        alt: '靜岡雙層綠意抹茶蛋糕'
      }
    }
  },
  en: {
    title: "True Words From Conquered Stomachs",
    subtitle: "Only honest appetites here, zero hypocritical pleasantries.",
    badge: "💬 Click any review to explore 100-word true palate stories",
    click_badge: "REAL REPORT ✦ CLICK",
    stamp_text: "Pure Joy",
    write_as: "As ",
    write_as_suffix: "",
    modify_profile: "Edit Profile 🎨",
    input_placeholder: "Did this pastry touch your heart too? Write your honest, objective feedback comments here...",
    publish: "Post Comment ✦",
    unlock_title: "Unlock Anonymous Profile & Comment Salon",
    unlock_desc: "Fill in a quick pseudonym, select or upload a preset avatar to unlock taste support!",
    unlock_btn: "✍️ Unlock Profile & Post Comments",
    quote_prefix: "\"",
    quote_suffix: "\"",
    button_close: "Confirm and Close",
    unlocked_banner: "Modify Profile 🎨",
    feedback_placeholder: "No comments yet. Leave your review details!",
    items: {
      1: {
        user: 'Monday Blues Patient',
        tag: '#InstantRelief',
        quote: 'I thought I was buying cake, but I bought soul redemption instead.',
        longFeedback: 'On a monotonous, suffocating Monday, when this dreamy lavender French vintage ribbon cake sat on my desk, all fatigue evaporated. The elegant black bow ribbon wrapper feels like Hepburn-style French romance. At the first bite, light soufflé chiffon meshes with taro cream... truly luxurious healing for a tired soul!',
        alt: 'Hepburn Lavender Ribbon Cake'
      },
      2: {
        user: 'Office Snack Captain',
        tag: '#OfficeSavior',
        quote: 'The boss asked why I was smiling at my monitor. I sent him the link, now the entire office is silent.',
        longFeedback: 'Snacking on this Dark Monster Oreo Chocolate Cake, the sweet cocoa scent filled the air. The bittersweet dark chocolate mixed with crunchy Oreo cookie bits is pure magic. Soon colleagues gathered, and even the boss came for a slice. We all smiled silly at our screens—all daily stress evaporated. Office Savior indeed!',
        alt: 'Oreo Monster Chocolate Cake'
      },
      3: {
        user: 'Is Tomorrow Diet Day',
        tag: '#WorthRunning',
        quote: 'For this texture, I am willing to run an extra three miles on the treadmill.',
        longFeedback: 'Facing the treadmill\'s 1000-calorie count, I swore to stay away from carbs. But one look at this multi-layered French Blueberry Mille-feuille broke all my defenses. Taking a bite, the crispy caramelized puff pastry cracked in my mouth, bursting with fresh blueberries and rich vanilla pastry cream. The absolute best level of dessert perfection!',
        alt: 'French Blueberry Mille-feuille'
      },
      4: {
        user: 'Freshly Out of Bed',
        tag: '#AwakeTheSoul',
        quote: 'The moment my fork cut through, I felt like I was finally alive.',
        longFeedback: 'Saying goodbye to a cozy bed on cold mornings is painful. But then comes this Classic Strawberry Double Chiffon. The gentle scent of baked flour and fresh pasture milk woke me up softly. Light cream and airy sponge cake danced on my tongue like morning sun piercing the fog.',
        alt: 'Classic Strawberry Cream Chiffon'
      },
      5: {
        user: 'Matcha Inspector',
        tag: '#AbsolutelyFlawless',
        quote: 'Dessert never betrays you; it just wraps your stomach in warmth.',
        longFeedback: 'As a veteran matcha explorer, this Shizuoka Double Matcha Cake totally redefined my matcha universe. It doesn\'t compromise with excessive sugar to hide tea bitterness. It uses perfect dual layers to highlight Shizuoka\'s elegant aroma and deep tea aftertaste. A perfect balance of bitter and sweet.',
        alt: 'Shizuoka Double Matcha Cake'
      }
    }
  },
  ja: {
    title: "胃袋を奪われた人々の本音",
    subtitle: "ここにあるのは正直なお腹だけ。建前抜きの真実の声。",
    badge: "💬 レビューをクリックして、100文字のリアルな味覚体験を覗いてみましょう",
    click_badge: "本音の感想 ✦ CLICK",
    stamp_text: "至福認定",
    write_as: "ニックネーム「",
    write_as_suffix: "」として投稿中",
    modify_profile: "プロフィール修正 🎨",
    input_placeholder: "このスイーツで特別な思い出はありますか？ あなたのリアルな本音を自由にコメントしてください...",
    publish: "コメントを送信 ✦",
    unlock_title: "匿名で食時会サロンに参加してコメントを残す",
    unlock_desc: "プロフィール画像を選択またはアップロードし、簡単なニックネームと性別を教えてください！",
    unlock_btn: "✍️ プロフィールを登録してコメントする",
    quote_prefix: "「",
    quote_suffix: "」",
    button_close: "確認して閉じる",
    unlocked_banner: "プロフィール修正 🎨",
    feedback_placeholder: "まだコメントはありません。最初の感想を投稿してみましょう！",
    items: {
      1: {
        user: '月曜病のサバイバー',
        tag: '#速攻で癒される',
        quote: 'ただケーキを買ったのではない。ココロの救済を買ったのだ。',
        longFeedback: 'どんよりした週明け。このラベンダーを帯びた上品な紫のリボンケーキをデスクに置くだけで憂鬱さは吹き飛びます。黒いシックなリボンの演出は、まるでヘップバーン。一口食べれば、アールグレイ香る極上のシフォンとまろやかなタロ芋クリーム、なめらかなカスタードプリン。週明けの憂鬱を最上の癒しへ変える名作です。',
        alt: 'ヘップバーン風ラベンダーリボンケーキ'
      },
      2: {
        user: 'おやつの時間リーダー',
        tag: '#オフィスの救世主',
        quote: '社長から「なぜPC見ながらニヤけているんだ」と聞かれ、URLを送ったらオフィス全員静かになった。',
        longFeedback: 'オレオココアのドームケーキ。ビターチョコとオレオチップスのざくざく感がとにかく贅沢で美味しい。オフィスのメンバーに分けていたら、社長までやってきて幸せそうに微笑んでいました。仕事のピリピリ感をあっという間に和らげてくれるオフィスの最高の相棒です。',
        alt: 'オレオモンスターのココアドーム'
      },
      3: {
        user: 'ダイエットは明日から',
        tag: '#走る価値あり',
        quote: 'この食感のためなら、トレッドミルでさらに3km走ってもいい。',
        longFeedback: '炭水化物をカットしようと誓った週。しかしこのブルーベリーミルフィーユを見た瞬間、私の意志は崩れ去りました。サクサクのパイが崩れ、中から濃厚なカスタードとあふれんばかりの新鮮なブルーベリー。これほど贅沢な食感なら、3km余分に走ることになっても全く後悔はありません！',
        alt: '焦がしバター의 블루베리 밀푀유'
      },
      4: {
        user: '布団から出られない人',
        tag: '#魂の目覚まし',
        quote: 'フォークを入れた瞬間、私は本当の意味で目を覚ました。',
        longFeedback: '冷え込む朝、布団から出るのは本当に大仕事。そんな時このストロベリーショートケーキをいただきました。上質なミルクと新鮮な小麦の香ばしさが体を優しく包み込み、大粒イチゴの甘酸っぱさが朝の太陽のように清々しく広がります。一日を元気に始めるための最良の朝食でした。',
        alt: '王道ショートケーキ・ダブルシフォン'
      },
      5: {
        user: '抹茶特別審査員',
        tag: '#完全無欠',
        quote: 'スイーツは決してあなたを裏切らない。お腹とココロを優しく満たすだけ。',
        longFeedback: '抹茶が大好きで様々な名作を食べてきましたが、この静岡抹茶ケーキは衝撃でした。渋みを隠すためだけの不要な甘さは極力控えられ、本場静岡茶の贅沢な旨味とふんわりとした余韻を最大まで引き出しています。抹茶ムースと生クリームの美しいハーモニーに大満足です。',
        alt: '静岡産濃和抹茶のダブルレイヤー'
      }
    }
  },
  ko: {
    title: "위장을 정복당한 사람들의 진심 어린 고백",
    subtitle: "여기에는 솔직한 입맛만 있을 뿐, 입 발린 소리는 없습니다.",
    badge: "💬 리뷰를 클릭하여 100자 이내의 리얼한 감정 후기를 만나보세요",
    click_badge: "리얼 후기 ✦ CLICK",
    stamp_text: "힐링인증",
    write_as: "닉네임「",
    write_as_suffix: "」으로 등록중",
    modify_profile: "프로필 수정 🎨",
    input_placeholder: "이 디저트가 당신의 마음도 움직였나요? 진솔하고 객관적인 맛의 후기를 남겨주세요...",
    publish: "댓글 게재 ✦",
    unlock_title: "익명 후기방에 참여하여 댓글을 남겨보세요",
    unlock_desc: "원하는 프로필 이미지를 등록하거나 업로드하고, 성함과 간단한 가칭 성별을 입력해주세요!",
    unlock_btn: "✍️ 프로필 등록하고 댓글 달아보기",
    quote_prefix: "「",
    quote_suffix: "」",
    button_close: "확인 및 닫기",
    unlocked_banner: "프로필 수정 🎨",
    feedback_placeholder: "작성된 후기가 없습니다. 첫 번째 힐링 한마디를 남겨보세요!",
    items: {
      1: {
        user: '월요병 생존자',
        tag: '#즉시해탈',
        quote: '케이크를 산 줄 알았는데, 지친 내 마음에 평화를 얻었다.',
        longFeedback: '지루하고 답답한 월요일 오후. 오드리 헵번이 떠오르는 영롱한 라벤더 보라빛 케이크를 테이블에 올리자 마자 기분이 산뜻해졌습니다. 아르그레이 향이 은은한 쉬폰 시트에 부드러운 타로 무스, 그리고 탄력 있는 푸딩의 조화. 영혼을 가만히 보듬어주는 궁극의 달콤함입니다.',
        alt: '헵번 라벤더 리본 쉬폰'
      },
      2: {
        user: '사내 간식 대장',
        tag: '#일터의구세주',
        quote: '갑자기 한바탕 웃었더니 사장님이 왜 혼자 웃냐며, 주소를 받아 가시더니 사무실이 잠잠해졌다.',
        longFeedback: '진수 수제 오레오 초콜릿 가득 도톰한 오레오 케이크. 달콤하면서도 한 알씩 씹히는 오레오의 바식함이 몬스터 같은 카리스마를 뿜어냅니다. 한 조각 먹는 것만으로도 사내 업무에 가득 차 있던 정체 스트레스가 번지점프하듯 씻겨 내려갑니다.',
        alt: '오레오 모네스터 초콜릿 케이크'
      },
      3: {
        user: '다이어트는 내일부터',
        tag: '#운동할가치충분',
        quote: '이 극상의 레이어 식감을 위해서라면 트레드밀을 3km 더 뛰어도 후회 없다.',
        longFeedback: '밀가루와 당을 끊겠다고 다짐했던 주간이었으나, 이 프렌치 블루베리 밀푀유 파이의 기품 넘치는 모습에 한순간에 심장 방어선이 해제되었습니다. 한 입 먹었을 때 연거푸 바스러지는 파이 결과 그 안에서 신선하게 톡톡 터지는 블루베리의 과즙, 마무리를 매끈하게 장식하는 커스터드 크림까지.',
        alt: '프렌치 블루베리 밀푀유 파이'
      },
      4: {
        user: '이불 속과 결별한 자',
        tag: '#영혼을 일깨우는 맛',
        quote: '포크를 가볍게 찔러 넣는 순간, 내가 드디어 완벽하게 깨어났음을 실감했다.',
        longFeedback: '찬 바람 속 일찍 침대 밖으로 나오는 것은 일종의 전쟁이었습니다. 하지만 이 고운 생크림 딸기 케이크 한 수저를 비우자 고소한 유크림의 부드러움과 신선한 대왕딸기의 아삭함이 온 몸의 감각을 깨워주었습니다. 매일의 아침을 기운 나게 만들어 줄 특별 처방입니다.',
        alt: '클래식 딸기 생크림 더블 쉬폰'
      },
      5: {
        user: '말차 마니아 수석 감사',
        tag: '#완벽한 조화',
        quote: '달콤한 디저트는 당신을 배신하지 않습니다. 당신의 위장과 마음을 감쌀 뿐.',
        longFeedback: '수많은 디저트 맛집 편력을 자랑해 왔지만 이 마차 케이크는 놀랄 만큼 일품이었습니다. 말차 특유의 아련한 씁쓸함을 과한 머랭 설탕으로 타협하여 감추지 않고, 정품 시즈오카산 마차의 우아한 향 and 농후함을 훌륭하게 이중으로 구사해 냈습니다. 깊은 매력을 선사합니다.',
        alt: '시즈오카 다블 마차 케이크'
      }
    }
  }
};

export default function CommunitySection() {
  const { language } = useShop();
  const tComm = REVIEWS_TRANSLATED[language] || REVIEWS_TRANSLATED['zh'];
  const [selectedReview, setSelectedReview] = useState<typeof REVIEWS[0] | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<number, Comment[]>>(INITIAL_COMMENTS);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Profile setup modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempGender, setTempGender] = useState('👧 / 溫柔小仙女');
  const [tempAvatar, setTempAvatar] = useState('🧁');

  // Input states
  const [newCommentText, setNewCommentText] = useState('');

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount safely
  useEffect(() => {
    const savedComments = localStorage.getItem('sweet_salon_comments_map');
    if (savedComments) {
      try {
        setCommentsMap(JSON.parse(savedComments));
      } catch (e) {
        console.error("Failed to parse comments from localStorage:", e);
      }
    }
    const savedProfile = localStorage.getItem('sweet_salon_anonymous_profile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse profile from localStorage:", e);
      }
    }
  }, []);

  // Save comments to localStorage whenever changed
  const saveCommentsToStorage = (newMap: Record<number, Comment[]>) => {
    localStorage.setItem('sweet_salon_comments_map', JSON.stringify(newMap));
  };

  // Like Toggle Function
  const handleLikeComment = (reviewId: number, commentId: string) => {
    setCommentsMap(prev => {
      const reviewComments = prev[reviewId] || [];
      const updated = reviewComments.map(c => {
        if (c.id === commentId) {
          const isLiked = !c.likedByByCurrUser;
          return {
            ...c,
            likedByByCurrUser: isLiked,
            likes: isLiked ? c.likes + 1 : c.likes - 1
          };
        }
        return c;
      });
      const newMap = { ...prev, [reviewId]: updated };
      saveCommentsToStorage(newMap);
      return newMap;
    });
  };

  // Add Comment Function
  const handleAddComment = (reviewId: number) => {
    if (!newCommentText.trim()) return;

    if (!userProfile) {
      // Prompt profile registration first
      setTempName('');
      setTempGender('👧 / 溫柔小仙女');
      setTempAvatar('🧁');
      setShowProfileModal(true);
      return;
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: userProfile.name,
      gender: userProfile.gender,
      avatar: userProfile.avatar,
      content: newCommentText.trim().slice(0, 100),
      likes: 0,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.')
    };

    setCommentsMap(prev => {
      const reviewComments = prev[reviewId] || [];
      const newMap = {
        ...prev,
        [reviewId]: [...reviewComments, newComment]
      };
      saveCommentsToStorage(newMap);
      return newMap;
    });

    setNewCommentText('');
  };

  // Save Anonymous Profile Setup
  const handleSaveProfile = () => {
    if (!tempName.trim()) {
      alert("請填寫您的匿名暱稱喔！💝");
      return;
    }
    const profile: UserProfile = {
      name: tempName.trim().slice(0, 15),
      gender: tempGender,
      avatar: tempAvatar
    };
    setUserProfile(profile);
    localStorage.setItem('sweet_salon_anonymous_profile', JSON.stringify(profile));
    setShowProfileModal(false);
  };

  // Upload Avatar Handler
  const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert("頭像圖片容量不能超過 1.5MB 喔！");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setTempAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section 
      id="community" 
      className="bg-[#FFF9F1] py-24 px-6 overflow-hidden select-none relative"
    >
      {/* 🛠️ Dynamic CSS injected directly via style tag to ensure pristine nth-child selectors setup */}
      <style dangerouslySetInnerHTML={{__html: `
        .testimonial-card-container {
          perspective: 1200px;
        }
        
        .testimonial-card {
          background-color: #FFFFFF;
          border: 1px solid #F1E2D3;
          box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }

        /* Desktop specific dynamic masonry arrangement using nth-child randomly skewed */
        @media (min-width: 1024px) {
          .testimonial-card:nth-child(5n+1) {
            transform: rotate(-3deg);
            margin-top: 15px;
          }
          .testimonial-card:nth-child(5n+2) {
            transform: rotate(2.5deg);
            margin-top: -5px;
          }
          .testimonial-card:nth-child(5n+3) {
            transform: rotate(-1.8deg);
            margin-top: 25px;
          }
          .testimonial-card:nth-child(5n+4) {
            transform: rotate(3deg);
            margin-top: 5px;
          }
          .testimonial-card:nth-child(5n+5) {
            transform: rotate(-2.2deg);
            margin-top: 18px;
          }
          
          /* The Correction (回正效果) on hover */
          .testimonial-card:hover {
            transform: rotate(0deg) scale(1.05) translate3d(0, -8px, 0) !important;
            box-shadow: 15px 25px 35px rgba(0, 0, 0, 0.08);
            z-index: 50;
          }
        }

        /* Mobile safe stacking skew control to avoid messy alignments on tiny screens */
        @media (max-width: 1023px) {
          .testimonial-card:nth-child(odd) {
            transform: rotate(-0.6deg);
          }
          .testimonial-card:nth-child(even) {
            transform: rotate(0.6deg);
          }
          
          .testimonial-card:hover {
            transform: rotate(0deg) scale(1.02) !important;
            box-shadow: 10px 15px 25px rgba(0, 0, 0, 0.06);
          }
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        
        {/* Title Elements */}
        <div className="text-center mb-20 space-y-3">
          <h2 className="text-3xl md:text-5xl font-sans font-black text-stone-900 tracking-tight leading-tight">
            {tComm.title}
          </h2>
          <p className="text-sm md:text-base font-sans font-light text-stone-500 tracking-wider">
            {tComm.subtitle}
          </p>
          <div className="inline-flex items-center gap-1.5 bg-[#EB9FB0]/10 text-[#E63946] px-4 py-1.5 rounded-full text-xs font-bold mt-2 animate-pulse">
            <span>{tComm.badge}</span>
          </div>
        </div>

        {/* Dynamic Masonry Cards Grid (5-column Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-16 gap-x-6 pt-6">
          {REVIEWS.map((review) => {
            const locReview = tComm.items[review.id] || {};
            const revUser = locReview.user || review.user;
            const revTag = locReview.tag || review.tag;
            const revQuote = locReview.quote || review.quote;
            const revAlt = locReview.alt || review.alt;

            return (
              <motion.div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: review.id * 0.1 }}
                className="testimonial-card relative flex flex-col h-[400px] rounded-[24px] overflow-visible group cursor-pointer"
              >
                {/* 📌 頂部紙膠帶 (Washi Tape) */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 -top-4 w-[85px] h-[30px] z-20 pointer-events-none opacity-90 shadow-xs"
                  style={{
                    backgroundColor: 'rgba(242, 181, 181, 0.75)',
                    clipPath: 'polygon(0% 12%, 4% 0%, 8% 12%, 12% 0%, 16% 12%, 20% 0%, 24% 12%, 28% 0%, 32% 12%, 36% 0%, 40% 12%, 44% 0%, 48% 12%, 52% 0%, 56% 12%, 60% 0%, 64% 12%, 68% 0%, 72% 12%, 76% 0%, 80% 12%, 84% 0%, 88% 12%, 92% 0%, 96% 12%, 100% 0%, 98% 100%, 94% 88%, 90% 100%, 86% 88%, 82% 100%, 78% 88%, 74% 100%, 70% 88%, 66% 100%, 62% 88%, 58% 100%, 54% 88%, 50% 100%, 46% 88%, 42% 100%, 38% 88%, 34% 100%, 30% 88%, 26% 100%, 22% 88%, 18% 100%, 14% 88%, 10% 100%, 6% 88%, 2% 100%)',
                    transform: `rotate(${review.id % 2 === 0 ? '-2deg' : '1.5deg'})`
                  }}
                />

                {/* 上層 (70%) 置放甜點實拍圖 (套用輕微 sepia 濾鏡) */}
                <div className="relative h-[270px] w-full overflow-hidden rounded-t-[23px] shrink-0 bg-stone-100">
                  <img 
                    src={review.image} 
                    alt={revAlt} 
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-108" 
                    style={{ 
                      filter: 'sepia(12%) contrast(1.02) brightness(0.98)',
                      imageRendering: 'auto'
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Click to open label overlay on image hover */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/40 to-transparent p-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-[#E63946] text-white font-bold text-[9px] tracking-widest px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 scale-95 uppercase">
                      💬 {tComm.click_badge}
                    </span>
                  </div>
                  
                  {/* Speech gradient mask inside photo for legible quote */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/40 to-transparent p-4 pt-12">
                    <p className="text-white text-xs leading-relaxed font-bold font-serif filter drop-shadow-sm line-clamp-3">
                      {tComm.quote_prefix}{revQuote}{tComm.quote_suffix}
                    </p>
                  </div>
                </div>
                
                {/* 下層 (30%) 留白區 */}
                <div className="p-4 flex flex-col justify-center flex-grow bg-white rounded-b-[23px] relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    {/* Left: Nickname */}
                    <span className="text-stone-800 text-[11px] font-black tracking-wide truncate max-w-[55%]">
                      👤 {revUser}
                    </span>
                    
                    {/* Right: Mood Tag */}
                    <span 
                      className="px-2.5 py-1 rounded-full text-white text-[9px] font-black tracking-wider uppercase shrink-0 shadow-xs select-none"
                      style={{ backgroundColor: '#EB9FB0' }}
                    >
                      {revTag}
                    </span>
                  </div>

                  {/* 🏵️ 浮現印章 (The Stamp) on Hover */}
                  <div className="absolute bottom-2 right-2 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-[-8deg] transition-all duration-500 ease-out pointer-events-none z-10">
                    <div className="w-[52px] h-[52px] rounded-full border-2 border-double border-red-500/50 flex flex-col items-center justify-center rotate-[-12deg] p-1 bg-[#FFFFFF]/85">
                      <span className="text-[5px] font-black tracking-widest text-[#E53E3E]/60 uppercase leading-none">
                        Piece of cake
                      </span>
                      <span className="text-[8px] font-black text-[#E53E3E]/75 tracking-wider mt-0.5">
                        {tComm.stamp_text}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 🌟 100-word Real Review Premium Modal overlay */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="absolute inset-0 bg-[#1C1917]/70 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal content frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-[#FFF9F1] border-2 border-[#F1E2D3] rounded-[40px] shadow-2xl p-8 md:p-10 text-left overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{ cursor: 'auto' }}
            >
              {/* Corner Close Button */}
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/80 border border-stone-200 text-stone-700 hover:bg-[#E63946] hover:text-white transition-all shadow-sm focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Envelope Head Stamp */}
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3.5 py-1 bg-[#EB9FB0]/20 text-[#E63946] text-[10px] font-black tracking-widest uppercase rounded-full border border-[#EB9FB0]/30 select-none">
                  ✦ CUSTOMER DIGEST
                </div>
                <div className="h-px bg-stone-200 flex-grow" />
              </div>

              {/* Header profile info */}
              {(() => {
                const locSelReview = tComm.items[selectedReview.id] || {};
                const selUser = locSelReview.user || selectedReview.user;
                const selTag = locSelReview.tag || selectedReview.tag;
                const selLongFeedback = locSelReview.longFeedback || selectedReview.longFeedback;
                const selAlt = locSelReview.alt || selectedReview.alt;
                const recText = language === 'en' ? 'Recommended Item: ' : language === 'ja' ? 'おすすめ品：' : language === 'ko' ? '추천 품목: ' : '推薦品項：';
                return (
                  <>
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6 pb-6 border-b border-stone-200">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-md shrink-0 bg-stone-100 border-2 border-white select-none">
                        <img
                          src={selectedReview.image}
                          alt={selAlt}
                          className="w-full h-full object-cover"
                          style={{ filter: 'contrast(1.01)' }}
                        />
                      </div>
                      <div className="space-y-2 text-center sm:text-left flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-sans font-black text-2xl text-stone-900 leading-tight">
                            {selUser}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-[#EB9FB0] text-white text-[10px] font-black tracking-widest rounded-full uppercase">
                            {selTag}
                          </span>
                        </div>
                        
                        {/* Rating Stars */}
                        <div className="flex items-center justify-center sm:justify-start gap-1">
                          {[...Array(selectedReview.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs font-bold text-stone-500 ml-1.5 font-mono">{selectedReview.date}</span>
                        </div>
                        
                        <p className="text-xs font-bold text-[#E63946]/80 bg-[#E63946]/5 rounded-lg px-2.5 py-1 inline-block leading-none mt-1">
                          🍰 {recText}{selAlt}
                        </p>
                      </div>
                    </div>

                    {/* Real 100-character descriptive sensory story */}
                    <div className="relative py-4">
                      <Quote className="absolute -top-1 -left-2 w-10 h-10 text-[#EB9FB0]/20 -z-10 transform scale-x-[-1]" />
                      <p className="text-stone-800 text-[14px] md:text-[15px] leading-relaxed font-bold font-serif whitespace-pre-line relative z-10 filter drop-shadow-xs antialiased">
                        {tComm.quote_prefix}{selLongFeedback}{tComm.quote_suffix}
                      </p>
                    </div>
                  </>
                );
              })()}

              {/* 💬 Other People's Comments / Nested Replies Block */}
              <div className="mt-8 pt-6 border-t border-stone-200/60 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-stone-800 tracking-tight flex items-center gap-2 select-none">
                    <MessageSquare className="w-4.5 h-4.5 text-[#EB9FB0]" />
                    <span>{language === 'en' ? 'Gourmet Comments' : language === 'ja' ? 'グルメコメント' : language === 'ko' ? '식도락 공감 댓글방' : '饕客共鳴留言區'} ({ (commentsMap[selectedReview.id] || []).length })</span>
                  </h4>
                  <span className="text-[10px] text-stone-400 font-bold select-none">
                    ✦ Objectively Reviewed
                  </span>
                </div>

                {/* Replies container */}
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                  {(commentsMap[selectedReview.id] || []).length === 0 ? (
                    <div className="text-center py-6 bg-white/45 rounded-2xl border border-stone-200/30">
                      <p className="text-xs text-stone-400 font-bold">{tComm.feedback_placeholder}</p>
                    </div>
                  ) : (
                    (commentsMap[selectedReview.id] || []).map((comment) => {
                      return (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/60 p-4 rounded-2xl border border-[#F1E2D3] flex gap-4 items-start relative hover:shadow-xs transition-shadow"
                        >
                          {/* Circular User Avatar preview */}
                          <div className="w-10 h-10 rounded-full bg-[#FAF5F0] border border-stone-200/50 flex items-center justify-center overflow-hidden shrink-0 select-none">
                            {comment.avatar.startsWith('data:image') ? (
                              <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl leading-none">{comment.avatar}</span>
                            )}
                          </div>

                          {/* Comment Content */}
                          <div className="flex-grow space-y-1 text-left">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-black text-stone-800">{comment.user}</span>
                                <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-400 font-extrabold leading-none select-none">
                                  {comment.gender.split(' ')[0]}
                                </span>
                              </div>
                              <span className="text-[9px] font-mono text-stone-400 shrink-0 select-none">{comment.date}</span>
                            </div>
                            <p className="text-xs text-stone-700 font-bold font-serif leading-relaxed pr-6">
                              {comment.content}
                            </p>
                          </div>

                          {/* 👍 Liking Interactive Button */}
                          <div className="absolute right-3 bottom-3 md:top-3 md:bottom-auto">
                            <motion.button
                              whileTap={{ scale: 1.4 }}
                              onClick={() => handleLikeComment(selectedReview.id, comment.id)}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider transition-all shadow-2xs ${
                                comment.likedByByCurrUser
                                  ? 'bg-red-50 border border-red-200 text-[#E63946]'
                                  : 'bg-white hover:bg-stone-50 border border-stone-200 text-stone-500'
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${comment.likedByByCurrUser ? 'fill-[#E63946] text-[#E63946]' : 'text-stone-400'}`} />
                              <span className="font-mono">{comment.likes}</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {/* ✍️ Write Comment Zone */}
                <div className="pt-4 border-t border-stone-200/60 pb-2">
                  {userProfile ? (
                    <div className="space-y-4">
                      {/* Active identification banner */}
                      <div className="flex gap-3 items-center justify-between bg-[#FAF5F0] p-3 rounded-2xl border border-[#F1E2D3] text-left">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center overflow-hidden shrink-0">
                            {userProfile.avatar.startsWith('data:image') ? (
                              <img src={userProfile.avatar} alt="Current profile" className="w-[100%] h-[100%] object-cover" />
                            ) : (
                              <span className="text-base leading-none select-none">{userProfile.avatar}</span>
                            )}
                          </div>
                          <div>
                            <span className="text-[11px] font-black text-stone-800 leading-none block">
                              💬 {tComm.write_as}<strong>{userProfile.name}</strong>{tComm.write_as_suffix}
                            </span>
                            <span className="text-[9px] text-stone-400 font-extrabold leading-none mt-0.5 block select-none">
                              {userProfile.gender}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setTempName(userProfile.name);
                            setTempGender(userProfile.gender);
                            setTempAvatar(userProfile.avatar);
                            setShowProfileModal(true);
                          }}
                          className="text-[10px] font-black text-[#E63946] bg-white border border-rose-200 px-3 py-1 rounded-full hover:bg-rose-50 transition-colors"
                        >
                          {tComm.modify_profile}
                        </button>
                      </div>

                      {/* Comment Input */}
                      <div className="relative">
                        <textarea
                          rows={3}
                          maxLength={100}
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder={tComm.input_placeholder}
                          className="w-full bg-white rounded-2xl border-2 border-stone-200 focus:border-[#EB9FB0] transition-colors p-3.5 pr-24 text-xs font-semibold text-stone-800 placeholder:text-stone-400 outline-none resize-none font-sans shadow-2xs"
                        />
                        <div className="absolute right-3.5 bottom-3.5 flex items-center gap-3">
                          <span className="text-[9px] font-mono text-stone-400 font-bold select-none">
                            {newCommentText.length}/100
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddComment(selectedReview.id)}
                            className="bg-stone-900 text-white font-black text-[10px] tracking-widest uppercase px-4 py-2 rounded-full transition-all hover:bg-[#E63946] active:scale-95"
                          >
                            {tComm.publish}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-[#FAF5F0] to-[#FFF9F1] border-2 border-dashed border-[#EB9FB0]/40 rounded-3xl p-5 text-center shadow-2xs">
                      <p className="text-stone-800 text-[11px] font-black mb-1.5 flex items-center justify-center gap-1.5 select-none">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin [animation-duration:4s]" />
                        <span>{tComm.unlock_title}</span>
                      </p>
                      <p className="text-[10px] text-stone-400 font-bold mb-4 select-none">
                        {tComm.unlock_desc}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setTempName('');
                          setTempGender('👧 / 溫柔小仙女');
                          setTempAvatar('🧁');
                          setShowProfileModal(true);
                        }}
                        className="px-6 py-2.5 bg-[#E63946] text-white hover:bg-[#BD1E51] font-black text-[10.5px] tracking-widest uppercase rounded-full transition-all duration-300 shadow-sm active:scale-95"
                      >
                        {tComm.unlock_btn}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Stamp & Button */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Red Circular Stamp of Taste Proof */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-double border-red-500/60 flex flex-col items-center justify-center rotate-[-6deg] p-1 bg-white select-none">
                    <span className="text-[4px] font-black tracking-widest text-red-500/60 uppercase leading-none">
                      Piece of cake
                    </span>
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 mt-0.5 animate-pulse" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] font-black tracking-widest text-[#E63946] uppercase">DELICIOUS VERIFIED</p>
                    <p className="text-xs font-bold text-stone-400">{language === 'en' ? '100% Genuine Taste' : language === 'ja' ? '100% リアル食感フィードバック' : language === 'ko' ? '100% 미식가 실물 진솔 후기' : '100% 味蕾真實回饋'}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#E63946] transition-all duration-300 shadow-sm active:scale-95"
                >
                  {tComm.button_close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 💳 ANONYMOUS CREDIT LABELS / SALON PASS REGISTRATION OVERLAY */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark blur ambient canvas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm cursor-zoom-out"
            />

            {/* Profile setup card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md bg-[#FFF9F1] border-4 border-white rounded-[40px] shadow-2xl p-8 text-center overflow-hidden"
            >
              {/* Corner Close */}
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-stone-900"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 bg-[#EB9FB0]/15 text-[#821E31] px-4.5 py-1.5 rounded-full border border-[#EB9FB0]/30 shadow-2xs mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#821E31] animate-spin [animation-duration:10s]" />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  SALON IDENTIFICATION CARD
                </span>
              </div>

              <h3 className="font-sans font-black text-xl text-stone-900 tracking-tight mb-2">
                {language === 'en' ? 'Create Tasting Card' : language === 'ja' ? '匿名プロフィール作成' : language === 'ko' ? '익명 미식 카드 만들기' : '建立個人匿名品味卡'}
              </h3>
              <p className="text-[10.5px] text-stone-400 font-bold mb-6 leading-relaxed">
                {language === 'en' ? 'Set up your private pseudonym. Leave your mark, like or comment across our dessert salon instantly!' : language === 'ja' ? '独自の匿名プロフィールを設定します。登録完了後、スイーツサロン全域でお気に入りやコメント機能を今すぐ利用できます！' : language === 'ko' ? '개인 전용 익명 파일을 생성합니다. 설정 완료 후 전 사이트 생크림 달콤 살롱에서 공감과 댓글을 즉시 사용할 수 있습니다!' : '建立個人專屬匿名檔案。設定完成後即刻在全站甜點沙龍區啟用您的按讚及留言附議！'}
              </p>

              {/* Interactive Pass Card mockup */}
              <div className="bg-white rounded-3xl p-5 border border-[#F1E2D3] shadow-inner space-y-5 text-left mb-6">
                <div className="flex gap-4 items-center">
                  {/* Photo Preview Holder */}
                  <div className="relative group/avatar">
                    <div className="w-16 h-16 rounded-2xl bg-[#FAF5F0] border-2 border-[#F1E2D3] flex items-center justify-center overflow-hidden shrink-0 shadow-xs select-none">
                      {tempAvatar.startsWith('data:image') ? (
                        <img src={tempAvatar} alt="Avatar Upload Preview" className="w-[100%] h-[100%] object-cover" />
                      ) : (
                        <span className="text-3xl leading-none">{tempAvatar}</span>
                      )}
                    </div>
                    {/* Tiny Camera Pen icon overlay for file upload */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center border border-white hover:bg-[#E63946] active:scale-95 transition-all shadow-sm"
                      title="Upload custom image"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Nickname & Gender input */}
                  <div className="flex-grow space-y-2">
                    <div>
                      <label className="text-[9.5px] font-black text-stone-400 block tracking-wider uppercase mb-1">
                        ✍️ {language === 'en' ? 'NICKNAME' : language === 'ja' ? 'ニックネーム' : language === 'ko' ? '익명 닉네임' : '匿名姓名'} / NICKNAME
                      </label>
                      <input
                        type="text"
                        maxLength={15}
                        placeholder={language === 'en' ? 'e.g., Cream Lover 🍦' : language === 'ja' ? '例：タロ芋生クリーム狂 🍦' : language === 'ko' ? '예: 타로 생크림 매니아 🍦' : '例：芋泥生乳狂熱分子 🍦'}
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-[#EB9FB0] focus:ring-1 focus:ring-[#EB9FB0] transition-all placeholder:text-stone-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Gender selecting interactive widgets */}
                <div>
                  <label className="text-[9.5px] font-black text-stone-400 block tracking-wider uppercase mb-1.5">
                    🧬 {language === 'en' ? 'GENDER IDENTITY' : language === 'ja' ? 'ジェンダー選択' : language === 'ko' ? '성별 선택' : '性別選擇'} / GENDER IDENTITY
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: '👧 溫柔小仙女', val: '👧 / 溫柔小仙女', labels: { en: '👧 Sweet Angel', ja: '👧 優しい妖精', ko: '👧 러블리 요정', zh: '👧 溫柔小仙女' } },
                      { label: '👦 帥氣小怪獸', val: '👦 / 帥氣小怪獸', labels: { en: '👦 Cool Beast', ja: '👦 イケメン怪獣', ko: '👦 훈남 소환수', zh: '👦 帥氣小怪獸' } },
                      { label: '🐾 貪吃小精靈', val: '🐾 / 貪吃小精靈', labels: { en: '🐾 Foodie Elf', ja: '🐾 食いしん坊', ko: '🐾 먹보 꼬마', zh: '🐾 貪吃小精靈' } }
                    ].map((g) => {
                      const isSelected = tempGender === g.val;
                      const displayLabel = g.labels[language as 'en' | 'ja' | 'ko' | 'zh'] || g.labels['zh'];
                      return (
                        <button
                          key={g.val}
                          type="button"
                          onClick={() => setTempGender(g.val)}
                          className={`py-2 rounded-xl text-[10.5px] font-sans font-black flex items-center justify-center transition-all border ${
                            isSelected
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
                          }`}
                        >
                          {displayLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom File Picker Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Preset Avatar choice gallery */}
                <div className="space-y-1.5 pt-1.5 border-t border-stone-100">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-stone-400 tracking-wider uppercase">
                      🍰 {language === 'en' ? 'Quick Select Preset Avatar' : language === 'ja' ? 'プリセットアバターから選択' : language === 'ko' ? '프리셋 아바타 빠른 선택' : '快速選擇預置頭像'} (Preset Avatar Gallery)
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[9.5px] font-black text-[#E63946] flex items-center gap-1 hover:underline"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{language === 'en' ? 'Upload Custom' : language === 'ja' ? 'カスタムアップロード' : language === 'ko' ? '전용 이미지 업로드' : '上傳專屬圖片'}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {PRESET_AVATARS.map((emoji) => {
                      const isSelected = tempAvatar === emoji;
                      return (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setTempAvatar(emoji)}
                          className={`w-10 h-10 rounded-xl bg-stone-50 text-xl border flex items-center justify-center hover:bg-stone-100 transition-all select-none ${
                            isSelected ? 'border-2 border-[#EB9FB0] bg-rose-50/40 shadow-xs' : 'border-stone-200/50'
                          }`}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Confirmation Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-extrabold text-xs tracking-widest uppercase rounded-full transition-all active:scale-95"
                >
                  {language === 'en' ? 'Back Safely' : language === 'ja' ? '安全に戻る' : language === 'ko' ? '돌아가기' : '安全返回'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 bg-gradient-to-r from-[#E63946] to-[#BD1E51] hover:shadow-md text-white font-black text-xs tracking-widest uppercase rounded-full transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  <span>{language === 'en' ? 'Unlock Salon ✦' : language === 'ja' ? 'サロンを解鎖 ✦' : language === 'ko' ? '살롱 활성화 ✦' : '解鎖沙龍 ✦'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
