const request = require('request');
const url = 'https://dankmemer.services/api/door'
const fs = require('fs')
const {auth_dankmemer} = require('../../config.json')
module.exports = {
    name: "door",
    aliases: ['khongcocua'],
    category: 'images',
    description: 'Xài đi rồi biết :\'>',
    usage: '_door <@tag>',
    run: async (client, message, args) => {
        var tag = message.mentions.members.first() || message.guild.members.get(args[0])
        if (tag) {
            var avaurl = tag.user.displayAvatarURL
        } else {
            var avaurl = message.author.displayAvatarURL
        }
        if (tag.user.id == '455935236262592512') var avaurl = avatar1
        let file = fs.createWriteStream(`./pics.jpg`)
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
        message.channel.send({file:'./pics.jpg'})
    }
}