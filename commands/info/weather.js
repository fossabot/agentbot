const { MessageEmbed } = require("discord.js");
const weather = require('weather-js');
module.exports = {
    name: "weather",
    category: "info",
    description: "Weather info",
    usage: "_weather <query> (zipcode or city)",
    run: (client, message, args) => {
        if (!args[0]) return message.channel.send("Bạn không ghi tên thành phố sao mình dự báo thời tiết :)")
        var query = args.join(' ');
        weather.find({ search: query, degreeType: 'C' }, function(err, result) {
            if (err) return message.channel.send(`Bot lỗi: ${err}`)
            if (result.length === 0) return message.reply(`Bot không tìm ra, bạn hãy thử lại từ khoá khác.`)
            var current = result[0].current;
            var location = result[0].location;
            const embed = new MessageEmbed()
                .setDescription(`**${current.skytext}** `)
                .setThumbnail(current.imageUrl)
                .setAuthor(`Weather at ${current.observationpoint} today`)
                .addField(`Timezone: `, `UTC ${location.timezone}`, true)
                .addField(`Temperature: `, `${current.temperature} °C`, true)
                .addField(`Feels like: `, `${current.feelslike} °C`, true)
                .addField(`Winds: `, current.winddisplay, true)
                .addField(`Humidity: `, `${current.humidity}%`, true)
                .setFooter(`Created by Duy đẹp trai vãi lồn ;)`)
            message.channel.send(embed)
        });
    }
}