require("dotenv").config();
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;

async function askAI(prompt) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const output = response.data[0]?.generated_text || "Khó nói quá à";
    return output.replace(prompt, "").trim();
  } catch (err) {
    console.error("❌ Lỗi hỏi AI:", err.message);
    return "Kêu khứa An bảo trì tui cái đi mấy ní";
  }
}

module.exports = { askAI };
