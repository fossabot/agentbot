module.exports = {
    name: "mun",
    description: "Triệu hồi thánh chửi",
    usage: "_mun <tag>",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("Địt mẹ mày kêu mun ra chửi mà éo tag tao kêu mun chửi chết mẹ mày giờ.")
        var mun = '312791662747320340'
        let person = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (person.id == "455935236262592512"){
            message.channel.send(`<@${mun}>, chửi chết mẹ bạn ${message.author} đi.`)
        } else {
            message.channel.send(`<@${mun}>, chửi chết mẹ bạn ${person} đi.`)
        }
            

    }
}