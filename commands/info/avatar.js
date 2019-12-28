const { RichEmbed } = require("discord.js");
module.exports = {
    name: "avatar",
    description: "Get avatar ",
    usage: "_avatar <tag>",
    run: (client, message, args) => {
    var member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!args[0]){
            let embed1 = new RichEmbed()
                .setImage(message.author.avatarURL)
            message.channel.send(embed1)
        } else {
            const embed = new RichEmbed()
                .setImage(member.user.displayAvatarURL)
            message.channel.send(embed)
        }
    }
}
