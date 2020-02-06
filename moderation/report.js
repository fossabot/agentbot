const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "_report <mention> <id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!rMember)
            return message.reply("Couldn't find that person?").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Can't report that member").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));
        
        const channel = client.channels.get("664007055278997514")
        const admin_log = client.channels.get('663985297259888670')
            
        if (!channel)
            return message.channel.send("Couldn't find a `#report` channel").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**- Member:** ${rMember} (${rMember.user.id})
            **- Reported in:** ${message.channel}
            **- Reason:** ${args.slice(1).join(" ")}`);
        channel.send(embed);
        embed.addField(`Người report: `, `${message.author.tag} `)
        admin_log.send(embed)

    }
}