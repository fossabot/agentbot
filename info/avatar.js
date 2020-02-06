const { RichEmbed } = require('discord.js')
module.exports = {
    name: "avatar",
    category: "info",
    description: "Get avatar ",
    usage: "_avatar <tag>",
    run: (client, message, args) => {
    var member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member){
            const embed = new RichEmbed()
                .setTitle(`Link avatar: `)
                .setURL(message.author.avatarURL)
                .setImage(message.author.avatarURL)
                .setFooter(`Bot by phamleduy04#9999`)
            message.channel.send(embed)
        } else {
            const embed = new RichEmbed()
                .setTitle(`Link avatar: `)
                .setURL(member.user.displayAvatarURL)
                .setImage(member.user.displayAvatarURL)
                .setFooter(`Bot by phamleduy04#9999`)
            message.channel.send(embed)
        }
    }
}