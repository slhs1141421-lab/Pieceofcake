import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, Language } from './translations';

export type Currency = 'TWD' | 'USD' | 'JPY';

export interface UserProfile {
  name: string;
  email: string;
  points: number;
  isLoggedIn: boolean;
  historyOrders?: Array<{
    id: string;
    productName: string;
    priceTwd: number;
    date: string;
    specs: string;
  }>;
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  user: UserProfile | null;
  loginUser: (email: string, password: md5OrPlainString) => boolean;
  registerUser: (name: string, email: string, password: md5OrPlainString) => boolean;
  logoutUser: () => void;
  convertPrice: (priceValue: number | string) => string;
  t: (key: string) => string;
}

type md5OrPlainString = string;

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('cake_language');
    return (saved as Language) || 'zh';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('cake_currency');
    return (saved as Currency) || 'TWD';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cake_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cake_language', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('cake_currency', curr);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('cake_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cake_active_user');
    }
  }, [user]);

  // Translate lookup helper
  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] as Record<string, string>;
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback search in 'zh'
    const zhDict = TRANSLATIONS.zh as Record<string, string>;
    return zhDict[key] || key;
  };

  // Convert TWD price based on current currency exchange rates (always TWD since canceled)
  const convertPrice = (priceInput: number | string): string => {
    let rawTwd = 0;
    if (typeof priceInput === 'number') {
      rawTwd = priceInput;
    } else {
      // Extract numeric digits from string (e.g. "NT$ 280" => 280)
      const numString = priceInput.replace(/[^0-9]/g, '');
      rawTwd = parseInt(numString, 10) || 0;
    }

    return `NT$ ${rawTwd.toLocaleString()}`;
  };

  // Register user in store (localStorage simulation)
  const registerUser = (name: string, email: string, password: md5OrPlainString): boolean => {
    if (!name || !email || !password) return false;
    
    const dbKey = 'cake_registered_users';
    const existingUsersRaw = localStorage.getItem(dbKey);
    let users = [];
    if (existingUsersRaw) {
      try {
        users = JSON.parse(existingUsersRaw);
      } catch {
        users = [];
      }
    }

    // Check pre-existence
    const userAlreadyExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (userAlreadyExists) {
      alert('該帳戶已被註冊，請直接登入！\nThis account has already been registered. Please login.');
      return false;
    }

    const newUserObj = {
      name,
      email: email.toLowerCase(),
      password,
      points: 200, // Gift initial 200 points for signing up!
      historyOrders: [
        {
          id: 'order-101',
          productName: '「春の訪れ」經典烘焙喜餅禮盒',
          priceTwd: 850,
          date: '2026-05-18',
          specs: '盒風: 典雅緞帶白卡紙盒, 卡片內容: 祝我們幸福快樂！'
        }
      ]
    };

    users.push(newUserObj);
    localStorage.setItem(dbKey, JSON.stringify(users));

    // Sign them in
    setUser({
      name: newUserObj.name,
      email: newUserObj.email,
      points: newUserObj.points,
      isLoggedIn: true,
      historyOrders: newUserObj.historyOrders
    });

    return true;
  };

  // Login user in store
  const loginUser = (email: string, password: md5OrPlainString): boolean => {
    if (!email || !password) return false;

    const dbKey = 'cake_registered_users';
    const existingUsersRaw = localStorage.getItem(dbKey);
    let users: any[] = [];
    
    if (existingUsersRaw) {
      try {
        users = JSON.parse(existingUsersRaw);
      } catch {
        users = [];
      }
    }

    // Include a default seed user so there's always one if they want to test!
    if (users.length === 0) {
      const defaultUser = {
        name: '甜點廚藝大師 櫻花',
        email: 'chef@pieceofcake.com',
        password: 'password123',
        points: 850,
        historyOrders: [
          {
            id: 'order-102',
            productName: '「情緒解放」客製自選曲奇禮盒',
            priceTwd: 1280,
            date: '2026-05-19',
            specs: '盒風: 霧面森林墨綠鐵盒, 附帶溫馨夜燈, 加購乾燥花一枝(隨機), 特製備註: 送給最辛苦的自己'
          }
        ]
      };
      users.push(defaultUser);
      localStorage.setItem(dbKey, JSON.stringify(users));
    }

    // Try finding username & pass
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (matched) {
      setUser({
        name: matched.name,
        email: matched.email,
        points: matched.points || 150,
        isLoggedIn: true,
        historyOrders: matched.historyOrders || []
      });
      return true;
    } else {
      alert('電子信箱或密碼錯誤！請多試一次，或者註冊新帳戶 🥧\nIncorrect email or password. Please try again or create an account!');
      return false;
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <ShopContext.Provider 
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        user,
        loginUser,
        registerUser,
        logoutUser,
        convertPrice,
        t
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
