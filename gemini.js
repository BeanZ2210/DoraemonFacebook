// gemini.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Kiểm tra API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Mua API mới đi,hết ròu :>");
  return "Kêu khứa An bảo trì tui cái mấy ní ơi";
}

// Khởi tạo GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Hàm gọi Gemini AI
async function askGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // API mặc định là v1
    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      throw new Error("Khó nói");
    }

    const text = result.response.text();
    return text?.trim() || "Không có nội dung trả về từ Gemini!";
  } catch (err) {
    console.error("❌ Gemini Error:", err.message || err);
    return "Kêu khứa An bảo trì tui cái mấy ní ơi";
  }
}

module.exports = { askGemini };
