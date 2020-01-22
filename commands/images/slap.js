const { RichEmbed } = require("discord.js");
var getJSON = require("get-json");
var { giphy_key } = require("../../apikey.json")
module.exports = {
    name: "slap",
    category: "images",
    description: "Slap someone :D ",
    usage:"_slap <@tag>",
    run: (client, message, args) => {
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_key}&tag=slap&rating=R`
        getJSON(url, function(error,response){
            if (error) return message.reply("Bot lỗi trong quá trình lấy hình ảnh, vui lòng thử lại sau.")
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!args[0] || (!person) || (message.author.id == "533435912982626306")){
            const embed1 = new RichEmbed()
                .setDescription(`<@${message.member.id}> đã tự vả chính mình 🤚`)
                .setImage(response.data.images.original.url)
                .setFooter(`AgentBot đoán là thằng này bị ngu =))))`)
            return message.channel.send(embed1)
        } else {

            const embed = new RichEmbed()
                .setDescription(`<@${message.member.id}> đã tát vỡ mồm <@${person.id}> 🤚`)
                .setImage(response.data.images.original.url)
                .setFooter(`By AgentBot đẹp trai`)
            return message.channel.send(embed)
        }
        });
    }
}
