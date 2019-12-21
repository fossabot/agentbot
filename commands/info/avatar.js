module.exports = {
    name: "avatar",
    description: "Get avatar ",
    usage: "_avatar <tag>",
    run: (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        message.channel.send(member.user.displayAvatarURL)

    }
}