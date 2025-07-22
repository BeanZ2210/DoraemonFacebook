require("dotenv").config();
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "HuggingFaceH4/zephyr-7b-beta"; // ✅ Model hoạt động tốt
const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;

async function askAI(prompt) {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const generated = response.data[0]?.generated_text;
    return generated ? generated.replace(prompt, "").trim() : "Không có phản hồi hợp lệ";
  } catch (err) {
    console.error("❌ Lỗi hỏi AI:", err.response?.data || err.message);
    return "AI đang bị lỗi hoặc model không hỗ trợ.";
  }
}

module.exports = { askAI };
