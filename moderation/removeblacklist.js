const fs = require('fs')
module.exports = {
    name: "removeblacklist",
    aliases: ["blacklistremove","rbl"],
    category: "moderation",
    description:"Remove from blacklist",
    usage:"_removeblacklist <@tag>",
    run: async (client, message, args) => {
        if (message.author.id !== "455935236262592512") return message.channel.send(`Command dành riêng cho Dui`)
        if(!args[0]) return message.reply(`Mày đéo tag sao tao add vô blacklist?`)
        let blacklist_member = message.mentions.members.first() || message.guild.members.get(args[0]);
        var check = fs.readFileSync('./blacklist.txt','utf8').split('\n')
        if (check.indexOf(blacklist_member.user.id) > -1){
            var pos = check.indexOf(blacklist_member.user.id)
            if (pos !== -1) check.splice(pos,1);
            fs.writeFileSync('./blacklist.txt',check)
            message.channel.send(`Đã xoá **${blacklist_member.user.tag}** ra khỏi blacklist! Đang khởi động lại bot.`)
        } else {
           return message.channel.send(`Bạn **${blacklist_member.user.tag}** không có trong blacklist!`)
        }
    }
}