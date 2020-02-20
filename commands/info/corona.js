const {RichEmbed} = require('discord.js')
const url = 'https://corona-api.kompa.ai/graphql'
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
            graphql.request(url, query)
                .then(data => {
                    var confirmed = 0;
                    var die = 0;
                    var recovered = 0;
                    data.countries.forEach(count => {
                        confirmed = confirmed + parseInt(count.Confirmed);
                        die = die + parseInt(count.Deaths)
                        recovered = recovered + parseInt(count.Recovered)
                    });
                    var confirmed = confirmed.toString().replace(/(-?\d+)(\d{3})/g, "$1,$2") //Thêm dấu phẩy sau 3 chữ số (75,748)
                    var die = die.toString().replace(/(-?\d+)(\d{3})/g, "$1,$2")
                    var recovered = recovered.toString().replace(/(-?\d+)(\d{3})/g, "$1,$2")
                    const embed = new RichEmbed()
                        .setTitle(`Thông tin về virus Corona (nCoV, COVID-19)`)
                        .addField(`Số lượng ca nhiễm: `,`${confirmed} ca`)
                        .addField(`Số người chết: `,`${die} người`)
                        .addField(`Số người hội phục: `,`${recovered} người`)
                        .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999\nThông tin cập nhật theo thời gian thực!`)
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
                        .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999`)
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
