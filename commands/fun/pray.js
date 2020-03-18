const { getMember } = require("../../functions.js");
module.exports = {
    name: "pray",
    category: "fun",
    description: "Cầu nguyện cho bạn bè :DD",
    usage: "_pray [mention | id | username]",
    run: async(client, message, args) => {
        if (!args[0]) {
            return message.reply("Pray mà éo có tag là tao tán vỡ mồm đó 😡")
        }
        let person = getMember(message, args[0]);
        if (message.author.id === person.id) {
            return message.reply("Có thờ có thiêng có duyên chết liền. Cầu cho người khác chứ cầu cho mình hoài vậy.");
        } else {
            message.channel.send(`🙏 ${message.member.displayName} prays for ${person.displayName} \n Wish you the best of luck!`);
        }
    }
}