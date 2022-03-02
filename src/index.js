//Ba0 (Uzu) khong tu lam het code nhung cung da them that nhung thu can thiet
const { Client, Intents, Collection } = require('discord.js');
const DisTube = require('distube')
const {SoundCloudPlugin} = require('@distube/soundcloud')
const {SpotifyPlugin} = require('@distube/spotify')
const config  = require('./Data/config.json');
const PlayMusic = require('./Events/PlayMusic')


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ]
});
module.exports = client;

const distube = new DisTube.default(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 20,
	leaveOnFinish: false,
	leaveOnStop: false,
	plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
})

client.once('ready', () => {
	console.log(`${client.user.username} vao roi nha`);

  client.user.setStatus('online');
  client.user.setActivity(`Mình đang ở trong ${client.guilds.cache.size} Servers ✨`, { type: 'PLAYING' });

  client.commands = new Collection();
  client.aliases = new Collection();

  ['cmd.js'].forEach(handler => {
		require(`../handlers/${handler}`)(client);
	});

  PlayMusic(distube)
});


client.on('messageCreate', (message, async) => {
  if (!(message.content.toLowerCase()).startsWith(config.prefix)) return
  function check(perm) {
    if (message.channel.permissionsFor(client.user.id).has([perm])){
      return true
    } else return false
  }
  if (!check('SEND_MESSAGES')) {
    message.author.send('> Mình không có quyền gửi tin nhắn vào kênh đó <:ganyu_cry:947467770717675531>')
    return
  } else if (!(check('EMBED_LINKS') || check('ATTACH_FILES'))) {
    message.channel.send('> Mình không có quyền gửi ảnh hoặc liên kết vào kênh này <:ganyu_cry:947467770717675531>')
    return
  }
  if (message.author.bot) return;
  if (!message.guild) return;
  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let commands = client.commands.get(cmd);
  if (!commands) commands = client.commands.get(client.aliases.get(cmd));
  if (commands) commands.run(client, message, args, distube);
})

//const keepAlive = require('./host')
//keepAlive()
client.login(config.token);