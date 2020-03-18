const { MessageEmbed } = require("discord.js");
var getJSON = require("get-json");
module.exports = {
    name: "hug",
    category: "images",
    description: "Hug someone :D ",
    usage: "_hug [@tag]",
    run: (client, message, args) => {
        if (!args[0]) return message.reply(`Bạn phải tag ai đó để bot gởi ảnh nhé :))`)
        let url = `https://some-random-api.ml/animu/hug`
        let nguoitag = message.mentions.members.array() || message.guild.members.get(args[0])
        getJSON(url, function(error, response) {
            if (!error) {
                if (nguoitag.length == 0) {
                    const embed1 = new MessageEmbed()
                        .setDescription(`${message.member} đã ôm tất cả mọi người <3`)
                        .setImage(response.link)
                        .setFooter(`By AgentBot đẹp trai`)
                    return message.channel.send(embed1)
                }
                const embed = new MessageEmbed()
                    .setDescription(`Awwww, ${message.member} đã ôm ${nguoitag} <3`)
                    .setImage(response.link)
                    .setFooter(`By AgentBot đẹp trai`)
                return message.channel.send(embed)
            } else {
                return message.channel.send("Bot lỗi khi cố gắng lấy hình, hãy thử lại sau")
            }
        });
    }

}