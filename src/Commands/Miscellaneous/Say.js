const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'say',
    category: "user",
    run: async (client, message, args) => {
        const validPermissions = [
            "SEND_MESSAGE"
        ]
        
        try{ 
            const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('Bạn không có quyền dùng lệnh này =)))')
            const member = message.mentions.members.first()
            if (message.author.id !== '932796221158985758') return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}}) 
            const say = args.join(' ')
            const nosay = new MessageEmbed()
            .setColor('RED')
            .setDescription('Ghi gì đi chứ :>')
            if (!say) return message.reply({embeds: [nosay], allowedMentions: {repliedUser: false}})
            message.delete()
            message.channel.send(say)

        } catch (e) {
            console.error(e)
            console.log(e)
            message.reply('Mình bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍 ')
            }
    }
}