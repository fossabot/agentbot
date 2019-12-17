const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "thucung",
    category: "fun",
    description: "Sends an epic animals pics",
    run: async (client, message, args) => {
        const subReddits = ["catsonglass", "catbellies" , "Catswithjobs", "WhatsWrongWithYourCat", "WhatsWrongWithYourDog", "woof_irl", "tippytaps", "corgi", "hardcoreaww", "kittens"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}