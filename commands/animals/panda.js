var getJSON = require("get-json")
const { RichEmbed } = require("discord.js")
module.exports = {
    name: "panda",
    category: "fun",
    description: "Gởi ảnh panda",
    usage:"_panda",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=jw9hRDeB0uuU5PPqIHjKk6UZgrMnJh3q&tag=panda&rating=PG-13`
        getJSON(url, function(error,response){
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
            const embed = new RichEmbed()
            .setDescription(`Panda Gifs :D`)
            .setImage(response.data.images.original.url)
            .setFooter(`By AgentBot đẹp trai`)
        return message.channel.send(embed)
        });
    }
}