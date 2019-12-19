module.exports = {
    name: "understand",
    category: "moderation",
    description: "Hiểu và nắm bắt rule khi vào.",
    usage: "_understand",
    run: async (client, message, args) => {
        var role = message.guild.roles.find(role => role.name === "phòng đôi");
        message.member.addRole(role);
        return message.reply("Add role thành công!");
    }
}
