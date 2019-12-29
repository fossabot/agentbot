module.exports = {
    name: "clap",
    category: "fun",
    description: "Clap clap 👏",
    run: async (client, message, args) => {
        message.delete();
        if (!args[0])
            return message.reply("Mày nhắn cl gì vậy")
        if (!args[1])
            return message.reply("Mày nhắn gì 1 chữ tao clap bằng cu mày à.")
        var clap = args.join(' ')
        clapped = clap.replace(/ /g," 👏 ") 
        message.channel.send(clapped)

    }
}