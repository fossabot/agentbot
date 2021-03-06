const { MessageEmbed } = require("discord.js");
const { readdirSync } = require('fs')
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async(client, message, args) => {
        const category_list = readdirSync("./commands/")
        if (!args[0]) {
            return getAll(client, message);
        } else if (category_list.indexOf(args[0]) > -1) {
            return getCategory(client, message, args[0])
        } else {
            return getCMD(client, message, args[0]);
        }
    }
}

function getCategory(client, message, input) {
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Sử dụng _help <lệnh> để xem chi tiết`)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }
    const capfirstletter = input.charAt(0).toUpperCase() + input.slice(1)
    const info = stripIndents(`**${capfirstletter}**\n${commands(input)}`)
    return message.channel.send(embed.setDescription(info));
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Sử dụng _help <lệnh> để xem chi tiết`)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }
    const info = client.categories
        .map(cat => stripIndents `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
    if (cmd.note) info += `\n**Note**: ${cmd.note}`;

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}