module.exports = {
    name: "pick",
    category: "fun",
    description: "Random pick",
    usage: "_pick <stuff,stuff2,.....>",
    run: async(client, message, args) => {
        var pick_wordlist = args.join(' ').split(',')
        const random = pick_wordlist[Math.floor(Math.random() * pick_wordlist.length)];
        return message.channel.send(random)
    }
}