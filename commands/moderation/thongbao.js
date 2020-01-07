module.exports = {
    name: "thongbao",
    description: "Như tên ",
    usage: "<input> (chỉ có admin đẹp trai mới được xài)",
    run: (client, message, args) => {
        message.delete();
        const channel = client.channels.get("663971706767015936")
        if (!channel)
            return message.channel.send("Couldn't find a `#thông-báo` channel").then(m => m.delete(5000));

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

            return channel.send(args.join(" "));
        }
    }
