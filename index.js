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
  if (message.content === '!stopbot' && message.author.id === '627375595487232002') {
  process.exit(0); // Dừng chương trình Node.js
}
  const hasThreeDigits = /\d{3}/.test(message.content);
  const match = message.content.toLowerCase().match(/^(do+|vo+|zo+\^?|vao+)$/);
  const content = message.content.toLowerCase();
  const moneyMatch = content.match(/\b(cho|xin|muon|mượn)\s+(\d+(?:k)?)/);
  const mentioned = message.mentions.members.first();
  const senderName = message.member?.nickname || message.author.username;
  const isQuestion = content.endsWith('?') || content.includes(' không') || content.includes(' à') || content.includes(' hả') || content.includes(' ha') || content.includes(' khong' || content.includes(' 0') || content.includes(' ko'));
  function getName(message) {
  return message.member?.nickname || message.author.username;
}
const doraemonNames = [
  'doraemon', 'dora', 'mon', 'đô', 'đôrêmon', 'dôra', 'dorae', 'doemon','chồn','đô ra ê mon','đô rê mon','mèo ú','robot mèo'
];
  
const chao=[
  (message) => `Hello! ${getName(message)}`,
  (message) => `Chào! ${getName(message)}`,
  (message) => `Hi! ${getName(message)}`,
  (message) => `Hí lâu ní ${getName(message)}`,
  "Vui nhỉ :>",
  "Chắc là lần đầu mình gặp mặt!",
  "Lâu rồi không gặp!",
];
  const vao=[
    (message) => `Zô dới ${getName(message)} kìa mấy ní`,
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
    (message) => `${getName(message)} ngu quai`,
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
     (message) => `Ô, chúc mừng ${getName(message)} Top #01 TD`,
      (message) => `Doraemon > ${getName(message)}`,
    ];
    const tag=[
      "Gì á",
      "Quát đu du quăn",
      "Muốn gặp Dorami hả",
      "Đời tôi cô đơn nên yêu ai cũng cô đơn",
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
        "Thua cái đổi thừa",
        "Hôi lông",
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
  'Nếu bạn không nổi bật, thì bạn cũng giống như một con ốc vít,nhỏ nhưng thiếu là banh hết'
];
   const chui=[
     'Có cố gắng',
     'Hay là ăn tí bánh rán đi',
     'Đâu ai là hoàn hảo',
     'Không có gì phải buồn',
     'Vô địch',
     'いちばんいけないのは じぶんなんかだめだと思いこむことだよ',
];
  const info=[
    'Xin chào đây là Doraemon mang mã số VN8226 đến từ Vietnam',
    'Chiều cao: 129,3 cm',
    'Cân nặng: 129,3 kg',
    'Nhảy cao: 129,3 cm (khi thấy chuột)',
    'Công suất tối đa: 129.3 bhp',
    'Vòng bụng: 129,3 cm',
    'Đường kính chân: 129,3 mm',
    'Tốc độ chạy: thông thường 5 m/giây. Tối đa 129,3 km/giờ',
    'Gõ !loikhuyen để nhận lời khuyên.',
    'Gọi Doraemon nếu bạn cần cứu!',
    ];
  const answer = [
  "Có",
  "Không",
  "Tùy bạn",
  "Chắc là vậy",
  "Không chắc đâu",
  "Tui không biết nữa",
  "Mon nghĩ là bạn",
];
  const react=[
  "Wow",
  "Nhìn cưng vậy",
  "Giống tui nhỉ",
  "Đẹp trai",
  "Có nét giống tổng thống",
  "Xin info giùm",
  "Ý nghĩa thật",
  "Hôi lông",
  "Còn phần 2 không",
  "Thật tuyệt",
];
  function getReply(message, item) {
  return typeof item === 'function' ? item(message) : item;
}

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
const randomchui = chui[Math.floor(Math.random() * chui.length)];
const randomAnswer = answer[Math.floor(Math.random() * answer.length)];
const randomreact = react[Math.floor(Math.random() * react.length)];
  if (message.attachments.size > 0) {
    const hasImage = message.attachments.some(att => att.contentType?.startsWith('image/'));

    if (hasImage) {
      await message.reply(randomreact);
      return;
    }
  }
 else if (moneyMatch) {
  let amount = moneyMatch[2];

  if (!amount.includes('k') && parseInt(amount) >= 1000) {
    amount = `${parseInt(amount) / 1000}k`;
  }

  if (mentioned && mentioned.id !== client.user.id) {
    const targetName = mentioned.nickname || mentioned?.user.username || 'ai đó';
    await message.channel.send(`💸 ${targetName} vừa bị xin ${amount} từ ${getName(message)}!`);
    return;
  } else {
    await message.reply(`💸 Đã chuyển cho ${getName(message)} số tiền ${amount}`);
    return;
  }

    return;
}
    
  else if (['hi', 'hello', 'chào', 'yo', 'ping' , 'chao'].some(w => content.includes(w))) {
  await message.reply(getReply(message, randomchao));
    return;
}
    
  else if (message.mentions.has(client.user) || doraemonNames.some(name => content.includes(name))) {
      if (['ngu', 'ga', 'non', 'noob', 'ngoc', 'ngok', 'chicken', 'gà' , 'tai', 'tại' , 'kia' ,'kìa'].some(w => content.includes(w))) {
  await message.reply(getReply(message, randomtagvar));
        return;
}
   else if (match) {
    const word = match[1];
  await message.reply(getReply(message, randomtagv));
     return;
}  
   else if(['xin','muon','mượn'].some(w => content.includes(w))){
         if(['valo','valorant','valỏ','acc'].some(w => content.includes(w))){
         await message.reply(`Username: Doraemon8226 , Password: DoraemonFacebookBot8226`);      
           return;
  }}
  else if (['valo','valorant','valỏ','game'].some(w => content.includes(w))){
          await message.reply(`Kết bạn đi: DoraemonFacebook#8226`);
    return;
     }
  else if (/^[a-zA-Z]{3}\d{3}$/.test(message.content)) {
  await message.reply(randomtagv);
    
}
    else if(isQuestion){
      await message.reply(getReply(message, randomAnswer));
    return;

  }
    else {
  await message.reply(getReply(message, randomtag));
      return;
}
}
  //---------
