const fetch = require('node-fetch');
const encode = require('strict-uri-encode')
var API_KEY = 'KEY'
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
            message.channel.send(body)
        });
    }
}
