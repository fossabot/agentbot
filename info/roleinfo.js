const { RichEmbed } = require("discord.js");
let stringSimilarity = require('string-similarity');

module.exports = {
    name: "roleinfo",
    category: "info",
    description: "Trà về thông tên về role",
    run: async (client, message, args) => {
        let roles = [];
        roles.push(message.guild.roles.filter(r => r.managed === false).map(g => g.name))
        var search = args.join(' ');
        var matches = stringSimilarity.findBestMatch(search, roles[0])
        var find = matches.bestMatch.target
        var role = message.guild.roles.find(role => role.name === find)
        if (!isNaN(args[0])) {
            var role = message.guild.roles.get(args[0])
        }
        let membersWithRole = message.guild.roles.get(role.id).members;
        const embed = new RichEmbed()
            .setColor(role.color)
            .setTitle("Roleinfo")
            .addField("ID: ",role.id)
            .addField("Tên role: ",role.name,true)
            .addField("Số lượng:", membersWithRole.size,true)
            .addField("Vị trí: ",role.calculatedPosition,true)
            .addField("Mentionable: ",role.mentionable,true)
        message.channel.send(embed)
    }
}