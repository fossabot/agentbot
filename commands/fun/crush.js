const talkedRecently = new Set();
const ms = require('ms')
module.exports = {
    name: "crush",
    category: "fun",
    description: "Tìm crush của bạn",
    run: async(client, message, args) => {
        if (talkedRecently.has(message.author.id)) {
            message.reply(`Vui lòng chờ sau 5 giây từ khi nhập lệnh......`)
        } else {
            talkedRecently.add(message.author.id)
            if (message.member.roles.has('663976426609049601')) { //Nam
                person = message.guild.members
                    .filter(m => m.id !== message.author.id && !m.user.bot && !m.roles.has('663976426609049601'))
                    .random();
                message.channel.send(`${person.displayName} muốn xơi ${message.member.displayName} từ lâu......`);
            } else if (message.member.roles.has('663976552392032278')) { //Nữ
                person = message.guild.members
                    .filter(m => m.id !== message.author.id && !m.user.bot && !m.roles.has('663976552392032278'))
                    .random();
                message.channel.send(`${person.displayName} muốn xơi ${message.member.displayName} từ lâu......`);
            } else if (message.member.roles.has('663999161913442304')) { //role LGBT
                person = message.guild.members
                    .filter(m => m.id !== message.author.id && !m.user.bot)
                    .random();
                message.channel.send(`${person.displayName} muốn xơi ${message.member.displayName} từ lâu......`);
            } else {
                pick_role = client.channels.get("663965962503979020")
                message.channel.send(`Bạn chưa pick role giới tính, vui lòng pick role tại ${pick_role}`)
            }
            setTimeout(() => {
                talkedRecently.delete(message.author.id)
            }, ms('5s'))
        }
    }
}