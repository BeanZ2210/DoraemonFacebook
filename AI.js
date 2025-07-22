require("dotenv").config();
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "tiiuae/falcon-7b-instruct"; // ✅ Model hỗ trợ inference API
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
    if (!generated) return "Khó nói ghê á";

    return generated.replace(prompt, "").trim();
  } catch (err) {
    console.error("❌ Lỗi hỏi AI:", err.response?.data || err.message);
    return "Kêu khứa An bảo trì tui cái đi mấy ní ơi";
  }
}

module.exports = { askAI };
