//thanks a lot Satoh Sakurako
module.exports = {
    name: "evar",
    category: "moderation",
    description: "Remove role eva (dành cho onetwothree và admin)",
    usage: "_evar <tag>",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply("Đéo tag tao tán chết mẹ")
                .then(m => m.delete(5000));
        }
        if (message.author.id != '550478773649145862' && message.author.id != '455935236262592512') {
            return message.reply("Code này dành riêng cho OneTwoThree và Duy")
        }
        let user = message.mentions.members.first() || message.guild.members.get(args[0]);
        var role = message.guild.roles.find(role => role.name === "eva");
        if (!user)
            return message.reply("Đéo tìm thấy người mày tag, chắc là mày ngu hoặc là tao ngu.")
        if (!role)
            return message.reply("Đéo tìm thấy role `eva`!")

        message.guild.member(user).removeRole(role);
        message.channel.send("✅ Đã xoá role Eva")
    }
}