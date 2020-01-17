const fetch = require('node-fetch');
const encode = require('strict-uri-encode')
var API_KEY = 'API_KEY'
module.exports = {
    name: "wolf",
    category: "fun",
    description: "Get short answer from WolfarmAlpha",
    usage:"_wolf <query>",
    run: (client, message, args) => {
        if (!args[0]) return message.reply("Đéo tìm gì sao tao tìm được dmm");
        var query = encode(args.join(' '))
        var url = `http://api.wolframalpha.com/v1/result?appid=${API_KEY}&i=${query}`
        fetch(url)
        .then(res => res.text())
        .then(body => {
            if (body =="Wolfram|Alpha did not understand your input") return message.reply("Input ncc, tao tìm không ra câu trả lời.")
            message.channel.send(body)
        });
    }
}
