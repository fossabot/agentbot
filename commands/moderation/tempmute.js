const ms = require('ms')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "Khoá mõm :)",
    usage: "_tempmute <@tag> <time> (5s,15m,1h,2d) <reason>",
    run: (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES"))
            return message.reply("Bạn không có quyền sử dụng lệnh này.").then(m => m.delete({timeout: 5000}));
        // This is the role you want to assign to the user
        let mutedRole = message.guild.roles.cache.find(role => role.name == "Muted");
        // Log channel
        let logChannel = message.guild.channels.cache.get('640431240662482944') || message.channel
            // This is the member you want to mute
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let time = ms(args[1]);
        let reason = args.slice(2).join(" ");
        // Mute the user
        member.roles.add(mutedRole)
        message.channel.send(`Đã khoá mõm **${member.user.tag}** với thời gian ${args[1]}. Lý do: ${reason}`)
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription("Khoá mõm command")
            .addField('Người bị khoá mõm: ', member, true)
            .addField('Người khoá mõm: ', message.author, true)
            .addField('Khoá mõm trong: ', args[1], true)
            .addField('Lý do khoá mõm: ', reason, true)
        logChannel.send(embed);

        // Unmute them after x minutes
        setTimeout(() => {
            message.guild.member(member).roles.remove(mutedRole);
        }, time);
    }
}