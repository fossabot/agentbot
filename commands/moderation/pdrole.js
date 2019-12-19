const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
module.exports = {
    name: "understand",
    category: "moderation",
    description: "Hiểu và nắm bắt rule khi vào.",
    usage: "_understand",
    run: async (client, message, args) => {
    var role = message.guild.roles.find(role => role.name === "phòng đôi");
    const promptEmbed = new RichEmbed()
        .setColor("GREEN")
        .setAuthor(`This verification becomes invalid after 30s.`)
        .setDescription(`Do you want to add role?`)
    await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reaction collector
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
        if (emoji === "✅") {
            msg.delete();
            message.member.addRole(role);
            message.reply("✅ Đã add role!")
        } else if (emoji === "❌") {
            msg.delete();
            message.reply(`❌ Đã huỷ add role`)
                .then(m => m.delete(10000));
        }
    }); 
    }
}
