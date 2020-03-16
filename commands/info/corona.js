const { MessageEmbed } = require("discord.js");
const url = "https://corona-api.kompa.ai/graphql";
const graphql = require("graphql-request");
const ascii = require('ascii-table');
const getJSON = require('get-json');
const worldometers_url = 'https://coronaapiwom.herokuapp.com/apidata'
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
const search = {
    "vn": "Vietnam",
    "ca": "Canada",
    "us": "USA",
    "kr": "S. Korea",
    "au": "Australia",
    "cn": "China",
    "se": "Sweden",
    "hk": "Hong Kong",
    "fr": "France"
}
const quocgia = {
    "Viet Nam": "Việt Nam",
    "Canada": "Canada",
    "USA": "Hoa Kì",
    "S. Korea": "Hàn Quốc",
    "Australia": "Úc",
    "China": "Trung Quốc",
    "Sweden": "Thuỵ Điển",
    "Hong Kong": "Hong Kong",
    "France": "Pháp"
}
module.exports = {
    name: "corona",
    category: "info",
    description: "Thông tin về coronavirus",
    usage: " `_corona` hoặc `_corona <mã quốc gia 2 chữ>`",
    note: "Quốc gia đang hỗ trợ: VN, CA, KR, AU, CN, SE, HK, FR ",
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
                var confirmed = confirmed.toString().replace(/(-?\d+)(\d{3})/g, "$1,$2"); //Thêm dấu phẩy sau 3 chữ số (75,748)
                var die = die.toString().replace(/(-?\d+)(\d{3})/g, "$1,$2");
                var recovered = recovered.toString().replace(/(-?\d+)(\d{3})/g, "$1,$2");
                const embed = new MessageEmbed()
                    .setAuthor(`Dữ liệu được tự động cập nhật`)
                    .setTitle(`Thông tin về virus Corona (nCoV, COVID-19)`)
                    .addField(`Số lượng ca nhiễm: `, `${confirmed} ca`)
                    .addField(`Số người chết: `, `${die} người`)
                    .addField(`Số người hội phục: `, `${recovered} người`)
                    .setFooter('Nguồn: corona.kompa.ai | Made by phamleduy04#9999');
                message.channel.send(embed);
            });
        } else if (args.join(' ').toLowerCase() == "vn full") {
            graphqlclient.request(query).then(res => {
                var all_confirmed = 0;
                var all_die = 0;
                var all_recovered = 0;
                let table = new ascii("Tình hình COVID-19 ở Việt Nam")
                table.setHeading("Tỉnh thành", "Phát hiện", "Tử vong", "Bình phục","Ngày cập nhật")
                res.provinces.forEach(tentp => {
                    var timestamp = new Date(parseInt(tentp.Last_Update))
                    var date = timestamp.getDate() + '/' + (timestamp.getMonth() + 1) + '/' + timestamp.getFullYear()
                    all_confirmed = all_confirmed + parseInt(tentp.Confirmed)
                    all_die = all_die + parseInt(tentp.Deaths)
                    all_recovered = all_recovered + parseInt(tentp.Recovered)
                    table.addRow(tentp.Province_Name, tentp.Confirmed, tentp.Deaths, tentp.Recovered,date)
                });
                table.addRow("Tổng cộng", all_confirmed.toString(), all_die.toString(), all_recovered.toString())
                return message.channel.send(table.toString(), {
                    code: 'md'
                });
            });
        } else if (args[0] && search[args[0].toLowerCase()]) {
            getJSON(worldometers_url).then(result => {
                var json_data = result.filter(find => find.Country_Name == search[args[0]])
                var json_data = json_data[0];
                const embed = new MessageEmbed()
                    .setAuthor(`Dữ liệu được tự động cập nhật`)
                    .setTitle(`Số ca nhiễm COVID-19 ở ${quocgia[search[args[0]]]} `)
                    .addField(`Số ca đẵ xác nhận: `, `${json_data.Total_Cases}(${json_data.New_Cases}) ca`)
                    .addField(`Số ca tử vong: `, `${json_data.Total_Deaths}(${json_data.New_Deaths}) ca`)
                    .addField(`Số ca đã hồi phục: `, `${json_data.Total_Recovered} ca`)
                    .addField(`Số ca nghiêm trọng: `,`${json_data.Serious_Cases}`)
                    .setFooter(`Nguồn: corona.kompa.ai | Made by phamleduy04#9999`);
                if (search[args[0]] == "Vietnam") embed.setDescription(`Tips: Sử dụng lệnh \`_corona vn full\` để hiển thị chi tiết.`)
                message.channel.send(embed)
            });
        } else {
            message.channel.send(`Đất nước bạn đang tìm kiếm bot chưa hỗ trợ, hãy quay lại sau nhé!`)
        }
    }
}