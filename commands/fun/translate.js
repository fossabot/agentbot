var { google_translate_key } = require("../../config.json")
var googleTranslate = require('google-translate')(google_translate_key)
const { RichEmbed } = require("discord.js");
module.exports = {
    name: "translate",
    category: "fun",
    description: "Translate",
    usage: "_translate <target_lang> (en) <query>",
    run: (client, message, args) => {
        if (!args[0]) return message.reply("Mày không ghi ngôn ngữ tao dịch tiếng sao hoả cho mày giờ 😡")
        if (!args[1]) return message.reply("Mày không ghi gì sao tao dịch được :) ")
        let lang = args[0];
        let que = args.slice(1).join(' ');
        googleTranslate.translate(`${que}`, `${lang}`, function(err, translation) {
            if (!err) {
                const embed = new RichEmbed()
                    .setDescription(`Google translate bot`)
                    .addField(`Translate`, `${translation.detectedSourceLanguage} - ${lang}`)
                    .addField(`Before translate: `, `${que}`)
                    .addField(`After translate: `, `${translation.translatedText}`)
                    .setFooter(`By Duy đẹp trai`)
                message.channel.send(embed);
            } else {
                message.reply("Bot lỗi mẹ rồi, một là tao ngu hai là mày ngu!")
            }


        })

    }
}