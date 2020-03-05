const request = require('request');
const url = 'https://dankmemer.services/api/armor'
const fs = require('fs')
const ms = require('ms')
const { auth_dankmemer } = require('../../config.json')
const cooldown = new Set();
module.exports = {
    name: "armor",
    category: "images",
    description: "Xài lệnh đi rồi biết",
    usage: "_armor <text>",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply(`Địt mẹ không ghi gì tao gởi ảnh bằng chim à`)
        if (cooldown.has(client.user.id)) {
            message.channel.send(`Bot đang bị cooldown, vui lòng thử sau 5 giây!`)
        } else {
            cooldown.add(client.user.id)
            let text = args.join(' ').toString()
            let file = fs.createWriteStream(`./armor.jpg`)
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
            message.channel.send({ files: [{ attachment: "./armor.jpg", name: "armor.jpg" }] })
            setTimeout(() => {
                cooldown.delete(client.user.id)
            }, ms('5s'))
        }
    }
}