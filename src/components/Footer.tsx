import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../lib/ShopContext';

const FOOTER_TRANSLATIONS = {
  zh: {
    desc: "生活很難，但選甜點可以很 Piece of Cake。我們致力於用甜點治癒每一個疲憊的靈魂。",
    links_title: "快速連結",
    about: "關於我們",
    shop: "療癒專區",
    gifts: "自選禮盒",
    prescription: "情緒處方",
    faq: "常見問題",
    contact_title: "聯絡資訊",
    address: "台北市信義區忠孝東路四段553巷22弄37號",
    phone: "+886 2 2345 6789",
    hours_title: "營業時間",
    weekdays: "Mon - Fri: 13:00 - 20:30",
    weekends: "Sat - Sun: 12:30 - 20:00",
    policy: "隱私權政策",
    terms: "服務條款",
  },
  en: {
    desc: "Life is hard, but choosing desserts can be a Piece of Cake. We are dedicated to healing every tired soul with sweets.",
    links_title: "Quick Links",
    about: "About Us",
    shop: "Healing Shop",
    gifts: "Gift Boxes",
    prescription: "Mood Prescription",
    faq: "FAQ",
    contact_title: "Contact",
    address: "No. 37, Aly. 22, Ln. 553, Sec. 4, Zhongxiao E. Rd., Xinyi Dist., Taipei City",
    phone: "+886 2 2345 6789",
    hours_title: "Opening Hours",
    weekdays: "Mon - Fri: 13:00 - 20:30",
    weekends: "Sat - Sun: 12:30 - 20:00",
    policy: "Privacy Policy",
    terms: "Terms of Service",
  },
  ja: {
    desc: "人生は難しい。でもスイーツを選ぶことは、とても Piece of Cake。甘い魔法で、すべての疲れた魂を癒します。",
    links_title: "クイックリンク",
    about: "ブランドストーリー",
    shop: "ヒーリングメニュー",
    gifts: "オリジナルBOX",
    prescription: "ムード処方箋",
    faq: "よくあるご質問",
    contact_title: "店舗情報",
    address: "台北市信義区忠孝東路四段553巷22弄37号",
    phone: "+886 2 2345 6789",
    hours_title: "営業時間",
    weekdays: "月 - 金: 13:00 - 20:30",
    weekends: "土 - 日: 12:30 - 20:00",
    policy: "プライバシーポリシー",
    terms: "利用規約",
  },
  ko: {
    desc: "삶은 고단하지만 디저트를 고르는 것은 아주 Piece of Cake 처럼 쉬울 수 있어요. 우리는 달콤한 디저트로 모든 지친 영혼을 치유하기 위해 헌신합니다.",
    links_title: "빠른 링크",
    about: "브랜드 스토리",
    shop: "힐링 메뉴",
    gifts: "선물 세트",
    prescription: "감정 처방전",
    faq: "자주 묻는 질문",
    contact_title: "고객센터",
    address: "타이베이시 신이구 충효동로 4단 553항 22롱 37호",
    phone: "+886 2 2345 6789",
    hours_title: "영업 시간",
    weekdays: "월 - 금: 13:00 - 20:30",
    weekends: "토 - 일: 12:30 - 20:00",
    policy: "개인정보 처리방침",
    terms: "서비스 이용약관",
  }
};

export default function Footer() {
  const { language } = useShop();
  const t = FOOTER_TRANSLATIONS[language] || FOOTER_TRANSLATIONS.zh;

  return (
    <footer className="bg-cake-dark pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-display font-bold tracking-tighter">
              Piece of Cake.
            </h2>
            <p className="max-w-sm text-sm opacity-60 leading-relaxed font-medium">
              {t.desc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-40">{t.links_title}</h4>
            <ul className="space-y-4">
              {[
                { name: t.about, href: '#story' },
                { name: t.shop, href: '#shop' },
                { name: t.gifts, href: '#gift-sets' },
                { name: t.prescription, href: '#prescription' },
                { name: t.faq, href: '#faq' }
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm font-medium hover:text-berry transition-colors flex items-center group">
                    {item.name}
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-40">{t.contact_title}</h4>
            <ul className="space-y-4 text-sm opacity-60 font-medium">
              <li>{t.address}</li>
              <li>{t.phone}</li>
              <li className="pt-4">
                <span className="block font-bold text-ink opacity-100 mb-1">{t.hours_title}</span>
                {t.weekdays} <br />
                {t.weekends}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-bold tracking-widest uppercase opacity-40">
          <p>© 2026 PIECE OF CAKE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-ink transition-colors">{t.policy}</a>
            <a href="#" className="hover:text-ink transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
