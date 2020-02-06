const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
var { giphy_key } = require("../../apikey.json")
module.exports = {
    name: "punch",
    category: "images",
    description: "Punch someone :D ",
    usage:"_punch <@tag>",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_key}&tag=punch&rating=R`
        getJSON(url, function(error,response){
        let nguoitag = message.mentions.members.array() || message.guild.members.get(args[0])
        if (nguoitag.length == 0){
            const embed1 = new RichEmbed()
                .setDescription(`${message.member} đã tự đấm chính mình 👊`)
                .setImage(response.data.images.original.url)
                .setFooter(`AgentBot đoán là thằng này bị ngu =))))`)
            return message.channel.send(embed1)
        } else {
            const embed = new RichEmbed()
                .setDescription(`${message.member} đã đấm vỡ mồm 🤜 ${nguoitag}`)
                .setImage(response.data.images.original.url)
                .setFooter(`By AgentBot đẹp trai`)
            return message.channel.send(embed)
        }
        });
    }
}
