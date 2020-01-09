const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
module.exports = {
    name: "hug",
    category: "fun",
    description: "Hug someone :D ",
    usage:"_hug [@tag]",
    run: (client, message, args) => {
        let url = `https://some-random-api.ml/animu/hug`
        getJSON(url, function(error,response){
        if (!args[0]){
            const embed1 = new RichEmbed()
                .setDescription(`${message.member.displayName} đã ôm tất cả mọi người <3`)
                .setImage(response.link)
                .setFooter(`By AgentBot đẹp trai`)
            return message.channel.send(embed1)
        }
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
            const embed = new RichEmbed()
            .setDescription(`Awwww, <@${message.member.id}> đã ôm <@${person.id}> <3`)
            .setImage(response.link)
            .setFooter(`By AgentBot đẹp trai`)
        return message.channel.send(embed)
        });
    }
}
