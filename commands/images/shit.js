const request = require('request');
const url = 'https://dankmemer.services/api/shit'
const fs = require('fs')
const {auth_dankmemer} = require('../../config.json')
module.exports = {
    name: "shit",
    category: "images",
    description: "Shit images",
    usage: "_shit <tag>",
    run: async (client, message, args) => {
        var tag = message.mentions.members.first() || message.guild.members.get(args[0])
        if (tag) {
            var query = tag.user.username
        } else {
            var query = message.author.username
        }
        let file = fs.createWriteStream(`./pics.jpg`)
        await new Promise((resolve, reject) => {
            request({
                uri: url,
                headers: {
                'Authorization': auth_dankmemer
                },
                qs: {
                'text': query
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