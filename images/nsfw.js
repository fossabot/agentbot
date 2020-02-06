const { KSoftClient } = require('ksoft.js');
const { RichEmbed } = require('discord.js')
var { ksoft_key } = require('../../apikey.json')
const ksoft = new KSoftClient(ksoft_key);

module.exports = {
    name: "nsfw",
    category: "images",
    description: "send nsfw images",
    run: async (client, message, args) => {
        if(!message.channel.nsfw){
            message.channel.send("Chỉ xài ở phòng nsfw, mày xài phòng khác discord nó xoá server tao thì tao ăn cám à.");
        } else {
        const respond = await ksoft.images.nsfw();
        const embed = new RichEmbed()
            .setTitle(`Click here to download!`)
            .setDescription(`NSFW image:`)
            .setURL(respond.url)
            .setFooter(`Get by AgentBot`)
            .setImage(respond.url)
        return message.channel.send(embed)
        }

    }
}
    

