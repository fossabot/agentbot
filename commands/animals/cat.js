var getJSON = require("get-json")
const { RichEmbed } = require("discord.js")
module.exports = {
    name: "cat",
    category: "animals",
    description: "Gởi ảnh/video moè cute :)) ",
    usage:"_cat",
    run: (client, message, args) => {
        let url = `http://aws.random.cat/meow`
        getJSON(url, function(error,response){
        const embed = new RichEmbed()
            .setTitle(`Cat pics/videos :D`)
            .setURL(response.file)
            .setImage(response.file)
            .setFooter(`Click the title to view/download`)
        message.channel.send(embed)
        });
    }
}