const math = require('mathjs');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "calc",
    category: "fun",
    description: "tính toán nhanh",
    run: async(client, message, args, tools) => {
        if (!args[0]) return message.reply("Hãy nhập gì đó để mình giải :))")
        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        } catch (e) {
            return message.channel.send("Mình không giải được :(")
        }
        const embed = new MessageEmbed()
            .setColor(0xffffff)
            .setTitle('Math Calculation')
            .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`js\n${resp}\`\`\``)
        message.channel.send(embed)
    }

}