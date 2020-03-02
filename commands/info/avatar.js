const { RichEmbed } = require('discord.js')
module.exports = {
    name: "avatar",
    category: "info",
    description: "Get avatar ",
    usage: "_avatar <tag>",
    run: (client, message, args) => {
        var member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) {
            let avaURL = message.author.displayAvatarURL
            if (avaURL.includes('.gif')) avaURL = `${avaURL}?size=1024&f=.gif`
            const embed = new RichEmbed()
                .setTitle(`Link avatar: `)
                .setURL(avaURL)
                .setImage(avaURL)
                .setFooter(`Bot by phamleduy04#9999`)
            message.channel.send(embed)

        } else if (member.id == '455935236262592512') return message.reply(`Lấy avatar cc`)
        else {
            let avaURL = member.user.displayAvatarURL
            if (avaURL.includes('.gif')) avaURL = `${avaURL}?size=1024&f=.gif`
            const embed = new RichEmbed()
                .setTitle(`Link avatar: `)
                .setURL(avaURL)
                .setImage(avaURL)
                .setFooter(`Bot by phamleduy04#9999`)
            message.channel.send(embed)

        }
    }
}