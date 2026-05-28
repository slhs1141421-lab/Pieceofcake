import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, Trash2, Gift, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '../../lib/ShopContext';

const BOX_STYLES = [
  {
    id: 'default_white',
    name: '預設簡約蛋糕盒',
    price: 0,
    image: '/src/assets/images/white_cake_box_1779627429479.png',
    description: '基本純皙極簡蛋糕提盒（附透明頂窗）。未選配加購此區特色提箱時，所有甜品皆以此款式免費附贈隨貨提裝出貨。',
    accent: 'text-stone-400',
    isDefaultFlag: true
  },
  {
    id: 'pink',
    name: '自選禮盒 粉櫻款',
    price: 150,
    image: '/src/assets/images/empty_pink_box_1779525088559.png',
    description: '空裝無內容物的粉櫻格子與條紋提盒。純淨空盒空間，等待裝入您的自選療癒驚喜！',
    accent: 'text-berry'
  },
  {
    id: 'white',
    name: '自選禮盒 大理石款',
    price: 150,
    image: '/src/assets/images/marble_gift_box_1779524235503.png',
    description: '高雅白大理石紋盒身配上深邃海軍藍頂蓋，佐以耀眼金色緞帶蝴蝶結，優雅精緻。',
    accent: 'text-neutral-500'
  },
  {
    id: 'transparent',
    name: '自選禮盒 壓克力款',
    price: 250,
    image: '/src/assets/images/acrylic_gift_box_1779348138109.png',
    description: '高品質全透明展示盒，搭配極質白色絲帶，刻印金絲「LOVE IS ETERNAL」傳達永恆情感。',
    accent: 'text-berry'
  },
  {
    id: 'heart_marble',
    name: '自選禮盒 愛心大理石手提款',
    price: 180,
    image: '/src/assets/images/heart_marble_box_1779626923640.png',
    description: '經典愛心鏤空側窗，頂部搭配精巧的波浪手提把，飾以優雅黑白大理石紋，將驚喜與溫度手提攜行。',
    accent: 'text-stone-700'
  },
  {
    id: 'pink_transparent_ribbon',
    name: '自選禮盒 赫本雙層透明款',
    price: 260,
    image: '/src/assets/images/pink_clear_ribbon_box_1779627063246.png',
    description: '夢幻粉櫻色底座與頂蓋，搭配高品質雙層全透明展示圍邊，並由精美白色「Just for you」緞帶浪漫手作裝點。',
    accent: 'text-berry'
  }
];

const BOX_LOCALIZATIONS: Record<string, Record<string, { name: string; description: string }>> = {
  zh: {
    default_white: {
      name: '預設簡約蛋糕盒',
      description: '基本純皙極簡蛋糕提盒（附透明頂窗）。未選配加購此區特色提箱時，所有甜品皆以此款式免費附贈隨貨提裝出貨。'
    },
    pink: {
      name: '自選禮盒 粉櫻款',
      description: '空裝無內容物的粉櫻格子與條紋提盒。純淨空盒空間，等待裝入您的自選療癒驚喜！'
    },
    white: {
      name: '自選禮盒 大理石款',
      description: '高雅白大理石紋盒身配上深邃海軍藍頂蓋，佐以耀眼金色緞帶蝴蝶結，優雅精緻。'
    },
    transparent: {
      name: '自選禮盒 壓克力款',
      description: '高品質全透明展示盒，搭配極質白色絲帶，刻印金絲「LOVE IS ETERNAL」傳達永恆情感。'
    },
    heart_marble: {
      name: '自選禮盒 愛心大理石手提款',
      description: '經典愛心鏤空側窗，頂部搭配精巧的波浪手提把，飾以優雅黑白大理石紋，將驚喜與溫度手提攜行。'
    },
    pink_transparent_ribbon: {
      name: '自選禮盒 赫本雙層透明款',
      description: '夢幻粉櫻色底座與頂蓋，搭配高品質雙層全透明展示圍邊，並由精美白色「Just for you」緞帶浪漫手作裝點。'
    }
  },
  en: {
    default_white: {
      name: 'Default Minimalist Box',
      description: 'Basic pure white minimalist cake box with transparent window. Provided for free for all sweets if no luxury box upgrade is selected.'
    },
    pink: {
      name: 'Bespoke Cherry Blossom Box',
      description: 'Dreamy pink lattices and stripes box. Pure empty space waiting for your selected sweet surprise!'
    },
    white: {
      name: 'Bespoke Marble Elegance Box',
      description: 'Elegant white marble pattern base with deep navy topper and custom golden ribbon.'
    },
    transparent: {
      name: 'Bespoke Clear Acrylic Box',
      description: 'High-quality clear transparent showbox with thick white silk ribbon, featuring gold "LOVE IS ETERNAL" text.'
    },
    heart_marble: {
      name: 'Bespoke Heart-Cut Out Marble Bag',
      description: 'Classic heart-shape hollow window with unique wavy handle design, styled in bold classy black-and-white marble.'
    },
    pink_transparent_ribbon: {
      name: 'Bespoke Hepburn Double Transparent Box',
      description: 'Magical pink base and top cover with dual-layer fully transparent display wall, wrapped beautifully in white "Just for you" ribbon.'
    }
  },
  ja: {
    default_white: {
      name: 'デフォルトシンプルボックス',
      description: 'ベーシックスノーホワイトのクリア窓付きボックス。ケーキアップグレードが未選定な場合、すべての商品に無料でお付けします。'
    },
    pink: {
      name: '特製ピンクグリッドボックス',
      description: '桜色の愛らしい格子模様ギフトボックス。あなただけの甘いサプライズを詰め込んで。'
    },
    white: {
      name: '特製大理石柄レガシーボックス',
      description: '洗練されたホワイトマーブルに濃紺のフタ、そしてまばゆいゴールドリボンが添えられたエレガントギフトボックス。'
    },
    transparent: {
      name: '特製クリアアクリルディスプレイボックス',
      description: '高品質なアクリルフル透明クリアケース。ホワイトのシルクリボンに金色で「LOVE IS ETERNAL」と刻まれています。'
    },
    heart_marble: {
      name: '特製ハート型くり抜き大理石バッグ',
      description: 'クラシックなハートウィンドウが施され、上部にはフリル風ウェーブハンドルを合わせたお洒落なマーブル柄ボックス。'
    },
    pink_transparent_ribbon: {
      name: '特製ヘップバーン二層クリアロマンボックス',
      description: '華やかなピンクのベースとトップカバーに、二重の完全透明のアクリル窓。白色の「Just for you」リボンで贅沢に装飾。'
    }
  },
  ko: {
    default_white: {
      name: '기본 화이트 상자',
      description: '기본형 심플 순백색 케이크 슬라이드 상자 (투명 덮개 포함). 어떤 기프트 제품도 안심하고 안전하게 포장해 드리는 일반상자입니다.'
    },
    pink: {
      name: '벚꽃 격자 로맨스 기프트 박스',
      description: '화사하고 부드러운 분홍 체크 무늬와 가로수 스트라이프 장식 박스. 사랑스런 간식을 채우는 비어 있는 마음의 방.'
    },
    white: {
      name: '고대 이태리 대리석 럭셔리 박스',
      description: '명품스러운 화이트 대리석 텍스처 바디에 딥 마린 블루 상단 커버와 눈부신 골드 리본 리본 타이.'
    },
    transparent: {
      name: '풀 뷰 하이글로시 아크릴 박스',
      description: '최상급 고투명 아크릴 뷰박스에 새하얀 오간자 시폰 리본과 "LOVE IS ETERNAL" 금박 시그니처 폰트.'
    },
    heart_marble: {
      name: '하트 펀칭 대리석 손잡이 박스',
      description: '옆면 하트 모양 오픈 프레임 너머의 실루엣이 감각적이며, 웨이브 탑 라인을 살려 정성스레 수제 패킹한 고급 백.'
    },
    pink_transparent_ribbon: {
      name: '헵번 더블 레이어 투명 핑크 박스',
      description: '러블리 핑크 컬러 헤드의 이중 투명 둘레 장식. 프레스티지 "Just for you" 화이트 리본으로 로맨틱하게 패징.'
    }
  }
};

