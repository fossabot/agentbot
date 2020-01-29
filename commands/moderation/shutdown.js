module.exports = {
    name: "shutdown",
    aliases: ["tatbot"],
    category: "moderation",
    description: "Shutdown the bot",
    usage: "_shutdown",
    note: "Lệnh dành riêng cho Duy",
    run: async (client, message, args) => {
        if(message.author.id != "455935236262592512") return message.channel.send("Lệnh này dành riêng cho Duy.")

        try {
            await message.channel.send("Đã tắt bot từ xa!")
            process.exit()
        } catch (e) {
            message.channel.send(`Bot lỗi: ${e.message}`)
        }
}
}
