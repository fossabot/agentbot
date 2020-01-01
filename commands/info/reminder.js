const { RichEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "reminder",
    description: "Reminder",
    usage:"_reminder <time> (5s,15m,1h,2d) <text>",
    run: async (client, message, args) => {
        let reminderTime = args[0]
        if (!reminderTime) return message.reply("Éo ghi thời gian sao tao biết tao nhắc mày.")
        let reminder = args.slice(1).join(" ");
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.username}'s Reminder`)
            .addField("Reminder: ",`${reminder}`)
            .addField("Time", `${reminderTime}`)
            .setTimestamp()
        message.channel.send(embed)

        setTimeout(function(){
            let embed = new RichEmbed()
                .setColor("RANDOM")
                .setTitle(`${message.author.username}'s Reminder`)
                .addField("Reminder: ",`${reminder}`)
                .setTimestamp()
            message.channel.send(embed)
            
        },ms(reminderTime));
    }
}