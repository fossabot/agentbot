const { KSoftClient } = require('ksoft.js');
const { RichEmbed } = require('discord.js')

const ksoft = new KSoftClient('TOKEN');

module.exports = {
    name: "lyrics",
    category: "info",
    description: "Search lyrics",
    usage: "_lyrics <songname>",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("Địt mẹ tìm lyric đéo ghi tên nhạc tao tìm lyric bài 999 đoá hoa hồng giờ :)")
        let song = args.join(' ')
        const respond  = await ksoft.lyrics.get(song, false)
            .catch(err => {
                return message.channel.send(err.message)
            });
            if (respond.lyrics.length > 2048) return message.reply("Bài hát bạn yêu cầu lớn hơn 2048 ký tự nên discord éo cho gởi :)))")
            const embed = new RichEmbed()
            .setFooter(`Lyrics Command`)
            .setAuthor(`Song: ${respond.name} by ${respond.artist.name}`)
            .setDescription(respond.lyrics)
            .setFooter(`Get by AgentBot`)
        
        return message.channel.send(embed)
        
    }
}
    


