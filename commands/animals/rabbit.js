var getJSON = require("get-json")
const { MessageEmbed } = require("discord.js")
var { giphy_key } = require("../../config.json")
module.exports = {
    name: "rabbit",
    category: "animals",
    description: "Gởi gif của thỏ",
    usage: "_rabbit",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_key}&tag=rabbit&rating=PG-13`
        getJSON(url, function(error, response) {
            if (error) return message.channel.send('Bot gặp lỗi trong khi lấy hình, vui lòng thử lại sau')
            const embed = new MessageEmbed()
                .setTitle(`Rabbit Gifs :D`)
                .setURL(response.data.images.original.url)
                .setImage(response.data.images.original.url)
                .setFooter(`Bot made by phamleduy04#9999`)
            return message.channel.send(embed)
        });
    }
}