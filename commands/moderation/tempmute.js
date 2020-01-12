module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "Says your input via the bot",
    usage: "_tempmute <@tag> <time> <reason>",
    run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));
    // This is the role you want to assign to the user
    let mutedRole = message.guild.roles.find(role => role.name == "Muted");
    // This is the member you want to mute
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let minutes = args[1];
    let reason = args.slice(2).join(" ");
    // Mute the user
    member.addRole(mutedRole)
    message.channel.send(`Muted by ${message.author.tag} for ${minutes} minutes. Reason: ${reason}`);
  
    // Unmute them after x minutes
    setTimeout(() => {
      message.guild.member(member).removeRole(mutedRole);
    }, minutes * 60000);
    }
}
