const { discord_token } = require('../../config.json')
module.exports = {
    name: "restart",
    category: "moderation",
    description: "Restart the bot",
    usage: "_restart",
    note: "Lệnh dành riêng cho Duy",
    run: async(client, message, args) => {
        if (message.author.id != "455935236262592512") return message.channel.send("Lệnh này dành riêng cho Duy.")
        message.channel.send('Restarting...')
        client.destroy()
            .then(client.login(discord_token))

    }
}