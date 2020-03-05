const request = require('request');
const url = 'https://dankmemer.services/api/slap'
const fs = require('fs')
const { auth_dankmemer } = require('../../config.json')
const ms = require('ms')
const cooldown = new Set();
module.exports = {
    name: "tat",
    aliases: ['tát', 'tats'],
    category: 'images',
    description: 'Tát vỡ mồm',
    usage: '_tat <@tag>',
    run: async(client, message, args) => {
        if (cooldown.has(client.user.id)) {
            return message.channel.send(`Bot đang bị cooldown, vui lòng thử lại sau 5s!`)
        } else {
            cooldown.add(client.user.id)
            var avatar1 = message.author.avatarURL({ format: 'jpg', dynamic: true, size: 128 })
            var tag = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (tag) {
                var avaurl = tag.user.avatarURL({ format: 'jpg', dynamic: true, size: 128 })
            } else {
                var avaurl = message.author.avatarURL({ format: 'jpg', dynamic: true, size: 128 })
            }
            if (tag.user.id == '455935236262592512') var avaurl = avatar1
            let file = fs.createWriteStream(`./tat.jpg`)
            await new Promise((resolve, reject) => {
                    request({
                            uri: url,
                            headers: {
                                'Authorization': auth_dankmemer
                            },
                            qs: {
                                'avatar1': avatar1,
                                'avatar2': avaurl
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
            message.channel.send({ files: [{ attachment: "./tat.jpg", name: "tat.jpg" }] })
            setTimeout(() => {
                cooldown.delete(client.user.id)
            }, ms('5s'))
        }
    }
}