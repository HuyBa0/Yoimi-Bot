const { MessageEmbed } = require('discord.js');
const config = require('../../Data/config.json');

const name = 'ban'

module.exports = {
    name: 'ban',
    category: 'Moderator',
    aliases: 'Hem có',
    description: 'Cấm thành viên khỏi máy chủ',
    help: `> \`${config.prefix}${name} [@Thành viên] (Lí do)\``,
    run: (client, message, args,Array) => {
        try {
            function error(error) {
                const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(error)
                message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
            }
            if (!message.member.permissions.has("BAN_MEMBERS")) return error('Bạn không có quyền dùng lệnh').then(message => message.delete({timeout: 3000}))
            if (!message.guild.me.permissions.has('BAN_MEMBERS')) return error('Mình không có quyền cấm thành viên').then(message => message.delete({timeout: 3000}))
            if (!args[0]) {
                const error = new MessageEmbed()
                .setColor('RED')
                .setDescription('Có vẻ như bạn dùng lệnh chưa đúng lắm!')
                .addField('Cách sử dụng', `> \`${config.prefix}${name} [@Thành viên] (Lí do)\``
                )
                message.reply({embeds: [error], allowedMentions: {repliedUser: false}})
                return
            }

            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!target) return error(`Không tìm thấy người dùng '${args.join(' ')}'`)
            if (!target.bannable) {
                const error = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Không thể cấm '${target}'`)
                message.reply({embeds: [error], allowedMentions: {repliedUser: false}})
                return
            } else {
                var reason = 'Hongg có'
                if (args[1]) reason =  (args.slice(1)).join(' ')
                target.ban({ reason: reason })

                const embed3 = new MessageEmbed()
                .setColor('RED')
                .setAuthor({name: message.guild.name , iconURL: message.guild.iconURL({dynamic: true})})
                .setTitle('Bạn đã bị cấm!')
                .addFields(
                    {name: 'Người cấn', value: `> <@${message.author.id}> (${message.author.tag})`},
                    {name: 'Lí do', value: `> ${reason}`}
                )
                .setTimestamp()

                target.send({embeds: [embed3]}).catch(() => {return})
                const embed2 = new messageEmbed()
                .setColor('RED')
                .setAuthor({ name: `[BANNED]${target.user.tag}`, 
                iconURL: message.author.avatarURL(true)})
                .setThumbnail(target.displayAvatarURL({dynamic: true})) 
                .addFields(
                    {name: 'Thành viên' , value: `> <@${target.user.id}> (${target.user.tag})`, inline: true},
                    {name: 'Quản lí', value: `> <@${message.author.id}>`, inline: true},
                    {name: 'Lí do', value: `> ${reason}`}
                )
                .setTimestamp()
                .setFooter({text: `ID: ${target.user.id.toString()}`}) 
                message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}})                   
            }    
        } catch (e) {
            error('Có lỗi rồi')
            console.error(e)
        }
    }
}