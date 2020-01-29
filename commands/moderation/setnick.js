module.exports = {
    name: "setnick",
    aliases: ["setnickname"],
    category: "moderation",
    description: "set nickname",
    usage: "_setnick <tag> [nickname]",
    note: "nickname bỏ trống = reset nickname",
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_NICKNAMES')) {
            return message.reply(`Địt mẹ mày không có quyền đổi mà kêu tao đổi tao vả chết mẹ giờ`);
        }
        let user = message.mentions.members.first() || message.guild.members.get(args[0])
        var output = args[1]
        if (!args[0]) return message.reply(`Mày không tag tao đổi tên bằng niềm`)
        if (!output) var output = user.user.username
        let nickname = args.slice(1).join(' ')
        user.setNickname(nickname)
            .then(message.channel.send(`Set nickname thành công cho ${user} từ **${user.displayName}** thành **${output}**`))
            .catch(e => {
                return message.channel.send(`Bot bị lỗi: ${e}`)
            });
            
    }
}