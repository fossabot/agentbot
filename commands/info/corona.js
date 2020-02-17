var request = require('request')
const {RichEmbed} = require('discord.js')
const url = 'https://quohat.pythonanywhere.com'
module.exports = {
    name: "corona",
    category: "info",
    description: "Thông tin về coronavirus",
    usage: "_corona",
    run: async (client, message, args) => {
        request(url, function (error, response, request){
            if (error) return message.channel.send(`Bot lỗi, status code: ${response && response.statusCode}`)
            var ketqua = request.split(' ')
            var xacnhan = ketqua[0]
            var die = ketqua[1]
            var recoveries= ketqua[2]
            const embed = new RichEmbed()
                .setAuthor(`Lưu ý: Thông tin cập nhật về bot không phải thời gian thực!`)
                .setTitle(`Thông tin về virus Corona aka nCoV`)
                .addField(`Số lượng ca nhiễm: `,`${xacnhan} ca`)
                .addField(`Số người chết: `,`${die} người`)
                .addField(`Số người bình phục: `,`${recoveries} người`)
                .setFooter(`Nguồn: Wikipedia. Made by phamleduy04#9999`)
            message.channel.send(embed)            
        })
    }
}