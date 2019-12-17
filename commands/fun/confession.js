module.exports = {
    name: "cfs",
    description: "Gởi confession (về tình cảm, góp ý cho sv,...) ",
    usage: "_cfs <nội dung>",
    run: (client, message, args) => {
        message.delete();
        const channel = message.guild.channels.find(c => c.name === "confession")
        if (!channel)
            return message.channel.send("Couldn't find a `#confession` channel").then(m => m.delete(5000));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

            return channel.send(args.join(" "));
        }
    }
