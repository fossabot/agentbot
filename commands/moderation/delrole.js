const { RichEmbed } = require("discord.js");

module.exports = {
    name: "delrole",
    category: "moderation",
    description: "Xoá role của người khác",
    usage: "admin",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) 
            return message.reply("You can't delete messages....").then(m => m.delete(5000));
        if (!args[0])
            return message.reply("")
        const member =  message.mentions.members.first() || message.guild.members.get(args[0]);
        const role = message.guild.roles.find(r => r.name === `USER-${message.member.id}`);
        member.removeRoles(`${role}`)
        
        const embed = new RichEmbed()
        .addField(`Deleted!`);

    message.channel.send(embed);
    }
}