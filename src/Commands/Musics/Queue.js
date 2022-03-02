const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'queue',
  aliases: ['q'],
  category: 'music',
  run: async (client, message, args, distube) => {
    try{
      const queue = distube.getQueue(message)
  if (!queue) {
    const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription("<:dau_x:948505103030165544> Không có bài hát nào được phát!")
    message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
  } else {
    const embed2 = new MessageEmbed()
        .setColor('GREEN')
        .addField(`Hàng chờ nhạc hiện tại:`, `${queue.songs
          .map((song, id) => `**${id ? id : "Đang phát"}**. ${song.name} - \`${song.formattedDuration}\``)
          .slice(0, 10)
          .join("\n")}`, true)
    message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}})
  }
}catch (e) {
  console.error(e)
  console.log(e)
  message.reply('Mình bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍 ')
  }
}
}