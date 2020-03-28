const get_JSON = require('get-json');
const { MessageEmbed } = require('discord.js');
const {iptrackapikey} = require('../../config.json')
module.exports = {
    name: "iptrack",
    aliases: ["trackip"],
    category: "trackip",
    description: "track IP",
    usage: "_iptrack <ip>",
    run: (client, message, args) => {
        const embed = new MessageEmbed()
        var ip = args[0]
        if (!ip) return message.channel.send('Vui lòng nhập IP');
        var url = `http://api.ipstack.com/${ip}?access_key=${iptrackapikey}&format=1`
        get_JSON(url, function(error, response) {
            if (!error) {
                embed.setTitle(`IP: ${ip}`)
                embed.addField('Type: ',response.type)
                embed.addField('Country Name: ', response.country_name)
                embed.addField('State: ',response.region_name)
                embed.addField('City: ', response.city)
                embed.addField('Zip code: ', response.zip)
                embed.addField('Latitute: ', response.latitude)
                embed.addField('Longitude: ',response.longitude)
                message.channel.send(embed)
            } else {
                return message.channel.send("Bot lỗi, hãy thử lại sau")
            }
        });
    }
}