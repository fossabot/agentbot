const request = require('request')
const url = 'https://dankmemer.services/api/trash'
const fs = require('fs')
const { auth_dankmemer } = require('../../config.json')
const ms = require('ms')
const cooldown = new Set();
module.exports = {
    name: 'trash',
    aliases: ['rac'],
    category: 'images',
    description: 'Trash =)',
    usage: '_trash <@tag>',
    run: async(client, message, args) => {
        if (!args[0]) return message.reply(`Địt mẹ không tag gì tao gởi ảnh bằng chim à`)
        if (cooldown.has(client.user.id)) {
            return message.channel.send(`Bot đang bị cooldown, vui lòng thử lại sau 5s!`)
        } else {
            cooldown.add(client.user.id)
            var tag = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (tag) {
                var avaurl = tag.user.avatarURL({ format: 'jpg', dynamic: true, size: 256 })
            } else {
                var avaurl = message.author.avatarURL({ format: 'jpg', dynamic: true, size: 256 })
            }
            let file = fs.createWriteStream(`./trash.jpg`)
            await new Promise((resolve, reject) => {
                    request({
                            uri: url,
                            headers: {
                                'Authorization': auth_dankmemer
                            },
                            qs: {
                                'avatar1': avaurl
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
            message.channel.send({ files: [{ attachment: "./trash.jpg", name: "trash.jpg" }] })
            setTimeout(() => {
                cooldown.delete(client.user.id)
            }, ms('5s'))
        }
    }
}