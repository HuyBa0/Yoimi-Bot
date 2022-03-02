const { MessageEmbed} = require('discord.js')
module.exports = {
    name: "autoplay",
    run: async (client, message, args, distube) => {
        const embed = new MessageEmbed()
            .setColor('RED')
            .setDescription('<:dau_x:948505103030165544> Playlist làm gì có nhạc mà autoplay -.-, baka~')
        const queue = distube.getQueue(message)
        if (!queue) return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}
        })
        try {
            const mode = distube.toggleAutoplay(message)
            const embed2 = new MessageEmbed()
            .setColor(`GREEN`)
            .setDescription("Đã `" + (mode ? "Bật" : "Tắt") + "` tự động phát bài mới. \ 😊")
            message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}
            })
        } catch (e) {
            console.error(e)
            console.log(e)
            message.reply('Mình bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍 ')
        }
    },
};