const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
var { giphy_key } = require("../../apikey.json")
module.exports = {
    name: "thamster",
    category: "animals",
    description: "Lấy gifs của rái cá ",
    usage:"_hamster",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_key}&tag=hamsters&rating=PG-13`
        getJSON(url, function(error,response){
            if (error) return message.channel.send('Bot gặp lỗi trong khi lấy hình, vui lòng thử lại sau')
            const embed = new RichEmbed()
            .setDescription(`Hamsters gifs :D`)
            .setImage(response.data.images.original.url)
            .setFooter(`By AgentBot đẹp trai`)
        return message.channel.send(embed)
        });
    }
}
