const request = require('request');
const url = 'https://dankmemer.services/api/wanted'
const fs = require('fs')
const { auth_dankmemer } = require('../../config.json')
const ms = require('ms')
const cooldown = new Set();
module.exports = {
    name: "wanted",
    aliases: ['truyna'],
    category: 'images',
    description: 'Truy nã =)) ',
    usage: '_wanted <@tag>',
    run: async(client, message, args) => {
        if (cooldown.has(client.user.id)) {
            return message.channel.send(`Bot đang bị cooldown, vui lòng thử lại sau 5s!`)
        } else {
            cooldown.add(client.user.id)
            var tag = message.mentions.members.first() || message.guild.members.get(args[0])
            if (tag) {
                var avaurl = tag.user.displayAvatarURL
            } else {
                var avaurl = message.author.displayAvatarURL
            }
            if (tag.user.id == '455935236262592512') var avaurl = avatar1
            let file = fs.createWriteStream(`./wanted.jpg`)
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
            message.channel.send({ file: './wanted.jpg' })
            setTimeout(() => {
                cooldown.delete(client.user.id)
            }, ms('5s'))
        }
    }
}