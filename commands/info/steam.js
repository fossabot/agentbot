const {RichEmbed} = require("discord.js")
const fetch = require("node-fetch")
const { stripIndents } = require("common-tags")
const dateFormat = require("dateformat")
module.exports = {
    name: "steam",
    description: "Roleinfo",
    run: async (bot,message,args ) => {
        const token = "FB9E4D0E1F89B9A2E17F2FB22BC46C7A"
        if(!args[0]) return message.channel.send("Mày không gởi tên tài khoản tìm bằng cc")
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if (body.response.success === 42 ) return message.channel.send("Không tìm được tên, một là mày ngu hai là tao ngu")

                const id = body.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"]
        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) return message.channel.send("Tao không tìm được tên, chắc steam nghỉ việc rồi");
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated} = body.response.players[0]

        fetch(bans).then(res => res.json()).then(body=> {
            if(!body.players) return message.channel.send("Tao tìm mệt loz ra vẫn không thấy tên mày!")
            const {NumberOfVACBans, NumberOfGameBans} = body.players[0];

            const embed = new RichEmbed()
                .setColor('#00ffff')
                .setAuthor(`Steam Services | ${personaname}`,avatarfull)
                .setThumbnail(avatarfull)
                .setDescription(stripIndents`**Real Name:** ${realname || "Unknown"}
                **Status:** ${state[personastate]}
                **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase():"white"}:
                **Account Created:** ${dateFormat(timecreated * 1000,"d/mm/yyyy (h:MM:ss TT)")}
                **Bans:** Vac : ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Link:** [Link to profile](${profileurl})`)
                .setTimestamp();

                message.channel.send(embed)
        }) 
        })
        })
    }
}