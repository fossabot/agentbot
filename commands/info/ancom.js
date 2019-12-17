module.exports = {
    name: "ancom",
    aliases: ["dinner"],
    run: (client, message, args) => {
        message.delete();

        message.channel.send("Địt mẹ tao đang ăn cơm hú cc");

        }
    }
