module.exports = {
    name: "setnick",
    aliases: ["setnickname"],
    category: "moderation",
    description: "set nickname",
    usage: "_setnick <tag> [nickname]",
    note: "nickname bỏ trống = reset nickname",
    run: async(client, message, args) => {
        if (message.member.hasPermission('MANAGE_NICKNAMES') || message.author.id == '664680035218751530') {
            let user = message.mentions.members.first() || message.guild.members.get(args[0])
            var output = args.slice(1).join(' ')
            if (!args[0]) return message.reply(`Mày không tag tao đổi tên bằng niềm`)
            if (!output) var output = user.user.username
            let nickname = args.slice(1).join(' ')
            await user.setNickname(nickname)
                .catch(e => {
                    if (e){
                        return message.channel.send(`Bot bị lỗi: ${e}`)
                    } else {
                        message.channel.send(`Set nickname thành công cho ${user} từ **${user.displayName}** thành **${output}**`)
                    }
                    
                })
        } else {
            return message.reply(`Bạn không có quyền sử dụng lệnh này!`);
        }


    }
}