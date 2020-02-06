const fs = require('fs')
module.exports = {
    name: "addblacklist",
    aliases: ["blacklistadd","abl"],
    category: "moderation",
    description:"Add to blacklist",
    usage:"_addblacklist <@tag>",
    run: async (client, message, args) => {
        if (message.author.id !== "455935236262592512") return message.channel.send(`Command dành riêng cho Dui`)
        if(!args[0]) return message.reply(`Mày đéo tag sao tao add vô blacklist?`)
        let blacklist_member = message.mentions.members.first() || message.guild.members.get(args[0]);
        var check = fs.readFileSync('./blacklist.txt','utf8').split('\n')
        if (check.indexOf(blacklist_member.user.id) > -1){
            return message.channel.send(`Bạn **${blacklist_member.user.tag}** đã có trong blacklist!`)
        } else {
            fs.appendFileSync('./blacklist.txt',`\n${blacklist_member.id}`)
            message.channel.send(`Đã add **${blacklist_member.user.tag}** vào danh sách đen. Đang khởi động lại bot...........`)
        }
    }
}