// ai.js
require("dotenv").config();
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "HuggingFaceH4/zephyr-7b-alpha"; // ✅ Model đã kiểm tra
const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;

async function askAI(prompt) {
  try {
    const res = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generated = res.data[0]?.generated_text;
    return generated ? generated.replace(prompt, "").trim() : "Khó nói ghê á";
  } catch (err) {
    console.error("❌ Lỗi hỏi AI:", err.response?.data || err.message);
    return "Kêu khứa An bảo trì tui cái đi mấy ní ơi";
  }
}

module.exports = { askAI };
