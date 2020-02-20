var request = require('request')
const {RichEmbed} = require('discord.js')
const url = 'https://corona-api.kompa.ai/graphql'
const corona_url = 'https://quohat.pythonanywhere.com/'
const graphql = require('graphql-request');
const query = `query countries {
    countries {
        Country_Region
        Confirmed
        Deaths
        Recovered 
    }
}`
module.exports = {
    name: "corona",
    category: "info",
    description: "Thông tin về coronavirus",
    usage: " `\_corona`\ ",
    note: "Sử dụng `\_corona US(VN)`\ để xem thông tin dành riêng cho US,VN ",
    run: async (client, message, args) => {
        if (!args[0]){
            request(corona_url, function(error, response, request){
                if (error) return message.channel.send(`Bot lỗi, status code: ${response && response.statusCode}`)
                var ketqua = request.split(' ')
                ketqua.splice(1,1)
                var quocgia = ketqua[0]
                var xacnhan = ketqua[1]
                var die = ketqua[2]
                const embed = new RichEmbed()
                    .setAuthor(`Lưu ý: Thông tin cập nhật về bot không phải thời gian thực!`)
                    .setTitle(`Thông tin về virus Corona aka nCoV`)
                    .addField(`Số lượng ca nhiễm: `,`${xacnhan} ca`)
                    .addField(`Số người chết: `,`${die} người`)
                    .addField(`Số quốc gia có bệnh: `,`${quocgia} nước`)
                    .setFooter(`Nguồn: Wikipedia. Made by phamleduy04#9999`)
                message.channel.send(embed)
            })
        } else if (args[0].toLowerCase() == "us"){
            graphql.request(url,query)
                .then(res => {
                    var us = res.countries.filter(find => find.Country_Region == "US")
                    var us = us[0]
                    const us_embed = new RichEmbed()
                        .setAuthor(`Thông tin sử dụng thời gian thực!`)
                        .setTitle(`Số ca nhiễm COVID-19 ở Hoa Kỳ (US)`)
                        .addField(`Số ca đẵ xác nhận: `,`${us.Confirmed} ca`)
                        .addField(`Số ca tử vong: `,`${us.Deaths} ca`)
                        .addField(`Số ca đã hồi phục: `,`${us.Recovered} ca`)
                        .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999 `)
                    message.channel.send(us_embed)
                })
        } else if (args[0].toLowerCase() == "vn" || args[0].toLowerCase() == "vietnam"){
            graphql.request(url,query)
                .then(res => {
                    var vietnam = res.countries.filter(find => find.Country_Region == "Vietnam")
                    var vietnam = vietnam[0]
                    const vn_embed = new RichEmbed()
                        .setAuthor(`Thông tin sử dụng thời gian thực!`)
                        .setTitle(`Số ca nhiễm COVID-19 ở Việt Nam`)
                        .addField(`Số ca đẵ xác nhận: `,`${vietnam.Confirmed} ca`)
                        .addField(`Số ca tử vong: `,`${vietnam.Deaths} ca`)
                        .addField(`Số ca đã hồi phục: `,`${vietnam.Recovered} ca`)
                        .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999 `)
                    message.channel.send(vn_embed)
                        })
        } else if (args[0].toLowerCase() == "canada"|| args[0].toLowerCase() == "can"){
            graphql.request(url,query)
                .then(res => {
                    var canada = res.countries.filter(find => find.Country_Region == "Canada")
                    var canada = canada[0]
                    const can_embed = new RichEmbed()
                        .setAuthor(`Thông tin sử dụng thời gian thực!`)
                        .setTitle(`Số ca nhiễm COVID-19 ở Canada`)
                        .addField(`Số ca đẵ xác nhận: `,`${canada.Confirmed} ca`)
                        .addField(`Số ca tử vong: `,`${canada.Deaths} ca`)
                        .addField(`Số ca đã hồi phục: `,`${canada.Recovered} ca`)
                        .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999 `)
                    message.channel.send(can_embed)
                });
        } else {
            message.channel.send(`Đất nước bạn đang tìm kiếm bot chưa hỗ trợ, hãy quay lại sau nhé!`)
        }
    }
}