const encode = require('strict-uri-encode')
module.exports = {
    name: "askgoogle",
    category: "fun",
    description:"như command",
    run: async (client, message, args, tools) => {
        message.delete()
        if (!args[0]){
            return message.reply(`**Mày đéo nhập gì tao tìm bằng cu**`)
        } 
        let question = encode(args.join(' '));
        let link = `https://lmgtfy.com/?q=${question}`;
        message.channel.send(`**<${link}>**`)
    }
}