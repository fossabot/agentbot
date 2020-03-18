module.exports = {
    name: "leave",
    category: "moderation",
    description: "Leave sv",
    usage: "_leave",
    run: (client, message, args) => {
        if (message.author.id == "455935236262592512"){
            message.guild.leave()
            .then(g => console.log(`Left the guild ${g}`))
        }
    }
}