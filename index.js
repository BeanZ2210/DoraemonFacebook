const { Client, GatewayIntentBits } = require('discord.js');
const { exec } = require('child_process');
const fs = require('fs');

const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('🌐 Web server running.'));


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


client.once('ready', () => {
  console.log(`Working: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Chỉ xử lý link Facebook
  const url = message.content.split(/\s+/).find(word =>
    word.includes('facebook.com') || word.includes('fb.watch')
  );

  if (url) {
    const command = `yt-dlp -f best[ext=mp4]/best -o fb_video.mp4 "${url}"`;

    exec(command, async (err, stdout, stderr) => {
      if (err || !fs.existsSync('fb_video.mp4')) {
        console.error('❌ Tải thất bại:', stderr || err.message);
        return; // Không gửi gì nếu lỗi
      }

      const stats = fs.statSync('fb_video.mp4');
      const fileSizeMB = stats.size / (1024 * 1024);

      if (fileSizeMB <= 24.5) {
        await message.channel.send({ files: ['fb_video.mp4'] });
      }

      fs.unlinkSync('fb_video.mp4'); // Xóa file sau khi gửi hoặc bỏ qua
    });
  }
});

client.login(process.env.TOKEN);
