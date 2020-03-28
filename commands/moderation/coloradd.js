var getJSON = require('get-json')
var stringSimilarity = require('string-similarity');
module.exports = {
    name: "coloradd",
    aliases: ["addcolor"],
    category: "moderation",
    description: "Add role with color",
    usage: "_coloradd <hexcolor>",
    run: async(client, message, args) => {
        if (!args[0])
            return message.reply("Không chọn màu thì kêu tao làm gì").then(m => m.delete(5000))
        var color = args[0];
        if (color.indexOf("#") > -1) {
            color = color.slice(1)
        }
        let url = `https://www.thecolorapi.com/id?hex=${color}`;
        getJSON(url, async function(error, response) {
            if (error) return message.channel.send(`Bot lỗi, vui lòng thử lại sau.`)
                //check coi màu đã có trong sv chưa
            var roles = [];
            roles.push(message.guild.roles.cache.filter(r => r.managed === false).map(g => g.name))
            var search = response.name.value
            var matches = stringSimilarity.findBestMatch(search, roles[0])
            if (matches.bestMatch.rating < 0.65) {
                let lowest_role = message.guild.roles.cache.get('684957922148745267')
                let position = lowest_role.position
                let color = response.hex.value
                message.guild.roles.create({
                    data: {
                        name: search,
                        color: color,
                        position: position,
                    }
                }).then(r => {
                    message.member.roles.add(r.id);
                    return message.channel.send(`Đã add role màu: **${r.name}** cho **${message.author.tag}**`)
                })

            } else {
                var rolemau = message.guild.roles.cache.find(r => r.name == search)
                await message.member.roles.add(rolemau.id);
                return message.channel.send(`Đã add role màu: **${rolemau.name}** cho **${message.author.tag}**`)
            }
        });
    }
}