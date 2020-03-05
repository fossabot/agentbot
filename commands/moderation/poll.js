const { MessageEmbed } = require("discord.js");
const ms = require('ms');
module.exports = {
    name: "poll",
    aliases: ["p"],
    category: "moderation",
    description: "Tạo poll",
    usage: "_poll <time end> (10s,2m,1h,10d) <what to poll> ",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply("Không ghi thời gian sao tao tạo poll.")
        if (!args[1]) return message.reply(`Đéo ghi gì tao tạo poll bằng chim =))`)
        if (message.member.roles.cache.some(r => ["admin", "mod"].includes(r.name)) || message.author.id == "455935236262592512") {
            let time = ms(args[0])
            const channel = client.channels.cache.get("684848824732221468")
            if (!channel) return message.reply("Đéo tìm thấy phòng, check lại config")
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setFooter('React to vote! ')
                .setDescription(`Thời gian: ${args[0]}\nNội dung: ${args.slice(1).join(' ')}`)
                .setTitle(`Poll created by ${message.author.username}`);
            let msg = await channel.send(embed);
            await msg.react('✅');
            await msg.react('❌');
            message.delete({ timeout: 1000 });

            const filter = (reaction) => reaction.emoji.name == '✅' || reaction.emoji.name == '❌'

            const results = await msg.awaitReactions(filter, { time: time })
            var count_no = results.array()[0].count - 1
            var count_yes = results.array()[1].count - 1
            const results_embed = new MessageEmbed()
                .setTitle(`Kết quả poll cho câu hỏi: `)
                .setDescription(args.slice(1).join(' '))
                .addField(`Yes ✅ votes: `, count_yes, true)
                .addField(`No ❌ votes: `, count_no)
            msg.edit(results_embed)


        } else {
            message.delete({ timeout: 1000 })
            return message.reply("Code này dành cho admin và mod").then(m => m.delete(5000))
        }


    }
}