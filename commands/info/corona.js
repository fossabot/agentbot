var request = require('request')
const {RichEmbed} = require('discord.js')
const url = 'https://quohat.pythonanywhere.com'
const US_url = 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html'
module.exports = {
    name: "corona",
    category: "info",
    description: "Thông tin về coronavirus",
    usage: " `\_corona`\ ",
    note: "Sử dụng `\_corona US`\ để xem thông tin dành riêng cho US ",
    run: async (client, message, args) => {
        if (args[0].toLowerCase() == "us"){
            request(US_url, function (error, response, request){
                if (error) return message.channel.send(`Bot lỗi, status code: ${response && response.statusCode}`)
                var begin = request.indexOf('<table class="table table-striped table-bordered">')
                var end = request.indexOf('<p><sup>*</sup>')
                var solieu = request.slice(begin,end)
                var solieu = solieu.replace(/[^a-zA-Z0-9 ]/g, "");
                var solieu = solieu.replace(/c|s|o|t|r|l|a|h|m|b|p|e|i|d|n|y|P|u|I|v|g|U|S|w|N|k|T/g, "");
                var solieu = solieu.trim().split(" ");
                var pos = solieu.slice(0,1)
                var neg = solieu.slice(1,2)
                var pending = solieu.slice(2,3)
                var total = solieu.slice(5)
                const us_corona = new RichEmbed()
                    .setAuthor(`Coronavirus Disease 2019 (COVID-19) in the U.S.`)
                    .addField(`Positive: `,`${pos} cases`)
                    .addField(`Negative: `,`${neg} cases`)
                    .addField(`Pending: (Includes specimens received and awaiting testing)`,`${pending} cases`)
                    .addField(`Total: `,`${total} cases`)
                    .setFooter(`Source: https://www.cdc.gov/`)
                message.channel.send(us_corona)
            })
        } else {
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
}