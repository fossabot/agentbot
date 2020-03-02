const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
var { giphy_key } = require("../../config.json")
module.exports = {
    name: "kiss",
    category: "images",
    description: "Kiss someone :) (lưu ý chúng tôi không thích xem cẩu lương nhé) ",
    usage: "_kiss <@tag>",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_key}&tag=kiss&rating=R`
        getJSON(url, function(error, response) {
            if (error) return message.channel.send('Bot gặp lỗi trong khi lấy hình, vui lòng thử lại sau')
            let person = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!person) {
                return message.reply(`Đéo tag ai sao mà kiss`)
            } else {
                const embed = new RichEmbed()
                    .setDescription(`${message.member} đã thơm ${person} vài cái =))) 💋`)
                    .setImage(response.data.images.original.url)
                    .setFooter(`By AgentBot đẹp trai`)
                return message.channel.send(embed)
            }
        });
    }
}