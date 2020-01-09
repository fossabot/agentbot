const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
module.exports = {
    name: "pat",
    category: "fun",
    description: "pat someone :D ",
    usage:"_pat [@tag]",
    run: (client, message, args) => {
        let url = `https://some-random-api.ml/animu/pat`
        getJSON(url, function(error,response){
        if (!args[0]){
            const embed1 = new RichEmbed()
                .setDescription(`${message.member.displayName} vỗ về đã tất cả mọi người <3`)
                .setImage(response.link)
                .setFooter(`By AgentBot đẹp trai`)
            return message.channel.send(embed1)
        }
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
            const embed = new RichEmbed()
            .setDescription(`Awwww, <@${message.member.id}> đã vỗ về <@${person.id}> <3`)
            .setImage(response.link)
            .setFooter(`By AgentBot đẹp trai`)
        return message.channel.send(embed)
        });
    }
}
