var getJSON = require('get-json')
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "colorinfo",
    category: "info",
    description: "Get JSON",
    run: (client, message, args) => {
        var color = args[0];
        if (color.indexOf("#") > -1) {
            color = color.slice(1)
        }
        let url = `https://www.thecolorapi.com/id?hex=${color}`;
        getJSON(url, function(error, response) {
            if (error) return message.channel.send(`Bot lỗi, vui lòng thử lại sau.`)
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle("Link JSON")
                .setURL(url)
                .addField("Mã hex:", response.hex.value, true)
                .addField("Tên màu:", response.name.value, true)
                .addField("Mã r,g,b:", response.rgb.value, true)
            message.channel.send(embed)

        });
    }
}