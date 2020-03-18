const { KSoftClient } = require('ksoft.js');
const { MessageEmbed } = require('discord.js');
var { ksoft_key } = require('../../config.json')
const ksoft = new KSoftClient(ksoft_key);

module.exports = {
    name: "doitien",
    category: "fun",
    description: "convert money",
    usage: "_doitien <value> <from> <to>",
    note: "from, to phải sử dụng chuẩn ISO 3 kí tự như là USD, EUR",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply("Bạn phải ghi số tiền cần đổi")
        let val = args[0];
        if (!args[1] || !args[2]) return message.reply("Bạn phải nhập loại tiền tệ cần đổi. Ví dụ: EUR, USD")
        let before = args[1].toUpperCase();
        let after = args[2];
        const respond = await ksoft.kumo.convert(val, before, after);
        const embed = new MessageEmbed()
            .setDescription(`Hệ thống đổi tiền`)
            .setAuthor(`AgentBot`)
            .addField("Giá trị trước khi đổi: ", `${val} ${before}`)
            .addField("Giá trị sau khi đổi: ", respond.pretty)
            .setFooter("Tỉ giá tự động cập nhật sau mỗi giờ!")
        message.channel.send(embed)
    }
}