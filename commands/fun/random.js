module.exports = {
    name: "random",
    category: "fun",
    description: "Random",
    usage: '_random <max_number>',
    run: async(client, message, args) => {
        if (!args[0]) return message.reply('Địt mẹ đéo ghi số là tao tán chết mẹ nhé!')
        if (isNaN(args[0])) return message.reply('Địt mẹ mày ghi số cho tao :)')
        return message.channel.send(`🎲 Số của bạn là: ${Math.floor(Math.random() * args[0])}`)
    }
}