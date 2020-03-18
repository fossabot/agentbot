const { KSoftClient } = require('ksoft.js');
const { MessageEmbed } = require('discord.js')
var { ksoft_key } = require('../../config.json')
const ksoft = new KSoftClient(ksoft_key);

module.exports = {
    name: "lyrics",
    category: "info",
    description: "Search lyrics",
    usage: "_lyrics <songname>",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply("Bạn phải nhập vào tên bài hát chứ :(")
        let song = args.join(' ')
        const respond = await ksoft.lyrics.get(song, false)
            .catch(err => {
                return message.channel.send(err.message)
            });
        if (respond.lyrics.length > 2048) return message.reply("Bài hát bạn yêu cầu lớn hơn 2048 ký tự nên discord hong cho gởi :)))")
        const embed = new MessageEmbed()
            .setFooter(`Lyrics Command`)
            .setAuthor(`Song: ${respond.name} by ${respond.artist.name}`)
            .setDescription(respond.lyrics)
            .setFooter(`Get by AgentBot`)

        return message.channel.send(embed)

    }
}