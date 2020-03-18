var getJSON = require("get-json")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "dog",
    category: "animals",
    description: "Gởi ảnh/video chó cute :)) ",
    usage: "_dog",
    run: (client, message, args) => {
        let url = `https://random.dog/woof.json`
        getJSON(url, function(error, response) {
            if (error) return message.channel.send('Bot gặp lỗi trong khi lấy hình, vui lòng thử lại sau')
            const embed = new MessageEmbed()
                .setTitle(`Dog pics/videos :D`)
                .setURL(response.url)
                .setImage(response.url)
                .setFooter(`Bot made by phamleduy04#9999`)
            message.channel.send(embed)
        });

    }
}