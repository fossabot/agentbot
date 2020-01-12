module.exports = {
    name: "closeticket",
    aliases: ["closet"],
    category: "moderation",
    description:"Close help Ticket",
    usage:"_closeticket or _closet",
    run: (client,message,args) => {
        let user = message.mentions.members.first() || message.guild.members.get(args[0])
        var helprole = message.guild.roles.get("666039494193184788");
        message.guild.member(user).removeRole(helprole).catch(err => message.channel.send(err.message));
        message.reply(`Đã xoá ticket của ${user}`)
    }
}