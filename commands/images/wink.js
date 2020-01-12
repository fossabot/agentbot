const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
module.exports = {
    name: "wink",
    category: "images",
    description: "Just wink :D",
    usage:"_wink",
    run: (client, message, args) => {
        let url = `https://some-random-api.ml/animu/wink`
        getJSON(url, function(error,response){
            const embed = new RichEmbed()
            .setDescription(`<@${message.member.id}> vừa mới nháy mắt với ai đó 🤷‍♂️`)
            .setImage(response.link)
            .setFooter(`By AgentBot đẹp trai`)
        return message.channel.send(embed)
        });
    }
}
