var fs = require('fs')
var array = fs.readFileSync('././ask.txt','utf8').split('\r\n')
module.exports = {
    name: "ask",
    category: "fun",
    description: "Hỏi :)",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply("Kêu tao lên đéo hỏi gì là tao tán vỡ mồm 😡")
        }
        const random = array[Math.floor(Math.random() * array.length)];
        return message.reply(`${random}`);
    }
}