const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'leave',
    category: 'music',
    run: async (client, message, args, distube) => {
        try {
            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(' Vào voice đê! <:worry_sad_uong_sua:941685634500821022>')
            if (!message.member.voice.channel) return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
            distube.voices.get(message).leave()
            const embed2 = new MessageEmbed()
            .setColor('GREEN')
            .setDescription("Cyaaaaaaa💤!!")
            message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}})
        }catch (e) {
            console.error(e)
            console.log(e)
            message.reply('Mình bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍 ')
            }
    }
}
