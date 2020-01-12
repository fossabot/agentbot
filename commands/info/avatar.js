module.exports = {
    name: "avatar",
    category: "info",
    description: "Get avatar ",
    usage: "_avatar <tag>",
    run: (client, message, args) => {
    var member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!args[0]){
            message.channel.send(message.author.avatarURL)
        } else {
            message.channel.send(member.user.displayAvatarURL)
        }
    }
}