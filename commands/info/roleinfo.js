const { RichEmbed } = require("discord.js");
module.exports = {
    name: "roleinfo",
    description: "Roleinfo",
    run: async (client, message, args) => {
        var role = message.guild.roles.find(role => role.name === args.join(' '))
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