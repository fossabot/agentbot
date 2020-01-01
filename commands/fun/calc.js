const math = require('mathjs');
const { RichEmbed } = require("discord.js");
module.exports = {
    name: "calc",
    category: "fun",
    description:"tính toán nhanh",
    run: async (client, message, args, tools) => {
        if (!args[0]) return message.reply("Không nhập số tao tính bằng cu.")
        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        }catch (e) {
            return message.channel.send("Tao không giải được, một là mày ngu hai là tao ngu!")
        }
        const embed = new RichEmbed()
            .setColor(0xffffff)
            .setTitle('Math Calculation')
            .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`js\n${resp}\`\`\``)
        message.channel.send(embed)
    }

}