const GIFT_LOCALIZATIONS: Record<string, any> = {
  zh: {
    badge_customization: "Customization",
    title_1: "自選",
    title_2: "外盒配對.",
    desc_subtitle: "挑選特色提盒與您購物車中的甜點，一秒配對調配！為您的心意贈禮挑裝亮眼禮服！",
    btn_guide: "什麼是「指定配對」？點此開啟互動對應導引",
    empty_notice_cake_title: "別忘了先挑選美味蛋糕喔！",
    empty_notice_cake_desc: "自選特色外盒無法單獨出售，包裝主廚需要根據您的指定，將特定蛋糕細緻裝配入精裝盒中。請先將蛋糕加入購物車吧！",
    btn_go_shop: "前往選購蛋糕品項 🍰",
    prompt_step_1: "點擊下方精緻包裝盒指定對應：",
    box_badge_free: "✦ 免費隨附",
    box_badge_assigned: "✓ 已指派 {count} 位",
    box_hover_manage: "管理包裝配置 🔄",
    box_hover_select: "選擇此款外盒 ＋",
    info_assigned_cakes: "🗳️ 已對應裝入蛋糕：",
    info_reassign: "重新配置置入蛋糕 🔄",
    info_choose_pkg: "選購此款外盒 ＋",
    list_header: "禮盒指定配對明細 (Gifting Composition)",
    list_subheader: "更改禮盒、移除配對，自由調整出貨配置",
    list_composition: "共配對：",
    list_composition_unit: "個外盒",
    list_empty: "尚未有任何專屬配對明細",
    list_empty_desc: "上方點選特色禮盒，即可為購物車中的指定蛋糕品項配對裝箱。尚未指定配對的蛋糕出貨時將一律使用「免費隨附提盒」安全提行偶。",
    list_price_label: "外盒加購總金額 (Luxury Box Total):",
    list_confirm_btn: "確認選購配對完成 ➜",
    modal_title_pack: "指定打包：請挑選對應蛋糕",
    modal_desc_pack: "可勾選多款目前購物車蛋糕出貨裝入此「{box_name}」精裝外盒中。（每位蛋糕限裝一個奢華禮盒）",
    modal_btn_confirm: "確認選購此配置 ✓",
    modal_empty_notice: "💡 目前偵測到您的購物車空空如也，請先挑選蛋糕加入購物車才能為其配對精裝禮盒。",
    modal_cake_disabled: "🎁 已配對給：「{box_name}」",
    modal_cake_selected: "✓ 已選取裝入此包裝中",
    modal_cake_checked: "已選中對應 ✓",
    modal_cake_available: "可選配 ＋",
    modal_cake_assigned_label: "已為此款外盒勾選：",
    modal_cake_assigned_unit: "款",
    modal_empty_dismiss: "知道囉，先留在這",
    paired_success_title: "商品配對包裝完成！",
    paired_success_desc: "已成功綁定：將 {cake} 包裝放入「{box}」中！",
    paired_success_note: "✓ 明細已同步更新列於專屬欄底部唷！",
    addon_title: "✨ 加購主廚嚴選浪漫配件 (Accessories Upgrading)",
    addon_subtitle: "細微而耀眼的浪漫配件，伴襯手作蛋糕的幸福滋味，加溫您的心願瞬間！",
    addon_accessory_lantern: "✨ LED 溫馨燈飾小物 (自選加購)",
    addon_accessory_flower: "🌹 純手作乾燥精緻花枝 (自選加購)",
    addon_accessory_candle: "🕯️ 瑞典香氛複方精巧香燭 (自選加購)",
    accessory_lantern_name: '✨ LED 溫馨燈飾小物 (自選加購)',
    accessory_flower_name: '🌹 純手作乾燥精緻花枝 (自選加購)',
    accessory_candle_name: '🕯️ 瑞典香氛複方精巧香燭 (自選加購)',
    addon_skip_btn: "不需要配件，直接加入購物車 ➜",
    addon_confirm_btn: "加購以上精緻配件並加入 ➜",
    dropdown_change_pkg: "更改包裝為：",
    dropdown_free_随附: "隨箱隨附",
    guide_title_1: "🎁 什麼是自選禮盒的「指定配對」？",
    guide_title_2: "🌸 精緻自選禮盒（指定配對）",
    guide_p1: "我們秉持純淨的手作精神：<strong>不論您的購物車裡買了幾位蛋糕，皆可自由加購特色禮盒</strong>。",
    guide_p2: "未加購特別禮盒時，所有蛋糕接在出貨時免費附贈 <strong>【預設簡約提包白盒】 提著走</strong>。簡約且體面，適合自用居家享用。",
    guide_p3: "加購精裝透明赫本、奢華大理石等禮盒款式，<strong>您需指派是裝哪一款蛋糕</strong>。出貨時，主廚便會將該款蛋糕裝入閃亮的高貴新衣中，特別包裝！",
    guide_step_1_title: "🛍️ 將喜愛的蛋糕先「加入購物車」",
    guide_step_1_desc: "由於禮盒不是空盒子出售，包裝主廚需要知道要將哪個產品裝進去，因此請先將蛋糕點擊「加入購物籃」喔！",
    guide_step_2_title: "🎁 來禮盒區勾選您喜愛的外箱款式",
    guide_step_2_desc: "在自選禮盒區，挑選大理石款、赫本透明款或愛心款，點選後會彈出配對視窗，勾選想要置入此包裝的指定蛋糕品項。",
    guide_step_3_title: "🛒 加入購物車後，於清單確認分配",
    guide_step_3_desc: "加入後，點開購物車會清晰顯示：「🎁 裝填指定蛋糕：赫本復古緞帶戚風」，一目了然，隨時可以預覽蛋糕 and 禮包的正確配對！",
    guide_choose_cake: "1. 選擇加購的蛋糕",
    guide_choose_box: "2. 選擇升級的外盒",
    guide_try_btn: "🔥 請親手試點看看！點選【左側一款蛋糕】➔ 再點選【右側一款包裝】，感受完美的配對機制！",
    guide_alert_cake: "💡 請先在左側選取一款您想打包的蛋糕品項唷！",
    guide_pairing_desc: "裝填關係確立：出貨時，蛋糕【<strong>{cake}</strong>】將會被細緻打包入高級【<strong>{box}</strong>】中，並由緞帶精巧繫上！",
    guide_done_desc: "對應方式就是這麼簡單！快去為您的自選商品加上客製外包裝吧！",
    guide_understand_btn: "我理解了，關閉說明 ✕",
    guide_step1_title: "🎁 什麼是自選禮盒的「指定配對」？",
    guide_step1_subtitle: "為您的甜點加購專屬外盒與氛圍包裝的心意指南",
    guide_step2_title: "🔄 只需要三步：超直覺配對流程",
    guide_step2_subtitle: "輕鬆看懂出貨包裝分法，完美客製您的送禮驚喜",
    guide_step3_title: "🍰 親手試試：配對模擬器實測",
    guide_step3_subtitle: "點擊下方蛋糕與禮盒，一秒預覽配對配置！",
    demo_cakes: [
      { id: "cake1", name: "赫本復古緞帶戚風", emo: "🍰", desc: "店內人氣 MVP 蛋糕" },
      { id: "cake2", name: "靜岡雙層綠意抹茶蛋糕", emo: "🍵", desc: "濃苦香醇的日本茶韻" },
      { id: "cake3", name: "黑酷怪獸奧利奧巧克力蛋糕", emo: "🍫", desc: "巧克力控的極致狂歡" }
    ],
    demo_boxes: [
      { id: "box1", name: "自選禮盒 赫本雙層透明款", emo: "🎀", desc: "夢幻粉色全透明展示款" },
      { id: "box2", name: "自選禮盒 愛心大理石手提款", emo: "💖", desc: "愛心鏤空大理石紋" }
    ],
    addon_badge: "🎁 Heartwarming Upgrades",
    addon_modal_title: "要加購氛圍小物讓儀式感加倍嗎？",
    addon_lantern_title: "溫馨 LED 暖光氛圍燈飾",
    addon_lantern_desc: "微黃慢閃 LED 銅線柔光燈飾 ({price}/個)",
    addon_flower_title: "手作玫瑰芳菲乾燥花枝",
    addon_flower_desc: "主廚親自精配乾燥花束搭配裝箱 ({price}/支)",
    addon_candle_title: "瑞典香氛複方精緻香燭",
    addon_candle_desc: "大豆複方無煙低熱舒緩慢享香燭 ({price}/個)",
    addon_box_total: "✨ 心意禮盒預裝總額:",
    addon_acc_total: "💡 加購配件總額:",
    addon_grand_total: "🔥 總計加購總金額:",
    addon_decline_btn: "💔 忍痛拒絕，直接精裝打包廚房出貨",
    addon_accept_btn: "🛍️ 保留加購，全部加入購物袋！"
  },
  en: {
    badge_customization: "Customization",
    title_1: "Box upgrade &",
    title_2: "Gifting Matches.",
    desc_subtitle: "Pick a premium boutique box and map it to your cart's sweets in one click! Present your loved ones with perfect boxes!",
    btn_guide: "What is 'Gifting Match'? Click here to open the Interactive Tour",
    empty_notice_cake_title: "Don't forget to choose a sweet cake first!",
    empty_notice_cake_desc: "Since standalone gift boxes are not sold empty, our packing pastry chef needs to know which cake item to lock inside your chosen boutique box. Please add cakes to your basket first!",
    btn_go_shop: "Browse Deluxe Cakes 🍰",
    prompt_step_1: "Select a custom packaging box below to match:",
    box_badge_free: "✦ Free Included",
    box_badge_assigned: "✓ Assigned to {count} item(s)",
    box_hover_manage: "Manage pairing 🔄",
    box_hover_select: "Choose Box Style ＋",
    info_assigned_cakes: "🗳️ Mapped Cake Items:",
    info_reassign: "Update configuration 🔄",
    info_choose_pkg: "Select this style ＋",
    list_header: "Gifting Composition Specifications",
    list_subheader: "Customize boxes and remove matches to arrange your ideal delivery",
    list_composition: "Total Assigned: ",
    list_composition_unit: "Box(es)",
    list_empty: "No custom pairings established yet",
    list_empty_desc: "Tap a luxurious box style above to match elements in your cart. Unassigned cakes will ship safely in our beautiful 'Default free white box'.",
    list_price_label: "Boutique Packaging Total Price:",
    list_confirm_btn: "Confirm matches and checkout ➜",
    modal_title_pack: "Assign Wrapping: Pick corresponding cake",
    modal_desc_pack: "You may tick multiple cakes from your current shopping cart to be packed inside this '{box_name}' box. (Each cake can only be paired with one boutique box style)",
    modal_btn_confirm: "Confirm this configuration ✓",
    modal_empty_notice: "💡 Your shopping cart is empty! Choose delicious cakes first to map custom box styles.",
    modal_cake_disabled: "🎁 Paired with: '{box_name}'",
    modal_cake_selected: "✓ Mapped to this envelope",
    modal_cake_checked: "Checked ✓",
    modal_cake_available: "Available ＋",
    modal_cake_assigned_label: "Checked for this style: ",
    modal_cake_assigned_unit: "item(s)",
    modal_empty_dismiss: "Not now, stay here",
    paired_success_title: "Product Mapped Successfully!",
    paired_success_desc: "Successfully locked: will pack '{cake}' inside custom '{box}'!",
    paired_success_note: "✓ Specification list updated at the bottom of the section!",
    addon_title: "✨ Upgrade with Chef's Signature Romance Accessories",
    addon_subtitle: "Sparkling small creations to accompany delicate handcrafted cakes and warm your magical moments!",
    addon_accessory_lantern: "✨ Fairy LED Warm Lighting (Optional Add-on)",
    addon_accessory_flower: "🌹 Handmade Premium Preserved Flower Sprig (Optional Add-on)",
    addon_accessory_candle: "🕯️ Swedish Scented Botanical Mini Candle (Optional Add-on)",
    accessory_lantern_name: '✨ Fairy LED Warm Lighting (Add-on)',
    accessory_flower_name: '🌹 Premium Preserved Flower Sprig (Add-on)',
    accessory_candle_name: '🕯️ Swedish Scented Botanical Candle (Add-on)',
    addon_skip_btn: "No accessories, proceed to checkout ➜",
    addon_confirm_btn: "Add premium accessories & merge ➜",
    dropdown_change_pkg: "Change package to:",
    dropdown_free_随附: "Free default",
    guide_title_1: "🎁 What is 'Gifting Match'?",
    guide_title_2: "🌸 Handcrafted Custom Gift Boxes",
    guide_p1: "We believe in authentic master craftsmanship: <strong>No matter how many cakes are in your cart, you can freely upgrade to custom box styles</strong>.",
    guide_p2: "Without premium box selection, all cakes ship in our beautiful <strong>【Default Minimalist Box】</strong>. Clean and stylish, perfect for cozy self-enjoyment.",
    guide_p3: "Upgrading to Pink, Clear Hepburn, or Royal Marble boxes <strong>requires designating which cake goes inside</strong>. We wrap that specific cake inside your glamorous upgrade on shipping day!",
    guide_step_1_title: "🛍️ First, 'Add to Cart' your favored cakes",
    guide_step_1_desc: "Because custom boxes do not sell empty, our packing pastry chef needs to know what goes inside. Drag and click cakes to your cart first!",
    guide_step_2_title: "🎁 Come choose your packaging style",
    guide_step_2_desc: "In this section, select Pink, Marble, or Clear Acrylic styles. In the pop-up modal, select the corresponding cakes you want to pack inside.",
    guide_step_3_title: "🛒 Review matches in bottom dashboard",
    guide_step_3_desc: "Once selected, you can check matching details like '🎁 Packed item: Hepburn Ribbon Chiffon' at a glance. Update types anytime!",
    guide_choose_cake: "1. Select Cake Item",
    guide_choose_box: "2. Upgrade Box Design",
    guide_try_btn: "🔥 Try it yourself! Select a cake on the left ➔ click a box design on the right to see the magic pairing response!",
    guide_alert_cake: "💡 Please select a cake item from the left panel first!",
    guide_pairing_desc: "Mapping Established: On package assembly day, '{cake}' will be placed elegantly inside your '{box}' and fastened with decorative ribbons!",
    guide_done_desc: "It serves up as simple as that! Go upgrade your custom package now!",
    guide_understand_btn: "I see, close explanation ✕",
    guide_step1_title: "🎁 What is 'Gifting Match'?",
    guide_step1_subtitle: "A guide to adding exclusive boxes and atmospheric packaging to your dessert",
    guide_step2_title: "🔄 Just Three Steps: Intuitive Pairing Process",
    guide_step2_subtitle: "Understand delivery packing easily to customize your gifting surprise",
    guide_step3_title: "🍰 Try It Out: Pairing Sandbox Simulator",
    guide_step3_subtitle: "Click a cake and box below to preview matching configuration instantly!",
    demo_cakes: [
      { id: "cake1", name: "Hepburn Ribbon Chiffon", emo: "🍰", desc: "Top Bestselling MVP Cake" },
      { id: "cake2", name: "Shizuoka Double Matcha", emo: "🍵", desc: "Dark fragrant Japanese tea layer" },
      { id: "cake3", name: "Black Oreo Chocolate Cake", emo: "🍫", desc: "The ultimate peak for cocoa lovers" }
    ],
    demo_boxes: [
      { id: "box1", name: "Deluxe Clear Acrylic Box", emo: "🎀", desc: "Pink dreamy transparent showcase" },
      { id: "box2", name: "Deluxe Heart Marble Box", emo: "💖", desc: "Heart-slit classy noir marble" }
    ],
    addon_badge: "🎁 Heartwarming Upgrades",
    addon_modal_title: "Add some magical accessories to double the vibes?",
    addon_lantern_title: "Warm Glow LED Fairy Lights",
    addon_lantern_desc: "Slow-flashing warm yellow LED copper wire lights ({price}/unit)",
    addon_flower_title: "Handmade Preserved Rose Bouquet",
    addon_flower_desc: "Scented dried flowers selected and packed by chef ({price}/pcs)",
    addon_candle_title: "Swedish Botanical Scented Candle",
    addon_candle_desc: "Soy wax blend, smokeless & low-heat aromatherapy ({price}/unit)",
    addon_box_total: "✨ Custom Box Total:",
    addon_acc_total: "💡 Accessories Total:",
    addon_grand_total: "🔥 Grand Total Amount:",
    addon_decline_btn: "💔 Decline, pack and ship without accessories",
    addon_accept_btn: "🛍️ Keep add-ons & add all to cart!"
  },
  ja: {
    badge_customization: "Customization",
    title_1: "ギフト封入",
    title_2: "個別ボックス対応.",
    desc_subtitle: "ショッピングカート内のスイーツとプレミアムボックスを1秒でマッチ！ギフトへ輝くドレスを！",
    btn_guide: "「指定包装」とは？ここをクリックしてインタラクティブガイドを開く",
    empty_notice_cake_title: "ケーキのご注文をお忘なく！",
    empty_notice_cake_desc: "自選カラーボックスは単一空箱では販売しておりません。お選びいただいたボックスにパティシエがケーキをセットします。まずはケーキをご注文ください！",
    btn_go_shop: "ケーキを選択しにいく 🍰",
    prompt_step_1: "以下のカラーボックスからご希望のタイプをマッチしてください：",
    box_badge_free: "✦ 無料同梱",
    box_badge_assigned: "✓ 対応件数 {count} 件",
    box_hover_manage: "配置を変更する 🔄",
    box_hover_select: "このボックスタイプを選ぶ ＋",
    info_assigned_cakes: "🗳️ 指定されたケーキ：",
    info_reassign: "ボックスへの割り当て直し 🔄",
    info_choose_pkg: "このボックスを追加 ＋",
    list_header: "包装対応仕様・細目明細 (Gifting Composition)",
    list_subheader: "ボックス個数、組み合わせを自由に変更、削除可能",
    list_composition: "合計対応：",
    list_composition_unit: "個ボックス",
    list_empty: "対応中の明細はありません",
    list_empty_desc: "上記のラグジュアリーボックスを選び、カート内ケーキを指定選択してください。割り当てのないケーキは、無料のホワイトレギュラーボックスでお届けします。",
    list_price_label: "カラーボックス合計加算：",
    list_confirm_btn: "この指定内容で確定 ➜",
    modal_title_pack: "ボックス封入設定：対応するケーキを選択",
    modal_desc_pack: "カート内のケーキを複数個こちらの「{box_name}」に同時に割り当てることも可能です。（重複指定はできません）",
    modal_btn_confirm: "この組み合わせを適用 ✓",
    modal_empty_notice: "💡 カートが空欄となっております！ケーキを入れたあとで再度こちらをお選びください。",
    modal_cake_disabled: "🎁 すでに「{box_name}」に割り当てられています",
    modal_cake_selected: "✓ この封入先に指定済み",
    modal_cake_checked: "選択中 ✓",
    modal_cake_available: "選択可能 ＋",
    modal_cake_assigned_label: "このボックスの現在指定：",
    modal_cake_assigned_unit: "件",
    modal_empty_dismiss: "閉じる",
    paired_success_title: "商品のマッチングが完了！",
    paired_success_desc: "対応完了：ケーキ「{cake}」を高級ボックス「{box}」にお包みします！",
    paired_success_note: "✓ 画面下部の仕様リストに動的反映されました！",
    addon_title: "✨ シェフ特選アロマキャンドル＆アクセサリーをプラス (Accessories)",
    addon_subtitle: "まばゆい演出小物でハンドメイドケーキの味わいを一層幸福な時間に！",
    addon_accessory_lantern: "✨ フェアリーLEDウォームライト (追加加算)",
    addon_accessory_flower: "🌹 手作りプリザーブドフラワースプリグ (追加加算)",
    addon_accessory_candle: "🕯️ 北欧エッセンシャルアロマキャンドル (追加加算)",
    accessory_lantern_name: '✨ フェアリーLEDウォームライト (追加)',
    accessory_flower_name: '🌹 手作りプリザーブドフラワー (追加)',
    accessory_candle_name: '🕯️ 北欧アロマキャンドル (追加)',
    addon_skip_btn: "アクセサリー不要、そのままカートへ ➜",
    addon_confirm_btn: "特製小物を追加してバスケットへ ➜",
    dropdown_change_pkg: "パッケージを変更：",
    dropdown_free_随附: "無料同梱ボックス",
    guide_title_1: "🎁 自選ギフトの「指定対応」とは？",
    guide_title_2: "🌸 カラーボックス個別マッチング説明",
    guide_p1: "【Piece of Cakeの職人魂】：<strong>カート内のケーキ個数に関わらず、お好きなだけスペシャルボックスをアップグレードできます</strong>。",
    guide_p2: "特別オプションを指定されないケーキはすべて、無料の <strong>【ホワイトレギュラーボックス】</strong> に入れてお送りします。シンプルかつ安心のボックスです。",
    guide_p3: "アクリル透明リボンボックスや大理石トレイをアップグレードされる場合、<strong>「どのケーキを格納するか」の組み合わせをご指定ください</strong>。パティシエが指定どおり綺麗に着飾って梱包します！",
    guide_step_1_title: "🛍️ まずは好きなケーキを「カートに入れましょう」",
    guide_step_1_desc: "中身のケーキ無しではボックスが発送できないため、お好みのケーキを先にカートに追加しておいてくださいね。",
    guide_step_2_title: "🎁 ここで好みの包装タイプをクリック",
    guide_step_2_desc: "大理石、クリアアクリルなどお好きなタイプをクリック。開いた画面で、入れたいケーキをリストからチェックします。",
    guide_step_3_title: "🛒 下部リストまたはカート内で組み合わせを確認",
    guide_step_3_desc: "マッチングを設定すると、明細に「🎁 封入先ボックス：クリアアクリル」と自動表記され、いつでも変更や削除が可能です！",
    guide_choose_cake: "1. ケーキを選択しましょう",
    guide_choose_box: "2. ボックスを追加しましょう",
    guide_try_btn: "🔥 是非お試しください！【左のケーキ】を選んでから【右のボックス】をクリックしてマッチ構造をご体験ください！",
    guide_alert_cake: "💡 左側パネルから目的のケーキを先にクリックしてください！",
    guide_pairing_desc: "対応関係の設定：お届け時、ケーキ「{cake}」がプレミアムボックス「{box}」に美しく封入、パッキングされます！",
    guide_done_desc: "とっても簡単です！あなたの自慢のケーキにラグジュアリーな衣装を着せてあげましょう！",
    guide_understand_btn: "理解しました、閉じる ✕",
    guide_step1_title: "🎁 自選ギフトの「指定対応」とは？",
    guide_step1_subtitle: "スイーツに専用ボックスと演出用パッケージを追加するためのガイド",
    guide_step2_title: "🔄 簡単3ステップ：直感的なマッチング手順",
    guide_step2_subtitle: "梱包の割り当てを簡単に理解して、完璧なギフトの驚きを演出",
    guide_step3_title: "🍰 実際に試す：マッチングシミュレータ",
    guide_step3_subtitle: "以下のケーキとボックスをクリックして、瞬時にマッチングをプレビュー！",
    demo_cakes: [
      { id: "cake1", name: "ヘップバーンシフォンケーキ", emo: "🍰", desc: "店内の人気 MVP ケーキ" },
      { id: "cake2", name: "静岡ダブル抹茶レイヤード", emo: "🍵", desc: "豊かな日本茶のビターテイスト" },
      { id: "cake3", name: "ダークオレオクッキーチョコマニア", emo: "🍫", desc: "カカオを極限まで愛する方の選択" }
    ],
    demo_boxes: [
      { id: "box1", name: "アクリルダブルクリアケース", emo: "🎀", desc: "ピンクのドリーミーシースルー透明窓" },
      { id: "box2", name: "ハートくり抜きマーブルバッグ", emo: "💖", desc: "大理石柄のハートカッティングバッグ" }
    ],
    addon_badge: "🎁 Heartwarming Upgrades",
    addon_modal_title: "お祝いの雰囲気を高める小物を追加しますか？",
    addon_lantern_title: "温かみのある LED フェアリーライト",
    addon_lantern_desc: "ゆっくり点滅する温かな黄色のLED銅線ライト ({price}/個)",
    addon_flower_title: "手作りプリザーブドローズブーケ",
    addon_flower_desc: "シェフが厳選したドライフラワーの詰め合わせ ({price}/本)",
    addon_candle_title: "スウェーデン風アロマセラピーキャンドル",
    addon_candle_desc: "大豆ワックスブレンド、無煙・低熱のアロマキャンドル ({price}/個)",
    addon_box_total: "✨ ギフトボックス小計:",
    addon_acc_total: "💡 アクセサリー小計:",
    addon_grand_total: "🔥 合計追加金額:",
    addon_decline_btn: "💔 追加せず、パッケージのみで発送する",
    addon_accept_btn: "🛍️ アクセサリーをキープしてカートに入れる！"
  },
  ko: {
    badge_customization: "Customization",
    title_1: "박스 지정",
    title_2: "기프트 패키지 매칭.",
    desc_subtitle: "장바구니 속 정성껏 만든 케이크와 럭셔리 포장 박스의 궁합 매칭! 선물이 돋보이도록 멋진 새 옷을 입혀주세요!",
    btn_guide: "「포장 매칭」 가이드가 필요하신가요? 클릭하여 투어 열기",
    empty_notice_cake_title: "장바구니에 케이크를 먼저 추가해 보세요!",
    empty_notice_cake_desc: "독특한 프레스티지 포장 상자는 빈 박스만 개별 판매되지 않습니다. 파티시에 셰프가 여러분이 선택하신 상자에 특정 케이크를 아름답게 담아 마감해 드립니다.",
    btn_go_shop: "케이크 쇼핑 섹션으로 가기 🍰",
    prompt_step_1: "매칭을 해줄 수려한 프리미엄 수제 박스를 한 가지 선택해 보세요:",
    box_badge_free: "✦ 무료 기본제공",
    box_badge_assigned: "✓ 매칭 완료 {count}건",
    box_hover_manage: "매칭 조합 변경 🔄",
    box_hover_select: "이 박스 스타일 적용하기 ＋",
    info_assigned_cakes: "🗳️ 담기도록 지정한 케이크:",
    info_reassign: "포장 구성 재생성 🔄",
    info_choose_pkg: "이 옵션 박스 추가 ＋",
    list_header: "케이크 포장 기프트 박스 배치 내역 명세서",
    list_subheader: "박스 종류 교체, 조합 제거 등 섬세하고 세공성 있는 배열 디자인 변경",
    list_composition: "총 매칭 내역: ",
    list_composition_unit: "건 박스",
    list_empty: "현재 포장 설정 조합이 비어 있습니다",
    list_empty_desc: "위에서 화사한 박스를 구한 뒤, 장바구니 속 소중한 케이크를 조합 지정해 보세요. 지정하지 않은 보석 같은 케이크는 '기본 화이트 상자'에 품위 있게 담아 세팅됩니다.",
    list_price_label: "옵션 포장 박스 총 추가액:",
    list_confirm_btn: "이 기프트 조합으로 장바구니 담기 ➜",
    modal_title_pack: "기프트 백 포장 지정: 해당 케이크 선택",
    modal_desc_pack: "선택하신 '{box_name}' 기프트 박스에 들어갈 전속 케이크 상품을 장바구니 리스트 중에서 한 개 또는 여러 개 매커니컬 체크해 주세요.",
    modal_btn_confirm: "이 설정 매치 확인 ✓",
    modal_empty_notice: "💡 장바구니가 비어 있습니다! 신선한 롤케이크를 먼저 추가한 후 패키지 옵션을 구상해 주세요.",
    modal_cake_disabled: "🎁 이미 「{box_name}」에 포장 할당되었습니다",
    modal_cake_selected: "✓ 이 배치의 포장 상품으로 선택됨",
    modal_cake_checked: "체크됨 ✓",
    modal_cake_available: "선택 가능 ＋",
    modal_cake_assigned_label: "이 박스 사양에 선택된 수:",
    modal_cake_assigned_unit: "건",
    modal_empty_dismiss: "취소하고 돌아가기",
    paired_success_title: "정교한 조합 매칭 완성!",
    paired_success_desc: "조합 성공: 주문하신 케이크 '{cake}'(이)가 보석 같은 수선화 포장상자 '{box}'에 단장 포장 완료!",
    paired_success_note: "✓ 화면 하단 목록 명세에 동기적으로 사양이 리스팅 되었습니다!",
    addon_title: "✨ 셰프가 엄선한 케이크 메이트 로맨스 소품 세트 (Accessories)",
    addon_subtitle: "아름다운 촛불과 오색 조명으로 더욱 빛나는 케이크 기프트 아로마 모먼트를 선물하세요!",
    addon_accessory_lantern: "✨ 에센셜 LED 촛불 테코 조명 (선택 가치 가산)",
    addon_accessory_flower: "🌹 천연 드라이 보태니컬 프리저브드 꽃잎 (선택 가치 가산)",
    addon_accessory_candle: "🕯️ 북유럽 천연 에센셜 오일 미니 향초 (선택 가치 가산)",
    accessory_lantern_name: '✨ LED 데코 온열 안개의 불그스름 조명 (가산)',
    accessory_flower_name: '🌹 보태니컬 시들지 않는 수제 드라이 플라워 (가산)',
    accessory_candle_name: '🕯️ 아로마 조향 수제 소형 천연 양초 (가산)',
    addon_skip_btn: "옵션 소품 제외, 포장 상자만 담기 ➜",
    addon_confirm_btn: "선택한 보석 소품 세트도 합쳐서 담기 ➜",
    dropdown_change_pkg: "박스 종류 변경:",
    dropdown_free_随附: "수하물 기본 포장",
    guide_title_1: "🎁 커스텀 패키지 「포장 지정」이 무엇인가요?",
    guide_title_2: "🌸 보석 기프트 박스 개별 매체 조합 방식",
    guide_p1: "【피스오브케이크의 가치주의】: <strong>장바구니에 담으신 수제 롤케이크나 케이크 종류 개수에 관계없이 특별한 박스를 폭넓게 개별 지정하여 매치할 수 있습니다</strong>.",
    guide_p2: "해당 옵션 박스를 지정하시지 않은 실속형 케이크 상품은, 출고 시 <strong>【기본 화이트 상자】</strong>에 안전하고 단정히 패키징 되어 전해지므로 안심하세요.",
    guide_p3: "아크릴 시스루, 럭셔리 대리석 무늬 박스 업그레이드를 적용할 때, <strong>'어떤 맛의 케이크'를 패킹할지 전담 지정해 줍니다</strong>. 출고 당일 상자에 수작업 리본 벨트로 마감해 드립니다!",
    guide_step_1_title: "🛍️ 가장 먼저 원하시는 맛의 케이크를 「장바구니 담기」",
    guide_step_1_desc: "중심이 되는 케이크 내용물이 있어야 상자를 전용으로 완성할 수 있으므로, 케이크를 먼저 장바구니에 보관해 주세요.",
    guide_step_2_title: "🎁 이 구역에서 마음에 드는 박스 스타일 고르기",
    guide_step_2_desc: "대리석, 투명 아크릴 등 고급 포장을 탭하시면 팝업창 명세가 뜹니다. 해당 상자에 넣을 케이크를 체크 표시해 매칭해 주세요.",
    guide_step_3_title: "🛒 명세서 리스트나 사이드바에서 최종 확인하기",
    guide_step_3_desc: "매칭을 결정 완료하면 자동으로 주문서에 '🎁 포장상자: 아크릴 투명 글라스 박스'로 인쇄 매치 연동되며, 유동적인 교체가 가능합니다!",
    guide_choose_cake: "1. 케이크를 먼저 투표해 주십시오",
    guide_choose_box: "2. 박스를 선택해 주십시오",
    guide_try_btn: "🔥 직접 조작해 시도해 보세요! 【좌측 케이크】를 선택하고 【우측 박스】를 차례대로 선택해 매칭 매커니즘을 경험해 볼 수 있습니다!",
    guide_alert_cake: "💡 좌측 패널에서 옷을 입혀줄 케이크 상품을 먼저 선택하시길 권장합니다!",
    guide_pairing_desc: "포장 연동 수립: 출고 당일 정성 담긴 마스터 케이크 '{cake}'(이)가 귀하의 '{box}' 박스에 세밀 포장 및 가공 세팅됩니다!",
    guide_done_desc: "아주 자연스럽고 부드러움의 미학이 깃들어 있습니다! 지금 바로 당신의 감동 선물에 전용 옷을 선물해 보아요!",
    guide_understand_btn: "내용을 완벽히 파악했습니다, 설명 닫기 ✕",
    guide_step1_title: "🎁 커스텀 패키지 「포장 지정」이 무엇인가요?",
    guide_step1_subtitle: "디저트에 전용 상자와 분위기 패키징를 더하기 위한 가이드",
    guide_step2_title: "🔄 3단계로 끝나는 직관적인 포장 매칭",
    guide_step2_subtitle: "디저트 포장 배치를 쉽게 이해하고 멋진 선물을 커스텀하세요",
    guide_step3_title: "🍰 직접 조작해보기: 매칭 시뮬레이터",
    guide_step3_subtitle: "아래 케이크와 박스를 선택하여 매칭 구성을 한눈에 미리보세요!",
    demo_cakes: [
      { id: "cake1", name: "헵번 빈티지 실크 시폰 케이크", emo: "🍰", desc: "매장 자타공인 시그니처 롤케이크" },
      { id: "cake2", name: "시즈오카 리얼 유기농 투톤 말차", emo: "🍵", desc: "진하고 쌉싸름한 원숙의 우아한 매력" },
      { id: "cake3", name: "블랙 몬스터 오레오 트리플 초코", emo: "🍫", desc: "단 맛과 카카오의 극치, 최고의 초콜릿" }
    ],
    demo_boxes: [
      { id: "box1", name: "투명 Hepburn 아크릴 상자", emo: "🎀", desc: "핑크빛 달콤한 시스루 리본 포장" },
      { id: "box2", name: "러브 슬릿 하리 마블 상자", emo: "💖", desc: "하트 정공 대리석 디자인 박스" }
    ],
    addon_badge: "🎁 Heartwarming Upgrades",
    addon_modal_title: "축하 분위기를 더해 줄 인테리어 소품을 추가할까요?",
    addon_lantern_title: "아늑한 LED 웜 인테리어 전구",
    addon_lantern_desc: "은은하게 반짝이는 웜옐로우 LED 동선 라이트 ({price}/개)",
    addon_flower_title: "핸드메이드 장미 프리저브드 꽃다발",
    addon_flower_desc: "셰프가 특별 배합하고 함께 안심 패킹해 드리는 드라이 플라워 ({price}/송이)",
    addon_candle_title: "북유럽 수제 천연 아로마 향초",
    addon_candle_desc: "소이 왁스 블렌딩 무연 저열 아로마 테라피 양초 ({price}/개)",
    addon_box_total: "✨ 선물상자 소계:",
    addon_acc_total: "💡 액세서리 옵션 소계:",
    addon_grand_total: "🔥 총액 추가 금액:",
    addon_decline_btn: "💔 옵션 제외, 기본 패키징으로 출고",
    addon_accept_btn: "🛍️ 옵션 포함, 전부 쇼핑백 담기!"
  }
};


