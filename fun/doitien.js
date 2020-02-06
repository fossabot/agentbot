const { KSoftClient } = require('ksoft.js');
const { RichEmbed } = require('discord.js');
var { ksoft_key } = require('../../apikey.json')
const ksoft = new KSoftClient(ksoft_key);

module.exports = {
    name: "doitien",
    category: "fun",
    description: "convert money",
    usage: "_doitien <value> <from> <to>",
    note: "from, to phải sử dụng chuẩn ISO 3 kí tự như là USD, EUR",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("Đéo ghi số tiền sao tao chuyển được :)")
        let val = args[0];
        if (!args[1] || !args[2]) return message.reply("Đéo ghi tiền tệ tao đổi bằng cu")
        let before = args[1].toUpperCase();
        let after = args[2];
        const  respond  = await ksoft.kumo.convert(val,before,after);
        const embed = new RichEmbed()
            .setDescription(`Hệ thống đổi tiền`)
            .setAuthor(`AgentBot`)
            .addField("Giá trị trước khi đổi: ",`${val} ${before}`)
            .addField("Giá trị sau khi đổi: ", respond.pretty)
            .setFooter("Tỉ giá tự động cập nhật sau mỗi giờ!")
        message.channel.send(embed)
    }
}
    


