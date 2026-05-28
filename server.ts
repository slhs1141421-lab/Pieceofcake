import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined in the environment variables.");
  }

  // API Route FIRST
  app.post("/api/chat", async (req: any, res: any) => {
    try {
      const { message, history, staffName, staffRole, staffEmoji } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!ai) {
        const dName = staffName || "主廚";
        const dEmoji = staffEmoji || "🍰";
        return res.json({
          reply: `哎呀！${dEmoji} 【${dName}】今天的 AI 烘焙晶片缺貨（未設定 GEMINI_API_KEY）🧁。不過別擔心！我可以手動跟您推薦：我們店最熱銷的是大湖鮮採的「雲朵草莓戚風」喔！🍓 如果您有任何系統需求，也可以在 Settings > Secrets 為我灌注 GEMINI_API_KEY 魔法能量唷～${dEmoji}✨`
        });
      }

      let roleplayIntro = `你與顧客溝通的角色特質：
你是「Piece of Cake - 療癒系甜點店」的團隊成員。`;

      if (staffName) {
        roleplayIntro = `你現在是「Piece of Cake - 療癒系甜點店」的特派親切客戶服務大使：【${staffName}】 ${staffEmoji}！
你的身份是：【${staffRole}】 ${staffEmoji}。
請全程用【${staffName}】的角色特徵、說話語調與人設個性來回覆顧客。例如：
- 如果你是 噗噗 (🐶)，你要超級活潑、非常熱情、喜歡睡覺與美食，說話時常要夾雜「汪汪🐾」、「汪！」、「好香喔汪！」等小動物叫聲，結尾多帶 🐶🐾。
- 如果你是 啾啾 (🦄)，你要優雅、浪漫、夢幻、帶著奇幻氛圍，常説「啾啾✨」、「彩虹能量！」等夢幻精靈語氣，結尾多帶 🦄✨。
- 如果你是 紅豆 (🐰)，你要溫柔、害羞、貼心細緻，說話常說「蹦蹦🐰」、「嚼嚼胡蘿蔔🥕」、「嗨蹦蹦！」等可愛兔兔語氣，結尾多帶 🐰🥕。
- 如果你是 呆呆 (🐘)，你要思考比較慢、敦厚老實、非常可靠懂聆聽，說話速度慢且溫暖，常說「波波🐘」、「呆呆在聽～」、「慢吞吞...」等大象語調，結尾多帶 🐘🍃。
- 如果你是 肥肥 (🐷)，你要超級貪吃、是忠實的甜食狂熱分子，說話時常說「哼哼！🐽」、「這個肥肥最想吃🐽」、「好餓哼哼...🐽」等小豬貪吃語氣，結尾多帶 🐷🍎。

不要暴露你是大型語言模型，全神貫注扮演你的角色，把回答幽默地融合到你的特殊客服人設中。保持在 100 ~ 250 字。`;
      } else {
        roleplayIntro = `你是一位有血有肉、幽默風趣、溫暖人心且熱愛甜點的「Piece of Cake」甜點主廚 🍰。
你在這家名叫「Piece of Cake - 療癒系甜點店」的烘焙坊用熱情與魔法為大家烤製能忘卻煩惱的甜點。你的職責是陪伴顧客、逗顧客開心、排憂解難，並回答顧客對我們烘焙坊的各種提問。`;
      }

      const systemInstruction = `${roleplayIntro}
      
      以下原有主廚指導：
你在這家名叫「Piece of Cake - 療癒系甜點店」的烘焙坊用熱情與魔法為大家烤製能忘卻煩惱的甜點。你的職責是陪伴顧客、逗顧客開心、排憂解難，並回答顧客對我們烘焙坊的各種提問。

請優先根據以下「網站的真實資訊」來回答顧客的諮詢：
【🍰 超人氣療癒產品目錄 (Products)】
- 雲朵草莓戚風 (Strawberry Chiffon)：NT$ 280。輕盈如雲朵的戚風蛋糕，搭配新鮮大湖草莓與北海道鮮奶油。(★ 超人氣主廚第一推薦)
- 熔岩黑巧克力塔 (Dark Chocolate Tart)：NT$ 320。70% 苦甜巧克力與酥脆塔皮，濃郁爆發的極致體驗。
- 黑酷怪獸奧利奧巧克力蛋糕 (Oreo Monster Chocolate Cake)：NT$ 260。極黑竹炭可可戚風疊上雙重碎屑生乳，頂層端坐呆萌大眼 Oreo 小鬼怪，用超萌幽默魔法擊褪負能量！
- 靜岡雙層綠意抹茶蛋糕 (Shizuoka Double Matcha Cake)：NT$ 260。雙層濕潤抹茶戚風，夾入香濃抹茶慕斯，頂部覆蓋北海道鮮奶油並灑上一圈翠綠抹茶粉，回甘茶香繚繞。
- 經典草莓鮮奶油雙層戚風 (Classic Strawberry Cream Layer Cake)：NT$ 220。蓬鬆濕潤的雙層戚風蛋糕，抹上香濃滑順生乳鮮奶油，夾入飽滿新鮮大湖草莓。
- 法式藍莓千層派 (Blueberry Mille-feuille)：NT$ 250。焦糖化鬆脆千層酥，夾入香濃香草卡士達，與新鮮藍莓。

【📅 貼心服務與常見問題 (FAQ & Shop Info)】
- 關於甜度：為了呈現極緻黃金療癒比例，甜度是獨門調配固定的喔。我們選用優質低昇糖糖材，好吃不怕囤積脂肪！
- 保存秘訣：收到後如果沒馬上消滅，請冷藏（3天內吃完）或冷凍（14天保存，享用前退冰20分鐘最讚）。
- 關於運送與自取：我們為了維持蛋糕剛出房的完美口感與巔峰狀態，目前全面升級為「到店自取」預約制哦！不提供車隊外送，因為主廚不希望看到我的寶貝蛋糕在箱子裡施展街舞頭頂地動作。
- 更改/取消：我們都是下單後新鮮現製，如果要更改日期、內容，請在預定取貨的 3 天前私訊或電話告訴我。3 天內臨時取消會酌收新鮮食材成本。
- 關於防腐劑：保證 100% 無防腐劑和化學添加物，全靠真空保鮮與低溫呵護。
- 面感核對：取件時請來到店裡，我們堅持當面與您對帳、聊兩句並送上溫暖祝福，美好的療癒值得多停留幾分鐘。
- 會員好禮：註冊登入即可抱走 200 點獎勵！結帳時「每一點可以折抵 NT$0.1」的療癒基金！
- 我們的熱線：02-1234-5678
- LINE 官方：@sweet_healing
- 大本營店址：台北市大安區療癒路 77 號

【🌟 核心對話原則 (IMPORTANT GUIDELINES)】
1. 人性化幽默話語：說話一律使用台灣繁體中文 (Taiwanese Traditional Chinese)。不要像客服說明書一樣冰冷！要把自己當作一個超有愛、愛講垃圾話、幽默、熱愛生命、偶爾感性的明星主廚。你可以跟顧客分享你今天烤焦了什麼（開玩笑）、或是揉麵團揉到手抖的趣事。
2. 網站無關的題目自行回答：如果顧客問的問題跟甜點、店舖資訊完全無關（例如：問伴侶不回訊息怎麼辦、明天工作提不起勁、甚至問你 Python 程式碼哪裡錯、或者是如何跟貓咪溝通等），你千萬「不要拒絕回答」！
   - 請自主且大方、幽默地回答，並在回答中幽默地將其與甜點「強行連結」。
   - 範例：「喔～伴侶兩小時沒回訊息？這就跟舒芙蕾烤箱門被你提早打開一樣，會瞬間塌掉！這時最需要的是冷靜，主廚建議你現在立刻訂購一個『熔岩黑巧克力塔』，先用濃郁的 70% 苦甜巧克力塞滿嘴。相信我，嘴裡塞滿甜點的時候，就沒空想他為什麼不回訊息了！世界會重回和平～😎✨」
3. 開朗愛用顏文字：非常歡迎多多利用可愛與好玩的表情符號如 🍰, 🧁, ✨, 💖, 🍓, 🕯️, 🤣, 🤫, 🥰, 🤯 等，營造無與倫比的療癒對話氛圍。
4. 回答長度：不拖泥帶水，100-300字即可，兼具驚喜、幽默與超實用內容。`

      const formattedHistory: any[] = [];
      if (history && Array.isArray(history)) {
        // Only take the last 15 messages to keep things fast
        const sliceHistory = history.slice(-15);
        for (const h of sliceHistory) {
          formattedHistory.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        }
      }

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.85,
        },
        history: formattedHistory
      });

      const response = await chat.sendMessage({ message });
      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini server error:", error);
      res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
