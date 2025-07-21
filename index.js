const { Client, GatewayIntentBits } = require('discord.js');
const ytdlp = require('yt-dlp-exec');
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
  console.log(`✅ Bot is ready: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // ✅ Trả lời khi ai đó nói "hello"
  if (['hi', 'hello', 'chào', 'yo', 'ping' , 'chao',].some(w => content.includes(w))) {
  await message.reply(`👋 Chào ${message.author.username}!`);
}
  if (content === 'ngu' || content.includes('ngu')) {
    await message.reply(`${message.author.username}! Ngu ngon`);
    return;
  }
  if (content === 'gg' || content.includes('gg') || content === 'GG' || content.includes('GG') || content === 'Gg' || content.includes('Gg')) {
    await message.reply(`GG! Hôm nay chơi tốt lắm`);
    return;
  }

  // ✅ Tìm URL Facebook trong tin nhắn
  const url = content.split(/\s+/).find(word =>
    word.includes('facebook.com') || word.includes('fb.watch')
  );

  if (url) {

    try {
      await ytdlp(url, {
        output: 'fb_video.mp4',
        format: 'best[ext=mp4]/best',
      });

      if (!fs.existsSync('fb_video.mp4')) {

      }

      const stats = fs.statSync('fb_video.mp4');
      const fileSizeMB = stats.size / (1024 * 1024);

      if (fileSizeMB <= 24.5) {
        await message.channel.send({ files: ['fb_video.mp4'] });
      } else {
      }

      fs.unlinkSync('fb_video.mp4');
    } catch (err) {
    }
  }
});

client.login(process.env.TOKEN);
