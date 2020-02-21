const request = require('request');
const url = 'https://dankmemer.services/api/gay'
const fs = require('fs')
const {auth_dankmemer} = require('../../config.json')
module.exports = {
    name: "gay",
    category: 'images',
    description: 'Xài đi rồi biết :")',
    usage: '_gay <tag>',
    run: async (client, message, args) => {
        var tag = message.mentions.members.first() || message.guild.members.get(args[0])
        if (tag) {
            var avaurl = tag.user.displayAvatarURL
        } else {
            var avaurl = message.author.displayAvatarURL
        }
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