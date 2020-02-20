const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
var { giphy_key } = require("../../config.json")
module.exports = {
    name: "otter",
    category: "animals",
    description: "Gởi hình rái cá :) ",
    usage:"_otter",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_key}&tag=otter&rating=PG-13`
        getJSON(url, function(error,response){
            if (error) return message.channel.send('Bot gặp lỗi trong khi lấy hình, vui lòng thử lại sau')
            const embed = new RichEmbed()
            .setTitle(`Otter Gifs :D`)
            .setImage(response.data.images.original.url)
            .setURL(response.data.images.original.url)
            .setFooter(`Bot made by phamleduy04#9999`)
        return message.channel.send(embed)
        });
    }
}
