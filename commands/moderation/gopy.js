const {fs} = require('fs')
module.exports = {
    name: "gopy",
    description: "Như tên ",
    usage: "_gopy <nội dung>",
    run: (client, message, args) => {
        const channel = message.guild.channels.find(c => c.name === "gop-y")
        if (!channel)
            return message.channel.send("Couldn't find a `#gop-y` channel").then(m => m.delete(5000));
        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        message.delete();

        var tinnhan = args.join(" ")
        let m = message.guild.members.get("455935236262592512")
        m.send(`---------------------------------------------`)
        m.send(`From: ${message.author.id}`);
        m.send(`Aka: ${message.member.displayName}`)
        m.send(`Message: ${tinnhan}`);
        m.send(`At: ${year + "-" + month + "-" + date + " " + hours + ":" + minutes }`)
        m.send(`---------------------------------------------`)
        return channel.send(tinnhan);

        }
    }
