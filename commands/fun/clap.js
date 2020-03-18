module.exports = {
    name: "clap",
    category: "fun",
    description: "Clap clap 👏",
    usage: "_clap <1 chuối có 2 từ>",
    run: async(client, message, args) => {
        message.delete();
        if (!args[0])
            return message.reply("Bạn không ghi gì sao mình clap :(")
        if (!args[1])
            return message.reply("Phải nhắn ít nhất 2 chữ nhé. Ví dụ \`_clap hello hello\`")
        var clap = args.join(' ')
        clapped = clap.replace(/ /g, " 👏 ")
        message.channel.send(clapped)

    }
}