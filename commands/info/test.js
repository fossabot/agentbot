module.exports = {
    name: "test",
    category: "info",
    description: "Get word explain by UrbanDict",
    usage: "_urban <query>",
    run: async (client, message, args, tools) => {
        let roles = [];
        roles.push(message.guild.roles.map(g => g.name))
        console.log(roles)
    }
}