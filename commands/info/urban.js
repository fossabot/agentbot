const urban = require('relevant-urban')
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "urban",
    run: async (client, message, args, tools) => {

        if (!args[0]){
            return message.reply(`**Nhập từ vô tao mới tìm dược chứ**`)
        } 
        
        //Fetch from urban dict
        let res = await urban(args.join(' ')).catch(e => {
            return message.channel.send(`**Không tìm thấy từ bạn hỏi**`)
        });
        const embed = new RichEmbed()
            .setColor('RANDOM')
            .setTitle(res.word)
            .setURL(res.urbanURL)
            .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}*`)
            .addField('Author: ',res.author,true)
            .addField('Rating: ',`**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)
        
        message.channel.send(embed)
    }
}