else if (/^[a-zA-Z]{3}\d{3}$/.test(message.content)) {
    await message.reply(`Zô dới ${getName(message)} kìa mấy ní`);
  }
else if (message.content === '!info') {
  const formatted = info.join('\n');
  await message.channel.send(formatted);
  return;
}
else if(['vlk','cmm','dm','xl','memay','fuck','shut'].some(w => content.includes(w))) {
  await message.reply(getReply(message, randomchui));
  return;
}
 else if (content.includes('ngu')) {
  await message.reply(getReply(message, randomNgu));
  return;
}
else if (['gg', 'GG', 'Gg'].some(w => content.includes(w))) {
  await message.reply(getReply(message, randomGG));
  return;
}
else if (['zo','Zo','do','Do','vao','zao','go'].some(w => content.includes(w))) {
  await message.reply(getReply(message, randomVo));
  return;
}
else if (['ACE','hay'].some(w => content.includes(w))) {
  await message.reply(getReply(message, randomKhen));
  return;
}
else if (content.includes('momo') || content.includes('ck')) {
  await message.reply(`Doraemon đã chuyển cho ${message.author.username} 20k ăn sáng`);
  return;
}
else if (content === '!loikhuyen' || content.includes('thua') || content.includes('dong') || content.includes('vien')) {
  await message.reply(getReply(message, randomloikhuyen));
  return;
}
else if (content === 'yeu' || content === 'iu') {
  await message.reply(`Đời tôi cô đơn nên yêu ai cũng cô đơn`);
  return;
}
else if (content.includes('ew') || content === 'oe' || content === 'oi') {
  await message.reply(`Ghê dậy luôn á hả gái`);
  return;
}
else if([':0',':3',':)',':(',':D',':v',';v','xd'].some(w => content.includes(w))){
await message.reply(`:v`);
  return;
}
else if(content.includes('3==D') || content === '<=3'){
await message.reply(`?`);
  return;
}
  else if(content.includes('?')){
await message.reply(randomtagvar);
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


client.login(process.env.TOKEN);
