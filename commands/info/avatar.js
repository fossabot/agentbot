module.exports = {
    name: "test",
    description: "Get avatar ",
    usage: "_avatar <tag>",
    run: (client, message, args) => {
        if (!args[0])
            return message.channel.send(message.author.avatarURL)
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        message.channel.send(member.user.displayAvatarURL)

    }
}
