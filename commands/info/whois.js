const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "whois",
    aliases: ["who", "user", "info"],
    category: "info",
    description: "Returns user information",
    usage: "_whois <tag,username,ID>",
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));
        let gtrole = message.guild.roles.get('663977844371619873')
        let qgrole = message.guild.roles.get('663984586757505034')
        let gamerole = message.guild.roles.get('663990034868994048')
        let statusrole = message.guild.roles.get('668691327701090314')
        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id )
            .map(r => r)
        roles.splice(roles.indexOf(gtrole),1);
        roles.splice(roles.indexOf(qgrole),1);
        roles.splice(roles.indexOf(gamerole),1);
        roles.splice(roles.indexOf(statusrole),1);
        roles.join(", ") || 'none';
        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Member information:', stripIndents`**- Display name:** ${member.displayName}
            **- Joined at:** ${joined}
            **- Roles:** ${roles}`, true)

            .addField('User information:', stripIndents`**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- Created at**: ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('Currently playing', stripIndents`** Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}