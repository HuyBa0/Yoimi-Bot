const { MessageEmbed } = require('discord.js');
const client = ('../index.js')


module.exports = (distube, message) => {
    
    const sotnhac = new MessageEmbed()
    .setColor('RED')
    .setDescription('Đã hủy search nhạc!') 
    const khongthaynhac = new MessageEmbed()
    .setColor('RED')
    .setDescription(`❌ Mình không tìm thấy bài đó, thử lại đi xd!`)
    const cantjoin = new MessageEmbed()
    .setColor('RED')
    .setDescription('❌ Có vẻ mình không join voice được.')
    const error = new MessageEmbed()
    .setColor('RED')
    .setDescription('❌ Oh, có lỗi rồi 🤔.')
    const endsong = new MessageEmbed()
    .setColor('RED')
    .setDescription('Hết nhạc mất tiu rùi 😪')
    const endtime = new MessageEmbed()
    .setColor('RED')
    .setDescription(`Hết nhạc trong playlist ròi😪.`)
    const status = queue =>
	`Âm lượng: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
		|| 'Tắt'}\` | Lặp lại: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'Nguyên playlist'
				: 'Cày view mode 🐧'
			: 'Tắt'
	}\` | Tự động phát: \`${queue.autoplay ? 'Bật' : 'Tắt'}\``
    
    
    distube.on('playSong', (queue, song) => {
            const Embẹt = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(song.name)
            .setURL(song.url)
            .setAuthor(`Tớ đang mở bài...`, 'https://c.tenor.com/sce9SDRey4EAAAAi/disc.gif')
            .setDescription(`Độ dài bài hát \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail)
            Embẹt.addField('Lượt xem 👀', `\`${song.views}\``,true)
		Embẹt.addField('Lượt thích 👍', `\`${song.likes}\``,true)
        Embẹt.addField(`\n${status(queue)}`, '** **')
        Embẹt.addField(`\nĐược yêu cầu bởi `, `${song.user} ✅`)
        .setTimestamp()
      queue.textChannel.send({embeds: [Embẹt], allowedMentions: {repliedUser: false}})
        }
        )     
        .on('addSong', (queue, song, message) => {
			const pauseEmbed = new MessageEmbed()
			.setURL(song.url)
			.setTitle(`🎶 ${song.name} 🎶`)
			.setDescription(`Đươc thêm vào hàng chờ bởi ${song.user}`)
				.setThumbnail(song.thumbnails)
				.addField('Thời lượng:', `${song.formattedDuration}`)
				.setColor('BFFF00');
                queue.textChannel.send({embeds: [pauseEmbed]}).then(message => message.react('📝'))
		})
        .on('addList', (queue, playlist) =>
            queue.textChannel.send(`Đã thêm \`${playlist.name}\` danh sách phát (${
                playlist.songs.length
            } songs) vô hàng chờ\n${status(queue)}`))
        .on('searchResult', (message, result) => {
            let i = 0
    const sợtEmbẹt = new MessageEmbed()
    sợtEmbẹt.addField('🔎 Search Nhạc 🔎', `** 🔍Dựa trên từ khóa, mình tìm được:**\n${result
      .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
      .join("\n")}\n*Bạn có 30s để chọn, để hủy thì chờ hết 30s hoặc ghi chữ "huy"(ツ).*`)
      .setColor('GREEN')
      .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/youtube-search-1698519-1457029.png')
      .setTimestamp()
    message.reply({ embeds: [sợtEmbẹt], allowedMentions: {repliedUser: false}}) 
            })
        .on('searchCancel', message => message.channel.send({ embeds: [endtime], allowedMentions: {repliedUser: false}}))
        .on('searchInvalidAnswer', message =>
        message.channel.send({ embeds: [sợtEmbẹt]}))
        .on('searchNoResult', message => message.channel.send({ embeds: [khongthaynhac]}))
        .on("searchDone", () => { })
        .on('error', (textChannel, e) => {
            console.error(e)
        textChannel.send({ embeds: [error]})
        if (e.errorCode == 'VOICE_MISSING_PERMS') {
            textChannel.send({ embeds: [cantjoin]}) 
        }
        })
        .on('finish', queue => queue.textChannel.send({embeds: [endsong]}))
}