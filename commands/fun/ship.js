const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ship",
    category: "fun",
    description: "Shippppppp",
    usage: "_ship <tag> <tag2>",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply("Bạn phải tag 2 người để ship")
        let nguoitag = message.mentions.members.array()
        if (nguoitag.length == 1) return message.reply("Bạn phải tag 2 người để ship")
        if (nguoitag.length >= 3) return message.reply("Bạn tag cả đống người vậy sao mình ship :( ")
        let person = nguoitag[0]
        let person1 = nguoitag[1]
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        const embed = new MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ Tỉ lệ thành công của cặp đôi **${person.displayName}** và **${person1.displayName}**:`,
                `💟 ${Math.floor(love)}%\n\n${loveLevel}`);
        message.channel.send(embed);
    }
}