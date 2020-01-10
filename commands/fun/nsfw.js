const { KSoftClient } = require('ksoft.js');

const ksoft = new KSoftClient('URTOKEN');

module.exports = {
    name: "nsfw",
    category: "nsfw",
    description: "send nsfw images",
    run: async (client, message, args) => {
        return message.channel.send("Tính năng sắp ra mắt, hãy đón chờ nhé :D")
        const  url  = await ksoft.images.aww();
        message.channel.send(url); 
    }
}
    


