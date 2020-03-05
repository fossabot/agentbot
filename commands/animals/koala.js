var getJSON = require("get-json")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "koala",
    category: "animals",
    description: "Gởi ảnh của koala ",
    usage: "_koala",
    run: async(client, message, args) => {
        let url = `https://some-random-api.ml/img/koala`
        let facturl = `https://some-random-api.ml/facts/koala`
        await getJSON(facturl, function(err, fact_res) {
            message.channel.send(`Fact: ${fact_res.fact}`)
        })
        getJSON(url, function(error, response) {
            const embed = new MessageEmbed()
                .setTitle(`Koala pics :D`)
                .setURL(response.link)
                .setImage(response.link)
                .setFooter(`Click the title to view/download`)
            message.channel.send(embed)

        });

    }
}