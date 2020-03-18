var { google_translate_key } = require("../../config.json")
var googleTranslate = require('google-translate')(google_translate_key)
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "translate",
    category: "fun",
    description: "Translate",
    usage: "_translate <target_lang> (en) <query>",
    note: "target_lang phải là mã quốc gia 2 ký tự (VD: us, ca)",
    run: (client, message, args) => {
        if (!args[0]) return message.reply("Bạn không ghi nguôn ngữ dịch thì sao mình dịch D:")
        if (!args[1]) return message.reply("Bạn phải nhập gì đó để dịch chứ")
        let lang = args[0];
        let que = args.slice(1).join(' ');
        googleTranslate.translate(`${que}`, `${lang}`, function(err, translation) {
            if (!err) {
                const embed = new MessageEmbed()
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