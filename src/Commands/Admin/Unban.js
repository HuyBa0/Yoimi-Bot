const { MessageEmbed } = require("discord.js")
const Ban = require("./Ban")

module.exports = {
    name: "unban",
    category: "Admin",
    run: async(client, message, args, array) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply('Bạn không để unban!').then(message => message.delete({timeout: 3000}))
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply('Tôi không có quyền unban :c').then(message => message.delete({timeout: 3000}))
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let id = args[0]
            if (!args[0]) return message.reply('Unban ai cơ!? Ghi id hoặc tag họ đi pls!');

        let reason = args.slice(1).join(" ")
            if(!reason) reason = 'Không có lý do'
           
        message.guild.bans.fetch().then(async bans => {
            if(bans.size === 0) return message.reply('Không ai bị ban cả, trong server car')
            let BannedUser = bans.find(ban => ban.user.id == id)
            if (!BannedUser) return message.reply('Đó không phải id của người bị ban >:(')
            await message.guild.members.unban(BannedUser.user, {reason : reason}).catch(err => {
                return message.reply('Tớ bị lỗi gì đó thì phải <:kamar_real:900380903635841034> 👍 ')
            }).then (() => {
                const embeddms = new MessageEmbed()
                    .setColor(`RANDOM`)
                    .setTitle(`Bạn đã được unban ở ${message.guild.me}`)
                    .addField(`Lý do:`, `> ${reason}`)
                    .setFooter('Thời gian được unban', client.user.displayAvatarURL())
                    .setTimestamp()
                message.reply({embeds: [embeddms], allowedMentions: {repliedUser: false}})
                const embedunban = new MessageEmbed()
                    .setTitle('Unbaned')
                    .setThumbnail(BannedUser.user.displayAvatarURL())
                    .addField('Người dùng được unban', `> ${member}`)
                    .addField('Được unban bởi', `> ${message.author}`)
                    .addField('Lý do', `> ${reason}`)
                    .setFooter('Thời gian được unban', client.user.displayAvatarURL())
                    .setTimestamp() 
                member.send({embeds: [embedunban]}).catch(() => {return});
            })
        
        })
    }
} 