const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Unmute",
    usage: "_unmute <@tag> <reason>",
    run: (client, message, args) => {
        if (!args[0]) return message.reply(`Unmute gì đéo tag sao tao biết tao unmute`)
        reason = args[1] || "Không có lý do!"
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        let mutedRole = message.guild.roles.cache.find(role => role.name == "Muted");
        let logChannel = message.guild.channels.cache.get('684848842268737548') || message.channel
        message.guild.member(member).roles.remove(mutedRole);
        message.channel.send(`Đã unmute thành công cho ${member}`)
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**Tháo khoá mõm command**`)
            .addField('Người bị khoá mõm: ', member)
            .addField('Người tháo khoá: ', message.author)
            .addField('Lý do tháo khoá mõm: ', reason)
        logChannel.send(embed)
    }
}