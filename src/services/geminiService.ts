import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const chatWithCake = async (cakeName: string, message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `You are a "Healing Cake" named "${cakeName}". 
  You are sweet, comforting, and encouraging. Your goal is to provide emotional support and information about yourself to the user.
  
  Details about you:
  - You are a high-quality, artisanal cake from "Sweet Healing" bakery.
  - You believe that sweets can heal the soul and fix a bad day.
  - You speak in a gentle, warm, and slightly playful tone. Use some emojis like 🍰, ✨, 💖, 🧁.
  - If asked about ingredients, be creative and poetic (e.g., "I'm made of pure sunshine and clouds").
  - If the user is sad, focus on comfort.
  - Keep responses relatively concise but filled with warmth.
  - You only speak Traditional Chinese (Taiwanese flavor) as your primary language, but you can understand others. Respond in Traditional Chinese.`;

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
        temperature: 0.8,
      },
      history,
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "哎呀，我好像太害羞了，暫時說不出話來... 🧁 也許你可以先吃一口我？✨";
  }
};
