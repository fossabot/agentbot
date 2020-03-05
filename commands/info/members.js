let SS = require('string-similarity');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "members",
    category: "info",
    description: "",
    usage: "_members <role_name>",
    run: async(client, message, args) => {
        if (message.author.id !== "455935236262592512") return message.channel.send(`Command dành riêng cho Dui`)
        if (!args[0]) {
            return message.reply(`Tìm thành viên mà đéo ghi tên role :)`)
                .then(m => m.delete(5000))
        }
        var roles = message.guild.roles.cache.filter(r => r.managed === false).array().map(g => g.name)
        var search = args.join(' ')
        var matches = SS.findBestMatch(search, roles)
        var members = message.guild.roles.cache.find(role => role.name == matches.bestMatch.target).members.map(m => m.user)
        const embed = new MessageEmbed()
            .setTitle(`Thành viên trong role ${matches.bestMatch.target}`)
            .setDescription(members)
        message.channel.send(embed)
    }
}