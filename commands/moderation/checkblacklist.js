const fs = require('fs')
const {RichEmbed} = require('discord.js')
module.exports = {
    name: "checkblacklist",
    aliases: ["cbl","blacklistcheck"],
    category: "moderation",
    description: "Show all blacklist members",
    usage: "_checkblacklist",
    run: async (client, message, args) => {
        var get_list = fs.readFileSync("./blacklist.txt",'utf8').split('\n')
        const embed = new RichEmbed()
            .setTitle(`List những người bị blacklist`)
            .setDescription(get_list)
            .setFooter(`Sử dụng lệnh _whois <ID> để tìm kiếm.`)
        message.channel.send(embed)
    }
}