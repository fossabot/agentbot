const encode = require('strict-uri-encode')
var {wolfarm_key} = require('../../apikey.json')
var getJSON = require('get-json')
const { RichEmbed } = require('discord.js')
module.exports = {
    name: "calc",
    category: "fun",
    description: "Tính toán và sẽ đưa ra các bước giải",
    usage:"_calc <query>",
    run: (client, message, args) => {
        var query = encode(args.join(' '))
        var url = `http://api.wolframalpha.com/v2/query?input=${query}&podstate=Result__Step-by-step+solution&format=plaintext&output=JSON&appid=${wolfarm_key}`
        getJSON(url, function(error, response){
            if (error) return message.channel.send(`Bot lỗi khi đang làm việc, vui lòng thử lại sau.`)
            if (response.queryresult.success == false) return message.reply(`Input ncc, tao tìm không ra câu trả lời.`)
            var output = response.queryresult.pods[1].subpods[1]
            const embed = new RichEmbed()
                .setAuthor(`Agent Bot`)
                .setTitle(`Question: ${args.join(' ')}. ${output.title}`)
                .setDescription(output.plaintext)
                .setFooter(`Bot made by phamleduy04#9999`)
            message.channel.send(embed)
        });
    }
}