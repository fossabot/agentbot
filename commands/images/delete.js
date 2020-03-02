const request = require('request');
const url = 'https://dankmemer.services/api/delete'
const fs = require('fs')
const { auth_dankmemer } = require('../../config.json')
const { promtMessage } = require('../../functions.js')
const ms = require('ms')
const cooldown = new Set();
module.exports = {
    name: "delete",
    aliases: ['xoa', 'thungrac'],
    category: 'images',
    description: 'Delete :) ',
    usage: '_delete <@tag>',
    run: async(client, message, args) => {
        if (cooldown.has(client.user.id)) {
            return message.channel.send('Bot đang bị cooldown, vui lòng chờ 5s.')
        } else {
            cooldown.add(client.user.id)
            var tag = message.mentions.members.first() || message.guild.members.get(args[0])
            if (tag) {
                var avaurl = tag.user.displayAvatarURL
            } else {
                var avaurl = message.author.displayAvatarURL
            }
            if (tag.user.id == '455935236262592512') var avaurl = avatar1
            let file = fs.createWriteStream(`./delete.jpg`)
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
            await message.channel.send({ file: './delete.jpg' }).then(async msg => {
                const emoji = await promtMessage(msg, message.author, 30, ["✅", "❌"])

                if (emoji === "✅") {
                    msg.delete();
                    msg.channel.send(`Đã xoá rác trong sv :))`).then(m => m.delete(5000))
                } else if (emoji === "❌")
                    msg.delete();
                msg.channel.send(`Éo xoá nữa :)`).then(m => m.delete(5000))
            })
            setTimeout(() => {
                cooldown.delete(client.user.id)
            }, ms('5s'));
        }
    }
}