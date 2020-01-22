const { RichEmbed } = require('discord.js')
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Unmute",
    usage: "_unmute <@tag> <reason>",
    run: (client, message, args) => {
        if (!args[0]) return message.reply(`Unmute gì đéo tag sao tao biết tao unmute`)
        reason = args[1] || "Không có lý do!"
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        let mutedRole = message.guild.roles.find(role => role.name == "Muted");
        let logChannel = message.guild.channels.get('663966548272349205') || message.channel
        message.guild.member(member).removeRole(mutedRole);
        message.channel.send(`Đã unmute thành công cho ${member}`)
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setDescription(`**Tháo khoá mõm command**`)
            .addField('Người bị khoá mõm: ',member)
            .addField('Người tháo khoá: ',message.author)
            .addField('Lý do tháo khoá mõm: ',reason)
        logChannel.send(embed)
}
}