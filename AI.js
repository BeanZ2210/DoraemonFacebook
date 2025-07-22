require("dotenv").config();
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "HuggingFaceH4/zephyr-7b-beta"; // Model chắc chắn hỗ trợ API
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

    const output = response.data[0]?.generated_text;
    return output ? output.replace(prompt, "").trim() : "Khó nói quá mấy ní";
  } catch (err) {
    console.error("❌ Lỗi hỏi AI:", err.response?.data || err.message);
    return "Kêu khứa An bảo trì tui cái đi mấy ní";
  }
}

module.exports = { askAI };
