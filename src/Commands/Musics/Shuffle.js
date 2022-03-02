const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'shuffle',
    inVoiceChannel: true,
    category: 'music',
    run: async (client, message, args, distube) => {
      try {
        const embed = new MessageEmbed()
          .setColor('RED')
          .setDescription('Vào voice đê! <:worry_sad_uong_sua:941685634500821022>')
        const embed2 = new MessageEmbed()
          .setColor('RED')
          .setDescription('<:dau_x:948505103030165544> Playlist còn mỗi bài à, shuffle làm gì chứ!?')
        const queue = distube.getQueue(message)
      if (!message.member.voice.channel) return message.channel.send({embeds: [embed], allowedMentions: {repliedUser: false}})
      if (queue.songs.length == 1) return message.channel.send({embeds: [embed2], allowedMentions: {repliedUser: false}})
      distube.shuffle(message)
      const embed3 = new MessageEmbed()
          .setColor('GREEN')
          .setDescription('<a:xac_minh:948507202010877974> Đã trộn nhạc trong playlist')
        message.channel.send({embeds: [embed3], allowedMentions: {repliedUser: false}})
      }catch (e) {
        console.error(e)
        console.log(e)
        message.reply('Tớ bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍')
        }
    }
}