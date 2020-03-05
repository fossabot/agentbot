const urban = require('relevant-urban')
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "urban",
    category: "info",
    description: "Get word explain by UrbanDict",
    usage: "_urban <query>",
    run: async(client, message, args, tools) => {
        if (!args[0]) {
            return message.reply(`**Mày đéo nhập từ tao tìm bằng cu**`)
        }

        //Fetch from urban dict
        let res = await urban(args.join(' ')).catch(e => {
            return message.channel.send(`**Đéo tìm thấy từ: **${args.join(' ')}`)
        });
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(res.word)
            .setURL(res.urbanURL)
            .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}*`)
            .addField('Author: ', res.author, true)
            .addField('Rating: ', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

        message.channel.send(embed);
    }
}