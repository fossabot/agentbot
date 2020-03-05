let stringSimilarity = require('string-similarity');
module.exports = {
    name: "addrole",
    aliases: ["roleadd"],
    category: "moderation",
    description: "Add role (dành cho admin)",
    usage: "_addrole <tag> <rolename>",
    run: async(client, message, args) => {
        if (!args[0]) {
            return message.reply("Đéo tag tao tán chết mẹ")
                .then(m => m.delete(5000));
        } else if (!args[1]) {
            return message.reply('Đéo ghi tên role tao add bằng cak à?')
                .then(m => m.delete(5000));
        } else if (message.author.id !== '455935236262592512') {
            return message.reply("Code này dành riêng cho Duy")
        } else {
            let roles = message.guild.roles.cache.filter(r => r.managed === false).map(g => g.name)
            var search = args.slice(1).join(" ")
            var matches = stringSimilarity.findBestMatch(search, roles)
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            var role = message.guild.roles.cache.find(role => role.name == matches.bestMatch.target);
            if (!user)
                return message.reply("Đéo tìm thấy người mày tag, chắc là mày ngu hoặc là tao ngu.")
            const error_status = []

            await message.guild.member(user).roles.add(role)
                .catch(err => {
                    message.channel.send(err.message);
                    error_status.push(1)
                });
            if (error_status.length == 0) message.channel.send(`✅ 👌 Đã add role **${role.name}** cho **${user.user.tag}**`)
        }
    }
}