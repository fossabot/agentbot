//thanks a lot Satoh Sakurako
module.exports = {
    name: "adamr",
    category: "moderation",
    description: "Remove role adam (dành cho saddu và admin)",
    usage: "_adamr <tag>",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply("Đéo tag tao tán chết mẹ")
                .then(m => m.delete(5000));
        }
        if (message.author.id != '199276237250625536' && message.author.id != '455935236262592512' && message.author.id != '168430324152270849') {
            return message.reply("Code này dành riêng cho Saddu, Duy và Issac")
        }
        let user = message.mentions.members.first() || message.guild.members.get(args[0]);
        var role = message.guild.roles.find(role => role.name === "adam");

        message.guild.member(user).removeRole(role);
        message.channel.send("✅ Đã xoá role Adam")
    }
}