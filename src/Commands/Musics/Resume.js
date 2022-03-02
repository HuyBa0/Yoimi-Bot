const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'resume',
  aliases: ['unpause'],
  category: 'music',
  run: async (client, message, args, distube) => {
    try {
  const embed1 = new MessageEmbed()
    .setColor('RED')
    .setDescription('Vào voice đê! <:worry_sad_uong_sua:941685634500821022>')
  const queue = distube.getQueue(message)
  if (!message.member.voice.channel) return message.reply({embeds: [embed1], allowedMentions: {repliedUser: false}})
  if (queue) {
      distube.resume(message)
      distube.pause(message)
      distube.resume(message)
    } else if (!queue) {
      const embed = new MessageEmbed()
      .setColor('RED')
      .setDescription('<:dau_x:948505103030165544> Hông có nhạc :>')
      message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
    }
  } catch (e) {
      console.error(e)
      console.log(e)
      message.reply('Mình bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍 ')
      }
  }
}