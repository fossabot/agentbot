var getJSON = require('get-json')
const { RichEmbed } = require("discord.js");
module.exports = {
    name: "colorinfo",
    category: "info",
    description:"Get JSON",
    run: (client, message, args) => {
    var color = args[0];
    if(color.indexOf("#")> -1){
        color = color.slice(1)
    }
    let url = `https://www.thecolorapi.com/id?hex=${color}`;
    getJSON(url, function(error, response){
        const embed = new RichEmbed()
        .setColor(color)
        .setTitle("Link JSON")
        .setURL(url)
        .addField("Tình trạng lỗi:", error, true)
        .addField("Mã hex:",response.hex.value,true)
        .addField("Tên màu:",response.name.value,true)
        .addField("Mã r,g,b:",response.rgb.value,true )

        message.channel.send(embed)

    });
}
}