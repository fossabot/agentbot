const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
module.exports = {
    name: "pat",
    category: "images",
    description: "pat someone :D ",
    usage:"_pat [@tag]",
    run: (client, message, args) => {
        let url = `https://some-random-api.ml/animu/pat`
        getJSON(url, function(error,response){
        if (!error) {
            if (!args[0]){
                const embed1 = new RichEmbed()
                    .setDescription(`${message.member.displayName} vỗ về đã tất cả mọi người <3`)
                    .setImage(response.link)
                    .setFooter(`By AgentBot đẹp trai`)
                return message.channel.send(embed1)
            }
            let person = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!person){
                return message.reply("Mày tag ai mà sao tao tìm đéo ra :)) ").then(m => m.delete(5000))
            } else {
                const embed = new RichEmbed()
                    .setDescription(`Awwww, <@${message.member.id}> đã vỗ về <@${person.id}> <3`)
                    .setImage(response.link)
                    .setFooter(`By AgentBot đẹp trai`)
                return message.channel.send(embed)
            }

        } else {
            return message.reply("Bot lỗi API, hãy thử lại trong giây lát. Lỗi đã được gởi cho owner của bot!")
            console.log(error)
        }

        });
    }
}
