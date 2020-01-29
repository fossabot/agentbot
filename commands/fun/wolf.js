const fetch = require('node-fetch');
const encode = require('strict-uri-encode')
var {wolfarm_key} = require('../../apikey.json')
var getJSON = require('get-json')
const { RichEmbed } = require('discord.js')
module.exports = {
    name: "wolf",
    category: "fun",
    description: "Ask a lot of question :)).",
    usage:"_wolf <query>",
    run: (client, message, args) => {
        var query = encode(args.join(' '))
        var url = `https://api.wolframalpha.com/v2/query?input=${query}&format=image&output=JSON&appid=${wolfarm_key}`
        getJSON(url, function(error, response){
            if (error) return message.channel.send(`Bot lỗi khi đang làm việc, vui lòng thử lại sau.`)
            if (response.queryresult.success == false) return message.reply(`Input ncc, tao tìm không ra câu trả lời.`)
            var output = response.queryresult.pods[1].subpods[0].img.src
            const embed = new RichEmbed()
                .setAuthor(`Agent Bot`)
                .setTitle(`Question: ${args.join(' ')}`)
                .setImage(output)
                .setFooter(`Bot made by phamleduy04#9999`)
            message.channel.send(embed)

        });
        /*
        if (!args[0]) return message.reply("Đéo tìm gì sao tao tìm được dmm");
        var query = encode(args.join(' '))
        var url = `http://api.wolframalpha.com/v1/result?appid=${wolfarm_key}&i=${query}`
        fetch(url)
        .then(res => res.text())
        .then(body => {
            if (body =="Wolfram|Alpha did not understand your input") return message.reply("Input ncc, tao tìm không ra câu trả lời.")
            message.channel.send(body)
        });
        */
    }
}