const request = require('request');
const url = 'https://dankmemer.services/api/salty'
const fs = require('fs')
const { auth_dankmemer } = require('../../config.json')
const ms = require('ms')
const cooldown = new Set();
module.exports = {
    name: "salty",
    aliases: ['nhat', 'thieumuoi'],
    category: "images",
    description: "Mặn vcl :) ",
    usage: "_salty <tag>",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply(`Bạn phải tag ai đó để bot gởi ảnh nhé :))`)
        if (cooldown.has(client.user.id)) {
            return message.channel.send(`Bot đang bị cooldown, vui lòng thử lại sau 5s!`)
        } else {
            cooldown.add(client.user.id)
            var tag = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (tag) {
                var avaurl = tag.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
            } else {
                var avaurl = message.author.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
            }
            let file = fs.createWriteStream(`./salty.gif`)
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
            message.channel.send({ files: [{ attachment: "./salty.gif", name: "salty.gif" }] })
            setTimeout(() => {
                cooldown.delete(client.user.id)
            }, ms('5s'))
        }
    }
}