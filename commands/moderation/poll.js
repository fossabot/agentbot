const { RichEmbed } = require("discord.js");
module.exports = {
    name: "tpoll",
    category: "moderation",
    description: "Tạo poll",
    usage: "_poll <what to poll>",
    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send("Đéo ghi gì tao tạo poll bằng chim =))")
        if(message.member.roles.some(r=>["admin","mod"].includes(r.name)) || message.author.id == "455935236262592512"){
            const channel = client.channels.get("663971661208485971")
            if(!channel) return message.reply("Đéo tìm thấy phòng, check lại config")
            const embed = new RichEmbed()
                .setColor('RANDOM')
                .setFooter('React to vote!')
                .setDescription(args.join(' '))
                .setTitle(`Poll created by ${message.author.username}`);
            let msg = await channel.send(embed);
            await msg.react('✅');
            await msg.react('❌');
    
            message.delete({timeout: 1000});
        }else{
            message.delete({timeout:1000})
            return message.reply("Code này dành cho admin và mod").then(m=>m.delete(1000))
        }

    }
}