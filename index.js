const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: false
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "PLAYING"
        }
    }); 
});
client.on("guildMemberAdd", (member) => {
    rule = member.guild.channels.find(c => c.name === "rule")
    pick_role = member.guild.channels.find(c => c.name === "pick-role-ở-đây")
    hdsd_bot_nhac = member.guild.channels.find(c => c.name === "hdsd-bot-nhạc")
    hdsd_bot = member.guild.channels.find(c => c.name === "how-to-use-bot")
    member.guild.channels.find(c => c.name === "welcome").send(`Xin chào ${member}, chào mừng đến tới **${member.guild.name}**! Vui lòng đọc kỹ ${rule} và pick role ở ${pick_role} nhé 😍`);
    member.send(`Xin chào ${member}, chào mừng đến tới **${member.guild.name}**! Vui lòng đọc kỹ ${rule} và pick role ở ${pick_role} nhé 😍`)
    member.send(`Nếu bạn không biết cách sử dụng bot, tham khảo 2 channel ${hdsd_bot_nhac} và ${hdsd_bot} trước khi hỏi các mem khác nhé ♥`)
    member.send(`Bạn có thể click vào những cái dòng chữ được hyper lên để có thể tự dộng nhảy qua channel`)

});

client.on("message", async message => {
    const prefix = "_";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.login(process.env.TOKEN);
