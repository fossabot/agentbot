//thanks a lot Satoh Sakurako
module.exports = {
    name: "test",
    category: "moderation",
    description: "Add role (dành cho admin)",
    usage: "_removerole <tag> <rolename>",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply("Đéo tag tao tán chết mẹ")
                .then(m => m.delete(5000));
        }
        if (message.author.id != '455935236262592512') {
            return message.reply("Code này dành riêng cho Duy")
        }
        var role_cat = args.slice(1).join(" ")
        let user = message.mentions.members.first() || message.guild.members.get(args[0]);
        var role = message.guild.roles.find(role => role.name === role_cat);
        if (!user)
            return message.reply("Đéo tìm thấy người mày tag, chắc là mày ngu hoặc là tao ngu.")
        if (!role)
            return message.reply(`Đéo tìm thấy role ${role_cat}!`)

        message.guild.member(user).removeRole(role);
        message.channel.send("✅ Đã xoá role")
    }
}
