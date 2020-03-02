var getJSON = require('get-json')
var stringSimilarity = require('string-similarity');
module.exports = {
    name: "coloradd",
    aliases: ["addcolor"],
    category: "moderation",
    description: "Add role with color",
    usage: "_coloradd <hexcolor>",
    run: (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));
        if (!args[0])
            return message.reply("Không chọn màu thì kêu tao làm gì").then(m => m.delete(5000))
        var color = args[0];
        if (color.indexOf("#") > -1) {
            color = color.slice(1)
        }
        let url = `https://www.thecolorapi.com/id?hex=${color}`;
        getJSON(url, function(error, response) {
            if (error) return message.channel.send(`Bot lỗi, vui lòng thử lại sau.`)
                //check coi màu đã có trong sv chưa
            var roles = [];
            roles.push(message.guild.roles.filter(r => r.managed === false).map(g => g.name))
            var search = response.name.value
            var matches = stringSimilarity.findBestMatch(search, roles[0])
            if (matches.bestMatch.rating < 0.65) {
                let lowest_role = message.guild.roles.get('663988046009466880')
                let position = lowest_role.calculatedPosition
                let color = response.hex.value
                message.guild.createRole({
                    name: search,
                    color: color,
                    position: position,
                })
                return message.channel.send(`Đã tạo role màu: **${search}** với hex code **${color}** ở vị trí **${position}**`)
            } else {
                return message.channel.send(`Màu **${search}** này đã có trong server!`)
            }
        });
    }
}