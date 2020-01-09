const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
module.exports = {
    name: "slap",
    category: "fun",
    description: "Slap someone :D ",
    usage:"_slap <@tag>",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=jw9hRDeB0uuU5PPqIHjKk6UZgrMnJh3q&tag=slap&rating=R`
        getJSON(url, function(error,response){
        if (!args[0]){
             return message.channel.send(`Không tag tao tát bằng cu à ? `)
        }
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
            const embed = new RichEmbed()
            .setDescription(`<@${message.member.id}> đã tát vỡ mồm <@${person.id}> 🤚`)
            .setImage(response.data.images.original.url)
            .setFooter(`By AgentBot đẹp trai`)
        return message.channel.send(embed)
        });
    }
}
