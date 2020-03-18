const encode = require('strict-uri-encode')
var { wolfarm_key } = require('../../config.json')
var getJSON = require('get-json')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "solve",
    category: "fun",
    description: "Tính toán và sẽ đưa ra các bước giải",
    usage: "_solve <query>",
    run: (client, message, args) => {
        var query = encode(args.join(' '))
        var url = `http://api.wolframalpha.com/v2/query?input=solve%20${query}&podstate=Result__Step-by-step+solution&format=plaintext&output=JSON&appid=${wolfarm_key}`
        getJSON(url, function(error, response) {
            if (error) return message.channel.send(`Bot lỗi khi đang làm việc, vui lòng thử lại sau.`)
            if (response.queryresult.success == false) return message.reply(`Mình không hiểu bạn đang hỏi gì, vui lòng hỏi câu khác :)))`)
            var output = response.queryresult.pods[1].subpods[1]
            const embed = new MessageEmbed()
                .setAuthor(`Agent Bot`)
                .setTitle(`Question: ${args.join(' ')}. ${output.title}`)
                .setDescription(output.plaintext)
                .setFooter(`Bot made by phamleduy04#9999`)
            message.channel.send(embed)
        });
    }
}