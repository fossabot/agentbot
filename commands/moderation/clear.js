module.exports = {
    name: "clear",
    aliases: ["purge"],
    category: "moderation",
    description: "Clears the chat",
    run: async(client, message, args) => {
        message.delete();

        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Bạn không có quyền xoá tin nhắn (MANAGE_MESSAGES)").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Vui lòng nhập số hợp lệ.").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Mình(bot) không có quyền xoá tin nhắn (MANAGE_MESSAGES)").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Đã xoá \`${deleted.size}\` tin nhắn.`)).then(m => m.delete())
    }
}