const ms = require('ms')
const { RichEmbed } = require('discord.js')
module.exports = {
    name: "ttempmute",
    aliases: ["khoamom"],
    category: "moderation",
    description: "Khoá mõm",
    usage: "_tempmute <@tag> <time> (5s,15m,1h,2d) <reason>",
    run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));
    // This is the role you want to assign to the user
    let mutedRole = message.guild.roles.find(role => role.name == "Muted");
    // Log channel
    let logChannel = message.guild.channels.get('663966548272349205') || message.channel
    // This is the member you want to mute
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let time = ms(args[1]);
    let reason = args.slice(2).join(" ");
    // Mute the user
    member.addRole(mutedRole)
    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`**Khoá mõm command**`)
      .addField('Người bị khoá mõm: ',member)
      .addField('Người khoá mõm: ',message.author)
      .addField('Khoá mõm trong: ', args[1])
      .addField('Lý do khoá mõm: ',reason)
    logChannel.send(embed);
    message.channel.send(`Đã khoá mõm ${member} thành công!`)
  
    // Unmute them after x minutes
    setTimeout(() => {
      message.guild.member(member).removeRole(mutedRole);
      logChannel.send(`Đã unmute cho ${member} `)
    },time);
    }
}
