// music.js
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
  NoSubscriberBehavior,
  VoiceConnectionStatus,
  entersState
} = require('@discordjs/voice');

const play = require('play-dl');

// Khởi tạo player và queue toàn cục
const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
const queueMap = new Map(); // key: guildId, value: array of song URLs
const connectionMap = new Map(); // key: guildId, value: voice connection

async function streamNext(guildId, channel, textChannel) {
  const queue = queueMap.get(guildId);
  if (!queue || queue.length === 0) {
    connectionMap.get(guildId)?.destroy();
    connectionMap.delete(guildId);
    return textChannel.send('Hết ròu');
  }

  const url = queue[0];
  try {
    const stream = await play.stream(url);
    const resource = createAudioResource(stream.stream, { inputType: stream.type });

    let connection = connectionMap.get(guildId);
    if (!connection) {
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId,
        adapterCreator: channel.guild.voiceAdapterCreator
      });
      connectionMap.set(guildId, connection);
      await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    }

    connection.subscribe(player);
    player.play(resource);
    textChannel.send(`Đang phát: ${url}`);
  } catch (err) {
    console.error('Lỗi khi phát:', err);
    queue.shift();
    streamNext(guildId, channel, textChannel);
  }
}

player.on(AudioPlayerStatus.Idle, (_, reason) => {
  for (const [guildId, conn] of connectionMap.entries()) {
    const queue = queueMap.get(guildId);
    if (queue && queue.length > 0) {
      queue.shift(); // bỏ bài hiện tại
      const channel = conn.joinConfig.channelId;
      const guild = conn.joinConfig.guildId;
      const textChannel = conn.client.channels.cache.find(c => c.guild.id === guild && c.isTextBased());
      const voiceChannel = conn.client.channels.cache.get(channel);
      if (voiceChannel && textChannel) {
        streamNext(guild, voiceChannel, textChannel);
      }
    }
  }
});

async function handleCommand(message) {
  const { content, member, guild, channel } = message;
  const voiceChannel = member.voice.channel;
  const guildId = guild.id;

  if (content.startsWith('!play ')) {
    const url = content.slice(6).trim();
    if (!voiceChannel) return message.reply('Vào kênh đi ní');

    if (!queueMap.has(guildId)) queueMap.set(guildId, []);
    const queue = queueMap.get(guildId);
    queue.push(url);

    if (player.state.status !== AudioPlayerStatus.Playing) {
      streamNext(guildId, voiceChannel, channel);
    } else {
      message.reply(`Thêm vào hàng chờ: ${url}`);
    }
  }

  else if (content === '!pause') {
    player.pause();
    message.reply('Sao dừng rồi');
  }

  else if (content === '!resume') {
    player.unpause();
    message.reply('Tiếp tục nè');
  }

  else if (content === '!skip') {
    player.stop(); // Auto trigger chuyển bài trong 'Idle'
    message.reply('Bài tiếp theo');
  }

  else if (content === '!leave') {
    const conn = connectionMap.get(guildId);
    if (conn) conn.destroy();
    connectionMap.delete(guildId);
    queueMap.delete(guildId);
    message.reply('Chán xong đuổi');
  }

  else if (content === '!stop') {
    player.stop();
    queueMap.delete(guildId);
    message.reply('Reset lại từ đầu');
  }

  else if (content === '!playlist') {
    const queue = queueMap.get(guildId);
    if (!queue || queue.length === 0) {
      message.reply('Không có gì hết');
    } else {
      const list = queue.map((url, i) => `${i + 1}. ${url}`).join('\n');
      message.reply(`📀 Playlist:\n${list}`);
    }
  }
}

module.exports = { handleCommand };
