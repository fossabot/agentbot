const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
module.exports = {
    name: "otter",
    category: "animals",
    description: "Gởi hình rái cá :) ",
    usage:"_otter",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=URAPIKEY&tag=otter&rating=PG-13`
        getJSON(url, function(error,response){
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
            const embed = new RichEmbed()
            .setDescription(`Otter Gifs :D`)
            .setImage(response.data.images.original.url)
            .setFooter(`By AgentBot đẹp trai`)
        return message.channel.send(embed)
        });
    }
}
