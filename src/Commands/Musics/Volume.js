const { MessageEmbed } = require("discord.js")
const maxVol = 150
module.exports = {
  name: 'volume',
  aliases: ['v'],
  category: 'music',
  run: async (client, message, args, distube) => {
    try {
      const embed3 = new MessageEmbed()
      .setColor('RED')
      .setDescription(`<:dau_x:948505103030165544> Ghi cái gì vậy trời, ghi số thôi, ghi **1** -> **${maxVol}** nhé! -.-`)
      const embed7 = new MessageEmbed()
      .setColor('RED')
      .setDescription(`<:dau_x:948505103030165544> Từ **1** -> **${maxVol}** thôi bro!`)
      const embed2 = new MessageEmbed()
      .setColor('RED')
      .setDescription('Vào voice đê! <:worry_sad_uong_sua:941685634500821022>')
      if (!message.member.voice.channel) return message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}})      
      if (isNaN(args[0])) return message.reply({embeds: [embed3], allowedMentions: {repliedUser: false}})
      const queue = distube.getQueue(message)
    const embed = new MessageEmbed()
    .setColor('RED')
    .setDescription('<:dau_x:948505103030165544> Đang không có nhạc, mở nhạc đi!')


    if (!queue) return message.channel.send({embeds: [embed], allowedMentions: {repliedUser: false}})
     if (!args[0]) {
       message.reply({embeds: [embed3]})
       return
     }else {
      if (Number(args[0]) < 0 || Number(args[0]) > maxVol) return message.channel.send({embeds: [embed7]})
      distube.setVolume(message, Number(args[0]))
      const embed5 = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`<a:xac_minh:948507202010877974> Mình đã đặt âm lượng thành: \`${queue.volume}%\``)
      message.reply({embeds: [embed5], allowedMentions: {repliedUser: false}})
    }
  }catch (e) {
    console.error(e)
    console.log(e)
    message.reply('Mình bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍')
    }
  }
}