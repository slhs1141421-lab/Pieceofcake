# 🚀 部署 Piece of Cake 甜點店至 Render.com 指南

本指南將引導您如何將此專案打包、上傳，並在 **Render.com** 上成功部署為一個可公開存取的 Full-Stack (Node/Express + React) 雲端網頁服務。

---

## 📅 第一步：從 AI Studio 匯出專案

在 Google AI Studio 介面的右上方，點選 **齒輪設定 (Settings)** 圖標：
1. 點擊 **"Export to GitHub"**（直接匯出至您的 GitHub 帳戶，最推薦！），此操作會在您的 GitHub 上建立一個新的儲存庫。
2. 或點擊 **"Download ZIP"** 下載專案壓縮檔，手動解壓縮後上傳至您自己的 GitHub 儲存庫。

---

## 🛠️ 第二步：我們已經為您做好的準備運作

為了讓專案能在 Render.com 完美執行，我已經完成以下修改：
1. **動態連接埠啟用 (`server.ts`)**：將原本寫死的 Port 3000 修改為 `process.env.PORT || 3000`。如此一來，Render 即可動態為服務分配對外的通訊閘（通常是預設連接埠 `10000`）。
2. **Node 版本宣告 (`package.json`)**：加入了 `"engines": { "node": ">=18.0.0" }`，確保編譯與執行期間均使用最新的穩定 Node.js 執行階段。
3. **雲端藍圖設定 (`render.yaml`)**：在根目錄新增了 Render 專用的宣告檔案。當您將儲存庫連結至 Render 時，它會**全自動**偵測所有關鍵設定：
   - 專案類型：`Web Service`（全端網頁服務）
   - 建置指令 (Build Command)：`npm run build`
   - 啟動指令 (Start Command)：`npm start`

---

## 🌐 第三步：在 Render.com 上部署

1. 登入 [Render.com](https://render.com/)（可使用您的 GitHub 帳號一鍵註冊登入）。
2. 在右上角點選 **"New"** ➔ 選擇 **"Blueprint"** (藍圖部署)。
3. 連結您的 GitHub 帳號並選擇剛才匯入的專案儲存庫（如 `piece-of-cake-bakery`）。
4. Render 讀取到根目錄的 `render.yaml` 後，會自動為您載入所有最佳配置：
   - **Service Name** / **Project Name**：建議維持預設
   - **Branch**：預設為 `main` (或您的預設分支)
5. 點選 **"Approve" (核准部署)**，專案便會開始進入排隊編譯、建置與部署。

---

## 🔑 第四步：設定 API 金鑰以啟用 AI 聊天客服

為了讓您的 AI 客服在生產環境中繼續發揮作用，您需要將 API 金鑰輸入 Render 控制台：
1. 在該 Web Service 部署頁面左側選單中，點選 **"Environment"**。
2. 點擊 **"Add Environment Variable"** (新增環境變數)：
   - **Key**：`GEMINI_API_KEY`
   - **Value**：*填入您的 Gemini API Key*（可以從 Google AI Studio 獲取）
3. 點擊 **"Save Changes"**。網頁服務將會重新安靜重啟，完成後 AI 客服將會完美上線！

---

祝您的療癒系甜點店雲端之旅順利、顧客絡繹不絕！🏼🍰✨
