var getJSON = require("get-json")
const { RichEmbed } = require("discord.js")
module.exports = {
    name: "translate",
    category: "fun",
    description: "Dịch =))",
    usage: "_translate <lang> (de or us-de) <text> ",
    run: (client,message,args) => {
        var key = `trnsl.1.1.20200109T024819Z.ed62bc942ddc7e0c.196d24a1ec66daa8f2fc9a3c3618c522dddc2931`
        let lang = args[0]
        let word = args.slice(1).join(' ')
        let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${word}&lang=${lang}`
        getJSON(url, function(error,response){
            if (response.code == "200"){
                const embed = new RichEmbed()
                    .setDescription(`Hệ thống dịch của AgentBot: `)
                    .addField("Dịch từ: ", `${response.lang}`)
                    .addField("Từ trước khi dịch: ", `${word}`)
                    .addField("Từ sau khi dịch sang",`${response.text[0]}`)
                return message.channel.send(embed)
            }else{
                return message.reply("API lỗi :( ")
            }
        })
    }
}