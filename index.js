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
const chao=[
  (message) => `Hello! ${message.author.username}`,
  (message) => `Chào! ${message.author.username}`,
  (message) => `Hi! ${message.author.username}`,
  (message) => `Hí lâu ní ${message.author.username}`,
  "Vui nhỉ :>",
  "Chắc là lần đầu mình gặp mặt!",
  "Lâu rồi không gặp!",
];
  const vao=[
    (message) => `Zô dới ${message.author.username} kìa mấy ní`,
    "Doraemon tới chơi chung nè",
    "Zô đâu dậy!",
    "Cho chơi ké đi",
    "Game nào để còn vào",
    "Thắng thua là chuyện bình thường , đừng buồn :(",
    "Zô từ chiều!",
  ];
    const ngu=[
    "Good night luôn!",
    "Buồn rồi chứ gì :>",
    (message) => `${message.author.username} ngu quai`,
    "Ngủ đi khuya lắm rồi!",
  ];
    const gg=[
      "GG! Hôm nay chơi tốt lắm",
      "GG! Mọi phiền muộn sẽ biến tan sau một giấc ngủ",
      "GG! Well Play",
      "GG! Nay hoặc Mai là một ngày tuyệt, đừng để cảm giác buồn bã chiếm lấy cả hai",
      "GG! Thiếu tui thiếu vui",
      "Ai lấy túi thần kỳ mất tiêu rồi ta",
      "Gi Gi mít tơ bít",
  ];
    const khen=[
      "Ghê dợ",
      "Thua tui có chút xíu à",
      "Chuyện thường ngày",
      "Quao",
      "Hay đó",
      "Được đó chứ",
  ];
    const troll=[
      "Hay là mình giao lưu tí đi",
     (message) => `Ô, chúc mừng ${message.author.username} Top #01 TD`,
      (message) => `Doraemon > ${message.author.username}`,
    ];
    const tag=[
      "Gì á",
      "Quát đu du quăn",
      "Muốn gặp Dorami hả","Đời tôi cô đơn nên yêu ai cũng cô đơn",
      "Mượn bảo bối gì nà",
    ];
    const tagvo=[
        "Mon không có máy tính , đang lấy video facebook cho mấy khứa để kiếm tí tiền , hay là ủng hộ xíu đi https://playerduo.net/nayurai",
    ];
    const tagvar=[
        "Muốn sao đây",
        "Đổ xăng hay đổ máu",
        "Xin cái hẹn",
        "~Pew ~Pew",
        "Thua cái đổi thừa"
      ];
    const loikhuyen = [
  'Hãy tưởng tượng bạn là 1 dấu "." vì cho dù bạn không làm được gì thì bạn vẫn có thể . hết',
  "Doraemon khuyên bạn đừng nên mở mắt khi đang ngủ",
  "Ngủ đủ 8 tiếng 1 ngày sẽ tăng cường kĩ năng đấu súng của bạn",
  "Kết hợp cánh tay và cổ tay khi di chuột sẽ tăng độ cơ động và chính xác",
  'Nếu buồn, hãy ăn bánh rán. Nếu vẫn buồn thì ăn thêm cái nữa.',
  'Cứ đi ngủ đi, biết đâu ngày mai tỉnh dậy bạn lại thành nhân vật chính.',
  'Hôm nay thua không sao, vì Nobita còn thua suốt mà vẫn sống vui vẻ.',
  'Bạn không cần giỏi, chỉ cần dễ thương như Doraemon(me) là đủ rồi.',
  'Cuộc sống giống như túi thần kỳ vì không biết rút ra cái gì, nên luôn phải tự xử',
  'Thắng hay thua không quan trọng, miễn là có lý do để ngủ sớm hehe',
  'Nếu bạn cảm thấy vô dụng, hãy nhớ là ống nhòm phía sau lưng vẫn dùng được',
  'Bạn nghĩ mình không có vai trò? Nếu vậy thì bạn giống như dây sạc, ai cũng chỉ nhớ tới khi hết pin',
  'Bạn không cần phải tỏa sáng, miễn là bạn không làm người khác cháy nắng',
  'Đôi khi chỉ cần bạn tồn tại, là đủ để người khác không thấy cô đơn rồi',
  'Cây bút gãy vẫn có thể làm phi tiêu, miễn là đúng người dùng nó',
  'Nếu bạn không nổi bật, thì bạn cũng giống như một con ốc vít – nhỏ nhưng thiếu là banh hết'
];

  const randomchao = chao[Math.floor(Math.random() * chao.length)];
  const randomVo = vao[Math.floor(Math.random() * vao.length)];
  const randomGG = gg[Math.floor(Math.random() * gg.length)];
  const randomNgu = ngu[Math.floor(Math.random() * ngu.length)];
  const randomKhen = khen[Math.floor(Math.random() * khen.length)];
  const randomTr = troll[Math.floor(Math.random() * troll.length)];
  const randomtag = tag[Math.floor(Math.random() * tag.length)];
  const randomtagv = tagvo[Math.floor(Math.random() * tagvo.length)];
  const randomloikhuyen = loikhuyen[Math.floor(Math.random() * loikhuyen.length)];
  const randomtagvar = tagvar[Math.floor(Math.random() * tagvar.length)];
  
  // ✅ Trả lời khi ai đó nói "hello"
  if (message.mentions.has(client.user) && ['zo','Zo','do','Do','vao','zao','go','may','m'].some(w => content.includes(w))) {
    message.reply(randomtagv);
  }
  else if (message.mentions.has(client.user)) {
    message.reply(randomtag);
  }
    else if (
  message.mentions.has(client.user) &&
  ['ngu', 'ga', 'non', 'noob', 'ngoc', 'ngok', 'chicken', 'gà'].some(w => content.includes(w))
) {
  message.reply(randomtagvar);
}
  
  else if (['hi', 'hello', 'chào', 'yo', 'ping' , 'chao',].some(w => content.includes(w))) {
  await message.reply(randomchao);
}
 else if (content === 'ngu' || content.includes('ngu')) {
    await message.reply(randomNgu);
    return;
  }
  else if (content === 'gg' || content.includes('gg') || content === 'GG' || content.includes('GG') || content === 'Gg' || content.includes('Gg')) {
    await message.reply(randomGG);
    return;
  }
  else if (['zo','Zo','do','Do','vao','zao','go'].some(w => content.includes(w))) {
  await message.reply(randomVo);
  }
  else if (['ACE','hay'].some(w => content.includes(w))) {
  await message.reply(randomKhen);
  }
  
  else if (content === 'momo' || content.includes('momo') || content === 'ck' || content.includes('ck')) {
    await message.reply(`Doraemon đã chuyển cho ${message.author.username} 20k ăn sáng`);
    return;
  }
  else if(content === '!loikhuyen' || content.includes('thua') || content.includes('dong') || content.includes('vien')){
    await message.reply(randomloikhuyen);
    return;
  }
  else if(content === 'yeu' || content === 'iu'){
    await message.reply(`Đời tôi cô đơn nên yêu ai cũng cô đơn`);
    return;
  }
  else if(content.includes('ew') || content === 'oe' || content === 'oi'){
    await message.reply(`Ghê dậy luôn á hả gái`);
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
        fs.unlinkSync('fb_video.mp4');
      }

      fs.unlinkSync('fb_video.mp4');
    } catch (err) {
    }
  }
});
if (message.content === '!stopbot' && message.author.id === '627375595487232002) {
  process.exit(0); // Dừng chương trình Node.js
}

client.login(process.env.TOKEN);
