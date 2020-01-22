const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
var { giphy_key } = require("../../apikey.json")
module.exports = {
    name: "shoot",
    category: "images",
    description: "Shoot someone :D ",
    usage:"_Shoot <@tag>",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_key}&tag=shoot&rating=PG`
        getJSON(url, function(error,response){
            if (error) return message.channel.send("Bot lỗi trong khi lấy hình, vui lòng thử lại sau.")
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!args[0] || (!person)){
            const embed1 = new RichEmbed()
                .setDescription(`<@${message.member.id}> đã tự sát (???) 🔫`)
                .setImage(response.data.images.original.url)
                .setFooter(`AgentBot đoán là thằng này bị ngu (ngu vãi looon)=))))`)
            return message.channel.send(embed1)
        } else {

            const embed = new RichEmbed()
                .setDescription(`<@${message.member.id}> đã bắn súng vô <@${person.id}> 🔫`)
                .setImage(response.data.images.original.url)
                .setFooter(`By AgentBot đẹp trai`)
            return message.channel.send(embed)
        }
        });
    }
}
