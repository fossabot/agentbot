module.exports = {
    name: "leave",
    category: "moderation",
    description: "Leave sv",
    usage: "_leave",
    run: (client, message, args) => {
        if (message.author !== "621890949244518451")
            message.guild.leave()
            .then(g => console.log(`Left the guild ${g}`))
    }
}