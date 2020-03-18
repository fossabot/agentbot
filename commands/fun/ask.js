var fs = require('fs')
var array = fs.readFileSync('././ask.txt', 'utf8').split('\r\n')
module.exports = {
    name: "ask",
    category: "fun",
    description: "Hỏi :)",
    run: async(client, message, args) => {
        if (!args[0]) {
            return message.reply("Không hỏi gì sao tao trả lời 😡")
        }
        const random = array[Math.floor(Math.random() * array.length)];
        return message.reply(`${random}`);
    }
}