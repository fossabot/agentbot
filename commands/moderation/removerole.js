let stringSimilarity = require('string-similarity')
module.exports = {
    name: "removerole",
    aliases: ["roleremove"],
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
        let roles = [];
        roles.push(message.guild.roles.map(g => g.name))
        var search = args.slice(1).join(' ')
        var matches = stringSimilarity.findBestMatch(search, roles[0])
        let user = message.mentions.members.first() || message.guild.members.get(args[0]);
        var role = message.guild.roles.find(role => role.name === matches.bestMatch.target);
        if (!user)
            return message.reply("Đéo tìm thấy người mày tag, chắc là mày ngu hoặc là tao ngu.")
        
        message.guild.member(user).removeRole(role).catch(err => message.channel.send(err.message));
        message.channel.send(`✅ Đã xoá role **${role.name}**`)
    }
}
