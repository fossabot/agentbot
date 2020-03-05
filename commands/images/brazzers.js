const request = require('request');
const url = 'https://dankmemer.services/api/brazzers'
const fs = require('fs')
const ms = require('ms')
const { auth_dankmemer } = require('../../config.json')
const cooldown = new Set();
module.exports = {
    name: "brazzers",
    aliases: ["brazzer"],
    category: "images",
    description: "Xài lệnh đi rồi biết",
    usage: "_brazzers <tag>",
    run: async(client, message, args) => {
        if (cooldown.has(client.user.id)) {
            return message.channel.send(`Bot đang bị cooldown, vui lòng thử lại sau 5 giây!`)
        } else {
            cooldown.add(client.user.id)
            var tag = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (tag) {
                var avaurl = tag.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
            } else {
                var avaurl = message.author.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
            }
            let file = fs.createWriteStream(`./brazzers.jpg`)
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
            message.channel.send({ files: [{ attachment: "./brazzers.jpg", name: "brazzers.jpg" }] })
            setTimeout(() => {
                cooldown.delete(client.user.id)
            }, ms('5s'))
        }

    }
}