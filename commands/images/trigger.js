const request = require('request');
const url = 'https://dankmemer.services/api/trigger'
const fs = require('fs')
const {auth_dankmemer} = require('../../config.json')
module.exports = {
    name: "trigger",
    category: "images",
    description: "Trigger",
    usage: "_trigger <tag>",
    run: async (client, message, args) => {
        var tag = message.mentions.members.first() || message.guild.members.get(args[0])
        if (tag) {
            var avaurl = tag.user.displayAvatarURL
        } else {
            var avaurl = message.author.displayAvatarURL
        }
        let file = fs.createWriteStream(`./pics.gif`)
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
                console.log('Download complete')
                reject(err);
            })
            })
                .catch(error => {
                    console.log(error)
                })
        message.channel.send({file:'./pics.gif'})
            
    }
    }