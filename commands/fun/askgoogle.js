const encode = require('strict-uri-encode')
module.exports = {
    name: "askgoogle",
    category: "fun",
    description: "như command",
    run: async(client, message, args, tools) => {
        message.delete()
        if (!args[0]) {
            return message.reply(`Không nhập gì sao mình ghi :)`)
        }
        let question = encode(args.join(' '));
        let link = `http://letmegooglethat.com/?q=${question}`;
        message.channel.send(`**<${link}>**`)
    }
}