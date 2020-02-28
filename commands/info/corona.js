const { RichEmbed } = require("discord.js");
const url = "https://corona-api.kompa.ai/graphql";
const graphql = require("graphql-request");
const korean_list = ["korean", "kr", "hanquoc", "han"];
const query = `query countries {
    countries {
        Country_Region
        Confirmed
        Deaths
        Recovered 
        Last_Update
    }
    provinces {
        Province_Name
        Province_Id
        Confirmed
        Deaths
        Recovered
        Last_Update
    }
}`;
const graphqlclient = new graphql.GraphQLClient(url, {
    headers: {
        Authority: "corona-api.kompa.ai",
        Scheme: "https",
        Path: "/graphql",
        Accept: "*/*",
        UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
        Origin: "https://corona.kompa.ai",
        secfetchsize: "same-site",
        secfetchmode: "cors",
        Referer: "https://corona.kompa.ai",
        AcceptEncoding: "gzip, deflate, br",
        AcceptLanguage: "vn-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5"
    },
})
module.exports = {
    name: "corona",
    category: "info",
    description: "Thông tin về coronavirus",
    usage: " `_corona` hoặc `_corona <tên quốc gia>`",
    note: "Quốc gia đang hỗ trợ: Việt Nam (vn), Hàn Quốc (kr), Hoa Kì (us), Canada (can)",
    run: async(client, message, args) => {
        if (!args[0]) {
            graphqlclient.request(query).then(data => {
                var confirmed = 0;
                var die = 0;
                var recovered = 0;
                data.countries.forEach(count => {
                    confirmed = confirmed + parseInt(count.Confirmed);
                    die = die + parseInt(count.Deaths);
                    recovered = recovered + parseInt(count.Recovered);
                });
                var confirmed = confirmed
                    .toString()
                    .replace(/(-?\d+)(\d{3})/g, "$1,$2"); //Thêm dấu phẩy sau 3 chữ số (75,748)
                var die = die.toString().replace(/(-?\d+)(\d{3})/g, "$1,$2");
                var recovered = recovered
                    .toString()
                    .replace(/(-?\d+)(\d{3})/g, "$1,$2");
                const embed = new RichEmbed()
                    .setAuthor(`Dữ liệu được tự động cập nhật`)
                    .setTitle(`Thông tin về virus Corona (nCoV, COVID-19)`)
                    .addField(`Số lượng ca nhiễm: `, `${confirmed} ca`)
                    .addField(`Số người chết: `, `${die} người`)
                    .addField(`Số người hội phục: `, `${recovered} người`)
                    .setFooter(
                        `Nguồn: corona.kompa.ai | Made by phamleduy04#9999\nThông tin cập nhật theo thời gian thực!`
                    );
                message.channel.send(embed);
            });
        } else if (args[0].toLowerCase() == "us") {
            graphqlclient.request(query).then(res => {
                var us = res.countries.filter(find => find.Country_Region == "US");
                var us = us[0];
                var us_updatetimestamp = new Date(parseInt(us.Last_Update))
                var us_updatedate = us_updatetimestamp.getDate() + '/' + (us_updatetimestamp.getMonth()+1) + '/' + us_updatetimestamp.getFullYear()
                const us_embed = new RichEmbed()
                    .setAuthor(`Dữ liệu được tự động cập nhật`)
                    .setTitle(`Số ca nhiễm COVID-19 ở Hoa Kỳ (US)`)
                    .addField(`Số ca đẵ xác nhận: `, `${us.Confirmed} ca`)
                    .addField(`Số ca tử vong: `, `${us.Deaths} ca`)
                    .addField(`Số ca đã hồi phục: `, `${us.Recovered} ca`)
                    .addField(`Cập nhật vào ngày: `, us_updatedate)
                    .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999`);
                message.channel.send(us_embed);
            });
        } else if (
            args[0].toLowerCase() == "vn" || args[0].toLowerCase() == "vietnam"
        ){
            if (args[1] && args[1].toLowerCase() == 'full'){
                graphqlclient.request(query).then(res => {
                    const vn_full_embed = new RichEmbed()
                        .setAuthor(`Dữ liệu được tự động cập nhật`)
                        .setTitle(`Số ca nhiễm COVID-19 ở Việt Nam (chi tiết)`)
                        .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999`)
                    res.provinces.forEach(tentp => {
                        vn_full_embed.addField(`${tentp.Province_Name} có: `,`${tentp.Confirmed} ca nhiễm, ${tentp.Deaths} ca tử vong và ${tentp.Recovered} ca hồi phục.`)
                    })
                    message.channel.send(vn_full_embed)
                })
            } else {
                graphqlclient.request(query).then(res => {
                    var vietnam = res.countries.filter(find => find.Country_Region == "Vietnam");
                    var vietnam = vietnam[0]
                    var vn_timestamp = new Date(parseInt(vietnam.Last_Update))
                    var vn_updatedate = vn_timestamp.getDate() + '/' + (vn_timestamp.getMonth()+1) + '/' + vn_timestamp.getFullYear()
                    const vn_embed = new RichEmbed()
                        .setAuthor(`Dữ liệu được tự động cập nhật`)
                        .setTitle(`Số ca nhiễm COVID-19 ở Việt Nam`)
                        .setDescription(`Tips: Sử dụng lệnh \`_corona vn full\` để hiển thị chi tiết.`)
                        .addField(`Số ca đẵ xác nhận: `, `${vietnam.Confirmed} ca`)
                        .addField(`Số ca tử vong: `, `${vietnam.Deaths} ca`)
                        .addField(`Số ca đã hồi phục: `, `${vietnam.Recovered} ca`)
                        .addField(`Ngày cập nhật: `, vn_updatedate)
                        .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999 `);
                    message.channel.send(vn_embed);
                });
            }
        } else if (
            args[0].toLowerCase() == "canada" || args[0].toLowerCase() == "can"
        ) {
            graphqlclient.request(query).then(res => {
                var canada = res.countries.filter(
                    find => find.Country_Region == "Canada"
                );
                var canada = canada[0];
                var ca_timestamp = new Date(parseInt(canada.Last_Update))
                var ca_updatedate = ca_timestamp.getDate() + '/' + (ca_timestamp.getMonth()+1) + '/' + ca_timestamp.getFullYear()
                const can_embed = new RichEmbed()
                    .setAuthor(`Dữ liệu được tự động cập nhật`)
                    .setTitle(`Số ca nhiễm COVID-19 ở Canada`)
                    .addField(`Số ca đẵ xác nhận: `, `${canada.Confirmed} ca`)
                    .addField(`Số ca tử vong: `, `${canada.Deaths} ca`)
                    .addField(`Số ca đã hồi phục: `, `${canada.Recovered} ca`)
                    .addField(`Ngày cập nhật: `,ca_updatedate)
                    .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999 `);
                message.channel.send(can_embed);
            });
        } else if (korean_list.indexOf(args[0].toLowerCase()) > -1) {
            graphqlclient.request(query).then(res => {
                var korean = res.countries.filter(
                    find => find.Country_Region == "South Korea"
                );
                var korean = korean[0];
                var kr_timestamp = new Date(parseInt(korean.Last_Update))
                var kr_updatedate = kr_timestamp.getDate() + '/' + (kr_timestamp.getMonth()+1) + '/' + kr_timestamp.getFullYear()
                const kr_embed = new RichEmbed()
                    .setAuthor(`Dữ liệu được tự động cập nhật`)
                    .setTitle(`Số ca nhiễm COVID-19 ở Hàn Quốc`)
                    .addField(`Số ca đẵ xác nhận: `, `${korean.Confirmed} ca`)
                    .addField(`Số ca tử vong: `, `${korean.Deaths} ca`)
                    .addField(`Số ca đã hồi phục: `, `${korean.Recovered} ca`)
                    .addField(`Ngày cập nhật: ` ,kr_updatedate)
                    .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999`);
                message.channel.send(kr_embed);
            });
        } else {
            message.channel.send(`Đất nước bạn đang tìm kiếm bot chưa hỗ trợ, hãy quay lại sau nhé!`);
        }
    }
};