export default function CustomGiftBox({ onAddToCart, cartItems = [] }: { onAddToCart?: (item: any) => void; cartItems?: any[] }) {
  const { language, convertPrice } = useShop();
  const t = GIFT_LOCALIZATIONS[language] || GIFT_LOCALIZATIONS.zh;

  // Dynamically translate BOX_STYLES based on current language
  const localizedBoxStyles = BOX_STYLES.map(box => {
    const loc = BOX_LOCALIZATIONS[language]?.[box.id] || BOX_LOCALIZATIONS.zh[box.id];
    return {
      ...box,
      name: loc?.name || box.name,
      description: loc?.description || box.description
    };
  });

  // Main Selection & Local Pairing State
  const [activePairings, setActivePairings] = useState<Array<{
    cakeId: string;
    cakeName: string;
    boxId: string;
    boxStyleName: string;
    price: number;
    image: string;
  }>>([]);

  // Popups control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddonPromptOpen, setIsAddonPromptOpen] = useState(false);
  
  // Selected Box for modal selector
  const [selectedBoxForModal, setSelectedBoxForModal] = useState<any>(localizedBoxStyles[1]);
  // Checked cakes inside modal
  const [checkedCakes, setCheckedCakes] = useState<string[]>([]);

  // Interactive guide states (Tutorial)
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideStep, setGuideStep] = useState(1);
  const [demoSelectedCake, setDemoSelectedCake] = useState<string | null>(null);
  const [demoSelectedBox, setDemoSelectedBox] = useState<string | null>(null);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Success pairing animation
  const [pairedAnimName, setPairedAnimName] = useState<string | null>(null);
  const [pairedAnimBox, setPairedAnimBox] = useState<string | null>(null);

  // Accessories upgrading quantities 
  const [lanternCount, setLanternCount] = useState(0);
  const [flowerCount, setFlowerCount] = useState(0);
  const [candleCount, setCandleCount] = useState(0);

  // Show empty notice
  const [showEmptyNotice, setShowEmptyNotice] = useState(true);
  const [showEmptyWarningModal, setShowEmptyWarningModal] = useState(false);

  // Filter only delicious cakes (exclude giftboxes, cards, accessories themselves)
  const eligibleItems = cartItems?.filter((item: any) => 
    item && typeof item === 'object' && 
    !(item.id?.startsWith('giftbox-') || item.id?.startsWith('accessory-') || item.id?.startsWith('standalone-') || item.boxStyle || item.name?.includes('禮盒') || item.name?.includes('自選加購') || item.name?.includes('Bespoke') || item.name?.includes('Box') || item.name?.includes('包裝') || item.name?.includes('상자'))
  ) || [];

  // Reset animations
  useEffect(() => {
    if (pairedAnimName) {
      const timer = setTimeout(() => {
        setPairedAnimName(null);
        setPairedAnimBox(null);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [pairedAnimName]);

  // Handle opening pairing modal for a specific box style
  const handleOpenPairingModal = (box: any) => {
    setSelectedBoxForModal(box);
    // Find all cakes currently assigned to this box style in our local activePairings
    const currentlyChecked = activePairings
      .filter(p => p.boxId === box.id)
      .map(p => p.cakeName);
    setCheckedCakes(currentlyChecked);
    setIsModalOpen(true);
  };

  // Confirm pairings inside modal
  const handleConfirmPairings = () => {
    // 1. Remove previous pairings associated with this boxId
    let updated = (activePairings || []).filter(p => p && p.boxId !== selectedBoxForModal?.id);

    // 2. Add checked cakes to activePairings
    checkedCakes.forEach(cakeName => {
      // Find pristine representation of the cake
      const cakeItem = eligibleItems.find(item => item && item.name === cakeName);
      if (cakeItem) {
        // also strip this cake from any other box style first to enforce "at most one luxury box design style per cake"
        updated = updated.filter(p => p && p.cakeName !== cakeName);
        updated.push({
          cakeId: cakeItem.id,
          cakeName: cakeName,
          boxId: selectedBoxForModal?.id || '',
          boxStyleName: selectedBoxForModal?.name || '',
          price: selectedBoxForModal?.price || 0,
          image: selectedBoxForModal?.image || ''
        });
      }
    });

    setActivePairings(updated);
    setIsModalOpen(false);

    // Trigger success match animation
    if (checkedCakes.length > 0) {
      setPairedAnimName(checkedCakes.join(' & '));
      setPairedAnimBox(selectedBoxForModal?.name || '');
    }
  };

  // Submit everything to Shopping Cart of the App
  const handleAddToBagWithAddons = (withAddons: boolean) => {
    if (onAddToCart) {
      // 1. Add custom box assignments as items
      activePairings.forEach(p => {
        onAddToCart({
          id: `giftbox-${p.boxId}-${Date.now()}-${p.cakeName}`,
          name: `${p.boxStyleName}`,
          price: p.price,
          boxStyle: p.boxStyleName,
          packedItemName: p.cakeName,
          packedItemNames: [p.cakeName],
          size: 'Premium'
        });
      });

      // 2. Add accessory upgrade quantities if yes/true
      if (withAddons) {
        if (lanternCount > 0) {
          onAddToCart({
            id: `accessory-lantern-${Date.now()}`,
            name: t.accessory_lantern_name,
            price: 50,
            quantity: lanternCount,
            size: 'Pack'
          });
        }
        if (flowerCount > 0) {
          onAddToCart({
            id: `accessory-flower-${Date.now()}`,
            name: t.accessory_flower_name,
            price: 120,
            quantity: flowerCount,
            size: 'Pcs'
          });
        }
        if (candleCount > 0) {
          onAddToCart({
            id: `accessory-candle-${Date.now()}`,
            name: t.accessory_candle_name,
            price: 80,
            quantity: candleCount,
            size: 'Unit'
          });
        }
      }

      // Reset local flows
      setActivePairings([]);
      setLanternCount(0);
      setFlowerCount(0);
      setCandleCount(0);
      setIsAddonPromptOpen(false);

      // Open the App's Shopping Cart Sidebar directly
      setTimeout(() => {
        const cartButton = document.querySelector('[aria-label="Open cart"]') as HTMLElement;
        if (cartButton) {
          cartButton.click();
        } else {
          // Fallback triggers state in App if cart is opened
          window.dispatchEvent(new CustomEvent('toggle-cart', { detail: { open: true } }));
        }
      }, 500);
    }
  };

  // Helper calculation
  const totalBoxPrice = activePairings.reduce((sum, p) => sum + p.price, 0);
  const totalAddonPrice = (lanternCount * 50) + (flowerCount * 120) + (candleCount * 80);

  return (
    <section id="gift-sets" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Headings */}
        <div className="text-center mb-16">
          <h2 className="text-[11px] font-bold tracking-[0.4em] mb-4 opacity-40 uppercase">{t.badge_customization}</h2>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            {t.title_1} <span className="text-berry italic">{t.title_2}</span>
          </h1>
          <p className="mt-4 text-sm opacity-60 max-w-lg mx-auto leading-relaxed">
            {t.desc_subtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                setIsGuideOpen(true);
                setGuideStep(1);
                setDemoSelectedCake(null);
                setDemoSelectedBox(null);
                setDemoSuccess(false);
              }}
              className="inline-flex items-center gap-2 bg-[#EB9FB0]/10 hover:bg-[#EB9FB0]/20 border border-[#EB9FB0]/30 text-berry font-bold text-xs tracking-wider px-5 py-2.5 rounded-full shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="animate-bounce">💡</span>
              <span>{t.btn_guide}</span>
            </button>
          </div>
        </div>

        {/* 1. Empty Cart Notice / Helper */}
        {eligibleItems.length === 0 && showEmptyNotice && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-8 md:p-12 bg-[#EB9FB0]/5 border-2 border-dashed border-[#EB9FB0]/20 rounded-[3rem] text-center max-w-2xl mx-auto mb-16 space-y-6"
          >
            <div className="w-16 h-16 bg-[#EB9FB0]/10 text-berry rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner animate-pulse">
              🍰
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-medium text-2xl text-stone-900 tracking-tight">
                {t.empty_notice_cake_title}
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed max-w-md mx-auto">
                {t.empty_notice_cake_desc}
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  const element = document.getElementById('shop');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                  // Hide prompt after clicking as user specified!
                  setShowEmptyNotice(false);
                }}
                className="inline-flex items-center gap-2 bg-berry border border-berry/10 text-white hover:bg-ink text-xs font-black tracking-widest uppercase px-10 py-4 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{t.btn_go_shop}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* 2. Main Gift Box Selector Grid */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 bg-berry/10 text-berry text-xs rounded-full flex items-center justify-center font-black">1</span>
            <h3 className="text-lg font-bold text-stone-900 font-display">{t.prompt_step_1}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localizedBoxStyles.map((box) => {
              // Find cakes currently assigned to this box style
              const pairedCakesForThisBox = activePairings.filter(p => p.boxId === box.id);
              
              return (
                <motion.div
                  key={box.id}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`group relative overflow-hidden rounded-[3rem] bg-stone-50 border-2 transition-all duration-500 text-left flex flex-col h-full bg-[#FAF9F6]/50 ${
                    pairedCakesForThisBox.length > 0 
                      ? 'border-berry shadow-lg ring-1 ring-berry/20 bg-white' 
                      : 'border-stone-100 hover:border-berry/20 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {/* Card Badge */}
                  {box.price === 0 && (
                    <div className="absolute top-4 left-4 bg-stone-900 border border-white/10 text-[#FFFDFB] font-black text-[9px] tracking-widest px-3 py-1 rounded-full uppercase z-10">
                      {t.box_badge_free}
                    </div>
                  )}

                  {pairedCakesForThisBox.length > 0 && (
                    <div className="absolute top-4 right-4 bg-berry text-white font-black text-[9px] tracking-wider px-3 py-1 rounded-full z-10 flex items-center gap-1 shadow-sm">
                      <span>{t.box_badge_assigned.replace('{count}', String(pairedCakesForThisBox.length))}</span>
                    </div>
                  )}

                  {/* Box Image Block */}
                  <div
                    onClick={() => handleOpenPairingModal(box)}
                    className="aspect-[4/3] overflow-hidden relative bg-stone-100 border-b border-stone-100 shrink-0 cursor-pointer group/img"
                  >
                    <motion.img
                      src={box.image}
                      alt={box.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 group-hover/img:opacity-90 transition-all duration-700"
                      animate={{ 
                        y: [0, -4, 0],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                      <span className="bg-white/90 text-stone-900 text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity transform translate-y-2 group-hover/img:translate-y-0 duration-300 shadow-md">
                        {pairedCakesForThisBox.length > 0 ? t.box_hover_manage : t.box_hover_select}
                      </span>
                    </div>
                  </div>

                  {/* Details Block */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 font-sans">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-base text-stone-900 leading-snug">{box.name}</h4>
                        <span className="text-xs font-black text-berry text-right shrink-0">
                          {box.price === 0 ? convertPrice(0) : convertPrice(box.price)}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-60 leading-relaxed font-sans">{box.description}</p>
                    </div>

                    {/* Action Block */}
                    <div>
                      {pairedCakesForThisBox.length > 0 ? (
                        <div className="space-y-3">
                          <div className="bg-berry/5 border border-berry/10 rounded-2xl p-3 space-y-1 text-left">
                            <span className="text-[9px] font-black tracking-wider text-berry block uppercase">{t.info_assigned_cakes}</span>
                            <div className="text-[11px] font-bold text-stone-800 space-y-1">
                              {pairedCakesForThisBox.map((p, idx) => (
                                <p key={idx} className="flex items-center gap-1">
                                  <span>🍰</span>
                                  <span className="truncate">{p.cakeName}</span>
                                </p>
                              ))}
                            </div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => handleOpenPairingModal(box)}
                            className="w-full bg-[#EB9FB0]/10 hover:bg-berry hover:text-white border border-berry/20 text-berry font-black text-xs py-2.5 rounded-full transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>{t.info_reassign}</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenPairingModal(box)}
                          className="w-full bg-stone-900 hover:bg-berry text-[#FFFDFB] hover:text-white font-black text-xs py-3 rounded-full transition-all flex items-center justify-center gap-1 shadow-sm hover:shadow-md cursor-pointer"
                        >
                          <span>{t.info_choose_pkg}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. Bottom Pairing Specification Details Dashboard */}
        <div className="mt-12 bg-[#FAF9F6] border-2 border-stone-200/50 rounded-[3rem] p-8 md:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-200/60 font-sans">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 bg-stone-950 text-cake text-xs rounded-full flex items-center justify-center font-black shadow-sm font-sans">2</span>
              <div>
                <h4 className="font-bold text-lg text-stone-950 font-display">{t.list_header}</h4>
                <p className="text-[11px] opacity-50 font-sans mt-0.5">{t.list_subheader}</p>
              </div>
            </div>

            <div className="bg-white/80 border border-stone-200 px-4 py-1.5 rounded-full text-xs font-semibold text-stone-600 shadow-2xs shrink-0 select-none">
              {t.list_composition}<span className="font-mono font-bold text-berry">{activePairings.length}</span> {t.list_composition_unit}
            </div>
          </div>

          {activePairings.length === 0 ? (
            <div className="py-12 text-center space-y-3 font-sans">
              <div className="text-4xl">🎁</div>
              <h5 className="font-bold text-stone-800 text-sm">{t.list_empty}</h5>
              <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                {t.list_empty_desc}
              </p>
            </div>
          ) : (
            <div className="space-y-4 font-sans">
              <div className="space-y-3.5">
                {activePairings.map((p, index) => (
                  <div
                    key={`${p.cakeName}-${index}`}
                    className="p-5 md:p-6 bg-white border border-stone-200 rounded-[2rem] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    {/* Item Ident */}
                    <div className="flex items-center gap-4">
                      {/* Box Image Circle */}
                      <img
                        src={p.image}
                        alt={p.boxStyleName}
                        className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shadow-2xs"
                      />
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#EB9FB0] font-extrabold tracking-widest uppercase">✦ {p.boxStyleName}</span>
                          <span className="text-[10px] text-stone-400 font-bold">{convertPrice(p.price)}</span>
                        </div>
                        <h5 className="font-black text-sm text-stone-900 flex items-center gap-1.5 leading-none">
                          <span>🎂</span>
                          <span>{language === 'zh' ? '配對內裝：' : language === 'en' ? 'Packed content: ' : language === 'ja' ? '内包対象：' : '포장 대상:'}<strong>{p.cakeName}</strong></span>
                        </h5>
                      </div>
                    </div>

                    {/* Controls Component: Changing Box Style and Deleting */}
                    <div className="flex items-center gap-3 w-full lg:w-auto self-stretch lg:self-center justify-end font-sans">
                      {/* Dropdown function (讓蛋糕更改裡盒樣式) */}
                      <div className="flex items-center gap-1.5 font-sans">
                        <span className="text-[10px] text-stone-400 font-bold shrink-0">{t.dropdown_change_pkg}</span>
                        <select
                          value={p.boxId}
                          onChange={(e) => {
                            const newBox = localizedBoxStyles.find(b => b.id === e.target.value);
                            if (newBox) {
                              if (newBox.id === 'default_white') {
                                // Revert back to default / gratis white box style
                                setActivePairings(prev => prev.filter(item => item.cakeName !== p.cakeName));
                              } else {
                                // Reassign pairing styling
                                setActivePairings(prev => prev.map(item => {
                                  if (item.cakeName === p.cakeName) {
                                    return {
                                      ...item,
                                      boxId: newBox.id,
                                      boxStyleName: newBox.name,
                                      price: newBox.price,
                                      image: newBox.image
                                    };
                                  }
                                  return item;
                                }));
                              }
                              // Trigger sweet quick animation feedback
                              setPairedAnimName(p.cakeName);
                              setPairedAnimBox(newBox.name);
                            }
                          }}
                          className="bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-bold px-3 py-2 rounded-full cursor-pointer focus:outline-none focus:border-berry max-w-[200px]"
                        >
                          {localizedBoxStyles.map(b => (
                            <option key={b.id} value={b.id}>
                              {b.name} ({b.price === 0 ? t.dropdown_free_隨附 : `+ ${convertPrice(b.price)}`})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Remove matching button */}
                      <button
                        type="button"
                        onClick={() => {
                          setActivePairings(prev => prev.filter(item => item.cakeName !== p.cakeName));
                        }}
                        className="p-2.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer shrink-0"
                        title={language === 'zh' ? '取消此對應禮盒' : language === 'en' ? 'Remove pairing' : language === 'ja' ? '包装指定を解除' : '포장 지정 해제'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step completion footer */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-left">
                  <p className="text-xs text-stone-500">{t.list_price_label}</p>
                  <p className="text-2xl font-display font-black text-berry text-left mt-0.5">{convertPrice(totalBoxPrice)}</p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsAddonPromptOpen(true)}
                  className="w-full sm:w-auto px-12 py-5 bg-stone-900 border border-stone-100 hover:border-berry hover:bg-berry text-white rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-xl hover:scale-105 active:scale-[98%] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.list_confirm_btn}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 🍰 SINGLE BOX MULTI-CAKE PAIRING POPUP MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedBoxForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-ink/75 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[#FFFDFB] border-2 border-stone-200 rounded-[3rem] shadow-2xl p-6 md:p-8 text-left overflow-hidden z-10 max-h-[85vh] flex flex-col font-sans"
            >
              {/* Pattern Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-berry via-[#EB9FB0] to-yellow-300" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-berry hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
              >
                ✕
              </button>

              <div className="space-y-4 flex-grow overflow-y-auto pr-1">
                <div>
                  <span className="inline-block px-3 py-1 bg-berry/15 text-berry text-[9px] font-black tracking-widest uppercase rounded-full mb-2 border border-berry/10 select-none">
                    ✦ {t.modal_title_pack || "DESIGNATE PACKAGING"}
                  </span>
                  <h3 className="font-display font-black text-xl text-stone-900">
                    {selectedBoxForModal.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans mt-1">
                    {t.modal_desc_pack 
                      ? t.modal_desc_pack.replace('{box_name}', selectedBoxForModal.name) 
                      : `Please select which cakes from your cart should be packed inside this box style.`}
                  </p>
                </div>

                 {/* Eligible items list */}
                {eligibleItems.length === 0 ? (
                  <div className="p-6 bg-stone-50 rounded-2xl text-center space-y-3.5 border border-dashed border-stone-200">
                    <p className="text-sm font-bold text-stone-800 leading-relaxed">
                      {t.modal_empty_notice || "💡 目前偵測到您的購物車空空如也，請先挑選蛋糕加入購物車才能為其配對精裝禮盒。"}
                    </p>
                    <p className="text-xs text-stone-400">
                      {language === 'zh' ? "請先到上方選購蛋糕品項喔！" : language === 'en' ? "Please add a cake to your cart first!" : language === 'ja' ? "先にケーキをカートに追加してください！" : "먼저 장바구니에 케이크를 담아주세요!"}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setTimeout(() => {
                            const element = document.getElementById('shop');
                            if (element) {
                              const offset = 80;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - offset;
                              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="inline-flex items-center gap-1.5 bg-berry hover:bg-stone-900 text-white font-extrabold text-[11px] px-8 py-3 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <span>{t.btn_go_shop || "前往選購蛋糕品項 🍰"}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[40vh] overflow-y-auto">
                    {eligibleItems.map((cake: any, idx: number) => {
                      const isChecked = checkedCakes.includes(cake.name);
                      // Check if already assigned to a DIFFERENT box
                      const alreadyAssignedToOther = activePairings.find(p => p.cakeName === cake.name && p.boxId !== selectedBoxForModal.id);
                      
                      return (
                        <button
                          key={`${cake.id}-${idx}`}
                          type="button"
                          onClick={() => {
                            if (alreadyAssignedToOther) return;
                            setCheckedCakes(prev => 
                              prev.includes(cake.name)
                                ? prev.filter(c => c !== cake.name)
                                : [...prev, cake.name]
                            );
                          }}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 ${
                            isChecked
                              ? 'border-berry bg-berry/5 text-stone-900 font-bold'
                              : alreadyAssignedToOther
                                ? 'border-stone-100 bg-stone-50/50 opacity-50 cursor-not-allowed'
                                : 'border-stone-200 bg-white hover:border-berry/30'
                          }`}
                          disabled={!!alreadyAssignedToOther}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🍰</span>
                            <div>
                              <p className="text-xs font-bold text-stone-800">{cake.name}</p>
                              <p className="text-[10px] text-stone-400 font-sans">
                                {alreadyAssignedToOther 
                                  ? (t.modal_cake_disabled 
                                      ? t.modal_cake_disabled.replace('{box_name}', alreadyAssignedToOther.boxStyleName) 
                                      : `Already assigned to ${alreadyAssignedToOther.boxStyleName}`)
                                  : isChecked
                                    ? (t.modal_cake_selected || "✓ Selected for this box style")
                                    : (t.modal_cake_available || "Available to pack")
                                }
                              </p>
                            </div>
                          </div>

                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked 
                              ? 'bg-berry border-berry text-white' 
                              : 'border-stone-300 bg-white'
                          }`}>
                            {isChecked && <span className="text-[10px] font-black">✓</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Confirm / Close Button footer */}
              <div className="pt-6 border-t border-stone-100 flex gap-3 mt-6 font-sans shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full font-bold text-xs transition-all cursor-pointer text-center"
                >
                  {t.modal_empty_dismiss || "Cancel"}
                </button>
                {eligibleItems.length > 0 && (
                  <button
                    type="button"
                    onClick={handleConfirmPairings}
                    className="flex-1 py-3 bg-stone-900 hover:bg-berry text-white rounded-full font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer text-center"
                  >
                    {t.modal_btn_confirm || "Confirm ✓"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔮 ACCESSORY UPGRADES CONVENIENCE PROMPT MODAL */}
      <AnimatePresence>
        {isAddonPromptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddonPromptOpen(false)}
              className="absolute inset-0 bg-ink/75 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-[#FFFDFB] border-2 border-stone-200 rounded-[3rem] shadow-2xl p-6 md:p-8 text-left overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Pattern Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-berry via-[#EB9FB0] to-yellow-300" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsAddonPromptOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-berry hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
              >
                ✕
              </button>

              <div className="space-y-4 flex-grow overflow-y-auto pr-1">
                <div className="text-center pb-2 border-b border-stone-150">
                  <span className="inline-block px-3.5 py-1 bg-[#EB9FB0]/20 text-[#E63946] text-[10px] font-black tracking-widest uppercase rounded-full border border-[#EB9FB0]/30 select-none">
                    {t.addon_badge || "🎁 HEARTWARMING UPGRADES"}
                  </span>
                  <h3 className="font-display font-black text-xl text-stone-900 mt-2">
                    {t.addon_modal_title || "Would you like to add celebratory extras?"}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans mt-1">
                    {t.addon_subtitle || "Add beautiful matching lights or candles to illuminate your sweet surprise."}
                  </p>
                </div>

                {/* Items Selectors Grid */}
                <div className="space-y-3 pt-2">
                  {/* Lantern Count */}
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl flex justify-between items-center gap-4 hover:border-berry/25 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl shrink-0">✨</span>
                      <div>
                        <h4 className="text-xs font-black text-stone-900">{t.addon_lantern_title || "Cosy LED Ambient Light"}</h4>
                        <p className="text-[10px] text-stone-400 mt-0.5">{t.addon_lantern_desc ? t.addon_lantern_desc.replace('{price}', convertPrice(50)) : `NT$ 50`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <button
                        type="button"
                        onClick={() => setLanternCount(c => Math.max(0, c - 1))}
                        className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold font-sans cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-black">{lanternCount}</span>
                      <button
                        type="button"
                        onClick={() => setLanternCount(c => c + 1)}
                        className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold font-sans cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Flower Count */}
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl flex justify-between items-center gap-4 hover:border-berry/25 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl shrink-0">🌹</span>
                      <div>
                        <h4 className="text-xs font-black text-stone-900">{t.addon_flower_title || "Handcrafted Preserved Rose Bouquet"}</h4>
                        <p className="text-[10px] text-stone-400 mt-0.5">{t.addon_flower_desc ? t.addon_flower_desc.replace('{price}', convertPrice(120)) : `NT$ 120`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <button
                        type="button"
                        onClick={() => setFlowerCount(c => Math.max(0, c - 1))}
                        className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold font-sans cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-black">{flowerCount}</span>
                      <button
                        type="button"
                        onClick={() => setFlowerCount(c => c + 1)}
                        className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold font-sans cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Candle Count */}
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl flex justify-between items-center gap-4 hover:border-berry/25 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl shrink-0">🕯️</span>
                      <div>
                        <h4 className="text-xs font-black text-stone-900">{t.addon_candle_title || "Nordic Essential Aromatherapy Candle"}</h4>
                        <p className="text-[10px] text-stone-400 mt-0.5">{t.addon_candle_desc ? t.addon_candle_desc.replace('{price}', convertPrice(80)) : `NT$ 80`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <button
                        type="button"
                        onClick={() => setCandleCount(c => Math.max(0, c - 1))}
                        className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold font-sans cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-black">{candleCount}</span>
                      <button
                        type="button"
                        onClick={() => setCandleCount(c => c + 1)}
                        className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold font-sans cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calculations summary breakdown */}
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-150 space-y-1.5 font-sans mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">{t.addon_box_total || "✨ Gift Box Subtotal:"}</span>
                    <span className="font-bold text-stone-900">{convertPrice(totalBoxPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">{t.addon_acc_total || "💡 Accessories Subtotal:"}</span>
                    <span className="font-bold text-stone-900">{convertPrice(totalAddonPrice)}</span>
                  </div>
                  <div className="h-px bg-stone-200 my-1.5" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-black text-stone-800">{t.addon_grand_total || "🔥 Grand Total Addon:"}</span>
                    <span className="font-black text-berry text-base">{convertPrice(totalBoxPrice + totalAddonPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Back out without accessories & adding directly with accessories */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3 mt-6 font-sans shrink-0">
                <button
                  type="button"
                  onClick={() => handleAddToBagWithAddons(false)}
                  className="flex-1 py-3.5 bg-stone-100 border border-stone-200 hover:bg-stone-200 text-stone-700 rounded-full font-bold text-xs transition-all cursor-pointer text-center"
                >
                  {t.addon_decline_btn || "💔 No thanks, add box only"}
                </button>
                <button
                  type="button"
                  onClick={() => handleAddToBagWithAddons(true)}
                  className="flex-1 py-3.5 bg-stone-900 hover:bg-berry text-white rounded-full font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer text-center"
                >
                  {t.addon_accept_btn || "🛍️ Yes, add everything to Cart!"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🎀 PERFECT PAIRING SUCCESS OVERLAY ANIMATION */}
      <AnimatePresence>
        {pairedAnimName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Filter Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -15 }}
              className="relative text-center z-10 flex flex-col items-center justify-center space-y-6"
            >
              {/* Ring Ring Ornaments */}
              <motion.div
                initial={{ scale: 0.5, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 14, stiffness: 200 }}
                className="relative w-36 h-36 bg-gradient-to-tr from-berry to-pink-400 rounded-full flex items-center justify-center shadow-2xl shadow-berry/30"
              >
                <div className="absolute inset-2 border-2 border-dashed border-white/40 rounded-full animate-[spin_10s_linear_infinite]" />
                
                {/* Floatings */}
                <span className="absolute -top-3 -left-3 text-3xl select-none animate-bounce">✨</span>
                <span className="absolute -bottom-3 -right-3 text-2xl select-none animate-pulse">💖</span>
                <span className="absolute top-6 right-2 text-xl select-none">🌸</span>

                <span className="text-5xl select-none">🎁</span>
              </motion.div>

              <div className="space-y-2 max-w-md px-6 font-sans">
                <p className="text-[10px] font-black tracking-[0.4em] text-[#EB9FB0] uppercase">
                  ✦ PACKAGING MAPPED ✦
                </p>
                <h4 className="text-2xl font-display font-black text-[#FFFDFB]">
                  {t.paired_success_title || "Packaging Custom Pairing Done!"}
                </h4>
                <p className="text-xs text-cake/85 leading-relaxed font-sans max-w-[320px] mx-auto">
                  {t.paired_success_desc 
                    ? t.paired_success_desc.replace('{cake}', pairedAnimName).replace('{box}', pairedAnimBox)
                    : (language === 'zh' ? (
                        <>已成功綁定：將 <strong>{pairedAnimName}</strong> 妥善裝入「<strong>{pairedAnimBox}</strong>」中！</>
                      ) : language === 'en' ? (
                        <>Successfully designated: packing <strong>{pairedAnimName}</strong> inside <strong>{pairedAnimBox}</strong>!</>
                      ) : language === 'ja' ? (
                        <>個別指定完了：<strong>{pairedAnimName}</strong> は高級 <strong>{pairedAnimBox}</strong> で大切にお包みします！</>
                      ) : (
                        <>지정 완료: <strong>{pairedAnimName}</strong> 상품이 <strong>{pairedAnimBox}</strong> 패키지에 알맞게 매칭되었습니다!</>
                      ))
                  }
                </p>
                <p className="text-[10px] text-emerald-400 font-extrabold animate-pulse pt-2">
                  {t.paired_success_note || "✓ Mapped details added under your custom item summary list!"}
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔮 INTERACTIVE GIFTBOX PAIRING GUIDE MODAL */}
      <AnimatePresence>
        {isGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGuideOpen(false)}
              className="absolute inset-0 bg-ink/75 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-[#FFFDFB] border-2 border-berry/20 rounded-[40px] shadow-2xl p-8 md:p-10 text-left overflow-hidden max-h-[92vh] overflow-y-auto"
            >
              {/* Pattern Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-berry via-[#EB9FB0] to-yellow-300" />

              {/* Close Icon Corner */}
              <button
                onClick={() => setIsGuideOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-cake/50 text-stone-700 hover:bg-[#E63946] hover:text-white transition-all shadow-sm focus:outline-none cursor-pointer"
              >
                <span className="text-xs font-bold px-1.5">✕</span>
              </button>

              {/* Tag Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3.5 py-1 bg-[#EB9FB0]/20 text-[#E63946] text-[10px] font-black tracking-widest uppercase rounded-full border border-[#EB9FB0]/30 select-none">
                  ✦ TUTORIAL GUIDE
                </div>
                <div className="h-px bg-stone-200 flex-grow" />
              </div>

              {/* Step Title Navigation */}
              <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
                <div>
                  <h3 className="font-display font-black text-2xl text-[#2A2323] italic">
                    {guideStep === 1 && "🎁 什麼是自選禮盒的「指定配對」？"}
                    {guideStep === 2 && "🔄 只需要三步：超直覺配對流程"}
                    {guideStep === 3 && "🍰 親手試試：配對模擬器實測"}
                  </h3>
                  <p className="text-xs opacity-60 mt-1">
                    {guideStep === 1 && "為您的甜點加購專屬外盒與氛圍包裝的心意指南"}
                    {guideStep === 2 && "輕鬆看懂出貨包裝分法，完美客製您的送禮驚喜"}
                    {guideStep === 3 && "點擊下方蛋糕與禮盒，一秒預覽配對配置！"}
                  </p>
                </div>
                
                {/* Step indicator bubbles */}
                <div className="flex gap-1 shrink-0 font-mono text-xs">
                  {[1, 2, 3].map(s => (
                    <span
                      key={s}
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold transition-all ${
                        guideStep === s ? "bg-berry text-white scale-110" : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[280px]">
                {/* STATE 1: Introduction Concept */}
                {guideStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-6 bg-berry/5 border-2 border-[#EB9FB0]/20 rounded-[28px] space-y-4">
                      <div className="flex gap-4 items-start">
                        <span className="text-3xl">💝</span>
                        <div className="space-y-1">
                          <h4 className="font-bold text-base text-stone-900">真正專屬您的「外盒客製化」</h4>
                          <p className="text-xs text-stone-600 leading-relaxed font-sans mt-1">
                            我們秉持純淨的手作精神：<strong>不論您的購物車裡買了幾位蛋糕，皆可自由加購特色禮盒</strong>。
                            你可以指定「草莓雙層戚風」穿著高貴的大理石圍邊，而让「靜岡雙層綠意抹茶」僅使用預設提盒退熱保存，全憑您的心意分裝！
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-white border border-stone-200 rounded-3xl space-y-2">
                        <span className="text-xl">🤍 普通出貨（不加購）</span>
                        <p className="text-[11px] text-stone-500 leading-relaxed">
                          未加購特別禮盒時，所有蛋糕接在出貨時免費附贈 <strong>【預設簡約提包白盒】 提著走</strong>。簡約且體面，適合自用居家享用。
                        </p>
                      </div>

                      <div className="p-5 bg-berry/5 border border-[#EB9FB0]/30 rounded-3xl space-y-2">
                        <span className="text-xl">🌸 精緻自選禮盒（指定配對）</span>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          加購精裝透明赫本、奢華大理石等禮盒款式，<strong>您需指派是裝哪一款蛋糕</strong>。出貨時，主廚便會將該款蛋糕裝入閃亮的高貴新衣中，特別包裝！
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 2: Visual Workflow Steps */}
                {guideStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      {[
                        { step: "Step 1", title: "🛍️ 將喜愛的蛋糕先「加入購物車」", desc: "由於禮盒不是空盒子出售，包裝主廚需要知道要將哪個產品裝進去，因此請先將蛋糕點擊「加入購物籃」喔！" },
                        { step: "Step 2", title: "🎁 來禮盒區勾選您喜愛的外箱款式", desc: "在自選禮盒區，挑選大理石款、赫本透明款或愛心款，點選後會彈出配對視窗，勾選想要置入此包裝的指定蛋糕品項。" },
                        { step: "Step 3", title: "🛒 加入購物車後，於清單確認分配", desc: "加入後，點開購物車會清晰顯示：「🎁 裝填指定蛋糕：赫本復古緞帶戚風」，一目了然，隨時可以預覽蛋糕和禮包的正確配對！" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start pb-4 border-b border-stone-100 last:border-0 last:pb-0">
                          <span className="px-3 py-1 bg-ink text-cake text-[9px] font-black tracking-widest rounded-md shrink-0 uppercase mt-0.5">
                            {item.step}
                          </span>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-stone-900">{item.title}</h4>
                            <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STATE 3: Interactive Pairing Sandbox */}
                {guideStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-[#EB9FB0]/5 border border-[#EB9FB0]/20 p-4 rounded-3xl text-xs text-center font-bold">
                      🔥 請親手試點看看！點選【左側一款蛋糕】➔ 再點選【右側一款包裝】，感受完美的配對機制！
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Side: Cake Selections */}
                      <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-widest text-stone-400 font-extrabold flex justify-between">
                          <span>1. 選擇加購的蛋糕</span>
                          <span>(Cakes in Cart)</span>
                        </div>
                        {[
                          { id: "cake1", name: "赫本復古緞帶戚風", emo: "🍰", desc: "店內人氣 MVP 蛋糕" },
                          { id: "cake2", name: "靜岡雙層綠意抹茶蛋糕", emo: "🍵", desc: "濃苦香醇的日本茶韻" },
                          { id: "cake3", name: "黑酷怪獸奧利奧巧克力蛋糕", emo: "🍫", desc: "巧克力控的極致狂歡" }
                        ].map(c => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setDemoSelectedCake(c.name);
                              setDemoSuccess(false);
                            }}
                            className={`w-full p-3.5 rounded-2xl flex items-center justify-between border-2 transition-all ${
                              demoSelectedCake === c.name
                                ? "border-berry bg-berry/5 text-berry font-black transform scale-[1.02]"
                                : "border-stone-200 bg-white hover:border-berry/25"
                            }`}
                          >
                            <div className="flex gap-3 items-center text-left">
                              <span className="text-xl">{c.emo}</span>
                              <div>
                                <h4 className="text-xs font-bold">{c.name}</h4>
                                <p className="text-[9px] opacity-55 font-normal">{c.desc}</p>
                              </div>
                            </div>
                            {demoSelectedCake === c.name && <span className="text-xs">👉</span>}
                          </button>
                        ))}
                      </div>

                      {/* Right Box style select */}
                      <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-widest text-stone-400 font-extrabold flex justify-between">
                          <span>2. 對應外盒包裝</span>
                          <span>(Gift Box Style)</span>
                        </div>
                        {[
                          { id: "box1", name: "自選禮盒 赫本雙層透明款", emo: "🎀", desc: "夢幻粉色全透明展示款" },
                          { id: "box2", name: "自選禮盒 愛心大理石手提款", emo: "💖", desc: "愛心鏤空大理石紋" }
                        ].map(b => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              if (!demoSelectedCake) {
                                alert("💡 請先在左側選取一款您想打包的蛋糕品項唷！");
                                return;
                              }
                              setDemoSelectedBox(b.name);
                              setDemoSuccess(true);
                            }}
                            className={`w-full p-3.5 rounded-2xl flex items-center justify-between border-2 transition-all ${
                              demoSelectedBox === b.name
                                ? "border-[#E63946] bg-[#E63946]/5 text-[#E63946] font-black transform scale-[1.02]"
                                : "border-stone-200 bg-white hover:border-[#E63946]/35"
                            }`}
                          >
                            <div className="flex gap-3 items-center text-left">
                              <span className="text-xl">{b.emo}</span>
                              <div>
                                <h4 className="text-xs font-bold">{b.name}</h4>
                                <p className="text-[9px] opacity-55 font-normal">{b.desc}</p>
                              </div>
                            </div>
                            {demoSelectedBox === b.name && <span className="text-xs">👈</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Result Match Confirmation */}
                    <AnimatePresence>
                      {demoSuccess && demoSelectedCake && demoSelectedBox && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-green-50 border-2 border-green-200 text-green-800 p-5 rounded-[24px] space-y-2 text-center"
                        >
                          <p className="text-base font-black flex items-center justify-center gap-1.5">
                            <span>✨ 🎉 兩者對接配對成功！ 🙌 ✨</span>
                          </p>
                          <p className="text-xs text-green-700/90 leading-relaxed font-sans max-w-lg mx-auto">
                            裝填關係確立：出貨時，蛋糕【<strong>{demoSelectedCake}</strong>】將會被細緻打包入高級【<strong>{demoSelectedBox}</strong>】中，並由緞帶精巧繫上！
                          </p>
                          <p className="text-[10px] text-green-600 font-extrabold font-sans">
                            對應方式就是這麼簡單！快去為您的自選商品加上客製外包裝吧！
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Step Navigation Bar */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                <button
                  type="button"
                  onClick={() => setGuideStep(s => Math.max(s - 1, 1))}
                  disabled={guideStep === 1}
                  className={`w-full sm:w-auto px-5 py-3 rounded-full border border-stone-200 text-stone-600 font-bold text-xs hover:bg-stone-50 transition-all ${
                    guideStep === 1 ? "opacity-35 cursor-not-allowed" : ""
                  }`}
                >
                  ← 上一頁 (Previous)
                </button>

                <div className="flex gap-2 w-full sm:w-auto">
                  {guideStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setGuideStep(s => Math.min(s + 1, 3))}
                      className="w-full sm:w-auto px-8 py-3.5 bg-berry text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-ink transition-all active:scale-95"
                    >
                      下一部流程 (Next) ➜
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsGuideOpen(false)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-berry text-white rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-md active:scale-95"
                    >
                      明白，開始挑選加購 🍰
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
