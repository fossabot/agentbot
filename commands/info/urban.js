const urban = require('relevant-urban')
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "urban",
    run: async (client, message, args, tools) => {
        message.delete()
        if (!args[0]){
            return message.reply(`**Mày đéo nhập từ tao tìm bằng cu**`)
        } 
        
        //Fetch from urban dict
        let res = await urban(args.join(' ')).catch(e => {
            return message.channel.send(`**Đéo tìm thấy từ: **${args.join(' ')}`)
        });
        const embed = new RichEmbed()
            .setColor('RANDOM')
            .setTitle(res.word)
            .setURL(res.urbanURL)
            .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}*`)
            .addField('Author: ',res.author,true)
            .addField('Rating: ',`**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)
        
        message.channel.send(embed).then(m => m.delete(10000));
    }
}