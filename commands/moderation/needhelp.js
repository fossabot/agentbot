module.exports = {
    name: "needhelp",
    aliases: ["trogiup"],
    category: "moderation",
    description:"Ticket System for help",
    usage:"_needhelp or _trogiup",
    run: (client,message,args) => {
        var help_channel = client.channels.get("666039326098063420");
        var helprole = message.guild.roles.get("666039494193184788");
        var duy = "455935236262592512"
        message.member.addRole(helprole)
        message.reply(`Bạn đã gởi yêu cầu giúp đỡ! Mời bạn click vào 👉 ${help_channel} 👈`)
        help_channel.send(`<@${duy}>, bạn ${message.author} cần giúp đỡ. Trong khi admin tới thì hãy ghi câu hỏi luôn nhé :D.`)
    }
}