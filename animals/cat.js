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
            if(!error){
                const embed = new RichEmbed()
                    .setTitle(`Cat pics/videos :D`)
                    .setURL(response.file)
                    .setImage(response.file)
                    .setFooter(`Bot made by phamleduy04#9999`)
                message.channel.send(embed)
            } else {
                message.channel.send(`Bot lỗi trong khi lấy hình, vui lòng thử lại sau.`)
            }
      
        });
    }
}