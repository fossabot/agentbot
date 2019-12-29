var getJSON = require('get-json')
const { RichEmbed } = require("discord.js");
module.exports = {
    name: "weatherzip",
    description:"Get JSON",
    usage:"_weatherzip <zipcode>,<country code (2 letters)>",
    run: (client, message, args) => {
    var city = args[0];
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${city}&units=metric&appid=e79a43d4648af5dc9281c39cf638e375&lang=vi`;
    getJSON(url, function(error, response){
        if(error)
            return message.reply("Ghi đúng lệnh chưa địt mẹ mày =)). Ghi zipcode éo phải ghi tên thành phố")
        
        const embed = new RichEmbed()
        .setTitle("Link JSON")
        .setURL(url)
        .addField("Tình trạng lỗi:", error, true)
        .addField("Đây là thành phố:",response.name,true)
        .addField("Mã quốc gia:",response.sys.country)
        .addField("Thời tiết:",response.weather[0].main,true)
        .addField("Thời tiết chi tiết:",response.weather[0].description,true)
        .addField("Nhiệt độ trung bình:",response.main.temp,true)
        .addField("Nhiệt độ thấp nhất trong ngày:",response.main.temp_min,true)
        .addField("Nhiệt độ cao nhất trong ngày:",response.main.temp_max,true)
        .addField("Feels Like: ",response.main.feels_like,true)
        .setFooter("Nhiệt độ tính bằng độ C")


        message.channel.send(embed)

    });
}
}