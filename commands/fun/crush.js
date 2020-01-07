module.exports = {
    name: "crush",
    category: "fun",
    description: "Tìm crush của bạn",
    run: async (client, message, args) => {
        person = message.guild.members
            .filter(m => m.id !== message.author.id)
            .random();

        message.channel.send(`${person.displayName} muốn xơi ${message.member.displayName} từ lâu......`);
    }
}