import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useShop } from '../lib/ShopContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size?: string;
  boxStyle?: string;
  packedItemName?: string;
  packedItemNames?: string[];
  cardStyle?: string;
  cardSticker?: string;
  cardSeal?: string;
  sender?: string;
  recipient?: string;
  cardContent?: string;
  candleType?: string;
  candleNumber?: string;
  cutleryCount?: number;
  addons?: {
    lights?: boolean;
    candle?: boolean;
  };
  remarks?: string;
}

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
}

const checkoutLabels = {
  zh: {
    checkout_title: '預約到店自取結帳 🧘',
    checkout_subtitle: '請填寫您的聯絡與自取資訊，我們將按預定時間特別為您手作烘焙，期待您前往店面自取！',
    name: '取貨人姓名 Name',
    name_placeholder: '請輸入真實取貨姓名（例：王小明）',
    email: '電子信箱 Email',
    email_placeholder: '用以寄送發票、療癒處方箋與取貨通知（例：your@email.com）',
    phone: '聯絡電話 Phone',
    phone_placeholder: '自取聯絡手機（例：0912-345-678）',
    address: '預約自取日期與時間 Pickup Date & Time',
    address_placeholder: '請填寫您預計到店自取的日期與大約時間（例：5/25 15:30 左右）',
    payment: '付款方式 Payment Method',
    pay_credit: '💳 信用卡線上刷卡',
    pay_line: '🟢 LINE Pay 快捷支付',
    pay_atm: '🏦 ATM 轉帳 / 網銀匯款',
    pay_cod: '🛍️ 到店付現 / 刷卡 (取貨時付款)',
    back_cart: '← 返回購物車修改',
    confirm_order: '確認送出療癒訂單 🎂',
    success_title: '🎉 預約療癒成功！',
    success_msg: '我們已發送確認明細至您的信箱。點點主廚正依約定時間精心烘焙，期待能療癒您的心！',
    receipt_title: '🧾 訂單舒壓明細',
    receipt_order_no: '訂單編號',
    receipt_total: '實付總額',
    done_btn: '完成，返回商店'
  },
  en: {
    checkout_title: 'In-Store Pickup Checkout 🧘',
    checkout_subtitle: 'Please provide your reservation details. We will bake your soul-cakes fresh for your scheduled pickup!',
    name: 'Full Name',
    name_placeholder: 'Enter pickup subscriber\'s name (e.g. Amber Chen)',
    email: 'Email address',
    email_placeholder: 'For invoice, pickup notification, and receipt details',
    phone: 'Phone number',
    phone_placeholder: 'Contact cell phone (e.g. +886 912-345-678)',
    address: 'Scheduled Pickup Date & Time',
    address_placeholder: 'e.g., May 25, 3:30 PM. Add any special timing notes here.',
    payment: 'Payment Method',
    pay_credit: '💳 Credit Card Online',
    pay_line: '🟢 LINE Pay Fast Checkout',
    pay_atm: '🏦 Local ATM / Wire Transfer',
    pay_cod: '🛍️ Pay In-store on Pickup',
    back_cart: '← Back to Cart',
    confirm_order: 'Confirm and Send Order 🎂',
    success_title: '🎉 Ordered successfully!',
    success_msg: 'We have dispatched confirmation details to your email! Chef is preparing raw ingredients with love.',
    receipt_title: '🧾 Order Invoice Detail',
    receipt_order_no: 'Receipt ID',
    receipt_total: 'Total Amount Paid',
    done_btn: 'Done, Back to Shop'
  },
  ja: {
    checkout_title: '店頭受取予約お会計 🧘',
    checkout_subtitle: '店頭受取の情報をご入力ください。ご指定の受取時間に合わせて新鮮なスイーツをお焼きします！',
    name: '受取人のお名前 Name',
    name_placeholder: '受取人様の本名をご入力ください（例：山田 太郎）',
    email: 'メールアドレス Email',
    email_placeholder: '受取予約確認や追跡情報はこちらの宛先へ送信されます',
    phone: '電話番号 Phone',
    phone_placeholder: 'ご連絡用携帯番号（例：090-1234-5678）',
    address: 'お受取り希望日時 Pickup Date & Time',
    address_placeholder: 'お受取りをご希望の正確な日時（例：5月25日 15:30 頃）',
    payment: 'お支払い方法 Payment Method',
    pay_credit: '💳 クレジットカード決済',
    pay_line: '🟢 LINE Pay 決済',
    pay_atm: '🏦 銀行振込 / ATM決済',
    pay_cod: '🛍️ 店頭でのお支払い (受取時決済)',
    back_cart: '← カートに戻る',
    confirm_order: '注文を確定する 🎂',
    success_title: '🎉 ご注文ありがとうございます！',
    success_msg: 'ご登録のメール宛に受取確認を送信しました。温かい愛情豊かな特製スイーツをご用意して店舗にてお待ちしております。',
    receipt_title: '🧾 処方明細書',
    receipt_order_no: '処方箋番号',
    receipt_total: 'お支払代金',
    done_btn: '完了してショップに戻る'
  },
  ko: {
    checkout_title: '매장 방문 수령 예약 결제 🧘',
    checkout_subtitle: '매장 방문 자격 및 수령 디테일을 채워주세요. 원하시는 특정 타이밍에 맞게 오븐에서 갓 제작해 두겠습니다!',
    name: '방문인 이름 Name',
    name_placeholder: '수령 주체 실명을 기입해 주세요 (예시: 김민수)',
    email: '이메일 주소 Email',
    email_placeholder: '영수증 서류 발송 및 수령 알림용 링크 주소',
    phone: '연락처 Phone',
    phone_placeholder: '방문 연락 스마트폰 번호 (예시: 010-1234-5678)',
    address: '방문 수령 일시 Pickup Date & Time',
    address_placeholder: '매장에 내점하여 수령할 예정 일시 (예시: 5/25 15:30 경)',
    payment: '결제 수단 Payment Method',
    pay_credit: '💳 신용카드 결제',
    pay_line: '🟢 네이버페이 / 카카오페이',
    pay_atm: '🏦 은행 이체 / 무통장 입금',
    pay_cod: '🛍️ 매장 현장 결제 (수령 시 결제)',
    back_cart: '← 장바구니로',
    confirm_order: '주문 완료하기 🎂',
    success_title: '🎉 주문 처방 성공!',
    success_msg: '상세 주문 리포트 메일을 발송하였습니다. 예약 주신 시간에 최상의 상태로 오프라인 매장에서 뵙겠습니다!',
    receipt_title: '🧾 주문 처방 내역서',
    receipt_order_no: '처방 번호',
    receipt_total: '총 결제금액',
    done_btn: '완료하고 숍으로 돌아가기'
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

export default function CartOverlay({ isOpen, onClose, items, onRemoveItem, onClearCart }: CartOverlayProps) {
  const [activeDetailItem, setActiveDetailItem] = useState<CartItem | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [address, setAddress] = useState('');
  const [receiptData, setReceiptData] = useState<any>(null);

  // Coupon special states
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [hasClaimedCoupon, setHasClaimedCoupon] = useState(false);

  // Load claim status reactive to storage and custom events
  useEffect(() => {
    const checkClaimStatus = () => {
      const isClaimed = localStorage.getItem('sweet_salon_claimed_secret88') === 'true';
      setHasClaimedCoupon(isClaimed);
    };
    if (isOpen) {
      checkClaimStatus();
    }
    window.addEventListener('sweet_salon_claimed_coupon', checkClaimStatus);
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sweet_salon_claimed_secret88') {
        checkClaimStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('sweet_salon_claimed_coupon', checkClaimStatus);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isOpen]);

  const { convertPrice, t, language } = useShop();
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const discount = isCouponApplied ? 88 : 0;
  const finalTotal = Math.max(0, total - discount);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === 'SECRET88' || code === 'RECOVERY88') {
      const isClaimed = localStorage.getItem('sweet_salon_claimed_secret88') === 'true';
      if (!isClaimed) {
        setCouponError(language === 'zh'
          ? '🕵️‍♂️ 您尚未領取該折價券喔！請先於頁面右下角點擊吉祥物「小屑屑」並成功點擊領取，才能折抵喔！'
          : 'Coupon is valid, but you must click "Crummy" the mascot at the bottom right to claim it first.');
        setIsCouponApplied(false);
        return;
      }
      setIsCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError(language === 'zh' ? '🕵️‍♂️ 代碼不正確喔！再瞧瞧主廚或小偵探給你的寶貝祕件～' : 'Invalid coupon code.');
      setIsCouponApplied(false);
    }
  };

  const renderCouponBonusCard = () => {
    const activeCode = couponCode.trim().toUpperCase();
    return (
      <div className="p-4 border-2 border-dashed border-[#F2B5B5] rounded-3xl bg-[#FFF9F1]/80 space-y-3 relative mt-5 select-none text-left">
        <label className="text-[10.5px] font-black text-[#821E31] tracking-tight block">
          輸入優惠代碼 / 專業研發津貼：
        </label>
        
        <AnimatePresence>
          {hasClaimedCoupon && !isCouponApplied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              onClick={() => {
                setCouponCode('SECRET88');
                handleApplyCoupon('SECRET88');
              }}
              className="mt-1 bg-[#E63946] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md text-center cursor-pointer hover:bg-[#BD1E51] transition-all flex items-center justify-center gap-1 z-10"
            >
              <span>🔮 偵測到您的口袋裡有 $88，要現在使用嗎？</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="請輸入 SECRET88 或 RECOVERY88"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              if (couponError) setCouponError('');
            }}
            disabled={isCouponApplied}
            className="flex-grow bg-white border border-rose-100 rounded-xl px-2 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:border-[#EB9FB0] transition-colors uppercase disabled:bg-stone-50 disabled:text-stone-400"
          />
          <button
            type="button"
            onClick={() => handleApplyCoupon()}
            disabled={isCouponApplied}
            className={`px-3 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
              isCouponApplied 
                ? 'bg-emerald-500 text-white' 
                : 'bg-stone-900 text-white hover:bg-[#E63946]'
            }`}
          >
            {isCouponApplied ? '✓' : '套用'}
          </button>
        </div>

        {isCouponApplied && (
          <div className="text-[10px] font-black text-emerald-600 flex items-center gap-1">
            <span>🕵️‍♂️ 已套用 -$88 研發或特別津貼 ({activeCode === 'RECOVERY88' ? 'RECOVERY88' : 'SECRET88'})</span>
            <button 
              type="button" 
              onClick={() => {
                setIsCouponApplied(false);
                setCouponCode('');
              }}
              className="underline text-[9px] text-[#821E31] ml-auto hover:text-[#BD1E51] font-bold"
            >
              移除
            </button>
          </div>
        )}

        {couponError && (
          <p className="text-[9.5px] font-black text-[#E63946]">{couponError}</p>
        )}
      </div>
    );
  };

  // Auto-reset checkout state when overlay is closed
  useEffect(() => {
    if (!isOpen) {
      setIsCheckingOut(false);
    }
  }, [isOpen]);

  const hasGiftbox = items.some(item => item.id?.startsWith('giftbox-') || item.boxStyle || item.name.includes('禮盒'));
  const cakeCount = items.filter(item => !item.id?.startsWith('giftbox-') && !item.id?.startsWith('standalone-card-') && !item.boxStyle && !item.name.includes('禮盒')).length;
  const isInvalidStandaloneGiftbox = hasGiftbox && cakeCount === 0;

  const activeLabels = checkoutLabels[language as keyof typeof checkoutLabels] || checkoutLabels.zh;

  // Auto-scroll inside Form container at toggling checkout state
  useEffect(() => {
    if (isCheckingOut) {
      const scrollable = document.querySelector('.checkout-container');
      if (scrollable) {
        scrollable.scrollTop = 0;
      }
    }
  }, [isCheckingOut]);

  const handleConfirmCheckout = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isInvalidStandaloneGiftbox) {
      alert(language === 'zh' ? '⚠️ 自選禮盒不可單獨結帳，必須搭配至少任一蛋糕商品喔！' : '⚠️ Standalone gift boxes cannot be purchased alone. Please select a cake!');
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      alert(language === 'zh' ? '請填寫所有欄位！' : 'Please fill in all blanks.');
      return;
    }
    
    // Simulate order submission
    const orderNo = 'POC-' + Math.floor(100000 + Math.random() * 900000);
    setReceiptData({
      orderNo,
      name,
      email,
      phone,
      paymentMethod,
      address,
      items: [...items],
      total: finalTotal,
      date: new Date().toISOString().split('T')[0]
    });
    
    setIsSuccess(true);
  };

  const handleDone = () => {
    if (onClearCart) {
      onClearCart();
    }
    // Clean states
    setIsCheckingOut(false);
    setIsSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[400]"
            id="cart-shadow-cover"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: "-45%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: "-45%", x: "-50%" }}
            className="fixed top-1/2 left-1/2 z-[401] h-[82vh] w-[95vw] lg:h-[70vh] lg:w-[90vw] max-w-4xl bg-cake flex flex-col rounded-[3rem] border-8 border-white overflow-hidden shadow-[0_32px_64px_-12px_rgba(42,35,35,0.2)]"
            id="cart-main-container"
          >
            {/* Header */}
            <div className="p-6 md:px-12 flex justify-between items-center border-b-8 border-white bg-white/60 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-5">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-12 h-12 md:w-14 md:h-14 bg-berry text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-berry/30"
                >
                  <ShoppingBag size={24} />
                </motion.div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter text-ink italic leading-none">
                    {isSuccess ? activeLabels.success_title : (isCheckingOut ? activeLabels.checkout_title : t('cart_title') || 'Sweet Basket')}
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-berry/60 mt-1">
                    {language === 'ko' ? `총 수량: ${items.length} 개` : language === 'ja' ? `合計数量: ${items.length}` : language === 'en' ? `Healing counts: ${items.length}` : `已選取療癒甜食: ${items.length} 件`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {!isSuccess && !isCheckingOut && (
                  <button 
                    onClick={onClose}
                    className="px-4 py-3 md:px-8 md:py-4 bg-white text-ink border-2 md:border-4 border-cake/20 rounded-full font-black text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-berry hover:text-white transition-all shadow-sm hover:-translate-y-1"
                  >
                    {language === 'ko' ? '계속 쇼핑하기' : language === 'ja' ? '戻る' : language === 'en' ? 'Back' : '繼續選購 Back'}
                  </button>
                )}
                <button 
                  onClick={isSuccess ? handleDone : onClose}
                  className="p-4 bg-ink text-cake rounded-full hover:bg-berry transition-all shadow-xl hover:rotate-90 duration-500"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row bg-cake/30">
              {isSuccess && receiptData ? (
                /* SUCCESS SCREEN RECEIPT */
                <div className="w-full lg:flex-1 lg:overflow-y-auto p-6 md:p-14 text-center flex flex-col items-center justify-center max-w-2xl mx-auto space-y-6 scrollbar-hide">
                  <div className="text-6xl animate-bounce">🎈🍰🎉</div>
                  <div>
                    <h3 className="text-3xl font-display font-black text-ink uppercase tracking-tight italic">{activeLabels.success_title}</h3>
                    <p className="text-xs font-bold text-ink/70 mt-2 max-w-md">{activeLabels.success_msg}</p>
                  </div>

                  <div className="w-full bg-white rounded-[2.5rem] border-4 border-white shadow-lg p-6 md:p-8 text-left space-y-4">
                    <h4 className="text-sm font-black uppercase tracking-widest text-berry border-b border-cake/30 pb-2">{activeLabels.receipt_title}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-xs text-ink/80 font-medium">
                      <div>
                        <span className="text-ink/40 font-black text-[10px] uppercase tracking-widest block">{activeLabels.receipt_order_no}</span>
                        <span className="font-mono font-black text-ink text-sm">{receiptData.orderNo}</span>
                      </div>
                      <div>
                        <span className="text-ink/40 font-black text-[10px] uppercase tracking-widest block">日期 Date</span>
                        <span className="font-bold text-ink">{receiptData.date}</span>
                      </div>
                      <div>
                        <span className="text-ink/40 font-black text-[10px] uppercase tracking-widest block">收件人 Recipient</span>
                        <span className="font-black text-ink">{receiptData.name}</span>
                      </div>
                      <div>
                        <span className="text-ink/40 font-black text-[10px] uppercase tracking-widest block">電話 Phone</span>
                        <span className="font-mono font-bold text-ink">{receiptData.phone}</span>
                      </div>
                      <div className="md:col-span-2 border-t border-cake/10 pt-2">
                        <span className="text-ink/40 font-black text-[10px] uppercase tracking-widest block">電子信箱 Email</span>
                        <span className="font-semibold text-ink break-all">{receiptData.email}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-ink/40 font-black text-[10px] uppercase tracking-widest block">{activeLabels.address}</span>
                        <span className="font-bold text-ink block leading-relaxed">{receiptData.address}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-ink/40 font-black text-[10px] uppercase tracking-widest block">已選擇付款方式 Selected Payment</span>
                        <span className="mt-1 px-4 py-2 bg-cake/50 rounded-xl font-black text-[11px] inline-flex items-center border border-white text-ink">
                          {receiptData.paymentMethod === 'credit_card' && activeLabels.pay_credit}
                          {receiptData.paymentMethod === 'line_pay' && activeLabels.pay_line}
                          {receiptData.paymentMethod === 'atm' && activeLabels.pay_atm}
                          {receiptData.paymentMethod === 'cod' && activeLabels.pay_cod}
                        </span>
                      </div>
                      {isCouponApplied && (
                        <div className="md:col-span-2 p-3.5 bg-rose-50 border border-dashed border-[#F2B5B5] rounded-2xl text-[11px] font-black text-[#E63946] flex justify-between items-center select-none uppercase tracking-wide">
                          <span>🕵️‍♂️ 已扣除小偵探特別津貼 (SECRET88)</span>
                          <span>-$88</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-cake/30 pt-4 flex justify-between items-end">
                      <span className="text-ink font-black text-xs uppercase tracking-wider">{activeLabels.receipt_total}</span>
                      <span className="text-3xl font-display font-black text-berry tracking-tighter">{convertPrice(receiptData.total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDone}
                    className="px-10 py-5 bg-ink text-cake hover:bg-berry hover:text-white rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-md cursor-pointer"
                  >
                    {activeLabels.done_btn}
                  </button>
                </div>
              ) : isCheckingOut ? (
                /* INTERACTIVE CHECKOUT DIRECT FORM */
                <>
                  <div className="w-full lg:flex-1 lg:overflow-y-auto p-4 md:p-10 lg:p-12 scrollbar-hide checkout-container">
                    <form onSubmit={handleConfirmCheckout} className="max-w-xl mx-auto space-y-6">
                      <p className="text-xs font-bold text-ink/65 italic leading-relaxed border-b-4 border-white pb-4">
                        {activeLabels.checkout_subtitle}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Field */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/50 mb-1.5 block">
                            {activeLabels.name} *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={activeLabels.name_placeholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white border-2 border-transparent focus:border-berry/30 px-4 py-3.5 rounded-2xl text-xs font-bold outline-none shadow-sm text-ink transition-all"
                          />
                        </div>

                        {/* Phone Field */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/50 mb-1.5 block">
                            {activeLabels.phone} *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder={activeLabels.phone_placeholder}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white border-2 border-transparent focus:border-berry/30 px-4 py-3.5 rounded-2xl text-xs font-bold outline-none shadow-sm text-ink transition-all"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/50 mb-1.5 block">
                          {activeLabels.email} *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={activeLabels.email_placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border-2 border-transparent focus:border-berry/30 px-4 py-3.5 rounded-2xl text-xs font-bold outline-none shadow-sm text-ink transition-all"
                        />
                      </div>

                      {/* Address Field */}
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/50 mb-1.5 block">
                          {activeLabels.address} *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={activeLabels.address_placeholder}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-white border-2 border-transparent focus:border-berry/30 px-4 py-3.5 rounded-2xl text-xs font-bold outline-none shadow-sm text-ink transition-all"
                        />
                      </div>

                      {/* Payment Method Selector Grid */}
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/50 mb-3 block">
                          {activeLabels.payment}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                          {[
                            { value: 'credit_card', label: activeLabels.pay_credit },
                            { value: 'line_pay', label: activeLabels.pay_line },
                            { value: 'atm', label: activeLabels.pay_atm },
                            { value: 'cod', label: activeLabels.pay_cod }
                          ].map((pay) => (
                            <button
                              key={pay.value}
                              type="button"
                              onClick={() => setPaymentMethod(pay.value)}
                              className={cn(
                                "p-4 rounded-2xl text-left text-xs font-black transition-all border-2 flex items-center justify-between cursor-pointer",
                                paymentMethod === pay.value 
                                  ? "bg-berry text-white border-berry scale-[1.01] shadow-md shadow-berry/15" 
                                  : "bg-white text-ink/80 border-white hover:border-berry/25"
                              )}
                            >
                              <span>{pay.label}</span>
                              {paymentMethod === pay.value && <span className="bg-white text-berry w-5 h-5 rounded-full flex items-center justify-center text-[10px]">✓</span>}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/40">
                        <button
                          type="button"
                          onClick={() => setIsCheckingOut(false)}
                          className="text-xs font-black text-berry hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {activeLabels.back_cart}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Summary Sidebar persists */}
                  <div className="w-full lg:w-[380px] bg-white p-6 md:p-10 lg:p-12 border-t-8 lg:border-t-0 lg:border-l-8 border-cake flex flex-col justify-between shrink-0 lg:overflow-y-auto scrollbar-hide">
                    <div className="space-y-8">
                      <h3 className="text-2xl font-display font-bold italic tracking-tighter border-b-4 border-cake/30 pb-4 text-ink">
                        {language === 'ko' ? '주문 내역' : language === 'ja' ? '注文内容' : language === 'en' ? 'Order Summary' : '訂單舒壓結算'}
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-ink/30">
                          <span>{t('cart_total')}</span>
                          <span className={cn("text-sm text-ink font-bold", isCouponApplied && "line-through text-stone-400")}>{convertPrice(total)}</span>
                        </div>
                        {isCouponApplied && (
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#E63946]">
                            <span>偵探特別津貼</span>
                            <span className="text-sm font-bold text-[#E63946]">- {convertPrice(88)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-ink/30">
                          <span>{language === 'ko' ? '매장 수령 서비스' : language === 'ja' ? '店頭受取サービス' : language === 'en' ? 'Pickup Service' : '到店自取服務'}</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-[8px] font-black border-2 border-white">
                            {language === 'ko' ? '무료 수령 ✨' : language === 'ja' ? '無料 ✨' : language === 'en' ? 'FREE ✨' : '免費自取 ✨'}
                          </span>
                        </div>
                        
                        <div className="pt-8 border-t-4 border-cake/10 flex justify-between items-end">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-berry/40 mb-1">
                              {language === 'ko' ? '총 합계금액' : language === 'ja' ? '総合計' : language === 'en' ? 'Grand Total' : '實選總額'}
                            </p>
                            <p className="text-xs font-bold italic text-ink/40">Sweets for your soul.</p>
                          </div>
                          <motion.div 
                            key={finalTotal}
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ type: 'keyframes', duration: 0.4 }}
                            className="text-4xl font-display font-bold tracking-tighter text-berry"
                          >
                            {convertPrice(finalTotal)}
                          </motion.div>
                        </div>

                        {renderCouponBonusCard()}
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <button 
                        type="button"
                        onClick={handleConfirmCheckout}
                        className="w-full bg-berry text-white py-7 rounded-[2.5rem] text-sm font-black tracking-[0.3em] uppercase hover:bg-ink shadow-[0_20px_40px_-10px_rgba(255,107,157,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
                      >
                        <span>{activeLabels.confirm_order}</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* CART SHOPMING LIST */
                <>
                  {/* Item List */}
                  <div className="w-full lg:flex-1 lg:overflow-y-auto p-4 md:p-8 lg:p-14 space-y-6 scrollbar-hide">
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
                        <div className="text-8xl mb-8 transform -rotate-12">🧁</div>
                        <p className="text-sm font-bold uppercase tracking-[0.4em] px-6">{t('cart_empty')}</p>
                        <button 
                          onClick={onClose}
                          className="mt-8 px-10 py-4 bg-berry text-white rounded-full text-xs font-black tracking-widest uppercase hover:bg-ink transition-all shadow-xl"
                        >
                          GO SHOPPING ✨
                        </button>
                      </div>
                    ) : (
                      <div className="max-w-4xl mx-auto space-y-4">
                        {/* Prominent top checkout trigger */}
                        <div className="flex bg-white/80 backdrop-blur-md border-4 border-white rounded-[2rem] p-5 justify-between items-center gap-4 shadow-sm" id="cart-checkout-top-container">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#4B2E1E]/40">{language === 'zh' ? '購物車小計' : language === 'ko' ? '주문 소계' : language === 'ja' ? 'カート小計' : 'Cart Subtotal'}</p>
                            <p className="text-xl font-display font-black text-berry tracking-tight">{convertPrice(total)}</p>
                          </div>
                          <button
                            id="btn-cart-checkout-top"
                            onClick={() => {
                              if (isInvalidStandaloneGiftbox) {
                                alert(language === 'zh' ? '⚠️ 自選禮盒不可單獨結帳，必須搭配至少任一蛋糕商品喔！' : '⚠️ Standalone gift boxes cannot be purchased alone. Please select a cake!');
                                return;
                              }
                              setIsCheckingOut(true);
                            }}
                            className={cn(
                              "px-5 py-3 rounded-full text-[11px] font-black tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all shadow-md",
                              isInvalidStandaloneGiftbox 
                                ? "bg-red-400 text-white cursor-not-allowed opacity-80" 
                                : "bg-berry hover:bg-ink text-white"
                            )}
                          >
                            <span>
                              {isInvalidStandaloneGiftbox 
                                ? (language === 'zh' ? '⚠️ 禮盒不可單獨購買' : '⚠️ No Standalone Box') 
                                : `${t('cart_checkout')} 💖`}
                            </span>
                            <ArrowRight size={14} />
                          </button>
                        </div>

                        {/* Standalone Giftbox warning notice */}
                        {isInvalidStandaloneGiftbox && (
                          <div className="p-6 bg-red-50 border-4 border-white rounded-[2rem] shadow-sm text-red-600 text-xs font-bold space-y-2 leading-relaxed">
                            <p className="font-extrabold flex items-center gap-1.5 text-red-800 text-sm">
                              <span>⚠️</span>
                              <span>{language === 'zh' ? '自選禮盒不能單獨結帳喔！' : 'Gift boxes cannot be purchased alone!'}</span>
                            </p>
                            <p className="text-red-700/80 font-medium">
                              {language === 'zh' 
                                ? '親愛的小蜜怪客戶：您目前購物車中僅有精緻客製外盒，自取預約規範規定禮盒裝盒不可單獨購買，請先在上方選單購買至少任一美味烘焙蛋糕後，方可解鎖此精緻禮盒的對應外包裝唷。' 
                                : 'Our shop policy does not support purchasing custom giftboxes without pairing them with products. Please add any cake above to continue.'}
                            </p>
                          </div>
                        )}

                        {items.map((item, idx) => (
                          <motion.div 
                            layout
                            key={`${item.id}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setActiveDetailItem(item)}
                            className="bg-white rounded-[2.5rem] border-4 border-white hover:border-berry/30 cursor-pointer shadow-[0_10px_20px_-10px_rgba(42,35,35,0.05)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 group hover:shadow-[0_30px_60px_-20px_rgba(255,107,157,0.1)] transition-all duration-500 active:scale-[0.99]"
                          >
                            <div className="w-24 h-24 md:w-28 md:h-28 bg-cake rounded-[2rem] flex items-center justify-center text-4xl shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                              {getProductEmoji(item.id, item.name)}
                            </div>
                            
                            <div className="flex-1 w-full text-center md:text-left">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="text-2xl font-display font-bold italic text-ink">{item.name}</h4>
                                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-berry/60">Prescription No. {idx + 101}</p>
                                  {((item.packedItemNames && item.packedItemNames.length > 0) || item.packedItemName) && (
                                    <p className="text-xs font-black text-berry mt-2 bg-berry/5 px-3 py-1.5 rounded-lg inline-block text-left">
                                      🎁 裝填指定蛋糕：
                                      {item.packedItemNames && item.packedItemNames.length > 0 
                                        ? item.packedItemNames.join('、') 
                                        : item.packedItemName}
                                    </p>
                                  )}
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveItem(idx);
                                  }}
                                  className="p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm cursor-pointer animate-none bg-none duration-250 hover:scale-105"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                              
                              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="px-4 py-1.5 bg-cake/40 rounded-full font-black text-[9px] uppercase border-2 border-white">{item.size || 'M'} Size</span>
                                {item.candleType && item.candleType !== 'none' && (
                                  <span className="px-4 py-1.5 bg-cake/40 rounded-full font-black text-[9px] uppercase border-2 border-white">🕯️ {item.candleType}</span>
                                )}
                                {item.cutleryCount !== undefined && item.cutleryCount > 0 && (
                                  <span className="px-4 py-1.5 bg-cake/40 rounded-full font-black text-[9px] uppercase border-2 border-white">🍴 {item.cutleryCount} sets</span>
                                )}
                              </div>
                            </div>

                            <div className="text-2xl font-display font-bold text-berry tracking-tighter shrink-0">
                              {convertPrice(item.price)}
                            </div>
                          </motion.div>
                        ))}

                        {/* Mobile bottom checkout trigger below the list */}
                        <div className="lg:hidden pt-4" id="cart-checkout-bottom-container">
                          <button
                            id="btn-cart-checkout-bottom"
                            onClick={() => {
                              if (isInvalidStandaloneGiftbox) {
                                alert(language === 'zh' ? '⚠️ 自選禮盒不可單獨結帳，必須搭配至少任一蛋糕商品喔！' : '⚠️ Standalone gift boxes cannot be purchased alone. Please select a cake!');
                                return;
                              }
                              setIsCheckingOut(true);
                            }}
                            className={cn(
                              "w-full py-5 rounded-[2rem] text-sm font-black tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md",
                              isInvalidStandaloneGiftbox 
                                ? "bg-red-400 text-white cursor-not-allowed opacity-80" 
                                : "bg-berry text-white hover:bg-ink shadow-[0_12px_24px_rgba(255,107,157,0.3)]"
                            )}
                          >
                            <span>
                              {isInvalidStandaloneGiftbox 
                                ? (language === 'zh' ? '⚠️ 禮盒不可單獨購買' : '⚠️ No Standalone Box') 
                                : `${t('cart_checkout')} 💖`}
                            </span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary Sidebar */}
                  {items.length > 0 && (
                    <div className="w-full lg:w-[380px] bg-white p-6 md:p-10 lg:p-12 border-t-8 lg:border-t-0 lg:border-l-8 border-cake flex flex-col justify-between shrink-0 lg:overflow-y-auto scrollbar-hide">
                      <div className="space-y-8">
                        <h3 className="text-2xl font-display font-bold italic tracking-tighter border-b-4 border-cake/30 pb-4 text-ink">
                          {language === 'ko' ? '주문 내역' : language === 'ja' ? '注文内容' : language === 'en' ? 'Order Summary' : '訂單舒壓結算'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-ink/30">
                            <span>{t('cart_total')}</span>
                            <span className={cn("text-sm text-ink font-bold", isCouponApplied && "line-through text-stone-400")}>{convertPrice(total)}</span>
                          </div>
                          {isCouponApplied && (
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#E63946]">
                              <span>偵探特別津貼</span>
                              <span className="text-sm font-bold text-[#E63946]">- {convertPrice(88)}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-ink/30">
                            <span>{language === 'ko' ? '매장 수령 서비스' : language === 'ja' ? '店頭受取サービス' : language === 'en' ? 'Pickup Service' : '到店自取服務'}</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-[8px] font-black border-2 border-white">
                              {language === 'ko' ? '무료 수령 ✨' : language === 'ja' ? '無料 ✨' : language === 'en' ? 'FREE ✨' : '免費自取 ✨'}
                            </span>
                          </div>
                          
                          <div className="pt-8 border-t-4 border-cake/10 flex justify-between items-end">
                            <div>
                              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-berry/40 mb-1">
                                {language === 'ko' ? '총 합계금액' : language === 'ja' ? '総合計' : language === 'en' ? 'Grand Total' : '實選總額'}
                              </p>
                              <p className="text-xs font-bold italic text-ink/40">Sweets for your soul.</p>
                            </div>
                            <motion.div 
                              key={finalTotal}
                              animate={{ scale: [1, 1.15, 1] }}
                              transition={{ type: 'keyframes', duration: 0.4 }}
                              className="text-4xl font-display font-bold tracking-tighter text-berry"
                            >
                              {convertPrice(finalTotal)}
                            </motion.div>
                          </div>

                          {renderCouponBonusCard()}
                        </div>

                        <div className="p-6 bg-cake/10 rounded-[2.5rem] border-4 border-white shadow-inner">
                          <p className="text-[8px] font-black uppercase tracking-widest text-[#4B2E1E]/20 italic mb-1">Healing Note</p>
                          <p className="text-xs font-bold text-[#4B2E1E]/40 leading-snug">Every cake is baked with 100% love from the heart. 🍰✨</p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <button 
                          onClick={() => {
                            if (isInvalidStandaloneGiftbox) {
                              alert(language === 'zh' ? '⚠️ 自選禮盒不可單獨結帳，必須搭配至少任一蛋糕商品喔！' : '⚠️ Standalone gift boxes cannot be purchased alone. Please select a cake!');
                              return;
                            }
                            setIsCheckingOut(true);
                          }}
                          className={cn(
                            "w-full py-7 rounded-[2.5rem] text-sm font-black tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md",
                            isInvalidStandaloneGiftbox 
                              ? "bg-red-400 text-white cursor-not-allowed opacity-80" 
                              : "bg-berry text-white hover:bg-ink shadow-[0_20px_40px_-10px_rgba(255,107,157,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                          )}
                        >
                          <span>
                            {isInvalidStandaloneGiftbox 
                              ? (language === 'zh' ? '⚠️ 禮盒不可單獨購買' : '⚠️ No Standalone Box') 
                              : `${t('cart_checkout')} 💖`}
                          </span>
                          <ArrowRight size={18} />
                        </button>
                        <p className="text-[9px] text-center font-black text-[#4B2E1E]/10 uppercase tracking-[0.4em]">
                          Pieces of Cake.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
          
          {/* Detail Dialog for Selected Cart Item */}
          <AnimatePresence>
            {activeDetailItem && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveDetailItem(null)}
                  className="fixed inset-0 bg-ink/50 backdrop-blur-md z-[500]"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: "-47%", x: "-50%" }}
                  animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.9, y: "-47%", x: "-50%" }}
                  className="fixed top-1/2 left-1/2 z-[501] w-[88vw] max-w-lg bg-cake rounded-[3.5rem] border-8 border-white overflow-hidden shadow-[0_32px_64px_-12px_rgba(42,35,35,0.4)]"
                >
                  <div className="p-8 pb-4 flex justify-between items-center text-ink shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl animate-pulse">✨</span>
                      <div>
                        <h3 className="text-2xl font-display font-bold italic">
                          {language === 'ko' ? '처방전 보기' : language === 'ja' ? '仕様の詳細' : language === 'en' ? 'Healing Details' : '客製配方細節'}
                        </h3>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-berry/60">{t('item_details')}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveDetailItem(null)}
                      className="p-3 bg-white text-ink border-2 border-cake/20 rounded-full hover:bg-berry hover:text-white transition-all shadow-md"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-8 pt-4 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                    <div className="bg-white/60 p-6 rounded-[2.5rem] border-4 border-white flex gap-5 items-center">
                      <div className="w-16 h-16 bg-cake rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0">
                        {getProductEmoji(activeDetailItem.id, activeDetailItem.name)}
                      </div>
                      <div>
                        <h4 className="text-xl font-display font-bold text-ink italic leading-tight">{activeDetailItem.name}</h4>
                        <p className="text-xs font-bold text-berry mt-0.5">{convertPrice(activeDetailItem.price)}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-black tracking-widest uppercase text-berry/60 px-2 block">
                        📝 {t('item_details')}
                      </span>
                      
                      <div className="bg-white rounded-[2rem] border-4 border-white overflow-hidden text-sm divide-y divide-cake/10 shadow-sm">
                        {!(activeDetailItem.id?.startsWith('giftbox-') || activeDetailItem.boxStyle) ? (
                          <>
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">尺寸 Size</span>
                              <span className="font-black text-ink">{activeDetailItem.size || '6"'}</span>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">蠟燭 Candle</span>
                              <span className="font-black text-ink">
                                {!activeDetailItem.candleType || activeDetailItem.candleType === 'none'
                                  ? '不需蠟燭'
                                  : activeDetailItem.candleType === 'classic' 
                                    ? '經典蠟燭' 
                                    : `數字蠟燭 (${activeDetailItem.candleNumber || ''})`}
                              </span>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">餐具餐盤 Cutlery</span>
                              <span className="font-black text-ink">{activeDetailItem.cutleryCount || 0} 組</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">包裝盒 Styles</span>
                              <span className="font-black text-ink">{activeDetailItem.boxStyle}</span>
                            </div>
                             {((activeDetailItem.packedItemNames && activeDetailItem.packedItemNames.length > 0) || activeDetailItem.packedItemName) && (
                               <div className="p-4 flex flex-col bg-white/50 bg-[#EB9FB0]/5 text-berry gap-1 text-left">
                                 <span className="font-semibold text-[10px] text-berry/60 uppercase tracking-widest pl-1">裝填商品 Packed</span>
                                 <div className="flex flex-col gap-1 pl-1">
                                   {activeDetailItem.packedItemNames && activeDetailItem.packedItemNames.length > 0 ? (
                                     activeDetailItem.packedItemNames.map((name: string, i: number) => (
                                       <span key={i} className="font-black text-ink text-xs">🍰 {name}</span>
                                     ))
                                   ) : (
                                     <span className="font-black text-ink text-xs">🍰 {activeDetailItem.packedItemName}</span>
                                   )}
                                 </div>
                               </div>
                             )}
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">手寫卡片 Card</span>
                              <span className="font-black text-ink">
                                {activeDetailItem.cardStyle || '免費贈送'} {activeDetailItem.cardSticker && `(${activeDetailItem.cardSticker})`}
                              </span>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">收件人 Recipient</span>
                              <span className="font-black text-ink">{activeDetailItem.recipient || '無指定'}</span>
                            </div>
                            {activeDetailItem.sender && (
                              <div className="p-4 flex justify-between items-center bg-white/50">
                                <span className="font-bold text-ink/40">寄件人 Sender</span>
                                <span className="font-black text-ink">{activeDetailItem.sender}</span>
                              </div>
                            )}
                            {activeDetailItem.cardSeal && (
                              <div className="p-4 flex justify-between items-center bg-white/50">
                                <span className="font-bold text-ink/40">封蠟印記 Wax Seal</span>
                                <span className="font-black text-ink">{activeDetailItem.cardSeal}</span>
                              </div>
                            )}
                            <div className="p-4 flex flex-col bg-white/50 space-y-2">
                              <span className="font-bold text-ink/40">卡片手寫內容 Card Content</span>
                              <p className="font-medium text-ink bg-cake/20 p-3 rounded-xl border border-white/55 italic whitespace-pre-wrap">
                                {activeDetailItem.cardContent || '「空白無填寫內容」'}
                              </p>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">氛圍燈飾 Lights</span>
                              <span className="font-black text-ink">
                                {activeDetailItem.addons?.lights ? '加購 (NT$ 50)' : '無加購'}
                              </span>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-white/50">
                              <span className="font-bold text-ink/40">乾燥花一枝(隨機) Flower Addon</span>
                              <span className="font-black text-ink">
                                {activeDetailItem.addons?.candle ? '加購 (NT$ 120)' : '無加購'}
                              </span>
                            </div>
                          </>
                        )}

                        <div className="p-4 flex flex-col bg-white/50 space-y-2">
                          <span className="font-bold text-ink/40">{t('item_remarks')}</span>
                          <p className="font-medium text-ink/80 bg-cake/20 p-3 rounded-xl border border-white/55 whitespace-pre-wrap">
                            {activeDetailItem.remarks || t('item_none')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-2 shrink-0">
                    <button
                      onClick={() => setActiveDetailItem(null)}
                      className="w-full bg-berry text-white py-5 rounded-[2rem] text-xs font-black tracking-widest uppercase hover:bg-ink transition-all shadow-md"
                    >
                      CLOSE 關閉
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
