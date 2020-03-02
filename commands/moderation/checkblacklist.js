const fs = require('fs')
const { RichEmbed } = require('discord.js')
module.exports = {
    name: "checkblacklist",
    aliases: ["cbl", "blacklistcheck"],
    category: "moderation",
    description: "Show all blacklist members",
    usage: "`\ _checkblacklist \` or `\ _cbl \`",
    run: async(client, message, args) => {
        var get_list = fs.readFileSync("./blacklist.txt", 'utf8').split('\n')
        var usernames = []
        get_list.slice(get_list.indexOf(' '))
        get_list.forEach(id => {
            var get_id = message.guild.members.get(id)
            if (!get_id) return usernames.push(id)
            usernames.push(get_id.user.tag)
        })
        const embed = new RichEmbed()
            .setTitle(`List những người bị blacklist`)
            .setDescription(usernames)
            .setFooter(`By phamleduy04#9999`)
        message.channel.send(embed)
    }
}