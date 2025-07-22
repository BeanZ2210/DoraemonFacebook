// gemini.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Khởi tạo AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Hàm hỏi AI
async function askGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error("❌ Gemini Error:", err.message);
    return "Kêu khứa An bảo trì tui cái mấy ní ơi";
  }
}

module.exports = { askGemini };
