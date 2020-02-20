const request = require('request');
const url = 'https://dankmemer.services/api/armor'
const fs = require('fs')
const {auth_dankmemer} = require('../../config.json')
module.exports = {
    name: "armor",
    category: "images",
    description: "Xài lệnh đi rồi biết",
    usage: "_armor <text>",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply (`Địt mẹ không ghi gì tao gởi ảnh bằng chim à`)
        let text = args.join(' ').toString()
        let file = fs.createWriteStream(`./pics.jpg`)
        await new Promise((resolve, reject) => {
            request({
                uri: url,
                headers: {
                'Authorization': auth_dankmemer
                },
                qs: {
                'text': text
                },
                gzip: false
            })
            .pipe(file)
            .on('finish', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            })
            })
                .catch(error => {
                    console.log(error)
                })
        message.channel.send({file:'./pics.jpg'})
            
}
}